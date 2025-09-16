import React, { useRef, useState } from 'react';
import { useExpense } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/formatting';
import CSVImport from './CSVImport';

export default function ExportImport() {
    const { state, dispatch } = useExpense();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showCSVImport, setShowCSVImport] = useState(false);

    const exportToCSV = () => {
        const headers = ['Date', 'Type', 'Category', 'Description', 'Amount', 'Recurring', 'Recurring Type'];
        const csvContent = [
            headers.join(','),
            ...state.transactions.map(transaction => {
                const category = state.categories.find(c => c.id === transaction.category);
                return [
                    transaction.date,
                    transaction.type,
                    category?.name || 'Unknown',
                    `"${(transaction.description || 'No description').replace(/"/g, '""')}"`,
                    formatCurrency(transaction.amount),
                    transaction.recurring ? 'Yes' : 'No',
                    transaction.recurringType || ''
                ].join(',');
            })
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToJSON = () => {
        const dataStr = JSON.stringify(state, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `expense_tracker_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const importFromJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target?.result as string);

                // Validate the data structure
                if (data.transactions && data.categories && data.budgets !== undefined) {
                    dispatch({ type: 'LOAD_DATA', payload: data });
                    alert('Data imported successfully!');
                } else {
                    alert('Invalid file format. Please select a valid backup file.');
                }
            } catch (error) {
                alert('Error reading file. Please make sure it\'s a valid JSON file.');
            }
        };
        reader.readAsText(file);

        // Reset the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const clearAllData = () => {
        if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
            dispatch({
                type: 'LOAD_DATA', payload: {
                    transactions: [],
                    categories: state.categories,
                    assets: [],
                    assetCategories: state.assetCategories,
                    darkMode: state.darkMode
                }
            });
            alert('All data has been cleared.');
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Export & Import</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Export Section */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Data</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                Export your transactions to CSV format for use in spreadsheet applications.
                            </p>
                            <button
                                onClick={exportToCSV}
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                            >
                                Export to CSV
                            </button>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                Export all your data (transactions, categories, budgets) as a JSON backup file.
                            </p>
                            <button
                                onClick={exportToJSON}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Export to JSON
                            </button>
                        </div>
                    </div>
                </div>

                {/* Import Section */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Import Data</h3>
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                Import transactions from a CSV file (bank statements, etc.).
                            </p>
                            <button
                                onClick={() => setShowCSVImport(true)}
                                className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
                            >
                                Import from CSV
                            </button>
                        </div>

                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                Import data from a previously exported JSON backup file.
                            </p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".json"
                                onChange={importFromJSON}
                                className="hidden"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
                            >
                                Import from JSON
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Management */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Data Management</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Clear All Data</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Remove all transactions and assets. Categories will be reset to defaults.
                            </p>
                        </div>
                        <button
                            onClick={clearAllData}
                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                        >
                            Clear All Data
                        </button>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p><strong>Total Transactions:</strong> {state.transactions.length}</p>
                        <p><strong>Total Categories:</strong> {state.categories.length}</p>
                        <p><strong>Total Assets:</strong> {state.assets.length}</p>
                        <p><strong>Asset Categories:</strong> {state.assetCategories.length}</p>
                    </div>
                </div>
            </div>

            {/* CSV Import Modal */}
            {showCSVImport && (
                <CSVImport onClose={() => setShowCSVImport(false)} />
            )}
        </div>
    );
}
