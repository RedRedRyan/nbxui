import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StockChart from '../components/cards/StockCard.jsx';
import { useMarketStore } from '../components/utils/marketStore.js';
import { formatCurrency, formatPercentage, getChangeColor } from '../components/utils/formatter.js';

export default function Trade() {
    const navigate = useNavigate();
    const { selectedStock, addTransaction } = useMarketStore();
    const [orderType, setOrderType] = useState('buy');
    const [quantity, setQuantity] = useState(1);
    const [isMarketOrder, setIsMarketOrder] = useState(true);
    const [limitPrice, setLimitPrice] = useState(selectedStock?.currentPrice || 0);
    const [isLoading, setIsLoading] = useState(false);

    if (!selectedStock) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">No stock selected</p>
            </div>
        );
    }

    const totalValue = quantity * (isMarketOrder ? selectedStock.currentPrice : limitPrice);
    const isPositive = selectedStock.change >= 0;

    const handleTrade = async () => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));

        addTransaction({
            stockId: selectedStock.id,
            symbol: selectedStock.symbol,
            type: orderType,
            quantity,
            price: isMarketOrder ? selectedStock.currentPrice : limitPrice,
            totalValue,
            timestamp: new Date(),
            status: 'completed',
        });

        setIsLoading(false);
        navigate('/assets');
    };

    return (
        <div className="container py-6">
            {/* Header */}
            <div className="mb-6 flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex items-center">
                    <div className="mr-3 h-8 w-8 bg-[#8bc819] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{selectedStock.symbol.charAt(0)}</span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-bold tracking-tight">{selectedStock.name}</h1>
                            <span className="bg-gray-100 text-gray-800 text-sm px-2 py-1 rounded-md">
                                {selectedStock.symbol}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span>{selectedStock.sector}</span>
                            <span>•</span>
                            <span>Market Cap: {formatCurrency(selectedStock.marketCap)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                        <span>📊</span>
                        Share
                    </button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Left Column - Chart */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200">
                        <div className="p-6 pb-2">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-semibold">Price Chart</h2>
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                                        isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                        {isPositive ? '↑' : '↓'}
                                        {formatPercentage(selectedStock.changePercent)}
                                    </span>
                                    <div className="text-2xl font-bold">{formatCurrency(selectedStock.currentPrice)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4">
                            <StockChart
                                stock={selectedStock}
                                timeframe="1D"
                                chartType="line"
                            />
                        </div>
                    </div>

                    {/* Stock Details */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold mb-4">Stock Overview</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Volume</span>
                                    <span className="font-medium">{selectedStock.volume.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Day Change</span>
                                    <span className={`font-medium ${getChangeColor(selectedStock.change)}`}>
                                        {formatCurrency(selectedStock.change)} ({formatPercentage(selectedStock.changePercent)})
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">52W High</span>
                                    <span className="font-medium">{formatCurrency(selectedStock.week52High)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">52W Low</span>
                                    <span className="font-medium">{formatCurrency(selectedStock.week52Low)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Trading Interface */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="pb-2">
                            <h3 className="text-lg font-semibold">Trade {selectedStock.symbol}</h3>
                            <p className="text-sm text-gray-600">Buy or sell shares</p>
                        </div>

                        {/* Order Type Tabs */}
                        <div className="mb-4">
                            <div className="flex border border-gray-200 rounded-lg p-1">
                                <button
                                    onClick={() => setIsMarketOrder(true)}
                                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                        isMarketOrder
                                            ? 'bg-[#8bc819] text-white'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    Market
                                </button>
                                <button
                                    onClick={() => setIsMarketOrder(false)}
                                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                        !isMarketOrder
                                            ? 'bg-[#8bc819] text-white'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    Limit
                                </button>
                            </div>
                        </div>

                        {/* Buy/Sell Toggle */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <button
                                onClick={() => setOrderType('buy')}
                                className={`py-3 rounded-lg font-medium transition-colors ${
                                    orderType === 'buy'
                                        ? 'bg-[#8bc819] text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Buy
                            </button>
                            <button
                                onClick={() => setOrderType('sell')}
                                className={`py-3 rounded-lg font-medium transition-colors ${
                                    orderType === 'sell'
                                        ? 'bg-red-500 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                Sell
                            </button>
                        </div>

                        {/* Limit Price (if limit order) */}
                        {!isMarketOrder && (
                            <div className="mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Limit Price</label>
                                <input
                                    type="number"
                                    value={limitPrice}
                                    onChange={(e) => setLimitPrice(Number(e.target.value))}
                                    step="0.01"
                                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc819] focus:border-transparent"
                                />
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700 mb-2 block">Quantity</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                min="1"
                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc819] focus:border-transparent"
                            />
                        </div>

                        {/* Order Summary */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">{isMarketOrder ? 'Market Price' : 'Limit Price'}</span>
                                <span className="font-medium">
                                    {formatCurrency(isMarketOrder ? selectedStock.currentPrice : limitPrice)}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Quantity</span>
                                <span className="font-medium">{quantity}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2">
                                <div className="flex justify-between font-semibold">
                                    <span>Total Value</span>
                                    <span className="text-lg">{formatCurrency(totalValue)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Place Order Button */}
                        <button
                            onClick={handleTrade}
                            disabled={isLoading || quantity <= 0}
                            className={`w-full py-4 rounded-xl font-semibold text-white transition-all ${
                                orderType === 'buy'
                                    ? 'bg-[#8bc819] hover:bg-[#7ab317] disabled:bg-gray-300'
                                    : 'bg-red-500 hover:bg-red-600 disabled:bg-gray-300'
                            } disabled:cursor-not-allowed`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Processing Order...
                                </div>
                            ) : (
                                `${orderType === 'buy' ? 'Buy' : 'Sell'} ${selectedStock.symbol}`
                            )}
                        </button>
                    </div>

                    {/* Stock Details Card */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold mb-4">Stock Details</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Sector</span>
                                <span>{selectedStock.sector}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Industry</span>
                                <span>{selectedStock.industry}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Exchange</span>
                                <span>{selectedStock.exchange}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}