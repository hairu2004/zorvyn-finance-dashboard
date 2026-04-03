import { useEffect, useMemo, useState } from 'react';
import { Role } from './types/role';
import { Transaction } from './types/transaction';
import { mockTransactions } from './data/mockTransactions';
import { RoleToggle } from './components/RoleToggle';

function ThemeToggle({ theme, onChange }: { theme: 'light' | 'dark'; onChange: (value: 'light' | 'dark') => void }) {
  return (
    <button
      className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
      onClick={() => onChange(theme === 'light' ? 'dark' : 'light')}
      aria-label="Switch theme"
    >
      {theme === 'light' ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          Dark
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Light
        </>
      )}
    </button>
  );
}

import { DashboardSummary } from './components/DashboardSummary';
import { TransactionsTable } from './components/TransactionsTable';
import { InsightsPanel } from './components/InsightsPanel';
import { BalanceTrendChart } from './components/Charts/BalanceTrendChart';
import { CategoryBreakdownChart } from './components/Charts/CategoryBreakdownChart';

function App() {
  const [role, setRole] = useState<Role>(() => {
    const saved = localStorage.getItem('zorvyn-dashboard-role');
    return (saved === 'admin' || saved === 'viewer' ? saved : 'viewer') as Role;
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('zorvyn-dashboard-theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('zorvyn-dashboard-transactions');
    if (!saved) return mockTransactions;
    try {
      const parsed = JSON.parse(saved) as Transaction[];
      if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].id) return parsed;
      return mockTransactions;
    } catch {
      return mockTransactions;
    }
  });

  const totalIncome = useMemo(
    () => transactions.filter((tx) => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0),
    [transactions]
  );
  const totalExpenses = useMemo(
    () => transactions.filter((tx) => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0),
    [transactions]
  );

  const totalBalance = totalIncome - totalExpenses;

  useEffect(() => {
    localStorage.setItem('zorvyn-dashboard-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('zorvyn-dashboard-role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('zorvyn-dashboard-transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = (newTransaction: Omit<Transaction, 'id'>) => {
    setTransactions((prev) => [...prev, { ...newTransaction, id: String(Date.now() + Math.random()) }]);
  };

  const handleEdit = (id: string, updated: Omit<Transaction, 'id'>) => {
    setTransactions((prev) => prev.map((tx) => (tx.id === id ? { ...tx, ...updated } : tx)));
  };

  const handleDelete = (id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  const exportCSV = () => {
    const csvRows = [
      ['Date', 'Description', 'Category', 'Type', 'Amount'],
      ...transactions.map((tx) => [tx.date, tx.description, tx.category, tx.type, tx.amount.toString()]),
    ];

    const csvContent = csvRows.map((row) => row.map((value) => `"${value}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto pt-8 px-4 pb-12">
        {/* Header with improved styling */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-slate-700/50">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
              Finance Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Track your income, expenses, and financial insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onChange={setTheme} />
            <RoleToggle role={role} onChange={setRole} />
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 dark:from-green-600 dark:to-emerald-700 dark:hover:from-green-700 dark:hover:to-emerald-800 text-white px-4 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
          </button>
        </div>
      </header>

      <DashboardSummary totalBalance={totalBalance} totalIncome={totalIncome} totalExpenses={totalExpenses} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <BalanceTrendChart transactions={transactions} />
        <CategoryBreakdownChart transactions={transactions} />
      </div>

      <TransactionsTable transactions={transactions} role={role} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />

      <InsightsPanel transactions={transactions} />
      </div>
    </div>
  );
}

export default App;
