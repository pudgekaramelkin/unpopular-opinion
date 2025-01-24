import _ from 'lodash'
import { z } from 'zod'
import { trpc } from '../../../lib/trpc'

export const getOpinionTrpcRoute = trpc.procedure
  .input(
    z.object({
      opinionNick: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const rawOpinion = await ctx.prisma.opinion.findUnique({
      where: {
        nick: input.opinionNick,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
            name: true,
          },
        },
        opinionsLikes: {
          select: {
            id: true,
          },
          where: {
            userId: ctx.me?.id,
          },
        },
        _count: {
          select: {
            opinionsLikes: true,
          },
        },
      },
    })
    if (rawOpinion?.blockedAt) {
      throw new Error('opinion is blocked by administrator')
    }
    const isLikedByMe = !!rawOpinion?.opinionsLikes.length
    const likesCount = rawOpinion?._count.opinionsLikes || 0
    const opinion = rawOpinion && { ..._.omit(rawOpinion, ['opinionsLikes', '_count']), isLikedByMe, likesCount }

    return { opinion }
  })
