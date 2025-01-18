import type { TrpcRouterOutput } from '@unpopularopinion/backend/src/router'
import { zUpdateOpinionTrpcInput } from '@unpopularopinion/backend/src/router/updateOpinion/input'
import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { useForm } from '../../lib/form'
import { type EditOpinionRouteParams, getViewOpinionRoute } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const EditOpinionComponent = ({ opinion }: { opinion: NonNullable<TrpcRouterOutput['getOpinion']['opinion']> }) => {
  const navigate = useNavigate()
  const updateOpinion = trpc.updateOpinion.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(opinion, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateOpinionTrpcInput.omit({ opinionId: true }),
    onSubmit: async (values) => {
      await updateOpinion.mutateAsync({ opinionId: opinion.id, ...values })
      void navigate(getViewOpinionRoute({ opinionNick: values.nick }))
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  })

  return (
    <Segment title={`edit opinion: ${opinion.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="name" name="name" formik={formik} />
          <Input label="nick" name="nick" formik={formik} />
          <Input label="description" name="description" maxWidth={500} formik={formik} />
          <Textarea label="text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>update opinion</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

export const EditOpinionPage = () => {
  const { opinionNick } = useParams() as EditOpinionRouteParams

  const getOpinionResult = trpc.getOpinion.useQuery({
    opinionNick,
  })
  const getMeResult = trpc.getMe.useQuery()

  if (getOpinionResult.isLoading || getOpinionResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>=loading...</span>
  }

  if (getOpinionResult.isError) {
    return <span>error: {getOpinionResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>error: {getMeResult.error.message}</span>
  }

  if (!getOpinionResult.data.opinion) {
    return <span>opinion not found</span>
  }

  const opinion = getOpinionResult.data.opinion
  const me = getMeResult.data.me

  if (!me) {
    return <span>only for authorized</span>
  }

  if (me.id !== opinion.authorId) {
    return <span>an opinion can only be edited by the author</span>
  }

  return <EditOpinionComponent opinion={opinion} />
}
