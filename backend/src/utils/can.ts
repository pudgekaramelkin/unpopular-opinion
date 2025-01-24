import type { Opinion, User, UserPermission } from '@prisma/client'

type MaybeUser = Pick<User, 'permissions' | 'id'> | null
type MaybeOpinion = Pick<Opinion, 'authorId'> | null

const hasPermission = (user: MaybeUser, permission: UserPermission) => {
  return user?.permissions.includes(permission) || user?.permissions.includes('ALL') || false
}

export const canBlockOpinions = (user: MaybeUser) => {
  return hasPermission(user, 'BLOCK_OPINIONS')
}

export const canEditOpinion = (user: MaybeUser, idea: MaybeOpinion) => {
  return !!user && !!idea && user?.id === idea?.authorId
}
