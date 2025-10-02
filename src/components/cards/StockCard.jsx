import React from 'react';
import {formatCurrency,formatPercentage,getChangeColor} from "../utils/formatter.js";
import { Link } from 'react-router-dom';

export default function StockCard({ stock, onToggleFavorite, onSelect }) {
    const isPositive = stock.change >= 0;


    return (
        <div
            className="rounded-xl p-4 border bg-blue border-gray-200 hover:bg-black transition-all cursor-pointer"
            onClick={() => onSelect(stock)}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <div className="flex items-center mb-1">
                        <h3 className="font-outfit text-green text-lg">{stock.symbol}</h3>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(stock.id);
                            }}
                            className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <img
                                src='/icons/like.png'
                                alt={'like'}
                                height={16}
                                className={stock.isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}
                            />
                        </button>
                    </div>
                    <p className="text-[#b8b6b5] text-sm truncate">{stock.name}</p>
                </div>

                <div className="text-right">
                    <p className="font-bold text-white text-lg">{formatCurrency(stock.currentPrice)}</p>
                    <div className={`flex items-center text-sm ${getChangeColor(stock.change)}`}>
                        {isPositive ? (
                            <img src='/icons/up.png' alt={'change'}  />
                        ) : (
                            <img src='/icons/down.png' alt={'change'} />
                        )}
                        {formatPercentage(stock.changePercent)}
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center text-xs text-[#b8b6b5]">
                <Link to={`../trade`}>
                    <button className="bg-white text-black font-outfit rounded-2xl w-16 h-6 hover:bg-green hover:text-blue">Trade</button>
                </Link>
                <span>Vol: {stock.volume.toLocaleString()}</span>

                <span className="px-2 py-1 bg-gray-100 rounded-full">{stock.sector}</span>
            </div>
        </div>
    );
}