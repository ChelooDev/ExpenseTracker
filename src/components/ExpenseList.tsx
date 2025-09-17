import { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { type Transaction } from '../context/ExpenseContext';
import { filterTransactions } from '../utils/calculations';
import { formatAmount } from '../utils/formatting';

interface ExpenseListProps {
    onEdit: (transaction: Transaction) => void;
}

export default function ExpenseList({ onEdit }: ExpenseListProps) {
    const { state, dispatch } = useExpense();
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        type: '' as 'income' | 'expense' | '',
        dateFrom: '',
        dateTo: '',
    });

    const filteredTransactions = filterTransactions(state.transactions, {
        ...filters,
        type: filters.type === '' ? undefined : filters.type as 'income' | 'expense'
    });

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            dispatch({ type: 'DELETE_TRANSACTION', payload: id });
        }
    };

    const handleDeleteAll = () => {
        if (state.transactions.length === 0) {
            alert('No transactions to delete.');
            return;
        }

        const confirmMessage = `Are you sure you want to delete ALL ${state.transactions.length} transactions? This action cannot be undone.`;
        if (window.confirm(confirmMessage)) {
            dispatch({ type: 'DELETE_ALL_TRANSACTIONS' });
        }
    };

    const getCategoryName = (categoryId: string) => {
        const category = state.categories.find(c => c.id === categoryId);
        return category?.name || 'Unknown';
    };

    const getCategoryColor = (categoryId: string) => {
        const category = state.categories.find(c => c.id === categoryId);
        return category?.color || '#6b7280';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-GB'); // DD/MM/YYYY format
    };


    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Search
                        </label>
                        <input
                            type="text"
                            placeholder="Search descriptions..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Type
                        </label>
                        <select
                            value={filters.type}
                            onChange={(e) => setFilters({ ...filters, type: e.target.value as 'income' | 'expense' | '' })}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Category
                        </label>
                        <select
                            value={filters.category}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="">All Categories</option>
                            {state.categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            From Date
                        </label>
                        <input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            To Date
                        </label>
                        <input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Transactions ({filteredTransactions.length})
                    </h3>
                    {state.transactions.length > 0 && (
                        <button
                            onClick={handleDeleteAll}
                            className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Delete All Transactions
                        </button>
                    )}
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredTransactions.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            No transactions found. Add some transactions to get started!
                        </div>
                    ) : (
                        filteredTransactions
                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                            .map(transaction => (
                                <div key={transaction.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: getCategoryColor(transaction.category) }}
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {transaction.description || 'No description'}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {getCategoryName(transaction.category)} • {formatDate(transaction.date)}
                                                    {transaction.recurring && (
                                                        <span className="ml-2 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                                                            Recurring
                                                        </span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <span
                                                className={`font-semibold ${transaction.type === 'income'
                                                    ? 'text-green-600 dark:text-green-400'
                                                    : 'text-red-600 dark:text-red-400'
                                                    }`}
                                            >
                                                {formatAmount(transaction.amount, transaction.type)}
                                            </span>

                                            <div className="flex space-x-1">
                                                <button
                                                    onClick={() => onEdit(transaction)}
                                                    className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                                    title="Edit"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(transaction.id)}
                                                    className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                                                    title="Delete"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                    )}
                </div>
            </div>
        </div>
    );
}
