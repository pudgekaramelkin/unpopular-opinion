import { trpc } from '../../../lib/trpc'
import { zSetOpinionLikeOpinionTrpcInput } from './input'

export const setOpinionLikeTrpcRoute = trpc.procedure
  .input(zSetOpinionLikeOpinionTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { opinionId, isLikedByMe } = input
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
    if (isLikedByMe) {
      await ctx.prisma.opinionsLike.upsert({
        where: {
          opinionId_userId: {
            opinionId,
            userId: ctx.me.id,
          },
        },
        create: {
          userId: ctx.me.id,
          opinionId,
        },
        update: {},
      })
    } else {
      await ctx.prisma.opinionsLike.delete({
        where: {
          opinionId_userId: {
            opinionId,
            userId: ctx.me.id,
          },
        },
      })
    }
    const likesCount = await ctx.prisma.opinionsLike.count({
      where: {
        opinionId,
      },
    })
    return {
      opinion: {
        id: opinion.id,
        likesCount,
        isLikedByMe,
      },
    }
  })
