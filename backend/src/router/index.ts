import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getMeTrpcRoute } from './auth/getMe'
import { signInTrpcRoute } from './auth/signIn'
import { signUpTrpcRoute } from './auth/signUp'
import { createOpinionTrpcRoute } from './opinions/createOpinion'
import { getOpinionTrpcRoute } from './opinions/getOpinion'
import { getOpinionsTrpcRoute } from './opinions/getOpinions'
import { updateOpinionTrpcRoute } from './opinions/updateOpinion'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getMe: getMeTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  createOpinion: createOpinionTrpcRoute,
  getOpinion: getOpinionTrpcRoute,
  getOpinions: getOpinionsTrpcRoute,
  updateOpinion: updateOpinionTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
