import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getLastModifiedProductApi,
  getProductsApi,
  updateProductApi,
} from "../../services/api/product-api.service";
import { Product, ProductState } from "../../types/types";

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
  pageSize: 10,
  sortBy: "id",
  isDesc: false,
  last_modified: null,
};

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async ({
    categoryId,
    page,
    limit,
    sortBy,
    isDesc,
  }: {
    categoryId: any | undefined;
    page: number;
    limit: number;
    sortBy: "id" | "name";
    isDesc: boolean;
  }) => {
    const response = await getProductsApi(
      categoryId,
      page,
      limit,
      sortBy,
      isDesc
    );

    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product: Product, { rejectWithValue }) => {
    try {
      product.last_modified = new Date().getTime();

      const response = await updateProductApi(product);

      return response.data;
    } catch (error: any) {
      return rejectWithValue("Failed to update product");
    }
  }
);

export const getLastModifiedProduct = createAsyncThunk(
  "product/getLastModifiedProduct",
  async () => {
    const response = await getLastModifiedProductApi();

    return [
      response.data.sort(
        (a: Product, b: Product) => b.last_modified - a.last_modified
      )[0],
    ];
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setIsDesc(state, action) {
      state.isDesc = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.totalCount = action.payload.length;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product.id === updatedProduct.id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        state.last_modified = updatedProduct;

        state.error = null;
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getLastModifiedProduct.fulfilled, (state, action) => {
        state.last_modified = action.payload;
      });
  },
});

export const { setCurrentPage, setSortBy, setIsDesc } = productSlice.actions;

export default productSlice.reducer;
