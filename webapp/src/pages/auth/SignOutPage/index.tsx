import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import * as routes from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'

export const SignOutPage = () => {
  const navigate = useNavigate()
  const trpcUtils = trpc.useContext()
  useEffect(() => {
    Cookies.remove('unpopularopinion-token')
    void trpcUtils.invalidate().then(() => {
      void navigate(routes.getSignInRoute())
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Loader type="page" />
}
