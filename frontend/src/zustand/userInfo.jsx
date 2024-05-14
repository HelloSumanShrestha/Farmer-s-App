import { create } from 'zustand';

const useStore = create(set => ({
    isLoggedIn: false,
    customerId: null,

    logIn: (customerId) => set({ isLoggedIn: true, customerId }),
    logOut: () => set({ isLoggedIn: false, customerId: null }),

    products: [],
    setProducts: (products) => set({ products }),
    updateProductStock: (productId, quantity) => set(state => ({
        products: state.products.map(product =>
            product.productId === productId ? { ...product, productQuantity: product.productQuantity - quantity } : product
        )
    }))
}));

export default useStore;
