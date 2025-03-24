import axiosInstance from "../../util/axiosInstance"; 

export const getCategoriesApi = () => {
  return axiosInstance.get("/categories");
};
