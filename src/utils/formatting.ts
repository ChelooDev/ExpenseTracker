export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount) + ' GS';
}

export function formatNumber(amount: number): string {
    return new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);
}

export function formatAmount(amount: number, type: 'income' | 'expense'): string {
    const sign = type === 'income' ? '+' : '-';
    const formatted = formatCurrency(Math.abs(amount));
    return `${sign}${formatted}`;
}
