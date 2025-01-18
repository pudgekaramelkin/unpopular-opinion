import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createOpinionTrpcRoute } from './createOpinion'
import { getMeTrpcRoute } from './getMe'
import { getOpinionTrpcRoute } from './getOpinion'
import { getOpinionsTrpcRoute } from './getOpinions'
import { signInTrpcRoute } from './signIn'
import { signUpTrpcRoute } from './signUp'
import { updateOpinionTrpcRoute } from './updateOpinion'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createOpinion: createOpinionTrpcRoute,
  getMe: getMeTrpcRoute,
  getOpinion: getOpinionTrpcRoute,
  getOpinions: getOpinionsTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  updateOpinion: updateOpinionTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
