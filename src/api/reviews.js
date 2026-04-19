import apiClient from "./client";
export const getReviews = (params) =>
  apiClient.get("/reviews/", { params });
export const getReview = (slug) =>
  apiClient.get(`/reviews/${slug}/`);
export const postComment = (slug, data) =>
  apiClient.post(`/reviews/${slug}/comments/`, data);