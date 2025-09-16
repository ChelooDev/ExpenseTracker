export interface Transaction {
    id: string;
    type: 'income' | 'expense';
    amount: number;
    category: string;
    description: string;
    date: string;
    recurring: boolean;
    recurringType?: 'monthly' | 'weekly' | 'yearly';
}

export interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense';
    color: string;
}

export interface Asset {
    id: string;
    name: string;
    category: string;
    value: number;
    purchaseDate: string;
    description: string;
}

export interface AssetCategory {
    id: string;
    name: string;
    color: string;
}

export interface Budget {
    id: string;
    category: string;
    amount: number;
    period: 'monthly' | 'weekly' | 'yearly';
    spent: number;
}

export interface Quote {
    id: string;
    text: string;
    author: string;
}

export interface ExpenseState {
    transactions: Transaction[];
    categories: Category[];
    budgets: Budget[];
    assets: Asset[];
    assetCategories: AssetCategory[];
    darkMode: boolean;
}
