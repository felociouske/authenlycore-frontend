import apiClient from "./client";
export const getPlatforms = (params) =>
  apiClient.get("/platforms/", { params });
export const getPlatform = (slug) =>
  apiClient.get(`/platforms/${slug}/`);