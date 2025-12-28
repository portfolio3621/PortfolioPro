import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Fetch from '../Fetch';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      
      // Fetch user data
      fetchUser: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await Fetch.get('get-data');
          if (data.success === true) {
            set({ user: data.data, isLoading: false });
            return data.data;
          } else {
            set({ user: null, isLoading: false });
            return null;
          }
        } catch (error) {
          set({ error: error.message, isLoading: false });
          console.error('Error fetching user:', error);
          return null;
        }
      },
      
      // Update user data
      updateUser: (userData) => set({ user: userData }),
      
      // Clear user data (logout)
      clearUser: () => set({ user: null, error: null }),
      
      // Check if user is authenticated
      isAuthenticated: () => {
        const { user } = get();
        return !!user;
      },
      
      // Get user initials for avatar
      getUserInitials: () => {
        const { user } = get();
        if (!user?.name) return 'U';
        return user.name.charAt(0).toUpperCase();
      },
    }),
    {
      name: 'user-storage', // localStorage key
      // Optional: whitelist specific fields
      partialize: (state) => ({ 
        user: state.user 
      }),
    }
  )
);