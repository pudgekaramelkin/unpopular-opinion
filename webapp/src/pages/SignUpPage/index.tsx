import { zSignUpTrpcInput } from '@unpopularopinion/backend/src/router/signUp/input'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { useForm } from '../../lib/form'
import * as routes from '../../lib/routes'
import { trpc } from '../../lib/trpc'

export const SignUpPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useContext()
  const signUp = trpc.signUp.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
      .extend({
        passwordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.password !== val.passwordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'passwords must be the same.',
            path: ['passwordAgain'],
          })
        }
      }),
    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values)
      Cookies.set('unpopularopinion-token', token, { expires: 99999 })
      void trpcUtils.invalidate()
      void navigate(routes.getAllOpinionsRoute())
    },
    resetOnSuccess: false,
  })

  return (
    <Segment title="sign up.">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="nick" name="nick" formik={formik} />
          <Input label="password" name="password" type="password" formik={formik} />
          <Input label="password again" name="passwordAgain" type="password" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>sign in</Button>
        </FormItems>
      </form>
    </Segment>
  )
}
