import { useDemo } from './store/DemoContext';
import LandingPage from './components/LandingPage';
import SeniorDashboard from './components/SeniorDashboard';

function App() {
  const { view } = useDemo();

  if (view === 'landing') return <LandingPage />;
  if (view === 'dashboard') return <SeniorDashboard />;

  return <LandingPage />;
}

export default App;
