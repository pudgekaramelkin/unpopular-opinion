import { trpc } from '../../lib/trpc'
import { zCreateOpinionTrpcInput } from './input'

export const createOpinionTrpcRoute = trpc.procedure.input(zCreateOpinionTrpcInput).mutation(async ({ ctx, input }) => {
  const exOpinion = await ctx.prisma.opinion.findUnique({
    where: {
      nick: input.nick,
    },
  })
  if (exOpinion) {
    throw Error('opinion has been created')
  }
  await ctx.prisma.opinion.create({
    data: input,
  })
  return true
})
