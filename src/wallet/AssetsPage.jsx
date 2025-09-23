import React from 'react';
import { Doughnut} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useMarketStore } from '../components/utils/marketStore.js';
import { formatCurrency, formatPercentage, getChangeColor } from '../components/utils/formatter.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AssetsPage() {
    const { portfolio } = useMarketStore();

    const portfolioChartData = {
        labels: portfolio.holdings.map(holding => holding.symbol),
        datasets: [
            {
                data: portfolio.holdings.map(holding => holding.totalValue),
                backgroundColor: [
                    '#8bc819',
                    '#3b82f6',
                    '#ef4444',
                    '#f59e0b',
                    '#10b981',
                    '#8b5cf6',
                ],
                borderWidth: 0,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                },
            },
        },
    };

    return (
        <div id='wallet'>
            <div className="content">




            <div className="p-4 space-y-6">
                {/* Portfolio Overview */}
                <div className="bg-white rounded-xl p-6 border border-gray-200 md:w-full">
                    <div className="text-center mb-6">
                        <h2 className="text-lg font-semibold text-black mb-2">Total Portfolio Value</h2>
                        <p className="text-3xl font-bold text-black">{formatCurrency(portfolio.totalValue)}</p>
                        <div className={`flex items-center justify-center mt-2 ${getChangeColor(portfolio.dayChange)}`}>
                            {portfolio.dayChange >= 0 ? (
                                // Add your up arrow icon here

                                <span className="mr-1">↑</span>
                            ) : (
                                // Add your down arrow icon here
                                <span className="mr-1">↓</span>
                            )}
                            <span className="text-sm font-medium">
                {formatCurrency(portfolio.dayChange)} ({formatPercentage(portfolio.dayChangePercent)})
              </span>
                            <span className="text-xs text-[#b8b6b5] ml-2">today</span>
                        </div>
                    </div>

                    {/* Portfolio Statistics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center">
                            <p className="text-[#b8b6b5] text-sm">Total Cost</p>
                            <p className="font-semibold text-black">{formatCurrency(portfolio.totalCost)}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-[#b8b6b5] text-sm">Unrealized P&L</p>
                            <p className={`font-semibold ${getChangeColor(portfolio.unrealizedPL)}`}>
                                {formatCurrency(portfolio.unrealizedPL)} ({formatPercentage(portfolio.unrealizedPLPercent)})
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                        <button className="flex flex-col items-center p-4 bg-[#8bc819] text-white rounded-xl hover:bg-[#7ab317] transition-colors">
                            {/* Add your plus/Add Funds icon here */}
                            <span className="mb-1">+</span>
                            <span className="text-sm font-medium">Add Funds</span>
                        </button>
                        <button className="flex flex-col items-center p-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">
                            {/* Add your minus/Withdraw icon here */}
                            <span className="mb-1">-</span>
                            <span className="text-sm font-medium">Withdraw</span>
                        </button>
                        <button className="flex flex-col items-center p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                            {/* Add your transfer/swap icon here */}
                            <span className="mb-1">⇄</span>
                            <span className="text-sm font-medium">Transfer</span>
                        </button>
                    </div>
                </div>
                <button className={'bg-blue rounded-2xl w-full text-green h-48 hover:bg-green hover:text-blue'}> Dash</button>

                {/* Portfolio Allocation */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-black mb-4">Portfolio Allocation</h3>
                    <div className="h-64 mb-4">
                        <Doughnut data={portfolioChartData} options={chartOptions} />
                    </div>
                </div>

                {/* Holdings */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-black mb-4">Your Holdings</h3>
                    <div className="space-y-4">
                        {portfolio.holdings.map((holding) => (
                            <div key={holding.stockId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <div className="flex items-center mb-1">
                                        <span className="font-semibold text-black">{holding.symbol}</span>
                                        <span className="text-[#b8b6b5] text-sm ml-2">x{holding.quantity}</span>
                                    </div>
                                    <p className="text-[#b8b6b5] text-sm truncate">{holding.name}</p>
                                    <p className="text-xs text-gray-500">
                                        Avg Cost: {formatCurrency(holding.averageCost)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-black">{formatCurrency(holding.totalValue)}</p>
                                    <p className={`text-sm ${getChangeColor(holding.unrealizedPL)}`}>
                                        {formatCurrency(holding.unrealizedPL)}
                                    </p>
                                    <p className={`text-xs ${getChangeColor(holding.unrealizedPL)}`}>
                                        {formatPercentage(holding.unrealizedPLPercent)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cash Balance */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-black">Available Cash</h3>
                            <p className="text-[#b8b6b5] text-sm">Ready for trading</p>
                        </div>
                        <p className="text-2xl font-bold text-green">
                            {formatCurrency(portfolio.cashBalance)}
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}