import axiosInstance from "../../util/axiosInstance";

export const loginApi = (credentials: { email: string; password: string }) => {
  return axiosInstance.get("/users", {
    params: {
      email: credentials.email,
      password: credentials.password,
    },
  });
};

export const logoutApi = () => {
  return new Promise((resolve) => {
    localStorage.removeItem("userCredentials");
    resolve(true);
  });
};
