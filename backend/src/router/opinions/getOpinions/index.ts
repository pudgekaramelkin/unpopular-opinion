import { trpc } from '../../../lib/trpc'

export const getOpinionsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const opinions = await ctx.prisma.opinion.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return { opinions }
})
