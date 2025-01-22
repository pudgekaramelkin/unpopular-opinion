import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import { Alert } from '../../../components/Alert'
import { layoutContentElRef } from '../../../components/Layout'
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
        <InfiniteScroll
          threshold={250}
          loadMore={() => {
            if (!isFetchingNextPage && hasNextPage) {
              void fetchNextPage()
            }
          }}
          hasMore={hasNextPage}
          loader={
            <div className={styles.more} key="loader">
              loading...
            </div>
          }
          getScrollParent={() => layoutContentElRef.current}
          useWindow={(layoutContentElRef.current && getComputedStyle(layoutContentElRef.current).overflow) !== 'auto'}
        >
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
          </div>
        </InfiniteScroll>
      )}
    </Segment>
  )
}
