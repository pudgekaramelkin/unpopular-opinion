import { zCreateOpinionTrpcInput } from '@unpopularopinion/backend/src/router/createOpinion/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { trpc } from '../../lib/trpc'

export const NewOpinionPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)

  const createOpinion = trpc.createOpinion.useMutation()

  const formik = useFormik({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validate: withZodSchema(zCreateOpinionTrpcInput),
    onSubmit: async (values) => {
      try {
        await createOpinion.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (err: any) {
        setSubmittingError(err.message)
        setTimeout(() => {
          setSubmittingError(null)
        }, 3000)
      }
    },
  })

  return (
    <Segment title="new opinion.">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <Input name="name" label="name" formik={formik} />
        <Input name="nick" label="nick" formik={formik} />
        <Input name="description" label="description" formik={formik} maxWidth={500} />
        <Textarea name="text" label="text" formik={formik} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>some fields are invalid.</div>}
        {successMessageVisible && <div style={{ color: 'green' }}>opinion created!</div>}
        {!!submittingError && <div style={{ color: 'red' }}>{submittingError}</div>}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'submitting...' : 'create opinion'}
        </button>
      </form>
    </Segment>
  )
}
