import { useParams } from 'react-router-dom'

export const ViewOpinionPage = () => {
  const { opinionNick } = useParams()

  return opinionNick ? (
    <div>
      <h1>{opinionNick}</h1>
      <p>description of opinion 1...</p>
      <div>
        <p>text paragraph</p>
        <p>text paragraph</p>
        <p>text paragraph</p>
      </div>
    </div>
  ) : null
}
