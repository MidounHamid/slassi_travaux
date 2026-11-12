/**
 * API Client for Slassi Travaux Public Portal
 * Connects directly to the Laravel backend at http://127.0.0.1:8000/api
 */

import { Project, CompanyProfile } from "../types";
import { companyProfile as defaultCompanyProfile } from "../data/companyData";
import { projectsList as defaultProjectsList } from "../data/projectsData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

// ─── Shared response types ────────────────────────────────────────────────────

export interface ApiService {
  id: number;
  slug: string;
  title: string;
  shortDesc: string;
  icon: string;
  image: string | null;
  scopes: string[];
  advantageTitle: string;
  advantageDesc: string;
}

export interface ApiTestimonial {
  id: number;
  clientName: string;
  role: string;
  company: string;
  city: string;
  comment: string;
  rating: number;
  avatarImage: string | null;
}

export interface ApiCommitment {
  id: number;
  title: string;
  desc: string;
  icon: string;
  image: string | null;
  badge: string;
  standardCode: string | null;
}

export interface ApiEquipmentItem {
  name: string;
  image: string | null;
}

export interface ApiEquipmentCategory {
  id: number;
  slug: string;
  title: string;
  icon: string;
  bannerImage: string | null;
  items: ApiEquipmentItem[];
}

export interface ApiEquipmentStat {
  count: number;
  label: string;
}

export interface ApiEstimatorType {
  key: string;
  name: string;
  baseRate: number;
  unit: string;
  icon: string;
  image: string | null;
}

export interface ApiEstimatorFinish {
  key: string;
  name: string;
  multiplier: number;
  description: string;
}

export interface ApiEstimatorLocation {
  key: string;
  name: string;
  logisticsMultiplier: number;
}

export interface ApiEstimatorConfig {
  types: ApiEstimatorType[];
  finishes: ApiEstimatorFinish[];
  locations: ApiEstimatorLocation[];
}

export interface ContactSubmission {
  name: string;
  company?: string;
  phone: string;
  email: string;
  projectType: string;
  city?: string;
  budget?: string;
  surface?: number;
  finish?: string;
  estimatedAmount?: string;
  message: string;
}

export interface QuoteResponse {
  success: boolean;
  message: string;
  reference: string;
  data: any;
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
    throw new Error(errorBody.message || `API error: ${response.statusText}`);
  }

  return response.json();
}

export const clientApi = {
  /**
   * Submit a quote request or contact message to the backend.
   * Creates a new record in the MySQL quotes table.
   */
  async submitContact(data: ContactSubmission): Promise<QuoteResponse> {
    return request<QuoteResponse>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * Submit an instant estimate request.
   */
  async submitEstimate(data: {
    name?: string;
    phone: string;
    projectType: string;
    surface: number;
    finish: string;
    estimatedAmount: string;
    city?: string;
  }): Promise<QuoteResponse> {
    return request<QuoteResponse>("/estimate", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        message: `Estimation instantanée calculée en ligne : ${data.surface} m² - ${data.finish} - ${data.estimatedAmount}`,
      }),
    });
  },

  /**
   * Fetch public projects list from the database.
   * Falls back smoothly to local projectsData if backend is unreachable.
   */
  async getProjects(category?: string): Promise<Project[]> {
    try {
      const query = new URLSearchParams();
      query.set("format", "client");
      if (category && category !== "all") query.set("category", category);

      const res = await request<{ success: boolean; data: Project[] }>(
        `/projects?${query.toString()}`
      );
      if (res && res.data && res.data.length > 0) {
        return res.data;
      }
    } catch (err) {
      console.warn("Using local fallback projects data:", err);
    }
    return defaultProjectsList;
  },

  /**
   * Fetch company legal and contact coordinates from the database.
   */
  async getCompanyProfile(): Promise<CompanyProfile> {
    try {
      const res = await request<{ success: boolean; clientProfile: CompanyProfile }>(
        "/company-settings"
      );
      if (res && res.clientProfile) {
        return res.clientProfile;
      }
    } catch (err) {
      console.warn("Using local fallback company profile:", err);
    }
    return defaultCompanyProfile;
  },
    // ─── New Public API endpoints
/**
     * GET /services
     */
    async getServices(lang: string = 'fr'): Promise<ApiService[]> {
        const res = await request<{ success: boolean; data: ApiService[] }>(`/services?lang=${lang}`);
        return res.data;
    },

    /**
     * GET /services/{slug}
     */
    async getServiceBySlug(slug: string, lang: string = 'fr'): Promise<ApiService> {
        const res = await request<{ success: boolean; data: ApiService }>(`/services/${slug}?lang=${lang}`);
        return res.data;
    },

    /**
     * GET /testimonials
     */
    async getTestimonials(lang: string = 'fr'): Promise<ApiTestimonial[]> {
        const res = await request<{ success: boolean; data: ApiTestimonial[] }>(`/testimonials?lang=${lang}`);
        return res.data;
    },

    /**
     * GET /commitments
     */
    async getCommitments(lang: string = 'fr'): Promise<ApiCommitment[]> {
        const res = await request<{ success: boolean; data: ApiCommitment[] }>(`/commitments?lang=${lang}`);
        return res.data;
    },

    /**
     * GET equipment stats and categories (combined)
     */
    async getEquipmentData(lang: string = 'fr'): Promise<{ stats: ApiEquipmentStat[]; categories: ApiEquipmentCategory[] }> {
        const [statsRes, catRes] = await Promise.all([
            request<{ success: boolean; data: ApiEquipmentStat[] }>(`/equipment/stats?lang=${lang}`),
            request<{ success: boolean; data: ApiEquipmentCategory[] }>(`/equipment/categories?lang=${lang}`),
        ]);
        return { stats: statsRes.data, categories: catRes.data };
    },

    /**
     * GET estimator configuration (types, finishes, locations)
     */
    async getEstimatorConfig(lang: string = 'fr'): Promise<ApiEstimatorConfig> {
        const res = await request<{ success: boolean; data: ApiEstimatorConfig }>(`/estimator/config?lang=${lang}`);
        return res.data;
    },

    /**
     * GET team members
     */
    async getTeam(lang: string = 'fr'): Promise<any[]> {
        const res = await request<{ success: boolean; data: any[] }>(`/team?lang=${lang}`);
        return res.data;
    },
};
