import { useDemo } from '../store/DemoContext';

const labels = {
  dashboard: 'Back to start',
  processing: 'Back to documents',
  document: 'Back to documents',
};

export default function ContextualBackButton() {
  const { view, goBack } = useDemo();
  if (view === 'landing') return null;

  return (
    <button
      type="button"
      onClick={goBack}
      className="min-h-11 px-4 py-2 text-left text-cyan-300 font-semibold rounded-lg hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300"
      aria-label={labels[view] || 'Go back'}
    >
      ← {labels[view] || 'Go back'}
    </button>
  );
}
