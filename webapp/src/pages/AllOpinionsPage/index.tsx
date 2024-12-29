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
          <h2>{opinion.name}</h2>
          <p>{opinion.description}</p>
        </div>
      ))}
    </div>
  ) : null
}