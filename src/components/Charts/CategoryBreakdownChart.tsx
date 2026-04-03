import { Transaction } from '../../types/transaction';

type CategoryBreakdownChartProps = {
  transactions: Transaction[];
};

export function CategoryBreakdownChart({ transactions }: CategoryBreakdownChartProps) {
  const categoryTotals = new Map<string, number>();
  let total = 0;

  transactions
    .filter((tx) => tx.type === 'expense')
    .forEach((tx) => {
      const current = categoryTotals.get(tx.category) || 0;
      categoryTotals.set(tx.category, current + tx.amount);
      total += tx.amount;
    });

  if (total === 0) {
    return <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-2xl p-8 shadow-xl text-center">
      <svg className="w-16 h-16 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
      <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No Expense Data</h3>
      <p className="text-slate-500 dark:text-slate-500">Add some expenses to see your spending breakdown</p>
    </div>;
  }

  const sorted = Array.from(categoryTotals.entries()).sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
          <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Spending Breakdown</h3>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {sorted.map(([category, amount], index) => {
          const percent = (amount / total) * 100;
          const colors = [
            'from-red-500 to-red-600',
            'from-orange-500 to-orange-600',
            'from-yellow-500 to-yellow-600',
            'from-green-500 to-green-600',
            'from-blue-500 to-blue-600',
            'from-purple-500 to-purple-600',
          ];
          const colorClass = colors[index % colors.length];

          return (
            <div key={category} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-700 dark:text-slate-300">{category}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">${amount.toFixed(2)}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">{percent.toFixed(1)}%</span>
                </div>
              </div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full bg-gradient-to-r ${colorClass} rounded-full transition-all duration-500 ease-out shadow-sm`}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
