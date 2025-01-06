import { Link } from 'react-router-dom'
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
    <div>
      <h1 className={styles.title}>all opinions.</h1>
      <div className={styles.opinions}>
        {data.opinions.map((opinion) => (
          <div className={styles.opinion} key={opinion.nick}>
            <h2 className={styles.opinionName}>
              <Link className={styles.opinionLink} to={getViewOpinionRoute({ opinionNick: opinion.nick })}>
                {opinion.name}
              </Link>
            </h2>
            <p className={styles.opinionDescription}>{opinion.description}</p>
          </div>
        ))}
      </div>
    </div>
  ) : null
}
