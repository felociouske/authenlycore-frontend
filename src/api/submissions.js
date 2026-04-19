import apiClient from "./client";
export const submitEvidence = (formData) =>
  apiClient.post("/submissions/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });