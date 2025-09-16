import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { type Transaction } from '../context/ExpenseContext';

interface ExpenseFormProps {
    transaction?: Transaction;
    onClose: () => void;
}

export default function ExpenseForm({ transaction, onClose }: ExpenseFormProps) {
    const { state, dispatch } = useExpense();

    const formatNumberInput = (value: string) => {
        // If empty, return empty
        if (!value) return '';

        // Remove all non-digit characters
        let cleanValue = value.replace(/[^\d]/g, '');

        // If empty after cleaning, return empty
        if (!cleanValue) return '';

        // Format with automatic decimal points after every 3 digits from the right
        let formattedValue = '';
        for (let i = cleanValue.length - 1; i >= 0; i--) {
            formattedValue = cleanValue[i] + formattedValue;
            // Add dot every 3 digits from the right
            if ((cleanValue.length - i) % 3 === 0 && i > 0) {
                formattedValue = '.' + formattedValue;
            }
        }

        return formattedValue;
    };

    const parseNumberInput = (formattedValue: string) => {
        // Remove dots (thousand separators) and convert to number
        const cleanValue = formattedValue.replace(/\./g, '');
        return cleanValue ? parseFloat(cleanValue) : 0;
    };

    const [formData, setFormData] = useState({
        type: transaction?.type || 'expense',
        amount: transaction?.amount ? formatNumberInput(transaction.amount.toString()) : '',
        category: transaction?.category || '',
        description: transaction?.description || '',
        date: transaction?.date || new Date().toISOString().split('T')[0],
        recurring: transaction?.recurring || false,
        recurringType: transaction?.recurringType || 'monthly',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.amount || !formData.category) {
            alert('Please fill in all required fields');
            return;
        }

        const transactionData: Transaction = {
            id: transaction?.id || Date.now().toString(),
            type: formData.type as 'income' | 'expense',
            amount: parseNumberInput(formData.amount.toString()),
            category: formData.category,
            description: formData.description,
            date: formData.date,
            recurring: formData.recurring,
            recurringType: formData.recurring ? formData.recurringType as 'monthly' | 'weekly' | 'yearly' : undefined,
        };

        if (transaction) {
            dispatch({ type: 'UPDATE_TRANSACTION', payload: transactionData });
        } else {
            dispatch({ type: 'ADD_TRANSACTION', payload: transactionData });
        }

        onClose();
    };

    const filteredCategories = state.categories.filter(cat => cat.type === formData.type);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    {transaction ? 'Edit Transaction' : 'Add Transaction'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Type
                        </label>
                        <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Amount (GS) *
                        </label>
                        <input
                            type="text"
                            value={formData.amount}
                            onChange={(e) => {
                                const formatted = formatNumberInput(e.target.value);
                                setFormData({ ...formData, amount: formatted });
                            }}
                            placeholder="100.000"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Category *
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            required
                        >
                            <option value="">Select a category</option>
                            {filteredCategories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Description
                        </label>
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Optional description"
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Date *
                        </label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="recurring"
                            checked={formData.recurring}
                            onChange={(e) => setFormData({ ...formData, recurring: e.target.checked })}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="recurring" className="text-sm text-gray-700 dark:text-gray-300">
                            Recurring transaction
                        </label>
                    </div>

                    {formData.recurring && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Recurring Type
                            </label>
                            <select
                                value={formData.recurringType}
                                onChange={(e) => setFormData({ ...formData, recurringType: e.target.value as 'monthly' | 'weekly' | 'yearly' })}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="monthly">Monthly</option>
                                <option value="weekly">Weekly</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>
                    )}

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {transaction ? 'Update' : 'Add'} Transaction
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
