import { trpc } from '../../../lib/trpc'
import { zGetOpinionsTrpcInput } from './input'

export const getOpinionsTrpcRoute = trpc.procedure.input(zGetOpinionsTrpcInput).query(async ({ ctx, input }) => {
  const opinions = await ctx.prisma.opinion.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      serialNumber: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
      {
        serialNumber: 'desc',
      },
    ],
    cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
    take: input.limit + 1,
  })
  const nextOpinion = opinions.at(input.limit)
  const nextCursor = nextOpinion?.serialNumber
  const opinionsExceptNext = opinions.slice(0, input.limit)

  return { opinions: opinionsExceptNext, nextCursor }
})
