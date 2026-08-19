import { useDemo } from '../store/DemoContext';
import { sampleDocuments } from '../data/sampleDocuments';

export default function SeniorDashboard() {
  const { setSelectedDoc, setView } = useDemo();

  const select = (doc) => {
    setSelectedDoc(doc);
    setView('processing');
  };

  return (
    <div className="min-h-screen p-6 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome, Margaret</h2>
        <p className="text-slate-300 mb-8">Choose a document to see it simplified.</p>

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
