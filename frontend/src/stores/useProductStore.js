import { create } from 'zustand';
import toast from 'react-hot-toast';
import axios from '../lib/axios';

export const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post('/products', productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
      }));
      toast.success('Product created successfully.');
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || 'An error occurred. Please try again.'
      );
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get('/products');
      set({ products: res.data.products, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || 'An error occurred. Please try again.'
      );
    }
  },

  fetchProductByCategory: async (category) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/products/category/${category}`);
      set({ products: res.data.products, loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || 'An error occurred. Please try again.'
      );
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get('/products/featured');

      set({ products: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch products', loading: false });
      console.log(error);
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);

      set((prevState) => ({
        products: prevState.products.filter(
          (product) => product._id !== productId
        ),
      }));
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || 'An error occurred. Please try again.'
      );
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.patch(`/products/${productId}`);
      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: !product.isFeatured }
            : product
        ),
      }));

      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response.data.message || 'An error occurred. Please try again.'
      );
    }
  },
}));
