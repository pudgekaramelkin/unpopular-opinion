import format from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../components/Button'
import { Segment } from '../../components/Segment'
import { getEditOpinionRoute, type ViewOpinionParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import { useMe } from '../../lib/сtx'
import styles from './index.module.scss'

export const ViewOpinionPage = () => {
  const { opinionNick } = useParams() as ViewOpinionParams

  const getOpinionResult = trpc.getOpinion.useQuery({
    opinionNick,
  })

  const me = useMe()

  if (getOpinionResult.isLoading || getOpinionResult.isFetching) {
    return <span>loading...</span>
  }

  if (getOpinionResult.isError) {
    return <span>error: {getOpinionResult.error.message}</span>
  }

  if (!getOpinionResult.data.opinion) {
    return <span>Idea not found</span>
  }

  const opinion = getOpinionResult.data.opinion

  return (
    <Segment title={opinion.name} description={opinion.description}>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: opinion.text }}></div>
      <div className={styles.createdAt}>created at: {format(opinion.createdAt, 'yyyy-MM-dd')}</div>
      <div className={styles.author}>by: {opinion.author.nick}</div>
      {me?.id === opinion.authorId && (
        <div className={styles.editButton}>
          <LinkButton to={getEditOpinionRoute({ opinionNick: opinion.nick })}>edit opinion</LinkButton>
        </div>
      )}
    </Segment>
  )
}
