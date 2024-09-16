import axios from 'axios';
import { Product } from '../types';
const API_URL = 'https://fakestoreapi.com';

// fetching all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// fetching a single product
export const fetchProductDetails = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data as Product;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};
