import axios from 'axios';
import { Product } from '../types';
const API_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data as any;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductDetails = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data as Product;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};
