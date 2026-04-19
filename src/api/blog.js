import apiClient from "./client";
export const getBlogPosts = (params) =>
  apiClient.get("/blog/", { params });
export const getBlogPost = (slug) =>
  apiClient.get(`/blog/${slug}/`);
export const getTags = () =>
  apiClient.get("/blog/tags/");
export const postBlogComment = (slug, data) =>
  apiClient.post(`/blog/${slug}/comments/`, data);