import { useDemo } from './store/DemoContext';
import LandingPage from './components/LandingPage';
import SeniorDashboard from './components/SeniorDashboard';
import ProcessingScreen from './components/ProcessingScreen';
import DocumentViewer from './components/DocumentViewer';

function App() {
  const { view } = useDemo();

  if (view === 'landing') return <LandingPage />;
  if (view === 'dashboard') return <SeniorDashboard />;
  if (view === 'processing') return <ProcessingScreen />;
  if (view === 'document') return <DocumentViewer />;

  return <LandingPage />;
}

export default App;
