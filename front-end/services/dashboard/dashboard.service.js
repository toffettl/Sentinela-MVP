import { apiClient, apiGet } from "../api/client";
import { mockDashboard } from "../api/mock";

export async function getDashboard() {
  return apiGet("/api/dashboard/summary");
}

export async function getMockDashboard() {
  return mockDashboard;
}