import { Transaction } from '../types/transaction';

type InsightsPanelProps = {
  transactions: Transaction[];
};

export function InsightsPanel({ transactions }: InsightsPanelProps) {
  const totalExpenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const categoryExpense = new Map<string, number>();
  transactions
    .filter((tx) => tx.type === 'expense')
    .forEach((tx) => {
      categoryExpense.set(tx.category, (categoryExpense.get(tx.category) || 0) + tx.amount);
    });

  const highestCategory = Array.from(categoryExpense.entries()).sort((a, b) => b[1] - a[1])[0];

  const byMonth = transactions.reduce<Map<string, number>>((map, tx) => {
    const d = new Date(tx.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    map.set(key, (map.get(key) || 0) + (tx.type === 'income' ? tx.amount : -tx.amount));
    return map;
  }, new Map());

  const sortedMonths = Array.from(byMonth.keys()).sort();
  const monthComparison = sortedMonths.length >= 2 ? {
    previous: byMonth.get(sortedMonths[sortedMonths.length - 2]) || 0,
    current: byMonth.get(sortedMonths[sortedMonths.length - 1]) || 0,
  } : null;

  return (
    <section className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Financial Insights</h3>
      </div>
      <div className="space-y-4">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="font-medium text-slate-700 dark:text-slate-300">Average Expense per Category</span>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 ml-5">
            $ {totalExpenses > 0 ? (totalExpenses / (categoryExpense.size || 1)).toFixed(2) : '0.00'}
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="font-medium text-slate-700 dark:text-slate-300">Highest Spending Category</span>
          </div>
          <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 ml-5">
            {highestCategory ? `${highestCategory[0]} ($${highestCategory[1].toFixed(2)})` : 'No data'}
          </p>
        </div>

        {monthComparison ? (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="font-medium text-slate-700 dark:text-slate-300">Monthly Comparison</span>
            </div>
            <div className="ml-5 space-y-1">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {sortedMonths[sortedMonths.length - 2]}: <span className="font-semibold">${monthComparison.previous.toFixed(2)}</span>
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {sortedMonths[sortedMonths.length - 1]}: <span className="font-semibold">${monthComparison.current.toFixed(2)}</span>
              </p>
              <p className={`text-sm font-medium ${monthComparison.current >= monthComparison.previous ? 'text-green-600' : 'text-red-600'}`}>
                {monthComparison.current >= monthComparison.previous ? '↑' : '↓'} {Math.abs(monthComparison.current - monthComparison.previous).toFixed(2)} change
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="font-medium text-slate-700 dark:text-slate-300">Monthly Comparison</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 ml-5">Need at least two months of data</p>
          </div>
        )}

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            <span className="font-medium text-slate-700 dark:text-slate-300">Tracking Period</span>
          </div>
          <p className="text-lg font-semibold text-slate-800 dark:text-slate-200 ml-5">
            {sortedMonths.length} month{sortedMonths.length !== 1 ? 's' : ''} tracked
          </p>
        </div>
      </div>
    </section>
  );
}
