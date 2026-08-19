import { useDemo } from '../store/DemoContext';
import { sampleDocuments } from '../data/sampleDocuments';

export default function CaregiverDashboard() {
  const { completedActions } = useDemo();

  return (
    <div className="min-h-screen p-6 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">David, you are helping Margaret</h2>
        <p className="text-slate-300 mb-6">
          Here are the documents and actions Margaret has shared with you.
        </p>

        <div className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-4 mb-6">
          <div className="font-bold text-amber-400 mb-1">Gentle Alert</div>
          <div className="text-slate-200">
            Margaret opened the Medicare letter 3 times today and did not mark any actions complete.
            She may need a quick, supportive check-in.
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3">Shared Documents</h3>
        <div className="grid gap-4">
          {sampleDocuments.map(doc => (
            <div key={doc.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
              <div className="text-cyan-400 font-semibold">{doc.type}</div>
              <div className="text-white font-bold">{doc.title}</div>
              <div className="text-slate-400 text-sm">
                Actions completed: {doc.actions.filter(a => completedActions.has(a.id)).length} of {doc.actions.length}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
