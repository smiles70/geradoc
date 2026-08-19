import { useDemo } from '../store/DemoContext';
import KeyInfoCards from './KeyInfoCards';
import ActionItems from './ActionItems';
import AccessibilityControls from './AccessibilityControls';

const stateToLevel = { SIMPLE: 'simple', STANDARD: 'standard', DETAILED: 'detailed' };

export default function DocumentViewer() {
  const { selectedDoc, simplificationLevel, setSimplificationLevel } = useDemo();

  if (!selectedDoc) return null;

  const metadata = selectedDoc.researchMetadata;
  const approvedState = metadata?.presentationState;
  const approvedLevel = stateToLevel[approvedState];
  const review = approvedState === 'REVIEW';
  const level = approvedLevel || simplificationLevel;
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

        {review ? (
          <section role="alert" className="bg-amber-950/50 border border-amber-400 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-amber-200 mb-2">We need to check this document</h3>
            <p className="text-slate-200">Some important information could not be confirmed safely. We will not guess. Please review the original document or try another scan.</p>
            {metadata.reviewFlags?.length > 0 && (
              <ul className="mt-3 list-disc pl-5 text-amber-100">
                {metadata.reviewFlags.map(flag => <li key={flag}>{flag}</li>)}
              </ul>
            )}
          </section>
        ) : (
          <>
            {!metadata && (
              <div className="flex flex-wrap gap-2 mb-4" aria-label="Choose explanation level">
                {levels.map(item => (
                  <button
                    key={item.key}
                    onClick={() => setSimplificationLevel(item.key)}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      simplificationLevel === item.key
                        ? 'bg-cyan-500 text-slate-900'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
              <div className="flex flex-wrap justify-between gap-2 mb-3">
                <h3 className="text-xl font-bold text-white">What this means</h3>
                {approvedState && <span className="text-cyan-300">Approved view: {approvedState.toLowerCase()}</span>}
              </div>
              <p className="text-slate-200 text-lg leading-relaxed">{selectedDoc.summary[level]}</p>
              {metadata?.confidence !== undefined && <p className="mt-3 text-sm text-slate-400">Processing confidence: {Math.round(metadata.confidence * 100)}%</p>}
            </div>
          </>
        )}

        {metadata?.sourceReferences?.length > 0 && (
          <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6">
            <h3 className="text-lg font-bold text-white mb-2">Source references</h3>
            <ul className="list-disc pl-5 text-slate-300">
              {metadata.sourceReferences.map((reference, index) => <li key={index}>{reference.label || `Source ${index + 1}`}</li>)}
            </ul>
          </section>
        )}

        <KeyInfoCards keyInfo={selectedDoc.keyInfo} />
        <ActionItems actions={selectedDoc.actions} />
      </div>
    </div>
  );
}
