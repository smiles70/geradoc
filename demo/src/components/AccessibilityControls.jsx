import { useDemo } from '../store/DemoContext';

export default function AccessibilityControls() {
  const { fontSize, setFontSize, highContrast, setHighContrast } = useDemo();
  const sizes = ['small', 'medium', 'large'];

  return (
    <div className="max-w-4xl mx-auto mb-6 p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-wrap gap-4 items-center">
      <span className="text-slate-300 font-semibold">Text size:</span>
      {sizes.map(s => (
        <button
          key={s}
          onClick={() => setFontSize(s)}
          className={`px-3 py-1 rounded-lg text-sm ${
            fontSize === s ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-slate-300'
          }`}
        >
          {s[0].toUpperCase() + s.slice(1)}
        </button>
      ))}
      <button
        onClick={() => setHighContrast(!highContrast)}
        className={`px-3 py-1 rounded-lg text-sm ${
          highContrast ? 'bg-yellow-400 text-slate-900' : 'bg-slate-800 text-slate-300'
        }`}
      >
        {highContrast ? 'High Contrast On' : 'High Contrast Off'}
      </button>
    </div>
  );
}
