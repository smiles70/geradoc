import { sampleDocuments } from './data/sampleDocuments';

function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Loaded {sampleDocuments.length} documents</h1>
      {sampleDocuments.map(d => <p key={d.id} className="text-slate-300">{d.title}</p>)}
    </div>
  );
}

export default App;
