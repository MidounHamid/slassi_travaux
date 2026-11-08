/**
 * API Client for Slassi Travaux Admin Dashboard
 * Communicates directly with the Laravel backend at http://127.0.0.1:8000/api
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export interface DashboardMetrics {
  quotes: {
    total: number;
    pending: number;
    reviewed: number;
    contacted: number;
  };
  projects: {
    total: number;
    ongoing: number;
    done: number;
  };
  machinery: {
    total: number;
    available: number;
    onSite: number;
    maintenance: number;
  };
  pages: {
    total: number;
    online: number;
  };
  company: {
    name: string;
    capital: string;
    city: string;
  };
}

export interface ApiProject {
  id: string; // e.g. "proj-1"
  db_id?: number;
  slug?: string;
  title: string;
  category: "Gros Œuvre" | "VRD & Assainissement" | "Terrassement" | "Voirie" | string;
  client: string;
  location: string;
  budget: string;
  status: "ongoing" | "done" | "review";
  progress: number;
  date: string;
  image?: string;
}

export interface ApiMachinery {
  id: string; // e.g. "mach-1"
  db_id?: number;
  code: string;
  name: string;
  category: "Terrassement" | "Nivellement" | "Compactage" | "Transport" | string;
  specs: string;
  status: "available" | "on_site" | "maintenance";
  currentSite?: string;
  project_id?: number | null;
  project_title?: string | null;
}

export interface ApiQuote {
  id: string; // e.g. "DEV-2026-089"
  db_id?: number;
  client: string;
  company?: string;
  project: string;
  location: string;
  amount: string;
  date: string;
  status: "pending" | "reviewed" | "contacted";
  phone: string;
  whatsapp: string;
  email?: string;
  message?: string;
}

export interface ApiCompanySettings {
  company_name: string;
  short_name?: string;
  legal_form?: string;
  capital: string;
  address_line1: string;
  phone: string;
  email: string;
  rc: string;
  patente: string;
  ice?: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "super_admin" | "project_manager" | "fleet_manager" | "commercial" | string;
  role_label: string;
  job_title?: string;
  status?: string;
  permissions: string[];
  created_at?: string;
}

export interface ApiPermission {
  id: number;
  name: string;
  label_fr: string;
  label_ar?: string;
  module: string;
}

export interface ApiRole {
  id: number;
  name: string;
  label_fr: string;
  label_ar?: string;
  description?: string;
  is_system: boolean;
  users_count: number;
  permissions: ApiPermission[];
  users?: { id: number; name: string; email: string; job_title?: string; status?: string }[];
}

export interface ApiTeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  role_label: string;
  role_id?: number;
  job_title: string;
  status: string;
  permissions_count: number;
  created_at?: string;
}

export function hasPermission(user: AuthUser | null, permissionName: string): boolean {
  if (!user) return false;
  if (user.role === "super_admin") return true;
  return user.permissions?.includes(permissionName) ?? false;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token: string;
  token_type: string;
  expires_in: number;
  user: AuthUser;
}

export const TOKEN_STORAGE_KEY = "slassi_jwt_token";
export const USER_STORAGE_KEY = "slassi_auth_user";

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setAuthToken(token: string | null): void {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser | null): void {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token && !headers["Authorization"]) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    if (response.status === 401 && !endpoint.includes("/auth/login")) {
      setAuthToken(null);
      setStoredUser(null);
    }
    throw new Error(errorBody.message || `API error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export const api = {
  // 1. Dashboard Stats
  async getDashboardStats(): Promise<{
    metrics: DashboardMetrics;
    recentQuotes: ApiQuote[];
    ongoingProjects: ApiProject[];
  }> {
    const res = await request<{
      success: boolean;
      metrics: DashboardMetrics;
      recentQuotes: ApiQuote[];
      ongoingProjects: ApiProject[];
    }>("/dashboard/stats");
    return {
      metrics: res.metrics,
      recentQuotes: res.recentQuotes,
      ongoingProjects: res.ongoingProjects,
    };
  },

  // 2. Projects CRUD
  async getProjects(params?: { category?: string; search?: string }): Promise<ApiProject[]> {
    const query = new URLSearchParams();
    query.set("format", "admin");
    if (params?.category && params.category !== "all") query.set("category", params.category);
    if (params?.search) query.set("search", params.search);

    const res = await request<{ success: boolean; data: ApiProject[] }>(
      `/projects?${query.toString()}`
    );
    return res.data;
  },

  async createProject(data: Partial<ApiProject>): Promise<ApiProject> {
    const res = await request<{ success: boolean; data: ApiProject }>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async updateProject(id: string | number, data: Partial<ApiProject>): Promise<ApiProject> {
    const numericId = typeof id === "string" ? id.replace("proj-", "") : id;
    const res = await request<{ success: boolean; data: ApiProject }>(`/projects/${numericId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async deleteProject(id: string | number): Promise<void> {
    const numericId = typeof id === "string" ? id.replace("proj-", "") : id;
    await request(`/projects/${numericId}`, { method: "DELETE" });
  },

  // 3. Machinery CRUD
  async getMachinery(params?: { category?: string; search?: string }): Promise<{
    counts: { total: number; available: number; on_site: number; maintenance: number };
    data: ApiMachinery[];
  }> {
    const query = new URLSearchParams();
    if (params?.category && params.category !== "all") query.set("category", params.category);
    if (params?.search) query.set("search", params.search);

    const res = await request<{
      success: boolean;
      counts: { total: number; available: number; on_site: number; maintenance: number };
      data: ApiMachinery[];
    }>(`/machinery?${query.toString()}`);
    return { counts: res.counts, data: res.data };
  },

  async createMachine(data: Partial<ApiMachinery>): Promise<ApiMachinery> {
    const res = await request<{ success: boolean; data: ApiMachinery }>("/machinery", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async updateMachine(id: string | number, data: Partial<ApiMachinery>): Promise<ApiMachinery> {
    const numericId = typeof id === "string" ? id.replace("mach-", "") : id;
    const res = await request<{ success: boolean; data: ApiMachinery }>(`/machinery/${numericId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async deleteMachine(id: string | number): Promise<void> {
    const numericId = typeof id === "string" ? id.replace("mach-", "") : id;
    await request(`/machinery/${numericId}`, { method: "DELETE" });
  },

  // 4. Quotes CRUD
  async getQuotes(params?: { status?: string; search?: string }): Promise<{
    counts: { total: number; pending: number; reviewed: number; contacted: number };
    data: ApiQuote[];
  }> {
    const query = new URLSearchParams();
    if (params?.status && params.status !== "all") query.set("status", params.status);
    if (params?.search) query.set("search", params.search);

    const res = await request<{
      success: boolean;
      counts: { total: number; pending: number; reviewed: number; contacted: number };
      data: ApiQuote[];
    }>(`/quotes?${query.toString()}`);
    return { counts: res.counts, data: res.data };
  },

  async updateQuoteStatus(id: string | number, status: ApiQuote["status"]): Promise<ApiQuote> {
    // If id is string reference like DEV-2026-089, or numeric id
    const res = await request<{ success: boolean; data: ApiQuote }>(`/quotes/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    return res.data;
  },

  async deleteQuote(id: string | number): Promise<void> {
    await request(`/quotes/${id}`, { method: "DELETE" });
  },

  // 5. Company Settings
  async getCompanySettings(): Promise<ApiCompanySettings> {
    const res = await request<{ success: boolean; data: ApiCompanySettings }>("/company-settings");
    return res.data;
  },

  async updateCompanySettings(data: Partial<ApiCompanySettings>): Promise<ApiCompanySettings> {
    const res = await request<{ success: boolean; data: ApiCompanySettings }>("/company-settings", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.data;
  },

  // 6. Site Pages
  async getPages(): Promise<any[]> {
    const res = await request<{ success: boolean; data: any[] }>("/pages");
    return res.data;
  },

  async createPage(data: any): Promise<any> {
    const res = await request<{ success: boolean; data: any }>("/pages", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async updatePage(id: string, data: any): Promise<any> {
    const res = await request<{ success: boolean; data: any }>(`/pages/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.data;
  },

  async deletePage(id: string): Promise<void> {
    await request(`/pages/${id}`, { method: "DELETE" });
  },

  // 7. Authentication (JWT)
  async login(credentials: { email: string; password: string }): Promise<LoginResponse> {
    const res = await request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (res.token) {
      setAuthToken(res.token);
      setStoredUser(res.user);
    }
    return res;
  },

  async me(): Promise<{ success: boolean; user: AuthUser; token_expires_at?: string }> {
    return request<{ success: boolean; user: AuthUser; token_expires_at?: string }>("/auth/me");
  },

  async logout(): Promise<void> {
    try {
      await request<{ success: boolean; message: string }>("/auth/logout", {
        method: "POST",
      });
    } catch (e) {
      console.warn("Logout request error:", e);
    } finally {
      setAuthToken(null);
      setStoredUser(null);
    }
  },

  getStoredToken: getAuthToken,
  getStoredUser: getStoredUser,
  isAuthenticated(): boolean {
    return !!getAuthToken();
  },

  // 8. Roles & Permissions API
  async getRoles(): Promise<ApiRole[]> {
    const res = await request<{ success: boolean; data: ApiRole[] }>("/roles");
    return res.data;
  },

  async createRole(data: {
    label_fr: string;
    name?: string;
    label_ar?: string;
    description?: string;
    permissions?: number[];
  }): Promise<{ success: boolean; message: string; data: ApiRole }> {
    return request<{ success: boolean; message: string; data: ApiRole }>("/roles", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateRole(
    id: number,
    data: {
      label_fr: string;
      label_ar?: string;
      description?: string;
      permissions?: number[];
    }
  ): Promise<{ success: boolean; message: string; data: ApiRole }> {
    return request<{ success: boolean; message: string; data: ApiRole }>(`/roles/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deleteRole(id: number): Promise<{ success: boolean; message: string }> {
    return request<{ success: boolean; message: string }>(`/roles/${id}`, {
      method: "DELETE",
    });
  },

  async getPermissions(): Promise<{ groups: Record<string, ApiPermission[]>; list: ApiPermission[] }> {
    const res = await request<{ success: boolean; data: Record<string, ApiPermission[]>; list: ApiPermission[] }>("/permissions");
    return { groups: res.data, list: res.list || [] };
  },

  async createPermission(data: {
    name: string;
    label_fr: string;
    label_ar?: string;
    module: string;
  }): Promise<{ success: boolean; message: string; data: ApiPermission }> {
    return request<{ success: boolean; message: string; data: ApiPermission }>("/permissions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updatePermission(
    id: number,
    data: {
      label_fr: string;
      label_ar?: string;
      module: string;
    }
  ): Promise<{ success: boolean; message: string; data: ApiPermission }> {
    return request<{ success: boolean; message: string; data: ApiPermission }>(`/permissions/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async deletePermission(id: number): Promise<{ success: boolean; message: string }> {
    return request<{ success: boolean; message: string }>(`/permissions/${id}`, {
      method: "DELETE",
    });
  },

  async getTeamMembers(): Promise<ApiTeamMember[]> {
    const res = await request<{ success: boolean; data: ApiTeamMember[] }>("/users");
    return res.data;
  },

  async updateUserRole(
    userId: number,
    roleId: number,
    jobTitle?: string
  ): Promise<{ success: boolean; message: string; user: any }> {
    return request<{ success: boolean; message: string; user: any }>(`/users/${userId}/role`, {
      method: "PUT",
      body: JSON.stringify({ role_id: roleId, job_title: jobTitle }),
    });
  },
};
