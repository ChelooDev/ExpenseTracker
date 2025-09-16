import React, { useState } from 'react';
import { useExpense } from '../context/ExpenseContext';

interface CSVImportProps {
    onClose: () => void;
}

interface ParsedTransaction {
    type: 'income' | 'expense';
    amount: number;
    description: string;
    date: string;
    category?: string; // Optional category for manual assignment
}

export default function CSVImport({ onClose }: CSVImportProps) {
    const { state, dispatch } = useExpense();
    const [file, setFile] = useState<File | null>(null);
    const [parsedData, setParsedData] = useState<ParsedTransaction[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [previewMode, setPreviewMode] = useState(false);

    const parseCSV = (csvText: string): ParsedTransaction[] => {
        const lines = csvText.split('\n').filter(line => line.trim());
        const transactions: ParsedTransaction[] = [];

        // Skip header row
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // Parse CSV line (handle quoted fields)
            const fields = parseCSVLine(line);

            if (fields.length < 4) continue;

            try {
                // Expected format: Date, Type, Description, Amount
                const [dateStr, typeStr, description, amountStr] = fields;

                // Parse amount (remove currency symbols and commas)
                const amount = parseFloat(amountStr.replace(/[^\d.-]/g, ''));

                // Determine transaction type
                const typeStrLower = typeStr.toLowerCase();
                const isIncome = typeStrLower.includes('income') ||
                    typeStrLower.includes('credit') ||
                    typeStrLower.includes('deposit') ||
                    typeStrLower.includes('salary') ||
                    typeStrLower.includes('wage') ||
                    typeStrLower.includes('bonus') ||
                    typeStrLower.includes('refund') ||
                    typeStrLower.includes('cashback');

                const isExpense = typeStrLower.includes('expense') ||
                    typeStrLower.includes('debit') ||
                    typeStrLower.includes('payment') ||
                    typeStrLower.includes('purchase') ||
                    typeStrLower.includes('withdrawal');

                let type: 'income' | 'expense';
                if (isIncome) {
                    type = 'income';
                } else if (isExpense) {
                    type = 'expense';
                } else {
                    // If no clear type indicator, use amount to determine
                    type = amount > 0 ? 'income' : 'expense';
                }

                // Parse date (try multiple formats)
                const date = parseDate(dateStr);

                // Debug logging
                console.log('Parsed transaction:', {
                    original: line,
                    dateStr,
                    parsedDate: date,
                    typeStr,
                    description,
                    amountStr,
                    parsedAmount: amount,
                    type
                });

                transactions.push({
                    type,
                    amount: Math.abs(amount),
                    description: description || 'Imported transaction',
                    date,
                    category: undefined // Will be assigned manually
                });
            } catch (err) {
                console.warn('Error parsing line:', line, err);
            }
        }

        return transactions;
    };

    const parseCSVLine = (line: string): string[] => {
        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];

            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }

        result.push(current.trim());
        return result;
    };


    const parseDate = (dateStr: string): string => {
        // Clean the date string
        const cleanDateStr = dateStr.trim();

        // Try DD/MM/YYYY format first (Paraguay standard)
        const ddMmYyyyMatch = cleanDateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (ddMmYyyyMatch) {
            const [, day, month, year] = ddMmYyyyMatch;
            // Validate the date
            const dayNum = parseInt(day, 10);
            const monthNum = parseInt(month, 10);
            const yearNum = parseInt(year, 10);

            // Check if it's a valid date
            if (dayNum >= 1 && dayNum <= 31 && monthNum >= 1 && monthNum <= 12 && yearNum >= 1900) {
                const date = new Date(yearNum, monthNum - 1, dayNum);
                // Verify the date is valid (handles cases like 31/02/2025)
                if (date.getDate() === dayNum && date.getMonth() === monthNum - 1 && date.getFullYear() === yearNum) {
                    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                }
            }
        }

        // Try DD-MM-YYYY format
        const ddMmYyyyDashMatch = cleanDateStr.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
        if (ddMmYyyyDashMatch) {
            const [, day, month, year] = ddMmYyyyDashMatch;
            const dayNum = parseInt(day, 10);
            const monthNum = parseInt(month, 10);
            const yearNum = parseInt(year, 10);

            if (dayNum >= 1 && dayNum <= 31 && monthNum >= 1 && monthNum <= 12 && yearNum >= 1900) {
                const date = new Date(yearNum, monthNum - 1, dayNum);
                if (date.getDate() === dayNum && date.getMonth() === monthNum - 1 && date.getFullYear() === yearNum) {
                    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                }
            }
        }

        // Try YYYY-MM-DD format
        const yyyyMmDdMatch = cleanDateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
        if (yyyyMmDdMatch) {
            const [, year, month, day] = yyyyMmDdMatch;
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }

        // Try to parse as a Date object and format it
        try {
            const parsedDate = new Date(cleanDateStr);
            if (!isNaN(parsedDate.getTime())) {
                return parsedDate.toISOString().split('T')[0];
            }
        } catch (err) {
            console.warn('Could not parse date:', cleanDateStr);
        }

        // Fallback to current date
        console.warn('Using fallback date for:', cleanDateStr);
        return new Date().toISOString().split('T')[0];
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError(null);
            setParsedData([]);
        }
    };

    const handleProcessFile = async () => {
        if (!file) return;

        setIsProcessing(true);
        setError(null);

        try {
            const text = await file.text();
            const transactions = parseCSV(text);

            if (transactions.length === 0) {
                setError('No valid transactions found in the CSV file');
                return;
            }

            setParsedData(transactions);
            setPreviewMode(true);
        } catch (err) {
            setError('Error reading file: ' + (err as Error).message);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCategoryChange = (index: number, categoryId: string) => {
        const updatedData = [...parsedData];
        updatedData[index].category = categoryId;
        setParsedData(updatedData);
    };

    const handleImport = () => {
        // Check if all transactions have categories assigned
        const unassignedTransactions = parsedData.filter(t => !t.category);
        if (unassignedTransactions.length > 0) {
            setError(`Please assign categories to all transactions. ${unassignedTransactions.length} transactions still need categories.`);
            return;
        }

        parsedData.forEach(transaction => {
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: {
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                    ...transaction,
                    category: transaction.category!,
                    recurring: false
                }
            });
        });

        onClose();
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-PY', {
            style: 'currency',
            currency: 'PYG',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Import Transactions from CSV
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {!previewMode ? (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Select CSV File
                            </label>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                Expected CSV Format:
                            </h3>
                            <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                                Date, Type, Description, Amount
                            </p>
                            <p className="text-xs text-blue-700 dark:text-blue-300">
                                Example: 15/01/2024, Expense, Grocery Store, 50000
                            </p>
                            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                You will manually assign categories to each transaction after processing the file.
                            </p>
                            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                                A summary with totals will be shown to help verify against your bank statement.
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
                                <p className="text-red-800 dark:text-red-200">{error}</p>
                            </div>
                        )}

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleProcessFile}
                                disabled={!file || isProcessing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? 'Processing...' : 'Process File'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                            <p className="text-green-800 dark:text-green-200">
                                Found {parsedData.length} transactions to import
                            </p>
                            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                Categories assigned: {parsedData.filter(t => t.category).length} / {parsedData.length}
                            </p>
                        </div>

                        {/* Summary Totals */}
                        {(() => {
                            const totalIncome = parsedData.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
                            const totalExpenses = parsedData.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
                            const netBalance = totalIncome - totalExpenses;

                            return (
                                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                                        Import Summary
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <p className="text-sm text-blue-700 dark:text-blue-300">Total Income</p>
                                            <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                                {formatCurrency(totalIncome)}
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm text-blue-700 dark:text-blue-300">Total Expenses</p>
                                            <p className="text-lg font-bold text-red-600 dark:text-red-400">
                                                {formatCurrency(totalExpenses)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-center mt-2">
                                        <p className="text-sm text-blue-700 dark:text-blue-300">Net Balance</p>
                                        <p className={`text-lg font-bold ${netBalance >= 0
                                                ? 'text-green-600 dark:text-green-400'
                                                : 'text-red-600 dark:text-red-400'
                                            }`}>
                                            {formatCurrency(netBalance)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })()}

                        <div className="max-h-96 overflow-y-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <th className="text-left p-2">Date</th>
                                        <th className="text-left p-2">Type</th>
                                        <th className="text-left p-2">Description</th>
                                        <th className="text-left p-2">Amount</th>
                                        <th className="text-left p-2">Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parsedData.map((transaction, index) => {
                                        const availableCategories = state.categories.filter(c => c.type === transaction.type);
                                        return (
                                            <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                                                <td className="p-2">{transaction.date}</td>
                                                <td className="p-2">
                                                    <span className={`px-2 py-1 rounded text-xs ${transaction.type === 'income'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                        }`}>
                                                        {transaction.type}
                                                    </span>
                                                </td>
                                                <td className="p-2">{transaction.description}</td>
                                                <td className="p-2">{formatCurrency(transaction.amount)}</td>
                                                <td className="p-2">
                                                    <select
                                                        value={transaction.category || ''}
                                                        onChange={(e) => handleCategoryChange(index, e.target.value)}
                                                        className={`w-full p-1 text-xs border rounded ${transaction.category
                                                            ? 'border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900'
                                                            : 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900'
                                                            }`}
                                                    >
                                                        <option value="">Select category...</option>
                                                        {availableCategories.map(category => (
                                                            <option key={category.id} value={category.id}>
                                                                {category.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setPreviewMode(false)}
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleImport}
                                disabled={parsedData.filter(t => t.category).length !== parsedData.length}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Import {parsedData.length} Transactions
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
