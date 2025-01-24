import { trpc } from '../../../lib/trpc'
import { canBlockOpinions } from '../../../utils/can'
import { zBlockOpinionTrpcInput } from './input'

export const blockOpinionTrpcRoute = trpc.procedure.input(zBlockOpinionTrpcInput).mutation(async ({ ctx, input }) => {
  const { opinionId } = input
  if (!canBlockOpinions(ctx.me)) {
    throw new Error('PERMISSION_DENIED')
  }
  const idea = await ctx.prisma.opinion.findUnique({
    where: {
      id: opinionId,
    },
  })
  if (!idea) {
    throw new Error('NOT_FOUND')
  }
  await ctx.prisma.opinion.update({
    where: {
      id: opinionId,
    },
    data: {
      blockedAt: new Date(),
    },
  })
  return true
})
