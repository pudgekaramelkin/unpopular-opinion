import { Link } from 'react-router-dom'
import { Alert } from '../../../components/Alert'
import { Segment } from '../../../components/Segment'
import { getViewOpinionRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import styles from './index.module.scss'

export const AllOpinionsPage = () => {
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getOpinions.useInfiniteQuery(
      {
        limit: 2,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <Segment title="all opinions.">
      {isLoading || isRefetching ? (
        <div>loading...</div>
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={styles.opinions}>
          {data.pages
            .flatMap((page) => page.opinions)
            .map((opinion) => (
              <div className={styles.opinion} key={opinion.nick}>
                <Segment
                  size={2}
                  title={
                    <Link className={styles.opinionLink} to={getViewOpinionRoute({ opinionNick: opinion.nick })}>
                      {opinion.name}
                    </Link>
                  }
                  description={opinion.description}
                />
              </div>
            ))}
          <div className={styles.more}>
            {hasNextPage && !isFetchingNextPage && (
              <button
                onClick={() => {
                  void fetchNextPage()
                }}
              >
                load more
              </button>
            )}
            {isFetchingNextPage && <span>loading...</span>}
          </div>
        </div>
      )}
    </Segment>
  )
}
