# 💰 Redneck Penny Pinch

A comprehensive personal expense tracking application built with React + Vite, featuring modern UI with dark mode support, data visualization, and full client-side data persistence.

## ✨ Features

### Core Features
- **Add/Edit Transactions**: Track both income and expenses with date, category, amount, and description
- **Category Management**: Pre-defined categories with ability to add custom ones
- **Dashboard**: Real-time totals for income, expenses, and current balance
- **Data Visualization**: 
  - Pie chart for expenses by category
  - Line chart for monthly trends
  - Bar chart for income vs expenses comparison
- **Search & Filter**: Filter transactions by keyword, category, type, and date range
- **Data Persistence**: All data saved in localStorage for persistence across page reloads

### Advanced Features
- **Recurring Transactions**: Mark transactions as recurring (monthly, weekly, yearly)
- **Budget Management**: Set budgets per category with visual progress indicators
- **Monthly Insights**: Compare current month spending with previous month
- **Export/Import**: 
  - Export transactions to CSV for spreadsheet use
  - Export/import complete data as JSON for backup and sharing
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Mobile-friendly interface that works on all devices

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ExpenseTracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Styling with dark mode support
- **Recharts** - Data visualization
- **Context API** - State management
- **localStorage** - Data persistence

## 📱 Usage

### Adding Transactions
1. Click the "Add Transaction" button in the header
2. Fill in the transaction details:
   - Type (Income/Expense)
   - Amount
   - Category
   - Description
   - Date
   - Recurring option (optional)

### Managing Categories
1. Navigate to the "Categories" tab
2. Add new categories with custom colors
3. Edit or delete existing categories

### Setting Budgets
1. Go to the "Budgets" tab
2. Set monthly, weekly, or yearly budgets for expense categories
3. Monitor budget usage with visual progress bars

### Exporting Data
1. Visit the "Export/Import" tab
2. Export to CSV for spreadsheet use
3. Export to JSON for complete backup
4. Import previously exported JSON files

## 🎨 UI Features

- **Clean, Modern Design**: Minimalist interface with intuitive navigation
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Interactive Charts**: Hover effects and tooltips for better data exploration
- **Color-coded Categories**: Visual distinction between different transaction types

## 📊 Data Visualization

- **Pie Chart**: Shows expense distribution by category
- **Line Chart**: Displays monthly income and expense trends
- **Bar Chart**: Compares income vs expenses over time
- **Progress Bars**: Visual budget usage indicators

## 🔒 Data Privacy

- All data is stored locally in your browser's localStorage
- No data is sent to external servers
- Complete control over your financial information
- Export/import functionality for data portability

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React and Vite
- Styled with TailwindCSS
- Charts powered by Recharts
- Icons from various sources

---

**Happy Expense Tracking! 💰**