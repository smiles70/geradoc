import { useState } from 'react';
import { useDemo } from '../store/DemoContext';
import { sampleDocuments } from '../data/sampleDocuments';
import { documentApi } from '../documentApi';

const messages = {
  FILE_SELECTED: 'Your file is ready. Select Process this document when you are ready.',
  UPLOADING: 'Uploading your document...',
  PROCESSING: 'Your upload is complete. Now we are reading the document...',
  COMPLETE: 'Your document is ready.',
  ERROR: 'We could not process that document.',
};

export default function SeniorDashboard() {
  const { setSelectedDoc, setView } = useDemo();
  const [status, setStatus] = useState('IDLE');
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');

  const select = (doc) => {
    setStatus('IDLE');
    setError('');
    setSelectedFile(null);
    setSelectedDoc(doc);
    setView('processing');
  };

  const selectFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setStatus('FILE_SELECTED');
    setError('');
  };

  const processFile = async () => {
    if (!selectedFile) return;
    setStatus('UPLOADING');
    setError('');
    const processingTimer = window.setTimeout(() => setStatus('PROCESSING'), 250);
    try {
      const result = await documentApi.processDocument(selectedFile);
      setStatus('COMPLETE');
      setSelectedDoc(result);
      window.setTimeout(() => setView('document'), 500);
    } catch {
      setStatus('ERROR');
      setError('We could not process this document. You can try again or choose another file.');
    } finally {
      window.clearTimeout(processingTimer);
    }
  };

  const retry = () => processFile();
  const active = ['UPLOADING', 'PROCESSING'].includes(status);
  const statusMessage = messages[status];

  return (
    <div className="min-h-screen p-6 bg-slate-950">
      <div className="max-w-4xl mx-auto pt-14">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome, Margaret</h2>
        <p className="text-slate-300 mb-8">Choose a sample or upload an approved test document.</p>

        <section aria-labelledby="upload-heading" className="p-6 mb-6 bg-cyan-950/40 border border-cyan-500 rounded-xl">
          <h3 id="upload-heading" className="text-xl text-cyan-300 font-bold mb-2">Upload a document</h3>
          <p className="text-slate-300 mb-3">PDF, PNG, or JPEG up to 10 MB.</p>
          <input
            id="poc-document-upload"
            type="file"
            accept="application/pdf,image/png,image/jpeg"
            onChange={selectFile}
            disabled={active}
            aria-describedby="upload-status"
          />
          {selectedFile && <p className="mt-3 text-slate-200">Selected: <strong>{selectedFile.name}</strong></p>}
          {status === 'FILE_SELECTED' && (
            <button type="button" onClick={processFile} className="mt-3 min-h-11 px-5 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold">
              Process this document
            </button>
          )}
          {statusMessage && (
            <div id="upload-status" className="mt-3" aria-live="polite">
              <p className={status === 'ERROR' ? 'text-rose-300' : 'text-cyan-300'}>{statusMessage}</p>
              {active && <div className="mt-2 h-2 overflow-hidden rounded bg-slate-800" role="progressbar" aria-label="Document processing in progress"><div className="h-full w-1/3 animate-pulse rounded bg-cyan-400" /></div>}
              {status === 'COMPLETE' && <p className="text-emerald-300">We finished checking the file. Opening your explanation...</p>}
              {status === 'ERROR' && <button type="button" onClick={retry} className="mt-2 min-h-11 px-4 py-2 rounded-lg bg-rose-700 text-white font-semibold">Try again</button>}
            </div>
          )}
          {error && <p role="alert" className="mt-3 text-rose-300">{error}</p>}
        </section>

        <h3 className="text-xl font-bold text-white mb-3">Sample documents</h3>
        <div className="grid gap-4">
          {sampleDocuments.map(doc => (
            <button key={doc.id} onClick={() => select(doc)} className="text-left p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500 transition">
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
