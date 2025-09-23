import { create } from 'zustand';
import { generateDummyStocks, generatePortfolio } from '../utils/dummyData.js';

export const useMarketStore = create((set) => ({
    stocks: generateDummyStocks(),
    portfolio: generatePortfolio(),
    transactions: [],
    favorites: [],
    selectedStock: null,
    isLoading: false,

    addToFavorites: (stockId) =>
        set((state) => ({
            favorites: [...state.favorites, stockId],
            stocks: state.stocks.map(stock =>
                stock.id === stockId ? { ...stock, isFavorite: true } : stock
            )
        })),

    removeFromFavorites: (stockId) =>
        set((state) => ({
            favorites: state.favorites.filter(id => id !== stockId),
            stocks: state.stocks.map(stock =>
                stock.id === stockId ? { ...stock, isFavorite: false } : stock
            )
        })),

    selectStock: (stock) => set({ selectedStock: stock }),

    updateStock: (stockId, updates) =>
        set((state) => ({
            stocks: state.stocks.map(stock =>
                stock.id === stockId ? { ...stock, ...updates } : stock
            ),
        })),

    addTransaction: (transaction) =>
        set((state) => ({
            transactions: [
                { ...transaction, id: Date.now().toString() },
                ...state.transactions,
            ],
        })),

    setLoading: (loading) => set({ isLoading: loading }),
}));