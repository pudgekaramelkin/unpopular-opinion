import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'

const opinions = _.times(50, (x) => ({
  nick: `opinion-nick-${x}`,
  name: `opinion-${x}.`,
  description: `Description of opinion ${x}..`,
  text: _.times(10, (i) => `<p>text of paragraph ${i} of opinion ${x}</p>`).join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getOpinions: trpc.procedure.query(() => {
    return { opinions: opinions.map((opinion) => _.pick(opinion, ['nick', 'name', 'description'])) }
  }),
  getOpinion: trpc.procedure
    .input(
      z.object({
        opinionNick: z.string(),
      })
    )
    .query(({ input }) => {
      return { opinion: opinions.find((opinion) => opinion.nick === input.opinionNick) || null }
    }),
})

export type TrpcRouter = typeof trpcRouter
