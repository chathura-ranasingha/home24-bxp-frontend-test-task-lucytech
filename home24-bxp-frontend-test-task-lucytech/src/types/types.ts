export interface Category {
  id: number;
  parent_id?: number;
  name: string;
}

export interface AttributeValue {
  code: string;
  value: any;
}

export interface Product {
  id: number;
  name: string;
  category_id: any;
  attributes: AttributeValue[];
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  sortBy: "id" | "name";
  isDesc: boolean;
}

export interface AuthState {
  user: any;
  loading: boolean;
  error: string | null;
}

export interface Category {
  id: number;
  name: string;
  parent_id?: number;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}
