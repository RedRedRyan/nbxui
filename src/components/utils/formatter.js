export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES',
        minimumFractionDigits: 2,
    }).format(amount);
}

export function formatNumber(num) {
    return new Intl.NumberFormat('en-KE').format(num);
}

export function formatPercentage(percentage) {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
}

export function formatCompactNumber(num) {
    if (num >= 1e9) {
        return `${(num / 1e9).toFixed(1)}B`;
    }
    if (num >= 1e6) {
        return `${(num / 1e6).toFixed(1)}M`;
    }
    if (num >= 1e3) {
        return `${(num / 1e3).toFixed(1)}K`;
    }
    return num.toString();
}

export function getTimeGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
}

export function getChangeColor(change) {
    if (change > 0) return 'text-[#8bc819]';
    if (change < 0) return 'text-red-500';
    return 'text-gray-500';
}