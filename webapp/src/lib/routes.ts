const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}

export const getAllOpinionsRoute = () => '/'

export const viewOpinionRouteParams = getRouteParams({ opinionNick: true })
export type ViewOpinionParams = typeof viewOpinionRouteParams

export const getViewOpinionRoute = ({ opinionNick }: ViewOpinionParams) => `/opinions/${opinionNick}`

export const getNewOpinionRoute = () => '/opinions/new'

export const getSignUpRoute = () => '/sign-up'

export const getSignInRoute = () => '/sign-in'

export const getSignOutRoute = () => '/sign-out'

export const editOpinionRouteParams = getRouteParams({ opinionNick: true })
export type EditOpinionRouteParams = typeof editOpinionRouteParams
export const getEditOpinionRoute = ({ opinionNick }: EditOpinionRouteParams) => `/opinions/${opinionNick}/edit`

export const getEditProfilePage = () => '/edit-profile'
