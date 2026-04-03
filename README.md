# Zorvyn Finance Dashboard

This repository contains a complete React finance dashboard application built as a frontend assignment for the Zorvyn interview. The app is built with React + Vite + TypeScript + Tailwind CSS and includes a polished dark/light UI, data persistence, role-based controls, transaction management, analytics insights, charts, and export.

## 🚀 Features

- Role-based UI:
  - `viewer` (read-only)
  - `admin` (add/edit/delete transactions)
- Income/expense transaction table with:
  - Search
  - Date range filter
  - Category filter
  - Sort by date/amount/category
  - Pagination
- Editable transactions (admin)
- Real-time summary cards:
  - Total balance
  - Total income
  - Total expenses
- Insights panel (average expense, top category, month comparison)
- Charts:
  - Balance trend
  - Category spending breakdown
- Dark mode toggle with smooth transition
- Local storage persistence:
  - Role
  - Theme
  - Transactions
- CSV export for transactions
- Fully responsive design + modern gradient theme

## 🛠️ Tech Stack

- React 19
- Vite 8
- TypeScript
- Tailwind CSS
- ESLint

## 📦 Install and run

```bash
cd d:/Placement/Zorvyn/zorvyn-finance-dashboard
npm install
npm run dev
```

Open `http://localhost:5173` in browser (confirm port in console).

## ✅ Build

```bash
npm run build
```

## 🔍 Lint

```bash
npm run lint
```

## 📁 Structure

- `src/App.tsx` - main container and state management
- `src/components/RoleToggle.tsx` - role switcher
- `src/components/DashboardSummary.tsx` - summary cards
- `src/components/TransactionsTable.tsx` - table + filters + pagination + CRUD
- `src/components/InsightsPanel.tsx` - insights card set
- `src/components/Charts` - trend/breakdown charts
- `src/data/mockTransactions.ts` - seeded sample data
- `src/types` - TypeScript models

## 📝 How to use

1. Set role via Role dropdown and toggle theme.
2. As `admin`, add/edit/delete transactions in the table.
3. Filter and sort transaction rows.
4. Export data as CSV button (header in App).
5. Watch summary cards and charts update instantly.

## 📌 Notes

- The app is frontend-only; persistence is client-side only.
- To reset data, clear local storage or set role to viewer then reload.

## 👨‍💻 Submit

Ensure the latest changes are committed and pushed:

```bash
git add .
git commit -m "Complete Zorvyn finance dashboard assignment"
git push origin main
```

---

Enjoy! This is a complete production-style app for the assignment, ready for evaluation.
