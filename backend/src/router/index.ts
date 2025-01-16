import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createOpinionTrpcRoute } from './createOpinion'
import { getMeTrpcRoute } from './getMe'
import { getOpinionTrpcRoute } from './getOpinion'
import { getOpinionsTrpcRoute } from './getOpinions'
import { signInTrpcRoute } from './signIn'
import { signUpTrpcRoute } from './signUp'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createOpinion: createOpinionTrpcRoute,
  getMe: getMeTrpcRoute,
  getOpinion: getOpinionTrpcRoute,
  getOpinions: getOpinionsTrpcRoute,
  signIn: signInTrpcRoute,
  signUp: signUpTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
