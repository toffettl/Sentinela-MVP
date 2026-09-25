import { apiClient, apiGet } from "../api/client";
import {
  mockIncidents,
  mockIncidentEvents
} from "../api/mock.js";

export async function getIncidents() {
  return apiGet("/api/incidents");
}

export async function getIncidentEvents(id) {
  return apiGet(`/api/incidents/${id}/events`)
}

export async function getIncidentId(id) {
  return apiGet(`/api/incidents/${id}`)
}

export async function getMockIncidents() {
  return mockIncidents;
}

export async function getMockIncidentEvents(id) {
  return mockIncidentEvents[id] ?? [];
}