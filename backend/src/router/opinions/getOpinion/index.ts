import { z } from 'zod'
import { trpc } from '../../../lib/trpc'

export const getOpinionTrpcRoute = trpc.procedure
  .input(
    z.object({
      opinionNick: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const opinion = await ctx.prisma.opinion.findUnique({
      where: {
        nick: input.opinionNick,
      },
      include: {
        author: {
          select: {
            id: true,
            nick: true,
          },
        },
      },
    })

    return { opinion }
  })
