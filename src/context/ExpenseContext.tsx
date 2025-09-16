import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { saveUserData, loadUserData } from '../services/firestoreService';
import type { Transaction, Category, Budget, Asset, AssetCategory, ExpenseState } from '../types';

// Re-export types for backward compatibility
export type { Transaction, Category, Budget, Asset, AssetCategory, ExpenseState };

type ExpenseAction =
    | { type: 'ADD_TRANSACTION'; payload: Transaction }
    | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
    | { type: 'DELETE_TRANSACTION'; payload: string }
    | { type: 'DELETE_ALL_TRANSACTIONS' }
    | { type: 'ADD_CATEGORY'; payload: Category }
    | { type: 'UPDATE_CATEGORY'; payload: Category }
    | { type: 'DELETE_CATEGORY'; payload: string }
    | { type: 'ADD_ASSET'; payload: Asset }
    | { type: 'UPDATE_ASSET'; payload: Asset }
    | { type: 'DELETE_ASSET'; payload: string }
    | { type: 'ADD_ASSET_CATEGORY'; payload: AssetCategory }
    | { type: 'UPDATE_ASSET_CATEGORY'; payload: AssetCategory }
    | { type: 'DELETE_ASSET_CATEGORY'; payload: string }
    | { type: 'TOGGLE_DARK_MODE' }
    | { type: 'LOAD_DATA'; payload: ExpenseState }
    | { type: 'LOAD_USER_DATA'; payload: ExpenseState }
    | { type: 'RESET_STATE' };

const defaultCategories: Category[] = [
    { id: '1', name: 'Food', type: 'expense', color: '#ef4444' },
    { id: '2', name: 'Transport', type: 'expense', color: '#3b82f6' },
    { id: '3', name: 'Rent', type: 'expense', color: '#8b5cf6' },
    { id: '4', name: 'Entertainment', type: 'expense', color: '#f59e0b' },
    { id: '5', name: 'Healthcare', type: 'expense', color: '#10b981' },
    { id: '6', name: 'Shopping', type: 'expense', color: '#ec4899' },
    { id: '7', name: 'Salary', type: 'income', color: '#22c55e' },
    { id: '8', name: 'Freelance', type: 'income', color: '#06b6d4' },
    { id: '9', name: 'Investment', type: 'income', color: '#84cc16' },
    { id: '10', name: 'Cashback', type: 'income', color: '#f97316' },
];

const defaultAssetCategories: AssetCategory[] = [];

const initialState: ExpenseState = {
    transactions: [],
    categories: defaultCategories,
    budgets: [],
    assets: [],
    assetCategories: defaultAssetCategories,
    darkMode: false,
};

function expenseReducer(state: ExpenseState, action: ExpenseAction): ExpenseState {
    switch (action.type) {
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [...state.transactions, action.payload],
            };
        case 'UPDATE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.map(t =>
                    t.id === action.payload.id ? action.payload : t
                ),
            };
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(t => t.id !== action.payload),
            };
        case 'DELETE_ALL_TRANSACTIONS':
            return {
                ...state,
                transactions: [],
            };
        case 'ADD_CATEGORY':
            return {
                ...state,
                categories: [...state.categories, action.payload],
            };
        case 'UPDATE_CATEGORY':
            return {
                ...state,
                categories: state.categories.map(c =>
                    c.id === action.payload.id ? action.payload : c
                ),
            };
        case 'DELETE_CATEGORY':
            return {
                ...state,
                categories: state.categories.filter(c => c.id !== action.payload),
            };
        case 'ADD_ASSET':
            return {
                ...state,
                assets: [...state.assets, action.payload],
            };
        case 'UPDATE_ASSET':
            return {
                ...state,
                assets: state.assets.map(a =>
                    a.id === action.payload.id ? action.payload : a
                ),
            };
        case 'DELETE_ASSET':
            return {
                ...state,
                assets: state.assets.filter(a => a.id !== action.payload),
            };
        case 'ADD_ASSET_CATEGORY':
            return {
                ...state,
                assetCategories: [...state.assetCategories, action.payload],
            };
        case 'UPDATE_ASSET_CATEGORY':
            return {
                ...state,
                assetCategories: state.assetCategories.map(ac =>
                    ac.id === action.payload.id ? action.payload : ac
                ),
            };
        case 'DELETE_ASSET_CATEGORY':
            return {
                ...state,
                assetCategories: state.assetCategories.filter(ac => ac.id !== action.payload),
            };
        case 'TOGGLE_DARK_MODE':
            return {
                ...state,
                darkMode: !state.darkMode,
            };
        case 'LOAD_DATA':
            return action.payload;
        case 'LOAD_USER_DATA':
            return action.payload;
        case 'RESET_STATE':
            return initialState;
        default:
            return state;
    }
}

interface ExpenseContextType {
    state: ExpenseState;
    dispatch: React.Dispatch<ExpenseAction>;
    syncToFirestore: () => Promise<void>;
    isLoading: boolean;
    syncError: string | null;
}

const ExpenseContext = createContext<ExpenseContextType | null>(null);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [state, dispatch] = useReducer(expenseReducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [syncError, setSyncError] = useState<string | null>(null);

    // Load data from Firestore when user logs in
    useEffect(() => {
        if (user) {
            setIsLoading(true);
            loadUserData(user.uid)
                .then((data) => {
                    if (data) {
                        // Transform UserData to ExpenseState format
                        const expenseData: ExpenseState = {
                            transactions: data.transactions || [],
                            categories: data.categories || [],
                            budgets: data.budgets || [],
                            assets: data.assets || [],
                            assetCategories: data.assetCategories || [],
                            darkMode: data.preferences?.darkMode || false,
                        };
                        dispatch({ type: 'LOAD_USER_DATA', payload: expenseData });
                    } else {
                        // If no Firestore data, try localStorage as fallback
                        const savedData = localStorage.getItem('expenseTracker');
                        if (savedData) {
                            try {
                                const parsedData = JSON.parse(savedData);
                                dispatch({ type: 'LOAD_DATA', payload: parsedData });
                            } catch (error) {
                                console.error('Error loading data from localStorage:', error);
                            }
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error loading user data:', error);
                    setSyncError('Failed to load data from cloud');
                    // Fallback to localStorage
                    const savedData = localStorage.getItem('expenseTracker');
                    if (savedData) {
                        try {
                            const parsedData = JSON.parse(savedData);
                            dispatch({ type: 'LOAD_DATA', payload: parsedData });
                        } catch (error) {
                            console.error('Error loading data from localStorage:', error);
                        }
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            // Reset state when user logs out
            dispatch({ type: 'RESET_STATE' });
        }
    }, [user]);

    // Sync to Firestore whenever state changes
    const syncToFirestore = async () => {
        if (!user) return;

        try {
            setSyncError(null);
            const dataToSave = {
                transactions: state.transactions,
                categories: state.categories,
                budgets: state.budgets || [],
                assets: state.assets,
                assetCategories: state.assetCategories,
                preferences: {
                    darkMode: state.darkMode
                }
            };

            // Debug: Log the data being saved

            await saveUserData(user.uid, dataToSave);
        } catch (error) {
            console.error('Error syncing to Firestore:', error);
            setSyncError('Failed to sync data to cloud');
        }
    };

    // Auto-sync to Firestore after state changes
    useEffect(() => {
        if (user && !isLoading) {
            const timeoutId = setTimeout(() => {
                syncToFirestore();
            }, 1000); // Debounce sync by 1 second

            return () => clearTimeout(timeoutId);
        }
    }, [state, user, isLoading]);

    // Save to localStorage as backup
    useEffect(() => {
        localStorage.setItem('expenseTracker', JSON.stringify(state));
    }, [state]);

    // Apply dark mode class to document
    useEffect(() => {
        if (state.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [state.darkMode]);

    const value = {
        state,
        dispatch,
        syncToFirestore,
        isLoading,
        syncError
    };

    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    );
}

export function useExpense() {
    const context = useContext(ExpenseContext);
    if (!context) {
        throw new Error('useExpense must be used within an ExpenseProvider');
    }
    return context;
}
