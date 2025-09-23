import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StockChart from '../components/cards/StockCard.jsx';
import { useMarketStore } from '../components/utils/marketStore.js';
import { formatCurrency, formatPercentage, getChangeColor } from '../components/utils/formatter.js';

export default function Trade () {
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

        // Simulate API call
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
        <div id="trade">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-4 mt-36">
                <div className="flex items-center mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-3"
                    >
                        {/* Back arrow replaced with text/emoji */}
                        <span className="text-gray-600 text-xl">←</span>
                    </button>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold text-black">{selectedStock.symbol}</h1>
                        <p className="text-sm text-[#b8b6b5]">{selectedStock.name}</p>
                    </div>
                </div>

                {/* Price Info */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-2xl font-bold text-black">{formatCurrency(selectedStock.currentPrice)}</p>
                        <div className={`flex items-center text-sm ${getChangeColor(selectedStock.change)}`}>
                            {/* Trending icons replaced with text arrows */}
                            {isPositive ? (
                                <span className="mr-1">↑</span>
                            ) : (
                                <span className="mr-1">↓</span>
                            )}
                            {formatCurrency(selectedStock.change)} ({formatPercentage(selectedStock.changePercent)})
                        </div>
                    </div>
                    <div className="text-right text-sm text-[#b8b6b5]">
                        <p>Volume: {selectedStock.volume.toLocaleString()}</p>
                        <p>Market Cap: {formatCurrency(selectedStock.marketCap)}</p>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Chart */}
                <StockChart
                    stock={selectedStock}
                    timeframe="1D"
                    chartType="line"
                />

                {/* Trading Interface */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-black mb-4">Place Order</h3>

                    {/* Buy/Sell Toggle */}
                    <div className="flex mb-6">
                        <button
                            onClick={() => setOrderType('buy')}
                            className={`flex-1 py-3 rounded-l-xl font-medium transition-colors ${
                                orderType === 'buy'
                                    ? 'bg-[#8bc819] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Buy
                        </button>
                        <button
                            onClick={() => setOrderType('sell')}
                            className={`flex-1 py-3 rounded-r-xl font-medium transition-colors ${
                                orderType === 'sell'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Sell
                        </button>
                    </div>

                    {/* Order Type */}
                    <div className="mb-4">
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Order Type</label>
                        <div className="flex">
                            <button
                                onClick={() => setIsMarketOrder(true)}
                                className={`flex-1 py-2 px-4 rounded-l-lg border ${
                                    isMarketOrder
                                        ? 'bg-[#8bc819] text-white border-[#8bc819]'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                Market
                            </button>
                            <button
                                onClick={() => setIsMarketOrder(false)}
                                className={`flex-1 py-2 px-4 rounded-r-lg border ${
                                    !isMarketOrder
                                        ? 'bg-[#8bc819] text-white border-[#8bc819]'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                Limit
                            </button>
                        </div>
                    </div>

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

                    {/* Total Value */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Value:</span>
                            <span className="text-xl font-bold text-black">{formatCurrency(totalValue)}</span>
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
            </div>
        </div>
    );
}