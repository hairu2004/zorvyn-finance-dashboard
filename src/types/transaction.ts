export type Transaction = {
  id: string;
  date: string; // YYYY-MM-DD
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
};