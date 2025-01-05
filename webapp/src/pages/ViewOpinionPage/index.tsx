import { useParams } from 'react-router-dom'
import { type ViewOpinionParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

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
    <div>
      <h1>{data.opinion.name}</h1>
      <p>{data.opinion.description}</p>
      <div dangerouslySetInnerHTML={{ __html: data.opinion.text }}></div>
    </div>
  ) : (
    <p>opinion not found.</p>
  )
}
