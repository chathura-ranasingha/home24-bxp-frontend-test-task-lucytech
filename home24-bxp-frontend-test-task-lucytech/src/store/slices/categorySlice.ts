import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesApi } from "../../services/api/category-api.service";
import { Category, CategoryState } from "../../types/types";

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

export const getCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("category/getCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await getCategoriesApi();
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      return rejectWithValue("Invalid data format");
    }
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to load categories"
    );
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
