import { CompanyProfile } from '../types';

export const companyProfile: CompanyProfile = {
  name: "SLASSI DE TRAVAUX DIVERS",
  shortName: "Slassi Travaux",
  legalForm: "SARL AU",
  capital: "17 000 000 MAD",
  capitalFormatted: "17.000.000,00 DH",
  foundingYear: "2010",
  experienceYears: "15+",
  headquarters: {
    city: "Fès",
    country: "Maroc",
    addressLine1: "Bureau N°21, 4ème étage, Résidence Bureau Jawahir",
    addressLine2: "Avenue Mohamed Slaoui",
    postalCode: "30000",
    fullAddressFr: "Bureau N°21, 4ème étage, Résidence Bureau Jawahir, Avenue Mohamed Slaoui, Fès, Maroc",
    fullAddressAr: "مكتب رقم 21، الطابق الرابع، إقامة مكاتب الجواهر، شارع محمد السلاوي، فاس، المغرب",
    fullAddressEn: "Suite 21, 4th Floor, Jawahir Office Residence, Mohamed Slaoui Avenue, Fez, Morocco",
    coordinates: {
      lat: 34.0331,
      lng: -5.0003
    }
  },
  contact: {
    phone: "+212 5 35 62 14 80",
    phoneDisplay: "+212 535 62 14 80",
    mobile: "+212 6 61 48 92 10",
    whatsapp: "212661489210",
    email: "contact@slassi-travaux.ma",
    commercialEmail: "devis@slassi-travaux.ma",
    recruitmentEmail: "recrutement@slassi-travaux.ma"
  },
  legal: {
    ice: "002341982000045",
    rc: "58492 (Tribunal de Commerce de Fès)",
    if: "45892147",
    patente: "14209841",
    cnss: "9283411"
  },
  keyMetrics: {
    projectsCount: 120,
    capitalMAD: "17M+ MAD",
    activeSites: 14,
    engineersAndStaff: 85,
    heavyMachines: 40,
    zeroAccidentScore: "99.8%"
  }
};
