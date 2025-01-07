import { useParams } from 'react-router-dom'
import { Segment } from '../../components/Segment'
import { type ViewOpinionParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'

export const ViewOpinionPage = () => {
  const { opinionNick } = useParams() as ViewOpinionParams

  const { data, error, isLoading, isFetching, isError } = trpc.getOpinion.useQuery({ opinionNick })

  if (isLoading || isFetching) {
    return <span>loading...</span>
  }

  if (isError) {
    return <span>error: {error.message}</span>
  }

  return data.opinion ? (
    <Segment title={data.opinion.name} description={data.opinion.description}>
      <div className={styles.text} dangerouslySetInnerHTML={{ __html: data.opinion.text }}></div>
    </Segment>
  ) : (
    <p className={styles.description}>opinion not found.</p>
  )
}
