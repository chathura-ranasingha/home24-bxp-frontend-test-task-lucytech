import axiosInstance from "../../util/axiosInstance";

export const getProductsApi = (
  categoryId?: number,
  page: number = 1,
  limit: number = 10,
  sortBy: string = "name",
  desc: boolean = false
) => {
  return axiosInstance.get(`/products`, {
    params: {
      category_id: categoryId,
      _page: page,
      _limit: limit,
      _sort: sortBy,
      _order: desc ? "desc" : "asc",
    },
  });
};

export const updateProductApi = (product: any) => {
  return axiosInstance.put(`/products/${product.id}`, product);
};
