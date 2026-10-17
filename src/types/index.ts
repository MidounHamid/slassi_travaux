export type Language = 'fr' | 'ar' | 'en';

export interface LocalizedString {
  fr: string;
  ar: string;
  en: string;
}

export interface ProjectHighlight {
  fr: string;
  ar: string;
  en: string;
}

export interface Project {
  id: string;
  title: LocalizedString;
  category: 'building' | 'vrd' | 'civil' | 'renovation';
  categoryLabel: LocalizedString;
  location: LocalizedString;
  client: LocalizedString;
  year: string;
  area: string;
  status: 'done' | 'ongoing';
  image: string;
  budget: string;
  description: LocalizedString;
  highlights: ProjectHighlight[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  scope: string[];
  advantage: string;
}

export interface EstimatorProjectResult {
  type: string;
  surface: number;
  finish: string;
  estimateRange: string;
}

export interface CompanyCoordinates {
  lat: number;
  lng: number;
}

export interface CompanyHeadquarters {
  city: string;
  country: string;
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  fullAddressFr: string;
  fullAddressAr: string;
  fullAddressEn: string;
  coordinates: CompanyCoordinates;
}

export interface CompanyContact {
  phone: string;
  phoneDisplay: string;
  mobile: string;
  whatsapp: string;
  email: string;
  commercialEmail: string;
  recruitmentEmail: string;
}

export interface CompanyLegal {
  ice: string;
  rc: string;
  if: string;
  patente: string;
  cnss: string;
}

export interface CompanyProfile {
  name: string;
  shortName: string;
  legalForm: string;
  capital: string;
  capitalFormatted: string;
  foundingYear: string;
  experienceYears: string;
  headquarters: CompanyHeadquarters;
  contact: CompanyContact;
  legal: CompanyLegal;
  keyMetrics: {
    projectsCount: number;
    capitalMAD: string;
    activeSites: number;
    engineersAndStaff: number;
    heavyMachines: number;
    zeroAccidentScore: string;
  };
}
