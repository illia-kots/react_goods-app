import { Product } from '../types/Product';
import { client } from '../utils/fetchClient';

export const getProducts = async () => {
  const { products } = await client.get<{ products: Product[] }>('/products');

  return products;
};

export const createProduct = (data: Omit<Product, 'id'>) => {
  return client.post<Product>('/products/add', data);
};

export const updateProduct = (productId: number, data: {}) => {
  return client.patch<Product>(`/products/${productId}`, data);
};

export const deleteProduct = (productId: number) => {
  return client.delete<Product>(`/products/${productId}`);
};
