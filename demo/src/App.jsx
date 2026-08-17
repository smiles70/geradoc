import { useDemo } from './store/DemoContext';
import LandingPage from './components/LandingPage';
import SeniorDashboard from './components/SeniorDashboard';
import CaregiverDashboard from './components/CaregiverDashboard';
import ProcessingScreen from './components/ProcessingScreen';
import DocumentViewer from './components/DocumentViewer';

function App() {
  const { view, setView, setSelectedDoc, setCompletedActions, persona } = useDemo();

  const reset = () => {
    setView('landing');
    setSelectedDoc(null);
    setCompletedActions(new Set());
  };

  const render = () => {
    switch (view) {
      case 'landing': return <LandingPage />;
      case 'dashboard': return persona === 'caregiver' ? <CaregiverDashboard /> : <SeniorDashboard />;
      case 'processing': return <ProcessingScreen />;
      case 'document': return <DocumentViewer />;
      default: return <LandingPage />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {view !== 'landing' && view !== 'processing' && (
        <button
          onClick={reset}
          className="fixed top-4 right-4 z-50 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700"
        >
          Start Over
        </button>
      )}
      {render()}
    </div>
  );
}

export default App;
