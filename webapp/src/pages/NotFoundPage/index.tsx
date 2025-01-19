import { ErrorPageComponent } from '../../components/ErrorPageComponent'

export const NotFoundPage = ({
  title = 'not found',
  message = 'this page does not exist',
}: {
  title?: string
  message?: string
}) => <ErrorPageComponent title={title} message={message} />
