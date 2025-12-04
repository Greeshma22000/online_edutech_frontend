export default function ProgressBar({ value = 0 }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="w-full h-2.5 rounded-full bg-gray-100 overflow-hidden shadow-inner">
      <div className="h-full rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-accent-500 transition-all duration-500 ease-out shadow-sm" style={{ width: `${pct}%` }} />
    </div>
  );
}

