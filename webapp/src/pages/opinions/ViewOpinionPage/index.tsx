import type { TrpcRouterOutput } from '@unpopularopinion/backend/src/router'
import format from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../../components/Button'
import { Segment } from '../../../components/Segment'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { getEditOpinionRoute, type ViewOpinionParams } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import styles from './index.module.scss'

const LikeButton = ({ opinion }: { opinion: NonNullable<TrpcRouterOutput['getOpinion']['opinion']> }) => {
  const trpcUtils = trpc.useContext()
  const setOpinionLike = trpc.setOpinionLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetOpinionData = trpcUtils.getOpinion.getData({ opinionNick: opinion.nick })
      if (oldGetOpinionData?.opinion) {
        const newGetOpinionData = {
          ...oldGetOpinionData,
          idea: {
            ...oldGetOpinionData.opinion,
            isLikedByMe,
            likesCount: Number(oldGetOpinionData.opinion.likesCount) + (isLikedByMe ? 1 : -1),
          },
        }
        trpcUtils.getOpinion.setData({ opinionNick: opinion.nick }, newGetOpinionData)
      }
    },
    onSuccess: () => {
      void trpcUtils.getOpinion.invalidate({ opinionNick: opinion.nick })
    },
  })
  return (
    <button
      className={styles.likeButton}
      onClick={() => {
        void setOpinionLike.mutateAsync({ opinionId: opinion.id, isLikedByMe: !opinion.isLikedByMe })
      }}
    >
      {opinion.isLikedByMe ? 'unlike' : 'like'}
    </button>
  )
}

export const ViewOpinionPage = withPageWrapper({
  useQuery: () => {
    const { opinionNick } = useParams() as ViewOpinionParams
    return trpc.getOpinion.useQuery({
      opinionNick,
    })
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    opinion: checkExists(queryResult.data.opinion, 'opinion not found'),
    me: ctx.me,
  }),
  showLoaderOnFetching: false,
})(({ opinion, me }) => (
  <Segment title={opinion.name} description={opinion.description}>
    <div className={styles.text} dangerouslySetInnerHTML={{ __html: opinion.text }}></div>
    <div className={styles.likes}>
      likes: {opinion.likesCount}
      {me && (
        <>
          <br />
          <LikeButton opinion={opinion} />
        </>
      )}
    </div>
    <div className={styles.createdAt}>created at: {format(opinion.createdAt, 'yyyy-MM-dd')}</div>
    <div className={styles.author}>
      by: {opinion.author.nick} {opinion.author.name ? `(${opinion.author.name})` : ''}
    </div>
    {me?.id === opinion.authorId && (
      <div className={styles.editButton}>
        <LinkButton to={getEditOpinionRoute({ opinionNick: opinion.nick })}>edit opinion</LinkButton>
      </div>
    )}
  </Segment>
))
