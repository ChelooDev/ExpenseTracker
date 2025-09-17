// import React from 'react';
import { useExpense } from '../context/ExpenseContext';

export default function SyncStatus() {
    const { isLoading, syncError } = useExpense();

    if (isLoading) {
        return (
            <div className="fixed top-4 right-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">Syncing...</span>
            </div>
        );
    }

    if (syncError) {
        return (
            <div className="fixed top-4 right-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{syncError}</span>
            </div>
        );
    }

    return null;
}

