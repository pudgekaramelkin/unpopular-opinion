import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllOpinionsPage } from './pages/AllOpinionsPage'
import { NewOpinionPage } from './pages/NewOpinionPage'
import { ViewOpinionPage } from './pages/ViewOpinionPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllOpinionsRoute()} element={<AllOpinionsPage />} />
            <Route path={routes.getNewOpinionRoute()} element={<NewOpinionPage />} />
            <Route path={routes.getViewOpinionRoute(routes.viewOpinionRouteParams)} element={<ViewOpinionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
