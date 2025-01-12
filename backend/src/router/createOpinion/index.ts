import { opinions } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'
import { zCreateOpinionTrpcInput } from './input'

export const createOpinionTrpcRoute = trpc.procedure.input(zCreateOpinionTrpcInput).mutation(({ input }) => {
  opinions.unshift(input)
  return true
})
