import { trpc } from '../../lib/trpc'
import { zCreateOpinionTrpcInput } from './input'

export const createOpinionTrpcRoute = trpc.procedure.input(zCreateOpinionTrpcInput).mutation(async ({ ctx, input }) => {
  if (!ctx.me) {
    throw Error('UNAUTHORIZED')
  }
  const exOpinion = await ctx.prisma.opinion.findUnique({
    where: {
      nick: input.nick,
    },
  })
  if (exOpinion) {
    throw Error('opinion has already been created')
  }
  await ctx.prisma.opinion.create({
    data: { ...input, authorId: ctx.me.id },
  })
  return true
})
