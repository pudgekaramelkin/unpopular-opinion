import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getAllOpinionsRoute, getViewOpinionRoute, viewOpinionRouteParams } from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllOpinionsPage } from './pages/AllOpinionsPage'
import { ViewOpinionPage } from './pages/ViewOpinionPage'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getAllOpinionsRoute()} element={<AllOpinionsPage />} />
          <Route path={getViewOpinionRoute(viewOpinionRouteParams)} element={<ViewOpinionPage />} />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
