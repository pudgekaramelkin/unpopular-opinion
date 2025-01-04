import { TrpcProvider } from './lib/trpc'
import { AllOpinionsPage } from './pages/AllOpinionsPage'

export const App = () => {
  return (
    <TrpcProvider>
      <AllOpinionsPage />
    </TrpcProvider>
  )
}
