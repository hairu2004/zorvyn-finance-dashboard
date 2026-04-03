import { useMemo, useState } from 'react';
import { Role } from '../types/role';
import { Transaction } from '../types/transaction';

type TransactionsTableProps = {
  transactions: Transaction[];
  role: Role;
  onEdit: (id: string, updated: Omit<Transaction, 'id'>) => void;
  onAdd: (newTx: Omit<Transaction, 'id'>) => void;
  onDelete: (id: string) => void;
};

export function TransactionsTable({ transactions, role, onEdit, onAdd, onDelete }: TransactionsTableProps) {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'date' | 'amount' | 'category'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const pageSize = 10;

  const filtered = useMemo(() => {
    const lower = search.toLowerCase();
    return transactions
      .filter((tx) => {
        const matchesSearch = [tx.description, tx.category, tx.date, tx.type]
          .join(' ')
          .toLowerCase()
          .includes(lower);
        const matchesDate = (!dateFrom || tx.date >= dateFrom) && (!dateTo || tx.date <= dateTo);
        const matchesCategory = !categoryFilter || tx.category === categoryFilter;
        return matchesSearch && matchesDate && matchesCategory;
      })
      .sort((a, b) => {
        let result = 0;
        if (sortField === 'amount') {
          result = a.amount - b.amount;
        } else if (sortField === 'date') {
          result = new Date(a.date).getTime() - new Date(b.date).getTime();
        } else {
          result = a.category.localeCompare(b.category);
        }

        return sortDir === 'asc' ? result : -result;
      });
  }, [transactions, search, sortField, sortDir, dateFrom, dateTo, categoryFilter]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  const [editId, setEditId] = useState<string>('');
  const [form, setForm] = useState<Omit<Transaction, 'id'>>({
    date: '',
    description: '',
    category: '',
    type: 'expense',
    amount: 0,
  });

  const startEdit = (tx: Transaction) => {
    setEditId(tx.id);
    setForm({ date: tx.date, description: tx.description, category: tx.category, type: tx.type, amount: tx.amount });
  };

  const resetForm = () => {
    setEditId('');
    setForm({ date: '', description: '', category: '', type: 'expense', amount: 0 });
  };

  return (
    <section className="bg-white dark:bg-black border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 mb-5">
      <div className="flex justify-between items-center gap-4 mb-6 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Transactions</h3>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              className="pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions..."
            />
          </div>
          <input
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <input
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {Array.from(new Set(transactions.map((tx) => tx.category))).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            value={sortField}
            onChange={(e) => setSortField(e.target.value as 'date' | 'amount' | 'category')}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="category">Sort by Category</option>
          </select>
          <button
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            onClick={() => setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
          >
            {sortDir === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {paginated.length === 0 ? (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">No Transactions Found</h3>
          <p className="text-slate-500 dark:text-slate-500">Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider py-4 px-4">Date</th>
                <th className="text-left text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider py-4 px-4">Description</th>
                <th className="text-left text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider py-4 px-4">Category</th>
                <th className="text-left text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider py-4 px-4">Type</th>
                <th className="text-left text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider py-4 px-4">Amount</th>
                {role === 'admin' && <th className="text-left text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider py-4 px-4">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {paginated.map((tx) => (
                <tr key={tx.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-4 text-slate-900 dark:text-slate-100 font-medium">{tx.date}</td>
                  <td className="py-4 px-4 text-slate-900 dark:text-slate-100">{tx.description}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      tx.type === 'income'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`py-4 px-4 font-semibold ${
                    tx.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {tx.type === 'expense' ? '-' : '+'}${tx.amount.toFixed(2)}
                  </td>
                  {role === 'admin' && (
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(tx)}
                          className="inline-flex items-center px-3 py-1.5 border border-indigo-300 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(tx.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/30 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <div className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400">Page</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">{currentPage}</span>
            <span className="text-slate-600 dark:text-slate-400">of</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">{totalPages}</span>
          </div>
          <button
            className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {role === 'admin' && (
        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-slate-200">{editId ? 'Edit Transaction' : 'Add New Transaction'}</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Date
              </label>
              <input
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                type="date"
                value={form.date}
                onChange={(e) => setForm((v) => ({ ...v, date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Description
              </label>
              <input
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                value={form.description}
                onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))}
                placeholder="Enter description"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Category
              </label>
              <input
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                value={form.category}
                onChange={(e) => setForm((v) => ({ ...v, category: e.target.value }))}
                placeholder="Enter category"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Type
              </label>
              <select
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                value={form.type}
                onChange={(e) => setForm((v) => ({ ...v, type: e.target.value as 'income' | 'expense' }))}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Amount
              </label>
              <input
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                type="number"
                value={form.amount}
                onChange={(e) => setForm((v) => ({ ...v, amount: Number(e.target.value) }))}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button
              className="inline-flex items-center px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              onClick={() => {
                if (!form.date || !form.description || !form.category || form.amount === 0) {
                  alert('Please fill in all fields with valid values');
                  return;
                }
                if (editId) {
                  onEdit(editId, form);
                } else {
                  onAdd(form);
                }
                resetForm();
              }}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {editId ? 'Save Changes' : 'Add Transaction'}
            </button>
            {editId && (
              <button
                className="inline-flex items-center px-6 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium rounded-lg transition-colors"
                onClick={resetForm}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
