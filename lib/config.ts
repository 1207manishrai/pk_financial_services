// ============================================================
// PK FINANCIAL SERVICES — API CONFIGURATION
// Fill in your credentials once received from CAMS & KFintech
// ============================================================

export const CAMS_CONFIG = {
  BASE_URL: "https://api.camsonline.com/v1",   // Replace with actual CAMS API URL
  PARTNER_ID: "YOUR_CAMS_PARTNER_ID",           // From CAMS registration
  API_KEY: "YOUR_CAMS_API_KEY",                 // From CAMS registration
  SECRET_KEY: "YOUR_CAMS_SECRET_KEY",           // From CAMS registration
  ARN: "YOUR_ARN_CODE",                         // Your AMFI ARN e.g. ARN-12345
};

export const KFIN_CONFIG = {
  BASE_URL: "https://mfdapi.kfintech.com/v1",   // Replace with actual KFintech API URL
  DISTRIBUTOR_ID: "YOUR_KFIN_DISTRIBUTOR_ID",   // From KFintech registration
  API_KEY: "YOUR_KFIN_API_KEY",                 // From KFintech registration
  SECRET_KEY: "YOUR_KFIN_SECRET_KEY",           // From KFintech registration
  ARN: "YOUR_ARN_CODE",                         // Your AMFI ARN
};

export const APP_CONFIG = {
  SESSION_SECRET: "pk-financial-secret-2026",   // Change this to a random string
  OTP_EXPIRY_MINS: 10,
  COMPANY_NAME: "PK Financial Services",
  COMPANY_PHONE: "+91 8318442129",
  COMPANY_EMAIL: "pkfinance11@gmail.com",
};
