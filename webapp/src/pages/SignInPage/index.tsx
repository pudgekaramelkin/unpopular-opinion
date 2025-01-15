import { zSignInTrpcInput } from '@unpopularopinion/backend/src/router/signIn/input'
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { useState } from 'react'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { trpc } from '../../lib/trpc'

export const SignInPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false)
  const [submittingError, setSubmittingError] = useState<string | null>(null)
  const signIn = trpc.signIn.useMutation()
  const formik = useFormik({
    initialValues: {
      nick: '',
      password: '',
    },
    validate: withZodSchema(zSignInTrpcInput),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null)
        await signIn.mutateAsync(values)
        formik.resetForm()
        setSuccessMessageVisible(true)
        setTimeout(() => {
          setSuccessMessageVisible(false)
        }, 3000)
      } catch (err: any) {
        setSubmittingError(err.message)
      }
    },
  })

  return (
    <Segment title="sign in.">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="nick" name="nick" formik={formik} />
          <Input label="password" name="password" type="password" formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color="red">some fields are invalid.</Alert>}
          {submittingError && <Alert color="red">{submittingError}</Alert>}
          {successMessageVisible && <Alert color="green">thanks for sign in!</Alert>}
          <Button loading={formik.isSubmitting}>sign in</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
