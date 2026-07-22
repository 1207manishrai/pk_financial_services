import fs from "fs";
import path from "path";

export interface EnquiryRecord {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  status: string;
  submittedAt: string;
}

const dataDir = path.join(process.cwd(), "data");
const filePath = path.join(dataDir, "enquiries.json");
const tmpFilePath = path.join("/tmp", "enquiries.json");

let memoryEnquiries: EnquiryRecord[] = [];

function ensureStoreExists() {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf-8");
    }
  } catch {
    // Ignore error if filesystem is read-only (e.g., Vercel serverless)
  }
}

export function getAllEnquiries(): EnquiryRecord[] {
  try {
    ensureStoreExists();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(raw) as EnquiryRecord[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Primary store read failed
  }

  try {
    if (fs.existsSync(tmpFilePath)) {
      const raw = fs.readFileSync(tmpFilePath, "utf-8");
      const parsed = JSON.parse(raw) as EnquiryRecord[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Tmp store read failed
  }

  return memoryEnquiries;
}

export function saveEnquiry(recordData: Omit<EnquiryRecord, "status" | "submittedAt">): EnquiryRecord {
  const newRecord: EnquiryRecord = {
    ...recordData,
    status: "Pending Review",
    submittedAt: new Date().toISOString(),
  };

  const list = getAllEnquiries();
  list.push(newRecord);
  memoryEnquiries = list;

  let saved = false;
  try {
    ensureStoreExists();
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf-8");
    saved = true;
  } catch (err) {
    console.warn("[ENQUIRY STORE] Failed writing to primary enquiries.json:", err);
  }

  if (!saved) {
    try {
      fs.writeFileSync(tmpFilePath, JSON.stringify(list, null, 2), "utf-8");
    } catch (err) {
      console.warn("[ENQUIRY STORE] Failed writing to /tmp fallback:", err);
    }
  }

  return newRecord;
}
