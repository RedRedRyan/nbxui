const companies = [
    { name: 'Safaricom PLC', symbol: 'SCOM', sector: 'Telecommunications' },
    { name: 'Equity Group Holdings', symbol: 'EQTY', sector: 'Banking' },
    { name: 'KCB Group', symbol: 'KCB', sector: 'Banking' },
    { name: 'East African Breweries', symbol: 'EABL', sector: 'Consumer Goods' },
    { name: 'BAT Kenya', symbol: 'BAT', sector: 'Consumer Goods' },
    { name: 'Bamburi Cement', symbol: 'BAMB', sector: 'Construction' },
    { name: 'Kenya Airways', symbol: 'KQ', sector: 'Transportation' },
    { name: 'Standard Chartered Bank', symbol: 'SCBK', sector: 'Banking' },
    { name: 'Diamond Trust Bank', symbol: 'DTB', sector: 'Banking' },
    { name: 'Co-operative Bank', symbol: 'COOP', sector: 'Banking' },
    { name: 'Jubilee Holdings', symbol: 'JBIC', sector: 'Insurance' },
    { name: 'Liberty Kenya Holdings', symbol: 'LKL', sector: 'Insurance' },
    { name: 'Kenya Commercial Bank', symbol: 'KCB', sector: 'Banking' },
    { name: 'Nation Media Group', symbol: 'NMG', sector: 'Media' },
    { name: 'TPS Eastern Africa', symbol: 'TPS', sector: 'Services' },
    { name: 'Kakuzi PLC', symbol: 'KAKZ', sector: 'Agriculture' },
    { name: 'Williamson Tea Kenya', symbol: 'WTK', sector: 'Agriculture' },
    { name: 'Car & General', symbol: 'C&G', sector: 'Automotive' },
    { name: 'Express Kenya', symbol: 'XPRS', sector: 'Logistics' },
    { name: 'Home Afrika', symbol: 'HOME', sector: 'Real Estate' },
];

function generateChartData(basePrice) {
    const data = [];
    const days = 30;
    let currentPrice = basePrice;

    for (let i = days; i >= 0; i--) {
        const timestamp = Date.now() - i * 24 * 60 * 60 * 1000;
        const volatility = 0.02;
        const change = (Math.random() - 0.5) * volatility * currentPrice;

        const open = currentPrice;
        const close = Math.max(0.1, currentPrice + change);
        const high = Math.max(open, close) * (1 + Math.random() * 0.01);
        const low = Math.min(open, close) * (1 - Math.random() * 0.01);
        const volume = Math.floor(Math.random() * 1000000) + 10000;

        data.push({
            timestamp,
            open,
            high,
            low,
            close,
            volume,
        });

        currentPrice = close;
    }

    return data;
}

export function generateDummyStocks() {
    return companies.map((company, index) => {
        const basePrice = Math.random() * 500 + 10;
        const chartData = generateChartData(basePrice);
        const currentPrice = chartData[chartData.length - 1].close;
        const previousClose = chartData[chartData.length - 2].close;
        const change = currentPrice - previousClose;
        const changePercent = (change / previousClose) * 100;

        return {
            id: `stock-${index}`,
            symbol: company.symbol,
            name: company.name,
            sector: company.sector,
            currentPrice: Number(currentPrice.toFixed(2)),
            previousClose: Number(previousClose.toFixed(2)),
            change: Number(change.toFixed(2)),
            changePercent: Number(changePercent.toFixed(2)),
            volume: Math.floor(Math.random() * 5000000) + 100000,
            marketCap: Math.floor(Math.random() * 100000000000) + 1000000000,
            chartData,
            isFavorite: Math.random() > 0.8,
        };
    });
}

export function generatePortfolio() {
    const holdings = [
        {
            stockId: 'stock-0',
            symbol: 'SCOM',
            name: 'Safaricom PLC',
            quantity: 1000,
            averageCost: 35.5,
            currentPrice: 42.3,
            totalValue: 42300,
            unrealizedPL: 6800,
            unrealizedPLPercent: 19.15,
        },
        {
            stockId: 'stock-1',
            symbol: 'EQTY',
            name: 'Equity Group Holdings',
            quantity: 500,
            averageCost: 52.0,
            currentPrice: 48.7,
            totalValue: 24350,
            unrealizedPL: -1650,
            unrealizedPLPercent: -6.35,
        },
        {
            stockId: 'stock-2',
            symbol: 'KCB',
            name: 'KCB Group',
            quantity: 750,
            averageCost: 38.2,
            currentPrice: 41.8,
            totalValue: 31350,
            unrealizedPL: 2700,
            unrealizedPLPercent: 9.42,
        },
        {
            stockId: 'stock-3',
            symbol: 'EABL',
            name: 'East African Breweries',
            quantity: 300,
            averageCost: 125.0,
            currentPrice: 134.5,
            totalValue: 40350,
            unrealizedPL: 2850,
            unrealizedPLPercent: 7.6,
        },
    ];

    const totalValue = holdings.reduce((sum, holding) => sum + holding.totalValue, 0);
    const totalCost = holdings.reduce((sum, holding) => sum + (holding.quantity * holding.averageCost), 0);
    const unrealizedPL = totalValue - totalCost;
    const unrealizedPLPercent = (unrealizedPL / totalCost) * 100;
    const dayChange = totalValue * (Math.random() - 0.5) * 0.02;
    const dayChangePercent = (dayChange / totalValue) * 100;

    return {
        totalValue: Number(totalValue.toFixed(2)),
        totalCost: Number(totalCost.toFixed(2)),
        unrealizedPL: Number(unrealizedPL.toFixed(2)),
        unrealizedPLPercent: Number(unrealizedPLPercent.toFixed(2)),
        dayChange: Number(dayChange.toFixed(2)),
        dayChangePercent: Number(dayChangePercent.toFixed(2)),
        holdings,
        cashBalance: 15000.0,
    };
}