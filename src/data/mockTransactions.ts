import { Transaction } from '../types/transaction';

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2026-03-01', description: 'Salary', category: 'Salary', type: 'income', amount: 5200 },
  { id: '2', date: '2026-03-05', description: 'Rent', category: 'Housing', type: 'expense', amount: 1500 },
  { id: '3', date: '2026-03-07', description: 'Groceries', category: 'Food', type: 'expense', amount: 320 },
  { id: '4', date: '2026-03-12', description: 'Electricity Bill', category: 'Utilities', type: 'expense', amount: 90 },
  { id: '5', date: '2026-03-15', description: 'Freelance Project', category: 'Freelance', type: 'income', amount: 1100 },
  { id: '6', date: '2026-03-20', description: 'Gym Membership', category: 'Health', type: 'expense', amount: 60 },
  { id: '7', date: '2026-02-18', description: 'Food delivery', category: 'Food', type: 'expense', amount: 55 },
  { id: '8', date: '2026-02-25', description: 'Wind Farm Dividend', category: 'Investments', type: 'income', amount: 220 },
  { id: '9', date: '2026-02-27', description: 'Taxi commute', category: 'Transport', type: 'expense', amount: 45 },
  { id: '10', date: '2026-04-02', description: 'Salary', category: 'Salary', type: 'income', amount: 5200 },
  { id: '11', date: '2026-04-03', description: 'Coffee', category: 'Food', type: 'expense', amount: 14 },
  { id: '12', date: '2026-04-05', description: 'Internet', category: 'Utilities', type: 'expense', amount: 55 },
  { id: '13', date: '2026-04-06', description: 'Stock Sale', category: 'Investments', type: 'income', amount: 420 },
  { id: '14', date: '2026-04-08', description: 'Movie Night', category: 'Entertainment', type: 'expense', amount: 38 },
  { id: '15', date: '2026-04-10', description: 'Book Deal', category: 'Education', type: 'expense', amount: 80 },
  { id: '16', date: '2026-04-12', description: 'Bonus', category: 'Salary', type: 'income', amount: 650 },
];
