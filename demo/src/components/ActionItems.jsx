import { useDemo } from '../store/DemoContext';

export default function ActionItems({ actions }) {
  const { completedActions, markActionComplete } = useDemo();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Things to do</h3>
      <div className="space-y-4">
        {actions.map(action => {
          const complete = completedActions.has(action.id);

          return (
            <div key={action.id} className="border border-slate-800 rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-white font-semibold">{action.description}</div>
                  <div className="text-sm text-slate-400">Due {action.deadline}</div>
                </div>
                <button
                  onClick={() => markActionComplete(action.id)}
                  className={`px-3 py-2 rounded-lg font-semibold ${
                    complete ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-200'
                  }`}
                >
                  {complete ? 'Done' : 'Mark done'}
                </button>
              </div>
              <ol className="list-decimal list-inside text-slate-300 mt-3 space-y-1">
                {action.steps.map(step => <li key={step}>{step}</li>)}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
}
