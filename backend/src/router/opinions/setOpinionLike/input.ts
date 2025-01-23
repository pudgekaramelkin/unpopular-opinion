import { z } from 'zod'

export const zSetOpinionLikeOpinionTrpcInput = z.object({
  opinionId: z.string().min(1),
  isLikedByMe: z.boolean(),
})
