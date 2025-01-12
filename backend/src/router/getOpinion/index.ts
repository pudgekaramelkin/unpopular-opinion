import { z } from "zod"
import { opinions } from "../../lib/ideas"
import { trpc } from "../../lib/trpc"

export const getOpinionTrpcRoute = trpc.procedure
    .input(
      z.object({
        opinionNick: z.string(),
      })
    )
    .query(({ input }) => {
      return { opinion: opinions.find((opinion) => opinion.nick === input.opinionNick) || null }
    })