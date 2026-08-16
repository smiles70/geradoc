export default function KeyInfoCards({ keyInfo }) {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      {keyInfo.map(item => (
        <div key={`${item.label}-${item.value}`} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="text-sm uppercase tracking-wide text-slate-400">{item.label}</div>
          <div className="text-xl font-bold text-white mt-1">{item.value}</div>
          <div className="text-sm text-cyan-400 mt-2">Page {item.page}</div>
        </div>
      ))}
    </div>
  );
}
