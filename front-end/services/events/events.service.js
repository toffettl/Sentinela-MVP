import { apiClient, apiGet } from "../api/client";

export async function getEvents() {
  return apiGet("/api/events");
}


export async function getEventsId(id) {
  return apiClient(`/api/events/${id}`);
}