import _ from 'lodash'
import { trpc } from '../../../lib/trpc'
import { zGetOpinionsTrpcInput } from './input'

export const getOpinionsTrpcRoute = trpc.procedure.input(zGetOpinionsTrpcInput).query(async ({ ctx, input }) => {
  // const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, '_') : undefined
  const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, ' & ') : undefined
  const rawOpinions = await ctx.prisma.opinion.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      serialNumber: true,
      _count: {
        select: {
          opinionsLikes: true,
        },
      },
    },
    where: {
      blockedAt: null,
      ...(!normalizedSearch
        ? {}
        : {
            OR: [
              {
                name: {
                  search: normalizedSearch,
                },
              },
              {
                description: {
                  search: normalizedSearch,
                },
              },
              {
                text: {
                  search: normalizedSearch,
                },
              },
            ],
          }),
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
      {
        serialNumber: 'desc',
      },
    ],
    cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
    take: input.limit + 1,
  })
  const nextOpinion = rawOpinions.at(input.limit)
  const nextCursor = nextOpinion?.serialNumber
  const rawOpinionsExceptNext = rawOpinions.slice(0, input.limit)
  const opinionsExceptNext = rawOpinionsExceptNext.map((opinion) => ({
    ..._.omit(opinion, ['_count']),
    likesCount: opinion._count.opinionsLikes,
  }))

  return { opinions: opinionsExceptNext, nextCursor }
})
