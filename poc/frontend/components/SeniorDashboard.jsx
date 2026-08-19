import { useState } from 'react';
import { useDemo } from '../store/DemoContext';
import { sampleDocuments } from '../data/sampleDocuments';
import { documentApi } from '../documentApi';

export default function SeniorDashboard() {
  const { setSelectedDoc, setView } = useDemo();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const select = (doc) => {
    setSelectedDoc(doc);
    setView('processing');
  };

  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const result = await documentApi.processDocument(file);
      setSelectedDoc(result);
      setView('document');
    } catch {
      setError('We could not process that document. Please try again.');
    } finally {
      setBusy(false);
      event.target.value = '';
    }
  };

  return (
    <div className="min-h-screen p-6 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome, Margaret</h2>
        <p className="text-slate-300 mb-8">Choose a sample or upload an approved test document.</p>

        <label className="block p-6 mb-6 bg-cyan-950/40 border border-cyan-500 rounded-xl cursor-pointer">
          <span className="block text-cyan-300 font-bold mb-2">Upload a document</span>
          <span className="block text-slate-300 mb-3">PDF, PNG, or JPEG up to 10 MB.</span>
          <input type="file" accept="application/pdf,image/png,image/jpeg" onChange={upload} disabled={busy} />
          {busy && <span className="block mt-3 text-cyan-300">Processing your document...</span>}
          {error && <span role="alert" className="block mt-3 text-rose-300">{error}</span>}
        </label>

        <h3 className="text-xl font-bold text-white mb-3">Sample documents</h3>
        <div className="grid gap-4">
          {sampleDocuments.map(doc => (
            <button
              key={doc.id}
              onClick={() => select(doc)}
              className="text-left p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500 transition"
            >
              <div className="text-cyan-400 font-semibold">{doc.type}</div>
              <div className="text-xl text-white font-bold">{doc.title}</div>
              <div className="text-slate-400">{doc.fileName}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
