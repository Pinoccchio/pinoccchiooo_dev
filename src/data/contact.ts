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
    facebook: "https://www.facebook.com/Renbards619",
    facebookDev: "https://www.facebook.com/Renbards619",
    github: "github.com/Pinoccchio",
    githubFull: "https://github.com/Pinoccchio",
    instagram: "instagram.com/itsjexxejs_/",
    instagramFull: "https://www.instagram.com/itsjexxejs_/",
    linkedin: "linkedin.com/in/jan-miko-guevarra-894088294",
    linkedinFull: "https://linkedin.com/in/jan-miko-guevarra-894088294",
    nameasone: "www.nameasone.cc/jmguevarra",
    nameasoneFull: "https://www.nameasone.cc/jmguevarra",
    portfolio: "pinoccchiooo-dev.vercel.app",
    portfolioFull: "https://pinoccchiooo-dev.vercel.app/",
  },
  assets: {
    resume: "/resume/Jan_Miko_Guevarra_Master_Resume.pdf?v=227058334591",
  },
  education: {
    school: "Cor Jesu College, Inc.",
    degree: "BS Computer Science",
    expectedGraduation: "2027",
    formatted: "BS Computer Science, Cor Jesu College, Inc. · Fourth-year student · Expected 2027",
  },
} as const

export type ContactInfo = typeof CONTACT
