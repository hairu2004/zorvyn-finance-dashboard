type DashboardSummaryProps = {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
};

export function DashboardSummary({ totalBalance, totalIncome, totalExpenses }: DashboardSummaryProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-blue-400/20">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <span className="text-blue-100 text-sm font-medium">Balance</span>
        </div>
        <h3 className="text-white text-lg font-semibold mb-2">Total Balance</h3>
        <p className="text-white text-3xl font-bold">$ {totalBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-green-400/20">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <span className="text-green-100 text-sm font-medium">Income</span>
        </div>
        <h3 className="text-white text-lg font-semibold mb-2">Total Income</h3>
        <p className="text-white text-3xl font-bold">$ {totalIncome.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
      </div>

      <div className="bg-gradient-to-br from-red-500 to-rose-600 dark:from-red-600 dark:to-rose-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-red-400/20">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span className="text-red-100 text-sm font-medium">Expenses</span>
        </div>
        <h3 className="text-white text-lg font-semibold mb-2">Total Expenses</h3>
        <p className="text-white text-3xl font-bold">$ {totalExpenses.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
      </div>
    </section>
  );
}
