import { type Transaction, type Budget } from '../context/ExpenseContext';

export function calculateTotals(transactions: Transaction[]) {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    return {
        income,
        expenses,
        balance: income - expenses,
    };
}

export function getMonthlyData(transactions: Transaction[], year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    return transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= startDate && transactionDate <= endDate;
    });
}

export function getCategoryTotals(transactions: Transaction[], type: 'income' | 'expense') {
    const filtered = transactions.filter(t => t.type === type);
    const totals: { [key: string]: number } = {};

    filtered.forEach(transaction => {
        const category = transaction.category;
        totals[category] = (totals[category] || 0) + transaction.amount;
    });

    return Object.entries(totals).map(([category, amount]) => ({
        category,
        amount,
    }));
}

export function getMonthlyTrends(transactions: Transaction[], months: number = 6) {
    const now = new Date();
    const trends = [];

    for (let i = months - 1; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthlyData = getMonthlyData(transactions, date.getFullYear(), date.getMonth() + 1);
        const totals = calculateTotals(monthlyData);

        trends.push({
            month: date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }),
            income: totals.income,
            expenses: totals.expenses,
            balance: totals.balance,
        });
    }

    return trends;
}

export function calculateBudgetUsage(transactions: Transaction[], budgets: Budget[], year: number, month: number) {
    const monthlyTransactions = getMonthlyData(transactions, year, month);
    const usage: { [key: string]: { used: number; budget: number; percentage: number } } = {};

    budgets.forEach(budget => {
        const categoryTransactions = monthlyTransactions.filter(
            t => t.category === budget.category && t.type === 'expense'
        );
        const used = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
        const percentage = budget.amount > 0 ? (used / budget.amount) * 100 : 0;

        usage[budget.category] = {
            used,
            budget: budget.amount,
            percentage: Math.min(percentage, 100),
        };
    });

    return usage;
}

export function getMonthComparison(transactions: Transaction[]) {
    const now = new Date();
    const currentMonth = getMonthlyData(transactions, now.getFullYear(), now.getMonth() + 1);
    const lastMonth = getMonthlyData(transactions, now.getFullYear(), now.getMonth());

    const currentTotals = calculateTotals(currentMonth);
    const lastTotals = calculateTotals(lastMonth);

    const expenseChange = lastTotals.expenses > 0
        ? ((currentTotals.expenses - lastTotals.expenses) / lastTotals.expenses) * 100
        : 0;

    return {
        current: currentTotals,
        last: lastTotals,
        expenseChange,
    };
}

export function filterTransactions(
    transactions: Transaction[],
    filters: {
        search?: string;
        category?: string;
        type?: 'income' | 'expense';
        dateFrom?: string;
        dateTo?: string;
    }
) {
    return transactions.filter(transaction => {
        if (filters.search && !transaction.description.toLowerCase().includes(filters.search.toLowerCase())) {
            return false;
        }
        if (filters.category && transaction.category !== filters.category) {
            return false;
        }
        if (filters.type && transaction.type !== filters.type) {
            return false;
        }
        if (filters.dateFrom && transaction.date < filters.dateFrom) {
            return false;
        }
        if (filters.dateTo && transaction.date > filters.dateTo) {
            return false;
        }
        return true;
    });
}
