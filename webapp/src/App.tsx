import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { getAllOpinionsRoute, getViewOpinionRoute, viewOpinionRouteParams } from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllOpinionsPage } from './pages/AllOpinionsPage'
import { ViewOpinionPage } from './pages/ViewOpinionPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getAllOpinionsRoute()} element={<AllOpinionsPage />} />
            <Route path={getViewOpinionRoute(viewOpinionRouteParams)} element={<ViewOpinionPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
