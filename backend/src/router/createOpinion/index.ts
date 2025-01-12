import { opinions } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'
import { zCreateOpinionTrpcInput } from './input'

export const createOpinionTrpcRoute = trpc.procedure.input(zCreateOpinionTrpcInput).mutation(({ input }) => {
  if (opinions.find((opinion) => opinion.nick === input.nick)) {
    throw Error('opinion has been created')
  }
  opinions.unshift(input)
  return true
})
