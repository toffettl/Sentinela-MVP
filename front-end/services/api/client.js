const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiClient(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }

  return response.json();
}

export const apiGet = (endpoint, options = {}) =>
  apiClient(endpoint, {
    ...options,
    method: "GET",
  });

export const apiPost = (endpoint, body, options = {}) =>
  apiClient(endpoint, {
    ...options,
    method: "POST",
    body: JSON.stringify(body),
  });

export const apiPut = (endpoint, body, options = {}) =>
  apiClient(endpoint, {
    ...options,
    method: "PUT",
    body: JSON.stringify(body),
  });

export const apiDelete = (endpoint, options = {}) =>
  apiClient(endpoint, {
    ...options,
    method: "DELETE",
  });