import _ from 'lodash'
import { opinions } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'

export const getOpinionsTrpcRoute = trpc.procedure.query(() => {
  return { opinions: opinions.map((opinion) => _.pick(opinion, ['nick', 'name', 'description'])) }
})
