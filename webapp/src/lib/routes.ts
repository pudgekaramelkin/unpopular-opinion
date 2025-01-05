const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:&{key}` }), {}) as Record<keyof T, string>
}

export const getAllOpinionsRoute = () => '/'
export const viewOpinionRouteParams = getRouteParams({ opinionNick: true })
export type ViewOpinionParams = typeof viewOpinionRouteParams
export const getViewOpinionRoute = ({ opinionNick }: ViewOpinionParams) => `opinions/${opinionNick}`
