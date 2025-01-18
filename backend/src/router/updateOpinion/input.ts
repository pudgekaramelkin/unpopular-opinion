import { z } from 'zod'
import { zCreateOpinionTrpcInput } from '../createOpinion/input'

export const zUpdateOpinionTrpcInput = zCreateOpinionTrpcInput.extend({
  opinionId: z.string().min(1),
})
