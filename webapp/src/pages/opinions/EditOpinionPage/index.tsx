import { zUpdateOpinionTrpcInput } from '@unpopularopinion/backend/src/router/opinions/updateOpinion/input'
import { canEditOpinion } from '@unpopularopinion/backend/src/utils/can'
import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { Textarea } from '../../../components/Textarea'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { type EditOpinionRouteParams, getViewOpinionRoute } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'

export const EditOpinionPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { opinionNick } = useParams() as EditOpinionRouteParams
    return trpc.getOpinion.useQuery({
      opinionNick,
    })
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const opinion = checkExists(queryResult.data.opinion, 'opinion not found')
    checkAccess(canEditOpinion(ctx.me, opinion), 'an opinion can only be edited by author')
    return {
      opinion,
    }
  },
  title: ({ opinion }) => `edit opinion "${opinion.name}"`,
})(({ opinion }) => {
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
})
