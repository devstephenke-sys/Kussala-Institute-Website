const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

export function getToken(): string | null {
  return localStorage.getItem("kussala_token");
}

export function setToken(token: string) {
  localStorage.setItem("kussala_token", token);
}

export function removeToken() {
  localStorage.removeItem("kussala_token");
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    removeToken();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: "An error occurred" }));
    throw new Error(errorData.detail || "API Request failed");
  }

  return response.json();
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<any>("/auth/login/json", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => request<any>("/auth/me"),

  // Dashboard
  getStats: () => request<any>("/admin/dashboard/stats"),

  // Articles
  getAdminArticles: (page = 1, status = "", search = "") =>
    request<any>(`/admin/articles?page=${page}&status=${status}&search=${search}`),
  createArticle: (data: any) =>
    request<any>("/admin/articles", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateArticle: (id: string, data: any) =>
    request<any>(`/admin/articles/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteArticle: (id: string) =>
    request<any>(`/admin/articles/${id}`, {
      method: "DELETE",
    }),

  // News
  getAdminNews: (page = 1, status = "") =>
    request<any>(`/admin/news?page=${page}&status=${status}`),
  createNews: (data: any) =>
    request<any>("/admin/news", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateNews: (id: string, data: any) =>
    request<any>(`/admin/news/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteNews: (id: string) =>
    request<any>(`/admin/news/${id}`, {
      method: "DELETE",
    }),

  // Impact
  getAdminImpact: (page = 1, status = "") =>
    request<any>(`/admin/impact?page=${page}&status=${status}`),
  createImpact: (data: any) =>
    request<any>("/admin/impact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  updateImpact: (id: string, data: any) =>
    request<any>(`/admin/impact/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  deleteImpact: (id: string) =>
    request<any>(`/admin/impact/${id}`, {
      method: "DELETE",
    }),

  // Media
  uploadMedia: (formData: FormData) =>
    request<any>("/admin/media/upload", {
      method: "POST",
      body: formData,
    }),
  getMedia: () => request<any>("/admin/media"),

  // Users
  getUsers: () => request<any>("/admin/users"),
  createUser: (data: any) =>
    request<any>("/admin/users", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Audit Logs
  getAuditLogs: () => request<any>("/admin/audit-logs"),
};
