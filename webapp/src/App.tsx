import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AppContextProvider } from './lib/сtx'
import { EditProfilePage } from './pages/auth/EditProfilePage'
import { SignInPage } from './pages/auth/SignInPage'
import { SignOutPage } from './pages/auth/SignOutPage'
import { SignUpPage } from './pages/auth/SignUpPage'
import { AllOpinionsPage } from './pages/opinions/AllOpinionsPage'
import { EditOpinionPage } from './pages/opinions/EditOpinionPage'
import { NewOpinionPage } from './pages/opinions/NewOpinionPage'
import { ViewOpinionPage } from './pages/opinions/ViewOpinionPage'
import { NotFoundPage } from './pages/other/NotFoundPage'

import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.getAllOpinionsRoute()} element={<AllOpinionsPage />} />
              <Route path={routes.getNewOpinionRoute()} element={<NewOpinionPage />} />
              <Route path={routes.getViewOpinionRoute(routes.viewOpinionRouteParams)} element={<ViewOpinionPage />} />
              <Route path={routes.getEditOpinionRoute(routes.editOpinionRouteParams)} element={<EditOpinionPage />} />
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.getSignInRoute()} element={<SignInPage />} />
              <Route path={routes.getEditProfilePage()} element={<EditProfilePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
