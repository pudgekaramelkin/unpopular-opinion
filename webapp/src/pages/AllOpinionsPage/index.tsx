import { Link } from 'react-router-dom'
import { Segment } from '../../components/Segment'
import { getViewOpinionRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'
import styles from './index.module.scss'

export const AllOpinionsPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getOpinions.useQuery()

  if (isLoading || isFetching) {
    return <span>loading...</span>
  }

  if (isError) {
    return <span>error: {error.message}</span>
  }

  return data ? (
    <Segment title="all opinions.">
      <div className={styles.opinions}>
        {data.opinions.map((opinion) => (
          <div className={styles.opinion} key={opinion.nick}>
            <p className={styles.opinionDescription}>{}</p>
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
    </Segment>
  ) : null
}
