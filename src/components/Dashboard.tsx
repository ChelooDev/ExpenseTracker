import { useExpense } from '../context/ExpenseContext';
import { calculateTotals, getMonthComparison } from '../utils/calculations';
import { formatCurrency } from '../utils/formatting';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
// import DailyQuote from './DailyQuote';

export default function Dashboard() {
    const { state } = useExpense();
    const totals = calculateTotals(state.transactions);
    const comparison = getMonthComparison(state.transactions);

    // Calculate net worth
    const totalAssetsValue = state.assets.reduce((sum, asset) => sum + asset.value, 0);
    const netWorth = totalAssetsValue + totals.balance;

    // Get current month data for charts
    // const now = new Date();
    // const currentMonthTransactions = state.transactions.filter(transaction => {
    //     const transactionDate = new Date(transaction.date);
    //     return transactionDate.getMonth() === now.getMonth() &&
    //         transactionDate.getFullYear() === now.getFullYear();
    // });

    // Prepare data for pie chart (expenses by category)
    const expenseCategories = state.categories.filter(cat => cat.type === 'expense');
    const pieData = expenseCategories.map(category => {
        const amount = state.transactions
            .filter(t => t.type === 'expense' && t.category === category.id)
            .reduce((sum, t) => sum + t.amount, 0);
        return {
            name: category.name,
            value: amount,
            color: category.color,
        };
    }).filter(item => item.value > 0);

    // Prepare data for monthly trends
    const monthlyTrends = state.transactions.reduce((acc, transaction) => {
        const date = new Date(transaction.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

        if (!acc[monthKey]) {
            acc[monthKey] = { month: monthKey, income: 0, expenses: 0 };
        }

        if (transaction.type === 'income') {
            acc[monthKey].income += transaction.amount;
        } else {
            acc[monthKey].expenses += transaction.amount;
        }

        return acc;
    }, {} as Record<string, { month: string; income: number; expenses: number }>);

    const trendsData = Object.values(monthlyTrends)
        .sort((a, b) => a.month.localeCompare(b.month))
        .slice(-6); // Last 6 months


    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg border border-green-200 dark:border-green-700">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Total Income</h3>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                        {formatCurrency(totals.income)}
                    </p>
                </div>

                <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg border border-red-200 dark:border-red-700">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Total Expenses</h3>
                    <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                        {formatCurrency(totals.expenses)}
                    </p>
                </div>

                <div className={`p-4 rounded-lg border ${totals.balance >= 0 ? 'bg-blue-100 dark:bg-blue-900 border-blue-200 dark:border-blue-700' : 'bg-orange-100 dark:bg-orange-900 border-orange-200 dark:border-orange-700'}`}>
                    <h3 className={`text-sm font-medium ${totals.balance >= 0 ? 'text-blue-800 dark:text-blue-200' : 'text-orange-800 dark:text-orange-200'}`}>
                        Current Balance
                    </h3>
                    <p className={`text-2xl font-bold ${totals.balance >= 0 ? 'text-blue-900 dark:text-blue-100' : 'text-orange-900 dark:text-orange-100'}`}>
                        {formatCurrency(totals.balance)}
                    </p>
                </div>

                <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">Total Assets</h3>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                        {formatCurrency(totalAssetsValue)}
                    </p>
                </div>

                <div className={`p-4 rounded-lg border ${netWorth >= 0 ? 'bg-emerald-100 dark:bg-emerald-900 border-emerald-200 dark:border-emerald-700' : 'bg-red-100 dark:bg-red-900 border-red-200 dark:border-red-700'}`}>
                    <h3 className={`text-sm font-medium ${netWorth >= 0 ? 'text-emerald-800 dark:text-emerald-200' : 'text-red-800 dark:text-red-200'}`}>
                        Net Worth
                    </h3>
                    <p className={`text-2xl font-bold ${netWorth >= 0 ? 'text-emerald-900 dark:text-emerald-100' : 'text-red-900 dark:text-red-100'}`}>
                        {formatCurrency(netWorth)}
                    </p>
                </div>
            </div>

            {/* Monthly Comparison Insight */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Insight</h3>
                {comparison.expenseChange !== 0 ? (
                    <p className="text-gray-700 dark:text-gray-300">
                        You spent{' '}
                        <span className={`font-semibold ${comparison.expenseChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {Math.abs(comparison.expenseChange).toFixed(1)}%
                        </span>{' '}
                        {comparison.expenseChange > 0 ? 'more' : 'less'} this month compared to last month.
                    </p>
                ) : (
                    <p className="text-gray-700 dark:text-gray-300">
                        Your spending this month is the same as last month.
                    </p>
                )}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Expenses by Category Pie Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Expenses by Category
                    </h3>
                    {pieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [formatCurrency(Number(value)), 'Amount']} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                            No expense data for this month
                        </p>
                    )}
                </div>

                {/* Monthly Trends Line Chart */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Monthly Trends
                    </h3>
                    {trendsData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={trendsData} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => [formatCurrency(Number(value)), '']} />
                                <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} />
                                <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                            No trend data available
                        </p>
                    )}
                </div>
            </div>

            {/* Monthly Income vs Expenses Bar Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Income vs Expenses
                </h3>
                {trendsData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={trendsData} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip formatter={(value) => [formatCurrency(Number(value)), '']} />
                            <Bar dataKey="income" fill="#22c55e" />
                            <Bar dataKey="expenses" fill="#ef4444" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                        No data available
                    </p>
                )}
            </div>
        </div>

    );
}
