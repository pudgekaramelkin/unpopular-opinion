import { zGetOpinionsTrpcInput } from '@unpopularopinion/backend/src/router/opinions/getOpinions/input'
import InfiniteScroll from 'react-infinite-scroller'
import { Link } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'
import { Alert } from '../../../components/Alert'
import { Input } from '../../../components/Input'
import { layoutContentElRef } from '../../../components/Layout'
import { Loader } from '../../../components/Loader'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { getViewOpinionRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import styles from './index.module.scss'

export const AllOpinionsPage = withPageWrapper({
  title: 'opinion nick.',
  isTitleExact: true,
})(() => {
  const { formik } = useForm({
    initialValues: { search: '' },
    validationSchema: zGetOpinionsTrpcInput.pick({ search: true }),
  })
  const search = useDebounce(formik.values.search, 650)
  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getOpinions.useInfiniteQuery(
      {
        search,
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
      }
    )

  return (
    <Segment title="all opinions.">
      <div className={styles.filter}>
        <Input maxWidth={'100%'} label="search" name="search" formik={formik} />
      </div>
      {isLoading || isRefetching ? (
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : !data.pages[0].opinions.length ? (
        <Alert color="brown">nothing found by search</Alert>
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
              <Loader type="section" />
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
                  >
                    likes: {opinion.likesCount}
                  </Segment>
                </div>
              ))}
          </div>
        </InfiniteScroll>
      )}
    </Segment>
  )
})
