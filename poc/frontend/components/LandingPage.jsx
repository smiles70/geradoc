import { useDemo } from '../store/DemoContext';

export default function LandingPage() {
  const { setView, setPersona } = useDemo();

  const start = (role) => {
    setPersona(role);
    setView('dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-indigo-950 to-slate-900">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Make Sense of Your Paperwork
        </h1>
        <p className="text-lg text-slate-300 mb-10">
          ClarityDoc turns confusing documents into clear, simple guidance.
          <br />
          No judgment. No jargon. Just clarity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => start('senior')}
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl text-lg"
          >
            Try as a Senior
          </button>
          <button
            onClick={() => start('caregiver')}
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl text-lg"
          >
            Try as a Caregiver
          </button>
        </div>
        <p className="mt-8 text-sm text-slate-400">
          This is a demo. No real documents are processed.
        </p>
      </div>
    </div>
  );
}
