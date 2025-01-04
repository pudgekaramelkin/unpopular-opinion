import { initTRPC } from '@trpc/server'

const opinions = [
  { nick: 'bad-guy-1', name: 'Opinion 1', description: 'Description of opinion 1...' },
  { nick: 'bad-guy-2', name: 'Opinion 2', description: 'Description of opinion 2...' },
  { nick: 'bad-guy-3', name: 'Opinion 3', description: 'Description of opinion 3...' },
  { nick: 'bad-guy-4', name: 'Opinion 4', description: 'Description of opinion 4...' },
  { nick: 'bad-guy-5', name: 'Opinion 5', description: 'Description of opinion 5...' },
]

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getOpinions: trpc.procedure.query(() => {
    return { opinions }
  }),
})

export type TrpcRouter = typeof trpcRouter
