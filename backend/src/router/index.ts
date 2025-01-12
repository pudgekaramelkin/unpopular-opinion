import { trpc } from '../lib/trpc'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { getOpinionTrpcRoute } from './getOpinion'
import { getOpinionsTrpcRoute } from './getOpinions'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  getOpinion: getOpinionTrpcRoute,
  getOpinions: getOpinionsTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter