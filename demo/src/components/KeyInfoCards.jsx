export default function KeyInfoCards({ keyInfo }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-white mb-3">Important Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {keyInfo.map((info, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="text-slate-400 text-sm">{info.label}</div>
            <div className="text-2xl font-bold text-cyan-400">{info.value}</div>
            <div className="text-slate-500 text-xs">From page {info.page}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
