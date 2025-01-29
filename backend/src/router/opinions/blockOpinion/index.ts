import { sendOpinionBlockedEmail } from '../../../lib/emails'
import { trpc } from '../../../lib/trpc'
import { canBlockOpinions } from '../../../utils/can'
import { zBlockOpinionTrpcInput } from './input'

export const blockOpinionTrpcRoute = trpc.procedure.input(zBlockOpinionTrpcInput).mutation(async ({ ctx, input }) => {
  const { opinionId } = input
  if (!canBlockOpinions(ctx.me)) {
    throw new Error('PERMISSION_DENIED')
  }
  const opinion = await ctx.prisma.opinion.findUnique({
    where: {
      id: opinionId,
    },
    include: {
      author: true,
    },
  })
  if (!opinion) {
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
  void sendOpinionBlockedEmail({ user: opinion.author, opinion })
  return true
})
