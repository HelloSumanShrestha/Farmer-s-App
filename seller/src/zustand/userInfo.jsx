import { create } from 'zustand';

const useStore = create((set) => ({
    isLoggedIn: false,
    sellerId: null,

    logIn: (sellerId) => set({ isLoggedIn: true, sellerId }),
    logOut: () => set({ isLoggedIn: false, sellerId: null }),
}));

export default useStore;
