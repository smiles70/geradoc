import { useDemo } from '../store/DemoContext';
import KeyInfoCards from './KeyInfoCards';
import ActionItems from './ActionItems';
import AccessibilityControls from './AccessibilityControls';

export default function DocumentViewer() {
  const { selectedDoc, simplificationLevel, setSimplificationLevel } = useDemo();

  if (!selectedDoc) return null;

  const levels = [
    { key: 'simple', label: 'Simple' },
    { key: 'standard', label: 'Standard' },
    { key: 'detailed', label: 'Detailed' },
  ];

  return (
    <div className="min-h-screen p-6 bg-slate-950">
      <AccessibilityControls />
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="text-cyan-400 font-semibold">{selectedDoc.type}</div>
          <h2 className="text-3xl font-bold text-white">{selectedDoc.title}</h2>
          <p className="text-slate-400">{selectedDoc.fileName}</p>
        </div>

        <div className="flex gap-2 mb-4">
          {levels.map(l => (
            <button
              key={l.key}
              onClick={() => setSimplificationLevel(l.key)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                simplificationLevel === l.key
                  ? 'bg-cyan-500 text-slate-900'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-3">What this means</h3>
          <p className="text-slate-200 text-lg leading-relaxed">
            {selectedDoc.summary[simplificationLevel]}
          </p>
        </div>

        <KeyInfoCards keyInfo={selectedDoc.keyInfo} />
        <ActionItems actions={selectedDoc.actions} />
      </div>
    </div>
  );
}
