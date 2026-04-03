import { Transaction } from '../../types/transaction';

type BalanceTrendChartProps = {
  transactions: Transaction[];
};

function monthKey(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function BalanceTrendChart({ transactions }: BalanceTrendChartProps) {
  const monthlyNet = new Map<string, number>();

  transactions.forEach((tx) => {
    const key = monthKey(tx.date);
    monthlyNet.set(key, (monthlyNet.get(key) || 0) + (tx.type === 'income' ? tx.amount : -tx.amount));
  });

  const keys = Array.from(monthlyNet.keys()).sort();
  let cum = 0;

  const points = keys.map((k) => {
    cum += monthlyNet.get(k) || 0;
    return { month: k, value: cum };
  });

  if (points.length === 0) {
    return <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-xl text-center">
      <svg className="w-16 h-16 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No Trend Data</h3>
      <p className="text-slate-500 dark:text-slate-500">Add some transactions to see your balance trend</p>
    </div>;
  }

  const values = points.map((p) => p.value);
  const min = Math.min(...values, 0);
  const max = Math.max(...values, 100);
  const range = max - min || 1;

  const chartPoints = points.map((point, index) => {
    const x = (index / Math.max(points.length - 1, 1)) * 100;
    const y = 100 - ((point.value - min) / range) * 100;
    return { ...point, x, y };
  });

  const polylinePoints = chartPoints.map((point) => `${point.x},${point.y}`).join(' ');

  return (
    <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Balance Trend</h3>
      </div>

      <div className="relative">
        <svg viewBox="0 0 100 100" className="w-full h-48">
          <line x1="0" y1="100" x2="100" y2="100" stroke="#cbd5e1" strokeWidth="0.4" className="dark:stroke-slate-600" />
          {[0, 25, 50, 75, 100].map((value) => (
            <line key={value} x1="0" y1={value} x2="100" y2={value} stroke="#e2e8f0" strokeWidth="0.2" className="dark:stroke-slate-700" />
          ))}

          <polyline
            points={polylinePoints}
            fill="none"
            stroke="url(#trendGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <defs>
            <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {chartPoints.map((point) => (
            <circle
              key={point.month}
              cx={point.x}
              cy={point.y}
              r="2.5"
              fill="#a855f7"
              stroke="#ffffff"
              strokeWidth="0.5"
              className="cursor-pointer hover:transform hover:scale-110 transition-transform"
              data-tooltip={`${point.month}: $${point.value.toFixed(2)}`}
            />
          ))}
        </svg>
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
          {chartPoints.map((point) => (
            <span key={point.month} className="text-center" style={{ width: `${100 / chartPoints.length}%` }}>
              {point.month}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        Min: ${min.toFixed(2)} | Max: ${max.toFixed(2)}
      </div>
    </div>
  );
}
