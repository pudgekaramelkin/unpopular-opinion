import { zCreateOpinionTrpcInput } from '@unpopularopinion/backend/src/router/opinions/createOpinion/input'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { Textarea } from '../../../components/Textarea'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { trpc } from '../../../lib/trpc'

export const NewOpinionPage = withPageWrapper({
  authorizedOnly: true,
})(() => {
  const createOpinion = trpc.createOpinion.useMutation()

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: zCreateOpinionTrpcInput,
    onSubmit: async (values) => {
      await createOpinion.mutateAsync(values)
      formik.resetForm()
    },
    successMessage: 'opinion created!',
    showValidationAlert: true,
  })

  return (
    <Segment title="new opinion.">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="name" label="name" formik={formik} />
          <Input name="nick" label="nick" formik={formik} />
          <Input name="description" label="description" formik={formik} maxWidth={500} />
          <Textarea name="text" label="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>create opinion</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
