import axios from "axios";
import type { Product } from "../types/product";

const api = axios.create({ baseURL: "https://fakestoreapi.com" });

export async function fetchAllProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/products");
  return data;
}

export async function fetchProductById(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}

export async function fetchCategories(): Promise<string[]> {
  const { data } = await api.get<string[]>("/products/categories");
  return data;
}
