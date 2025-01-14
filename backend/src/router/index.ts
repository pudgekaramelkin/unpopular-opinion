import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createOpinionTrpcRoute } from './createOpinion'
import { getOpinionTrpcRoute } from './getOpinion'
import { getOpinionsTrpcRoute } from './getOpinions'
import { signUpTrpcRoute } from './signUp'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createOpinion: createOpinionTrpcRoute,
  getOpinion: getOpinionTrpcRoute,
  getOpinions: getOpinionsTrpcRoute,
  signUp: signUpTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
