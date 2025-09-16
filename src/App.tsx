import React, { useState } from 'react';
import { ExpenseProvider, useExpense } from './context/ExpenseContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import CategoryManager from './components/CategoryManager';
import AssetsManager from './components/AssetsManager';
import ExportImport from './components/ExportImport';
import AuthScreen from './components/AuthScreen';
import SyncStatus from './components/SyncStatus';
import DailyQuote from './components/DailyQuote';
import { type Transaction } from './context/ExpenseContext';

function AppContent() {
  const { state, dispatch } = useExpense();
  const { user, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth screen if user is not logged in
  if (!user) {
    return <AuthScreen />;
  }

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setShowExpenseForm(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowExpenseForm(true);
  };

  const handleCloseExpenseForm = () => {
    setShowExpenseForm(false);
    setEditingTransaction(null);
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'transactions', label: 'Transactions', icon: '💰' },
    { id: 'categories', label: 'Categories', icon: '🏷️' },
    { id: 'assets', label: 'Assets', icon: '💎' },
    { id: 'export', label: 'Export/Import', icon: '💾' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br from-[#2A2A3A] via-[#1F0F4A] to-[#0F0F1A]">
      {/* Header */}
      <header className="bg-white dark:bg-[#1D1D2B] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                <span className="text-yellow-900 font-bold text-lg">¢</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Redneck Penny Pinch
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
                <span className="hidden sm:block">{user.displayName || user.email}</span>
              </div>

              <button
                onClick={handleAddTransaction}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                + Add Transaction
              </button>

              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                title="Toggle dark mode"
              >
                {state.darkMode ? '☀️' : '🌙'}
              </button>

              <button
                onClick={logout}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Sign out"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white dark:bg-[#1D1D2B] border-b border-gray-200 dark:border-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'transactions' && <ExpenseList onEdit={handleEditTransaction} />}
        {activeTab === 'categories' && <CategoryManager />}
        {activeTab === 'assets' && <AssetsManager />}
        {activeTab === 'export' && <ExportImport />}
      </main>

      {/* Daily Wisdom Footer - Only on Dashboard */}
      {activeTab === 'dashboard' && (
        <footer className="bg-gray-100 dark:bg-[#1D1D2B] border-t border-gray-200 dark:border-white w-full">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
            <DailyQuote className="bg-transparent shadow-none border-0" />
          </div>
        </footer>
      )}

      {/* Expense Form Modal */}
      {showExpenseForm && (
        <ExpenseForm
          transaction={editingTransaction}
          onClose={handleCloseExpenseForm}
        />
      )}

      {/* Sync Status */}
      <SyncStatus />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <AppContent />
      </ExpenseProvider>
    </AuthProvider>
  );
}

export default App;
