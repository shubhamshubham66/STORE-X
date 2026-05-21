
import { Product } from "../types";

const BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch product ${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
