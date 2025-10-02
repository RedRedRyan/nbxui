import React, { useState, useMemo } from 'react';
import StockCard from '../components/cards/StockCard.jsx';
import { useMarketStore } from '../components/utils/marketStore.js';

const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'change', label: 'Change %' },
    { value: 'volume', label: 'Volume' },
];

export default function Market() {
    const { stocks, addToFavorites, removeFromFavorites, selectStock } = useMarketStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showFilters, setShowFilters] = useState(false);


    const filteredAndSortedStocks = useMemo(() => {
        let filtered = stocks.filter(stock =>
            stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filtered.sort((a, b) => {
            let aValue;
            let bValue;

            switch (sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'price':
                    aValue = a.currentPrice;
                    bValue = b.currentPrice;
                    break;
                case 'change':
                    aValue = a.changePercent;
                    bValue = b.changePercent;
                    break;
                case 'volume':
                    aValue = a.volume;
                    bValue = b.volume;
                    break;
                default:
                    return 0;
            }

            if (sortOrder === 'asc') {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            }
        });

        return filtered;
    }, [stocks, searchTerm, sortBy, sortOrder]);

    const handleToggleFavorite = (stockId) => {
        const stock = stocks.find(s => s.id === stockId);
        if (stock?.isFavorite) {
            removeFromFavorites(stockId);
        } else {
            addToFavorites(stockId);
        }
    };

    return (
        <div id="market">
            <div className='top'>

            <div className="search">
                <h1 className=" font-outfit text-white text-6xl mb-4">Market</h1>

                {/* Search and Filter */}
                <div className="flex space-x-3 mb-4">
                    <div className="flex-1 relative">
                        {/* Search Icon replaced with text/emoji */}
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white">🔍</span>
                        <input
                            type="text"
                            placeholder="Search stocks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8bc819] focus:border-transparent       "
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`p-3 rounded-xl border border-gray-200 transition-colors ${
                            showFilters ? 'bg-[#8bc819] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        {/* Filter Icon replaced with text */}
                        ⚙️
                    </button>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <div className="flex flex-wrap gap-3">
                            <div className="flex-1 min-w-32">
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8bc819]"
                                >
                                    {sortOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1 min-w-32">
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Order</label>
                                <button
                                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                                    className="w-full p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
                                >
                                    {/* Trend icons replaced with text/arrows */}
                                    {sortOrder === 'asc' ? (
                                        <span className="mr-2">↑</span>
                                    ) : (
                                        <span className="mr-2">↓</span>
                                    )}
                                    {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <p className="text-[#b8b6b5] text-sm">
                    {filteredAndSortedStocks.length} stocks found
                </p>
            </div>
                <div id="ad"  >
                    <h1>
                        nbx
                    </h1>

                </div>


            </div>
            <div className="bottom">
                <div className="sub">
                    {/* Remove the .stock div - map StockCards directly */}
                    {filteredAndSortedStocks.map(stock => (
                        <StockCard
                            key={stock.id}
                            stock={stock}
                            onToggleFavorite={handleToggleFavorite}
                            onSelect={selectStock}
                        />
                    ))}
                </div>
            </div>



        </div>
    );
}