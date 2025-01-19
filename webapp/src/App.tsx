import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AppContextProvider } from './lib/сtx'
import { AllOpinionsPage } from './pages/AllOpinionsPage'
import { EditOpinionPage } from './pages/EditOpinionPage'
import { NewOpinionPage } from './pages/NewOpinionPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'
import { SignUpPage } from './pages/SignUpPage'
import { ViewOpinionPage } from './pages/ViewOpinionPage'

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
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
