/**
 * Shared contact information for Jan Miko A. Guevarra
 * Used across chatbot system prompt, about section, and other components
 */

export const CONTACT = {
  name: {
    full: "Jan Miko A. Guevarra",
    display: "Jan Miko A. Guevarra",
    alias: "Pinoccchiooo",
  },
  location: {
    city: "Digos City",
    country: "Philippines",
    postalCode: "8002",
    formatted: "Digos City, Philippines 8002",
  },
  phone: "09514575745",
  email: "janmikoguevarra@gmail.com",
  social: {
    facebook: "https://www.facebook.com/phoebe.finley.96",
    facebookDev: "https://www.facebook.com/phoebe.finley.96",
    facebookPersonal: "https://www.facebook.com/Renbards619",
    github: "github.com/Pinoccchio",
    githubFull: "https://github.com/Pinoccchio",
    instagram: "instagram.com/itsjexxejs_/",
    instagramFull: "https://www.instagram.com/itsjexxejs_/",
    linkedin: "linkedin.com/in/jan-miko-guevarra-894088294",
    linkedinFull: "https://linkedin.com/in/jan-miko-guevarra-894088294",
    portfolio: "pinoccchiooo.dev",
    portfolioFull: "https://pinoccchiooo.dev",
  },
  assets: {
    resume: "/resume/RESUME_DEV_Jan_Miko_Guevarra.pdf",
  },
  education: {
    school: "Cor Jesu College",
    degree: "BS Computer Science",
    expectedGraduation: "2026",
    formatted: "BS Computer Science at Cor Jesu College (Expected 2026)",
  },
} as const

export type ContactInfo = typeof CONTACT
