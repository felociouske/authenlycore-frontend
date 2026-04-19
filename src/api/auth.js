import apiClient from "./client";
export const login = (data) => apiClient.post("/auth/token/", data);
export const register = (data) => apiClient.post("/auth/register/", data);
export const getMe = () => apiClient.get("/auth/me/");
export const updateMe = (data) => apiClient.patch("/auth/me/", data);