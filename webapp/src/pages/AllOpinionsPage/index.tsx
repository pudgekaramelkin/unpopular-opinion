import { Link } from 'react-router-dom'
import { getViewOpinionRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

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
      <h1>all opinions.</h1>
      {data.opinions.map((opinion) => (
        <div key={opinion.nick}>
          <h2>
            <Link to={getViewOpinionRoute({ opinionNick: opinion.nick })}>{opinion.name}</Link>
          </h2>
          <p>{opinion.description}</p>
        </div>
      ))}
    </div>
  ) : null
}
