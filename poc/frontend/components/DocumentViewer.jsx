import { useState } from 'react';
import { useDemo } from '../store/DemoContext';
import KeyInfoCards from './KeyInfoCards';
import ActionItems from './ActionItems';
import AccessibilityControls from './AccessibilityControls';

const stateToLevel = { SIMPLE: 'simple', STANDARD: 'standard', DETAILED: 'detailed' };

export default function DocumentViewer() {
  const { selectedDoc, simplificationLevel, setSimplificationLevel } = useDemo();
  const [viewMode, setViewMode] = useState('simple');

  if (!selectedDoc) return null;

  const metadata = selectedDoc.researchMetadata;
  const approvedState = metadata?.presentationState;
  const approvedLevel = stateToLevel[approvedState];
  const review = approvedState === 'REVIEW';
  const level = approvedLevel || simplificationLevel;
  const originalText = selectedDoc.originalText || selectedDoc.fullText || selectedDoc.summary?.detailed || '';
  const content = viewMode === 'original' ? originalText : selectedDoc.summary?.[approvedLevel || viewMode] || originalText;
  const pageText = selectedDoc.pageText || [{ page: 1, text: originalText }];
  const tabs = [
    { key: 'original', label: 'Original' },
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
          <p className="text-slate-400">{selectedDoc.fileName} · {selectedDoc.pages || pageText.length} pages</p>
        </div>

        {review ? (
          <section role="alert" className="bg-amber-950/50 border border-amber-400 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-amber-200 mb-2">We need to check this document</h3>
            <p className="text-slate-200">Some important information could not be confirmed safely. We will not guess. Please review the original document or try another scan.</p>
            {metadata.reviewFlags?.length > 0 && <ul className="mt-3 list-disc pl-5 text-amber-100">{metadata.reviewFlags.map(flag => <li key={flag}>{flag}</li>)}</ul>}
          </section>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-4" aria-label="Choose document view">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => { setViewMode(tab.key); if (tab.key !== 'original') setSimplificationLevel(tab.key); }}
                  className={`min-h-11 px-4 py-2 rounded-lg font-semibold ${
                    (viewMode === tab.key || (viewMode !== 'original' && level === tab.key))
                      ? 'bg-cyan-500 text-slate-900'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
              <div className="flex flex-wrap justify-between gap-2 mb-3">
                <h3 className="text-xl font-bold text-white">{viewMode === 'original' ? 'Original document' : `${viewMode[0].toUpperCase()}${viewMode.slice(1)} explanation`}</h3>
                {approvedState && <span className="text-cyan-300">Approved view: {approvedState.toLowerCase()}</span>}
              </div>
              <div className="text-slate-200 text-lg leading-relaxed whitespace-pre-wrap">{content}</div>
              {metadata?.confidence !== undefined && <p className="mt-3 text-sm text-slate-400">Processing confidence: {Math.round(metadata.confidence * 100)}%</p>}
            </div>
            <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6" aria-labelledby="pages-heading">
              <h3 id="pages-heading" className="text-xl font-bold text-white mb-4">Full document by page</h3>
              {pageText.map(page => (
                <article key={page.page} className="border-t border-slate-700 py-4 first:border-t-0">
                  <h4 className="font-bold text-cyan-300 mb-2">Page {page.page}</h4>
                  <p className="text-slate-300 whitespace-pre-wrap">{page.text}</p>
                </article>
              ))}
            </section>
          </>
        )}

        {(metadata?.sourceReferences?.length > 0 || selectedDoc.sourceReferences?.length > 0) && (
          <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6">
            <h3 className="text-lg font-bold text-white mb-2">Source references</h3>
            <ul className="list-disc pl-5 text-slate-300">
              {(metadata?.sourceReferences || selectedDoc.sourceReferences).map((reference, index) => <li key={index}>{reference.label || `Source ${reference.page || index + 1}`}</li>)}
            </ul>
          </section>
        )}

        <KeyInfoCards keyInfo={selectedDoc.keyInfo} />
        <ActionItems actions={selectedDoc.actions} />
      </div>
    </div>
  );
}
