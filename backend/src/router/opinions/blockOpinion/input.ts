import { z } from 'zod'

export const zBlockOpinionTrpcInput = z.object({
  opinionId: z.string().min(1),
})
