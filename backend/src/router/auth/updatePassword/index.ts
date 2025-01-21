import { trpc } from '../../../lib/trpc'
import { getPasswordHash } from '../../../utils/getPasswordHash'
import { zUpdatePasswordTrpcInput } from './input'

export const updatePasswordTrpcRoute = trpc.procedure
  .input(zUpdatePasswordTrpcInput)
  .mutation(async ({ ctx, input }) => {
    if (!ctx.me) {
      throw new Error('UNAUTHORIZED')
    }
    if (ctx.me.password !== getPasswordHash(input.oldPassword)) {
      throw new Error('wrong old password')
    }
    const newPassword = getPasswordHash(input.newPassword)
    if (ctx.me.password === newPassword) {
      throw new Error('the old password must not match the new password')
    }
    const updatedMe = await ctx.prisma.user.update({
      where: {
        id: ctx.me.id,
      },
      data: {
        password: newPassword,
      },
    })
    ctx.me = updatedMe
    return true
  })
