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

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
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
};
