import { useDemo } from '../store/DemoContext';

export default function ActionItems({ actions }) {
  const { completedActions, markActionComplete } = useDemo();

  const sorted = [...actions].sort((a, b) => {
    const p = { high: 0, medium: 1, low: 2 };
    return p[a.priority] - p[b.priority];
  });

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-3">Things to Do</h3>
      <div className="space-y-3">
        {sorted.map(action => {
          const done = completedActions.has(action.id);
          return (
            <div
              key={action.id}
              className={`p-4 rounded-xl border ${
                done
                  ? 'bg-emerald-900/30 border-emerald-500/50'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex justify-between items-start gap-3">
                <div>
                  <div className="font-bold text-white">{action.description}</div>
                  <div className="text-slate-400 text-sm">Deadline: {action.deadline || 'None'}</div>
                  {done && <div className="text-emerald-400 mt-1">Completed! Great job.</div>}
                </div>
                {!done && (
                  <button
                    onClick={() => markActionComplete(action.id)}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg"
                  >
                    Done
                  </button>
                )}
              </div>
              {!done && (
                <ol className="mt-3 pl-5 list-decimal text-slate-300 text-sm">
                  {action.steps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
