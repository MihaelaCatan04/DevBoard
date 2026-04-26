import { useProfileContext } from './context/ProfileContext'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'

export default function App() {
  const { hasCompletedOnboarding } = useProfileContext()

  if (!hasCompletedOnboarding) {
    return <Onboarding />
  }

  return <Dashboard />
}