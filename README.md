# Zorvyn Finance Dashboard - Frontend Developer Assignment

## 📋 Assignment Overview

This project is a complete finance dashboard application built as part of the Zorvyn frontend developer interview process. The application demonstrates modern React development skills, TypeScript integration, responsive design, and comprehensive state management.

## 🎯 Core Requirements Implemented

### ✅ **Role-Based User Interface**
- **Viewer Mode**: Read-only access to all dashboard features
- **Admin Mode**: Full CRUD operations on transactions
- Persistent role selection with localStorage

### ✅ **Transaction Management System**
- **Complete CRUD Operations** (Create, Read, Update, Delete)
- **Advanced Filtering**: Search by description/category/date/type
- **Date Range Filtering**: From/To date selectors
- **Category Filtering**: Dropdown with all available categories
- **Sorting**: By date, amount, or category (ascending/descending)
- **Pagination**: 10 items per page with navigation controls

### ✅ **Financial Analytics & Insights**
- **Real-time Summary Cards**: Total Balance, Income, Expenses
- **Balance Trend Chart**: Cumulative balance over time with SVG visualization
- **Category Breakdown Chart**: Spending distribution by category
- **Insights Panel**: Average expense per category, highest spending category, month-over-month comparison

### ✅ **User Experience Features**
- **Dark/Light Theme Toggle**: Complete theme system with smooth transitions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Data Persistence**: All state saved to localStorage
- **CSV Export**: Download transaction data as CSV file
- **Modern UI**: Gradient backgrounds, hover effects, professional styling

## 🛠️ Technical Implementation

### **Architecture & Design Patterns**
- **Component-Based Architecture**: Modular, reusable React components
- **Custom Hooks**: State management with useState, useEffect, useMemo
- **Type Safety**: Full TypeScript implementation with custom types
- **Separation of Concerns**: Data, types, components, and logic properly separated

### **Technology Stack**
- **React 19.2.4**: Latest React with modern hooks and concurrent features
- **Vite 8.0.1**: Fast build tool and development server
- **TypeScript**: Type-safe development with interfaces and type checking
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **ESLint**: Code quality and consistency enforcement

### **Key Technical Decisions**
- **State Management**: Local component state with localStorage persistence
- **Data Flow**: Unidirectional data flow with prop drilling for simplicity
- **Styling**: Tailwind CSS for rapid development and consistent design system
- **Charts**: Custom SVG implementations for lightweight, performant visualizations
- **Forms**: Controlled components with validation and error handling

## 📁 Project Structure

```
src/
├── App.tsx                    # Main application component & state management
├── main.tsx                   # Application entry point
├── index.css                  # Global styles & Tailwind imports
├── vite-env.d.ts             # Vite type definitions
├── components/
│   ├── RoleToggle.tsx        # Role selection component
│   ├── DashboardSummary.tsx  # Financial summary cards
│   ├── TransactionsTable.tsx # Transaction table with CRUD & filters
│   ├── InsightsPanel.tsx     # Analytics insights display
│   └── Charts/
│       ├── BalanceTrendChart.tsx    # Balance over time chart
│       └── CategoryBreakdownChart.tsx # Spending by category chart
├── data/
│   └── mockTransactions.ts   # Sample transaction data
└── types/
    ├── transaction.ts        # Transaction type definitions
    └── role.ts              # Role type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/hairu2004/zorvyn-finance-dashboard.git
cd zorvyn-finance-dashboard

# Install dependencies
npm install
```

### Development
```bash
# Start development server
npm run dev
```
Open `http://localhost:5173` in your browser.

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Code Quality
```bash
# Run ESLint
npm run lint
```

## 📖 Usage Guide

### **Initial Setup**
1. The application loads with sample transaction data
2. Select your role using the "Role" dropdown (Viewer/Admin)
3. Toggle between light/dark themes using the theme button

### **Viewing Data (Viewer Mode)**
- Browse all transactions in the table
- View summary cards and charts
- Use filters and search to explore data
- Export data as CSV

### **Managing Data (Admin Mode)**
- **Add Transactions**: Use the form at the bottom of the table
- **Edit Transactions**: Click "Edit" on any row, modify, and save
- **Delete Transactions**: Click "Delete" on any row to remove
- All changes are automatically saved and reflected in charts/summaries

### **Advanced Features**
- **Search**: Type in the search box to filter by description, category, date, or type
- **Date Filtering**: Use "From" and "To" date pickers for date range filtering
- **Category Filtering**: Select specific categories from the dropdown
- **Sorting**: Click column headers or use the sort dropdown
- **Pagination**: Navigate through pages of transactions

## 🔧 Configuration

### **Theme Configuration**
- Dark mode is implemented using Tailwind's `dark:` prefix
- Theme preference is saved to localStorage
- Smooth transitions between themes

### **Data Persistence**
- All application state is persisted to localStorage
- Data survives page refreshes and browser restarts
- To reset data: Clear browser localStorage or change role to viewer

### **Responsive Breakpoints**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 📊 Sample Data

The application includes 16 sample transactions across multiple categories:
- **Income**: Salary, Freelance, Investments, Bonus
- **Expenses**: Housing, Food, Utilities, Health, Transport, Entertainment, Education
- **Date Range**: February - April 2026
- **Total Balance**: ~$10,500 (positive trend)

## 🎨 Design System

### **Color Palette**
- **Primary**: Blue gradients (#3b82f6 to #a855f7)
- **Success**: Green gradients (#10b981 to #059669)
- **Danger**: Red gradients (#ef4444 to #dc2626)
- **Neutral**: Slate grays with dark mode variants

### **Typography**
- **Headings**: Bold, gradient text for titles
- **Body**: Clean, readable text with proper contrast
- **Interactive**: Hover states and focus indicators

### **Components**
- **Cards**: Rounded corners, shadows, hover effects
- **Buttons**: Gradient backgrounds, hover animations
- **Forms**: Clean inputs with focus states
- **Tables**: Striped rows, hover highlighting

## 🧪 Testing Considerations

While not implemented in this assignment, the codebase is structured for easy testing:
- Pure functions for business logic
- Separated components for unit testing
- TypeScript interfaces for mock data
- Modular architecture for integration testing

## 📈 Performance Optimizations

- **Memoization**: useMemo for expensive calculations
- **Efficient Rendering**: Proper key props and conditional rendering
- **Bundle Optimization**: Vite's tree-shaking and code splitting
- **CSS Optimization**: Tailwind's purging of unused styles

## 🔒 Security Considerations

- **Client-side Only**: No server-side data storage
- **Input Validation**: Form validation for transaction data
- **Type Safety**: TypeScript prevents runtime errors
- **XSS Prevention**: React's automatic escaping

## 📝 Development Notes

### **Key Challenges Solved**
1. **Complex State Management**: Coordinating multiple filters, sorts, and CRUD operations
2. **Responsive Charts**: Custom SVG implementations that scale properly
3. **Theme System**: Complete dark/light mode with all components
4. **Data Persistence**: Robust localStorage handling with error recovery

### **Code Quality**
- ESLint configuration for consistent code style
- TypeScript for type safety and better IDE support
- Component composition for maintainable code
- Proper error handling and edge cases

## 🎯 Evaluation Checklist

- [x] Role-based UI (viewer/admin)
- [x] Transaction CRUD operations
- [x] Advanced filtering and search
- [x] Sorting and pagination
- [x] Real-time summary calculations
- [x] Interactive charts and visualizations
- [x] Dark/light theme toggle
- [x] Data persistence
- [x] CSV export functionality
- [x] Responsive design
- [x] TypeScript implementation
- [x] Modern React patterns
- [x] Clean, maintainable code
- [x] Professional UI/UX

## 👨‍💻 Submission

This project demonstrates proficiency in:
- Modern React development
- TypeScript integration
- Responsive web design
- State management
- UI/UX design principles
- Code organization and architecture

The application is production-ready and showcases the skills expected of a frontend developer role.

---


