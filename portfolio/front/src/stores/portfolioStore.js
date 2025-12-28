import { create } from 'zustand';
import Fetch from '../Fetch';

export const usePortfolioStore = create((set, get) => ({
  portfolios: [],
  isLoading: false,
  isRefreshing: false,
  lastUpdated: null,
  error: null,
  
  // Fetch portfolios
  fetchPortfolios: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await Fetch.get('get-data-of-bills');
      set({ 
        portfolios: data.data || [], 
        isLoading: false,
        lastUpdated: new Date()
      });
      return data.data || [];
    } catch (error) {
      set({ 
        error: error.message, 
        isLoading: false,
        portfolios: [] 
      });
      console.error('Error fetching portfolios:', error);
      return [];
    }
  },
  
  // Refresh portfolios
  refreshPortfolios: async () => {
    set({ isRefreshing: true, error: null });
    try {
      const data = await Fetch.get('get-data-of-bills');
      set({ 
        portfolios: data.data || [], 
        isRefreshing: false,
        lastUpdated: new Date()
      });
      return data.data || [];
    } catch (error) {
      set({ 
        error: error.message, 
        isRefreshing: false 
      });
      console.error('Error refreshing portfolios:', error);
      return [];
    }
  },
  
  // Filter portfolios by search and category
  getFilteredPortfolios: (searchQuery, activeCategory) => {
    const { portfolios } = get();
    let filtered = [...portfolios];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((portfolio) =>
        ["name", "category"].some((prop) =>
          portfolio[prop]?.toLowerCase().includes(query)
        )
      );
    }

    if (activeCategory !== "All Portfolios") {
      filtered = filtered.filter(portfolio => portfolio.category === activeCategory);
    }

    return filtered;
  },
  
  // Add a new portfolio
  addPortfolio: (portfolio) => {
    set((state) => ({
      portfolios: [...state.portfolios, portfolio]
    }));
  },
  
  // Update a portfolio
  updatePortfolio: (id, updatedData) => {
    set((state) => ({
      portfolios: state.portfolios.map(portfolio =>
        portfolio.id === id ? { ...portfolio, ...updatedData } : portfolio
      )
    }));
  },
  
  // Remove a portfolio
  removePortfolio: (id) => {
    set((state) => ({
      portfolios: state.portfolios.filter(portfolio => portfolio.id !== id)
    }));
  },
  
  // Get portfolio by ID
  getPortfolioById: (id) => {
    const { portfolios } = get();
    return portfolios.find(portfolio => portfolio.id === id);
  },
}));