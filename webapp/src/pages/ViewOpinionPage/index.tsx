import format from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../components/Button'
import { Segment } from '../../components/Segment'
import { withPageWrapper } from '../../lib/pageWrapper'
import { getEditOpinionRoute, type ViewOpinionParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'

export const ViewOpinionPage = withPageWrapper({
  useQuery: () => {
    const { opinionNick } = useParams() as ViewOpinionParams
    return trpc.getOpinion.useQuery({
      opinionNick,
    })
  },
  checkExists: ({ queryResult }) => !!queryResult.data.opinion,
  checkAccessMessage: 'opinion not found',
  setProps: ({ queryResult, ctx }) => ({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    opinion: queryResult.data.opinion!,
    me: ctx.me,
  }),
})(({ opinion, me }) => (
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
))
