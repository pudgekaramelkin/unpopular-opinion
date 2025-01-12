import { trpc } from '../lib/trpc'
import { getOpinionTrpcRoute } from './getOpinion'
import { getOpinionsTrpcRoute } from './getOpinions'

export const trpcRouter = trpc.router({
  getOpinion: getOpinionTrpcRoute,
  getOpinions: getOpinionsTrpcRoute,
})

export type TrpcRouter = typeof trpcRouter