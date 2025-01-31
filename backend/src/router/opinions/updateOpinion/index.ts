import { trpc } from '../../../lib/trpc'
import { canEditOpinion } from '../../../utils/can'
import { zUpdateOpinionTrpcInput } from './input'

export const updateOpinionTrpcRoute = trpc.procedure.input(zUpdateOpinionTrpcInput).mutation(async ({ ctx, input }) => {
  const { opinionId, ...opinionInput } = input
  if (!ctx.me) {
    throw new Error('UNAUTHORIZED')
  }
  const opinion = await ctx.prisma.opinion.findUnique({
    where: {
      id: opinionId,
    },
  })
  if (!opinion) {
    throw new Error('NOT_FOUND')
  }
  if (!canEditOpinion(ctx.me, opinion)) {
    throw new Error('NOT_YOUR_OPINION')
  }
  if (opinion.nick !== input.nick) {
    const exOpinion = await ctx.prisma.opinion.findUnique({
      where: {
        nick: input.nick,
      },
    })
    if (exOpinion) {
      throw new Error('opinion with this nick already exists')
    }
  }
  await ctx.prisma.opinion.update({
    where: {
      id: opinionId,
    },
    data: {
      ...opinionInput,
    },
  })
  return true
})
