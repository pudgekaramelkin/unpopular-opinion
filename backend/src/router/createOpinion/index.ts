import { z } from 'zod'
import { opinions } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'

export const createOpinionTrpcRoute = trpc.procedure
  .input(
    z.object({
      name: z
        .string()
        .min(1)
        .regex(/^[a-z0-9].*\.$/, 'name first letter must be in lower case and last letter must be a dot.'),
      nick: z
        .string()
        .min(1)
        .regex(/^[a-z0-9-]+$/, 'nick may contain only lowercase letters, numbers and dashes.'),
      description: z.string().min(1, 'description should be at least 1 characters long.'),
      text: z.string().min(100, 'text should be at least 100 characters long.'),
    })
  )
  .mutation(({ input }) => {
    opinions.unshift(input)
    return true
  })
