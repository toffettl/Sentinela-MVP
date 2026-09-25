import { apiClient, apiGet } from "../api/client";


export async function getDetections() {
  return apiGet("/api/detections");
}