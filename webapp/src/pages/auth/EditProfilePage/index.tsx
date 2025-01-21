import type { TrpcRouterOutput } from '@unpopularopinion/backend/src/router'
import { zUpdatePasswordTrpcInput } from '@unpopularopinion/backend/src/router/auth/updatePassword/input'
import { zUpdateProfileTrpcInput } from '@unpopularopinion/backend/src/router/auth/updateProfile/input'
import { z } from 'zod'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { trpc } from '../../../lib/trpc'

const General = ({ me }: { me: NonNullable<TrpcRouterOutput['getMe']['me']> }) => {
  const trpcUtils = trpc.useContext()
  const updateProfile = trpc.updateProfile.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      nick: me.nick,
      name: me.name,
    },
    validationSchema: zUpdateProfileTrpcInput,
    onSubmit: async (values) => {
      const updatedMe = await updateProfile.mutateAsync(values)
      trpcUtils.getMe.setData(undefined, { me: updatedMe })
    },
    successMessage: 'profile updated',
    resetOnSuccess: false,
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input label="nick" name="nick" formik={formik} />
        <Input label="name" name="name" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>Update Profile</Button>
      </FormItems>
    </form>
  )
}

const Password = () => {
  const updatePassword = trpc.updatePassword.useMutation()
  const { formik, alertProps, buttonProps } = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: '',
    },
    validationSchema: zUpdatePasswordTrpcInput
      .extend({
        newPasswordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.newPassword !== val.newPasswordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'passwords must be the same',
            path: ['newPasswordAgain'],
          })
        }
      }),
    onSubmit: async ({ newPassword, oldPassword }) => {
      await updatePassword.mutateAsync({ newPassword, oldPassword })
    },
    successMessage: 'password updated',
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input label="old password" name="oldPassword" type="password" formik={formik} />
        <Input label="new password" name="newPassword" type="password" formik={formik} />
        <Input label="new password again" name="newPasswordAgain" type="password" formik={formik} />
        <Alert {...alertProps} />
        <Button {...buttonProps}>update Password</Button>
      </FormItems>
    </form>
  )
}

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorizedMe }) => ({
    me: getAuthorizedMe(),
  }),
})(({ me }) => {
  return (
    <Segment title="edit profile.">
      <Segment title="general" size={2}>
        <General me={me} />
      </Segment>
      <Segment title="password" size={2}>
        <Password />
      </Segment>
    </Segment>
  )
})
