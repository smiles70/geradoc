import { useEffect, useRef } from 'react';
import { useDemo } from './store/DemoContext';
import LandingPage from './components/LandingPage';
import SeniorDashboard from './components/SeniorDashboard';
import CaregiverDashboard from './components/CaregiverDashboard';
import ProcessingScreen from './components/ProcessingScreen';
import DocumentViewer from './components/DocumentViewer';
import ContextualBackButton from './components/ContextualBackButton';

function App() {
  const { view, resetDemo, persona, fontSize, highContrast } = useDemo();
  const contentRef = useRef(null);
  const fontClass = { small: 'text-base', medium: 'text-lg', large: 'text-xl' }[fontSize] || 'text-lg';

  useEffect(() => {
    contentRef.current?.focus();
  }, [view]);

  const reset = () => {
    if (window.confirm('Start over? Your current demo progress will be cleared.')) resetDemo();
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
    <div className={`relative min-h-screen ${fontClass} ${highContrast ? 'high-contrast' : ''}`}>
      {view !== 'landing' && (
        <div className="absolute inset-x-4 top-4 z-50 flex items-center justify-between gap-4">
          <ContextualBackButton />
          <button
            type="button"
            onClick={reset}
            className="min-h-11 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
          >
            Start Over
          </button>
        </div>
      )}
      <main ref={contentRef} tabIndex="-1" className="focus:outline-none">
        {render()}
      </main>
    </div>
  );
}

export default App;
