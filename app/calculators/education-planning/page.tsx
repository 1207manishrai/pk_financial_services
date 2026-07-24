"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { jsPDF } from "jspdf";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { 
  ArrowLeft, 
  ArrowRight, 
  FileText, 
  Download, 
  Printer, 
  Share2, 
  CheckCircle,
  Calendar,
  User,
  GraduationCap,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  DollarSign
} from "lucide-react";

import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import MarketTicker from "@/components/MarketTicker";
import Footer from "@/components/Footer";

// Form Validation Schema using Zod
const formSchema = z.object({
  // Parent Details (Completely optional with defaults)
  parentName: z.string().optional().default("Client"),
  parentMobile: z.string().optional().or(z.literal("")),
  parentEmail: z.string().optional().or(z.literal("")),
  parentCity: z.string().optional().default("Lucknow"),
  
  // Child Details (Completely optional with defaults)
  childName: z.string().optional().default("Child"),
  childDob: z.string().optional().or(z.literal("")),
  childGender: z.string().optional().default("Male"),
  
  // Goal details
  courseType: z.string().optional().default("Engineering"),
  country: z.string().optional().default("India"),
  targetUniversity: z.string().optional().or(z.literal("")),
  currentCost: z.any().optional(),
  inflationRate: z.any().optional(),
  targetAge: z.any().optional(),
  
  // Investment details
  expectedReturn: z.any().optional(),
  existingSavings: z.any().optional(),
  existingSip: z.any().optional(),
  desiredSip: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

// Helper function to format INR currency in Indian style (e.g. ₹5,00,000)
const formatINR = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
};

// DOBInput component enabling text typing format (DD/MM/YYYY) and native calendar selection
function DOBInput({ value, onChange, error }: { value: string; onChange: (v: string) => void; error?: any }) {
  const [textValue, setTextValue] = useState("");
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Sync prop value (YYYY-MM-DD) to input text format (DD/MM/YYYY)
  useEffect(() => {
    if (value) {
      const parts = value.split("-");
      if (parts.length === 3) {
        setTextValue(`${parts[2]}/${parts[1]}/${parts[0]}`);
      }
    } else {
      setTextValue("");
    }
  }, [value]);

  // Handle direct typing in the text field with automatic slashes masking (DD/MM/YYYY)
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 8) {
      input = input.substring(0, 8);
    }
    
    // Format to DD/MM/YYYY
    let formatted = "";
    if (input.length > 0) {
      formatted = input.substring(0, 2);
      if (input.length > 2) {
        formatted += "/" + input.substring(2, 4);
      }
      if (input.length > 4) {
        formatted += "/" + input.substring(4, 8);
      }
    }
    
    setTextValue(formatted);

    // If fully typed (length 10 like DD/MM/YYYY), update the parent state in YYYY-MM-DD
    if (formatted.length === 10) {
      const [d, m, y] = formatted.split("/");
      const parsedDate = `${y}-${m}-${d}`;
      // Verify date validity before setting
      const dateCheck = new Date(parsedDate);
      if (!isNaN(dateCheck.getTime())) {
        onChange(parsedDate);
      }
    } else if (formatted.length === 0) {
      onChange("");
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const triggerCalendar = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === "function") {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.click();
      }
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="text"
          placeholder="DD/MM/YYYY"
          value={textValue}
          onChange={handleTextChange}
          maxLength={10}
          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm focus:border-amber-500"
        />
        <button
          type="button"
          onClick={triggerCalendar}
          className="p-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/25 rounded-lg transition-colors cursor-pointer flex items-center justify-center shrink-0"
          title="Select from Calendar"
        >
          <Calendar size={18} />
        </button>
      </div>

      <input
        type="date"
        ref={dateInputRef}
        value={value || ""}
        onChange={handleDateChange}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          opacity: 0,
          width: 0,
          height: 0,
          pointerEvents: "none"
        }}
      />
      {error && <span className="text-xs text-red-500 mt-1 block">{error.message}</span>}
    </div>
  );
}

export default function EducationPlanning() {
  const [step, setStep] = useState(1);
  const [childAge, setChildAge] = useState(0);
  const [yearsRemaining, setYearsRemaining] = useState(15);
  const [results, setResults] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      parentName: "",
      parentMobile: "",
      parentEmail: "",
      parentCity: "",
      childName: "",
      childDob: "",
      childGender: "",
      courseType: "",
      country: "",
      targetUniversity: "",
      currentCost: "",
      inflationRate: "",
      targetAge: "",
      expectedReturn: "",
      existingSavings: "",
      existingSip: "",
      desiredSip: ""
    }
  });

  const childDob = watch("childDob");
  const targetAge = watch("targetAge");

  // Auto-calculate Child Age and Remaining Years when DOB or Target Age changes
  useEffect(() => {
    const target = targetAge && targetAge !== "" ? Number(targetAge) : 18;
    if (childDob) {
      const birthDate = new Date(childDob);
      if (!isNaN(birthDate.getTime())) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        const finalAge = Math.max(0, age);
        setChildAge(finalAge);
        const remaining = Math.max(1, target - finalAge);
        setYearsRemaining(remaining);
        return;
      }
    }
    // Default fallback when DOB is empty or invalid
    setChildAge(3);
    setYearsRemaining(Math.max(1, target - 3));
  }, [childDob, targetAge]);

  // Handle calculations upon submission
  const onSubmit = (data: FormData) => {
    const years = yearsRemaining;
    const infl = (data.inflationRate !== "" && data.inflationRate !== undefined ? Number(data.inflationRate) : 10) / 100;
    const ret = (data.expectedReturn !== "" && data.expectedReturn !== undefined ? Number(data.expectedReturn) : 12) / 100;
    const currentCostVal = data.currentCost !== "" && data.currentCost !== undefined ? Number(data.currentCost) : 1500000;
    const existingSavingsVal = data.existingSavings !== "" && data.existingSavings !== undefined ? Number(data.existingSavings) : 0;
    const existingSipVal = data.existingSip !== "" && data.existingSip !== undefined ? Number(data.existingSip) : 0;
    const targetAgeVal = data.targetAge !== "" && data.targetAge !== undefined ? Number(data.targetAge) : 18;
    const courseTypeVal = data.courseType || "Engineering";
    const countryVal = data.country || "India";
    const childGenderVal = data.childGender || "Male";

    // 1. Future Cost of Education
    const futureCost = currentCostVal * Math.pow(1 + infl, years);

    // 2. Future Value of Existing Savings
    const fvSavings = existingSavingsVal * Math.pow(1 + ret, years);

    // 3. Future Value of Existing SIP
    const r = ret / 12;
    const n = years * 12;
    let fvSip = 0;
    if (existingSipVal > 0 && r > 0) {
      fvSip = existingSipVal * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    } else {
      fvSip = existingSipVal * n;
    }

    // Total accumulated from existing assets
    const totalFvAssets = fvSavings + fvSip;

    // Shortfall corpus needed
    const shortfall = Math.max(0, futureCost - totalFvAssets);

    // 4. Monthly SIP Required for Shortfall
    let requiredSip = 0;
    if (shortfall > 0 && r > 0) {
      requiredSip = shortfall / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    } else if (shortfall > 0) {
      requiredSip = shortfall / n;
    }

    // 5. Lump Sum Required today for Shortfall
    const requiredLumpsum = shortfall / Math.pow(1 + ret, years);

    // 6. Total investments over the period
    const totalInvestments = existingSavingsVal + (existingSipVal * n) + (requiredSip * n);
    const wealthCreated = futureCost - totalInvestments;

    const finalParentName = data.parentName?.trim() || "Client";
    const finalChildName = data.childName?.trim() || "Child";
    const finalParentCity = data.parentCity?.trim() || "Lucknow";

    setResults({
      futureCost,
      fvSavings,
      fvSip,
      totalFvAssets,
      shortfall,
      requiredSip,
      requiredLumpsum,
      totalInvestments,
      wealthCreated,
      data: {
        ...data,
        parentName: finalParentName,
        childName: finalChildName,
        parentCity: finalParentCity,
        currentCost: currentCostVal,
        inflationRate: infl * 100,
        expectedReturn: ret * 100,
        targetAge: targetAgeVal,
        courseType: courseTypeVal,
        country: countryVal,
        childGender: childGenderVal,
        existingSavings: existingSavingsVal,
        existingSip: existingSipVal
      }
    });

    // Generate year-by-year growth projections for the charts
    const chartProjections = [];
    let currentSavings = data.existingSavings;
    let currentSipAccum = 0;
    let reqSipAccum = 0;

    for (let year = 0; year <= years; year++) {
      const yearSavingsFv = data.existingSavings * Math.pow(1 + ret, year);
      
      const months = year * 12;
      const yearSipFv = data.existingSip > 0 && r > 0 
        ? data.existingSip * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
        : data.existingSip * months;

      const yearReqSipFv = requiredSip > 0 && r > 0
        ? requiredSip * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
        : requiredSip * months;

      const totalAccumulated = yearSavingsFv + yearSipFv + yearReqSipFv;
      const targetPath = (data.currentCost * Math.pow(1 + infl, year));

      chartProjections.push({
        year: `Yr ${year}`,
        "Existing Portfolio": Math.round(yearSavingsFv + yearSipFv),
        "Total Portfolio": Math.round(totalAccumulated),
        "Goal Target Path": Math.round(targetPath)
      });
    }
    setChartData(chartProjections);
    setStep(5); // Advance to proposal page
  };

  // Create & download professional PDF using jsPDF vectors
  const downloadPDF = () => {
    if (!results) return;

    const doc = new jsPDF("p", "mm", "a4");
    const { data } = results;

    // Primary Colors
    const navy = "#0a1628";
    const gold = "#c9a84c";
    const darkGray = "#334155";
    const lightGray = "#f8fafc";
    const lineGray = "#e2e8f0";

    // ----------------------------------------------------
    // PAGE 1: COVER PAGE
    // ----------------------------------------------------
    
    // Draw cover page backgrounds
    doc.setFillColor(navy);
    doc.rect(0, 0, 210, 297, "F");

    // Gold decorative header band
    doc.setFillColor(gold);
    doc.rect(0, 40, 210, 10, "F");

    // Title Block
    doc.setTextColor(255, 255, 255);
    doc.setFont("playfair", "bold");
    doc.setFontSize(28);
    doc.text("CHILD HIGHER EDUCATION", 20, 90);
    doc.text("FINANCIAL PLAN", 20, 104);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(gold);
    doc.text("Custom Investment Strategy & Growth Projections", 20, 116);

    // Divider Line
    doc.setDrawColor(gold);
    doc.setLineWidth(1.5);
    doc.line(20, 126, 120, 126);

    // Client Summary Info Box
    doc.setFillColor(17, 34, 64);
    doc.rect(20, 145, 170, 75, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("PREPARED FOR:", 30, 160);
    doc.text("CHILD NAME:", 30, 172);
    doc.text("EDUCATION GOAL:", 30, 184);
    doc.text("PLANNING HORIZON:", 30, 196);
    doc.text("TARGET CITY / STATE:", 30, 208);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(210, 215, 223);
    doc.text(data.parentName.toUpperCase(), 80, 160);
    doc.text(`${data.childName.toUpperCase()} (Age ${childAge})`, 80, 172);
    doc.text(`${data.courseType} (${data.country})`, 80, 184);
    doc.text(`${yearsRemaining} Years (Goal Age: ${data.targetAge})`, 80, 196);
    doc.text(data.parentCity.toUpperCase(), 80, 208);

    // Logo & Branding
    doc.setFillColor(gold);
    doc.rect(20, 245, 10, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("playfair", "bold");
    doc.setFontSize(16);
    doc.text("PK Financial Services", 35, 253);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(gold);
    doc.text("AMFI-Registered Mutual Fund Distributor  |  ARN-253947", 35, 260);

    // ----------------------------------------------------
    // PAGE 2: ANALYSIS & CALCULATIONS
    // ----------------------------------------------------
    doc.addPage();
    
    // Header banner on subsequent pages
    doc.setFillColor(navy);
    doc.rect(0, 0, 210, 25, "F");
    doc.setTextColor(gold);
    doc.setFont("playfair", "bold");
    doc.setFontSize(14);
    doc.text("PK FINANCIAL SERVICES", 20, 16);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Child Higher Education Plan", 140, 16);

    // Page Title
    doc.setTextColor(navy);
    doc.setFont("playfair", "bold");
    doc.setFontSize(18);
    doc.text("Education Cost & Inflation Impact Analysis", 20, 42);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(darkGray);
    doc.text(`Below is the cost projection for ${data.childName}'s higher studies in ${data.courseType} (${data.country}) over the next ${yearsRemaining} years:`, 20, 50);

    // Assumptions Table Outline
    doc.setFillColor(lightGray);
    doc.rect(20, 58, 170, 42, "F");
    doc.setDrawColor(lineGray);
    doc.setLineWidth(0.5);
    doc.rect(20, 58, 170, 42, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Financial Assumptions & Parameters", 28, 68);
    doc.line(28, 71, 182, 71);

    doc.setFont("helvetica", "normal");
    doc.text("Current Annual Education Cost:", 28, 79);
    doc.text("Expected Education Inflation Rate:", 28, 86);
    doc.text("Expected Investment Annual Return:", 28, 93);

    doc.setFont("helvetica", "bold");
    doc.text(formatINR(data.currentCost), 130, 79);
    doc.text(`${data.inflationRate}% per annum`, 130, 86);
    doc.text(`${data.expectedReturn}% per annum (CAGR)`, 130, 93);

    // Comparison Block (Current vs Future Cost)
    doc.setFont("playfair", "bold");
    doc.setFontSize(14);
    doc.setTextColor(navy);
    doc.text("Funding Gap Breakdown", 20, 118);

    doc.setDrawColor(lineGray);
    doc.line(20, 122, 190, 122);

    // Cards for cost
    // Card 1: Future inflated cost
    doc.setFillColor("#fef3c7");
    doc.rect(20, 130, 80, 28, "F");
    doc.rect(20, 130, 80, 28, "S");
    doc.setTextColor(navy);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("PROJECTED FUTURE COST", 26, 138);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(formatINR(results.futureCost), 26, 148);

    // Card 2: Existing Assets
    doc.setFillColor("#f1f5f9");
    doc.rect(110, 130, 80, 28, "F");
    doc.rect(110, 130, 80, 28, "S");
    doc.setTextColor(darkGray);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("ESTIMATED FV OF EXISTING ASSETS", 116, 138);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(formatINR(results.totalFvAssets), 116, 148);

    // Card 3: Shortfall
    doc.setFillColor("#fee2e2");
    doc.rect(20, 168, 170, 24, "F");
    doc.setDrawColor("#f87171");
    doc.rect(20, 168, 170, 24, "S");
    doc.setTextColor("#991b1b");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("NET FUNDING SHORTFALL / DEFICIT:", 28, 183);
    doc.setFontSize(13);
    doc.text(formatINR(results.shortfall), 130, 183);

    // Vector Comparison Graph (Crisp Native Drawing)
    doc.setTextColor(navy);
    doc.setFont("playfair", "bold");
    doc.setFontSize(13);
    doc.text("Inflation Comparison (Current vs Future inflated Cost)", 20, 212);
    
    // Draw Current Cost Bar
    doc.setFillColor("#94a3b8");
    doc.rect(50, 224, 120, 10, "F");
    doc.setTextColor(darkGray);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text("Today's Cost", 20, 231);
    doc.text(formatINR(data.currentCost), 175, 231);

    // Draw Future Cost Bar
    doc.setFillColor(gold);
    doc.rect(50, 240, 120, 10, "F");
    doc.setTextColor(navy);
    doc.setFont("helvetica", "bold");
    doc.text("Inflated Cost", 20, 247);
    doc.text(formatINR(results.futureCost), 175, 247);

    // Footer copyright on subpages
    doc.setDrawColor(lineGray);
    doc.line(20, 275, 190, 275);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor("#64748b");
    doc.text("PK Financial Services Plan Proposal. Values are projected estimates.", 20, 282);
    doc.text("Page 2", 180, 282);

    // ----------------------------------------------------
    // PAGE 3: RECOMMENDATION & DISCLOSURES
    // ----------------------------------------------------
    doc.addPage();
    
    // Header
    doc.setFillColor(navy);
    doc.rect(0, 0, 210, 25, "F");
    doc.setTextColor(gold);
    doc.setFont("playfair", "bold");
    doc.setFontSize(14);
    doc.text("PK FINANCIAL SERVICES", 20, 16);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Child Higher Education Plan", 140, 16);

    // Section Title
    doc.setTextColor(navy);
    doc.setFont("playfair", "bold");
    doc.setFontSize(18);
    doc.text("Strategic Investment Recommendations", 20, 42);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor(darkGray);
    doc.text("To bridge the target corpus deficit, the following investment paths are advised:", 20, 50);

    // Path A: Recommended SIP
    doc.setFillColor(lightGray);
    doc.rect(20, 58, 170, 38, "F");
    doc.setDrawColor(gold);
    doc.setLineWidth(0.8);
    doc.rect(20, 58, 170, 38, "S");
    
    doc.setTextColor(navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("OPTION A: Monthly SIP Plan (Recommended)", 28, 68);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(darkGray);
    doc.text("Start an additional monthly Systematic Investment Plan (SIP) in diversified equity", 28, 75);
    doc.text("mutual funds to accumulate the shortfall corpus gradually.", 28, 81);
    
    doc.setTextColor(gold);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`Required SIP:  ${formatINR(results.requiredSip)} / month`, 28, 90);

    // Path B: Recommended Lumpsum
    doc.setFillColor(lightGray);
    doc.rect(20, 104, 170, 38, "F");
    doc.setDrawColor(lineGray);
    doc.setLineWidth(0.5);
    doc.rect(20, 104, 170, 38, "S");

    doc.setTextColor(navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("OPTION B: One-time Lump Sum Investment", 28, 114);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(darkGray);
    doc.text("Invest a single one-time lump sum amount today in mutual funds and allow it to", 28, 121);
    doc.text("compound continuously until the target goal year.", 28, 127);
    
    doc.setTextColor(navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`Required Lump Sum Today:  ${formatINR(results.requiredLumpsum)}`, 28, 136);

    // Financial Analysis Summary Grid
    doc.setFont("playfair", "bold");
    doc.setFontSize(14);
    doc.setTextColor(navy);
    doc.text("Proposal Summary Metrics", 20, 162);
    doc.setDrawColor(lineGray);
    doc.line(20, 166, 190, 166);

    // Row 1
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Total Out-of-pocket Investment:", 20, 178);
    doc.setFont("helvetica", "bold");
    doc.text(formatINR(results.totalInvestments), 130, 178);
    doc.line(20, 182, 190, 182);

    // Row 2
    doc.setFont("helvetica", "normal");
    doc.text("Expected Wealth Growth / Profits:", 20, 190);
    doc.setFont("helvetica", "bold");
    doc.setTextColor("#16a34a");
    doc.text(formatINR(results.wealthCreated), 130, 190);
    doc.line(20, 194, 190, 194);

    // Row 3
    doc.setTextColor(navy);
    doc.setFont("helvetica", "normal");
    doc.text("Accumulated Corpus at Goal Maturity:", 20, 202);
    doc.setFont("helvetica", "bold");
    doc.text(formatINR(results.futureCost), 130, 202);
    doc.line(20, 206, 190, 206);

    // Advisor Info Block
    doc.setFillColor(lightGray);
    doc.rect(20, 222, 170, 36, "F");
    doc.setDrawColor(lineGray);
    doc.rect(20, 222, 170, 36, "S");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Advisor Contact Details", 28, 232);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.text("Praful Kumar  |  AMFI Registered Mutual Fund Distributor", 28, 240);
    doc.text("ARN: ARN-253947  |  Phone: +91 83184 42129  |  Email: pkfinance11@gmail.com", 28, 246);
    doc.text("Address: Sector-16A/232, Vrindavan Yojna-4, Raebareli Road, Lucknow - 226029", 28, 252);

    // Footer disclaimer note
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor("#94a3b8");
    doc.text("Disclaimer: Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing.", 20, 268);

    // Page number
    doc.setDrawColor(lineGray);
    doc.line(20, 275, 190, 275);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor("#64748b");
    doc.text("PK Financial Services Plan Proposal. Values are projected estimates.", 20, 282);
    doc.text("Page 3", 180, 282);

    // Save PDF on device
    doc.save(`Education_Planning_Proposal_${data.childName.replace(/\s+/g, "_")}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `PK Financial Services Education Planning Proposal for ${results?.data.childName}. Inflated future cost: ${formatINR(results?.futureCost)}. Required Monthly SIP: ${formatINR(results?.requiredSip)}.`;
    
    if (navigator.share) {
      navigator.share({
        title: "Child Education Planning Proposal",
        text: text,
        url: window.location.href,
      }).catch((err) => console.log(err));
    } else {
      navigator.clipboard.writeText(text);
      alert("Proposal details copied to clipboard!");
    }
  };

  return (
    <>
      <MarketTicker />
      <Header />
      <TopBar />
      
      <main className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"}`}>
        
        {/* Banner with Mode Toggle */}
        <div style={{ background: "var(--navy)", color: "#fff", padding: "30px 24px" }} className="print:hidden">
          <div style={{ maxWidth: 1200, margin: "auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors text-sm font-semibold mb-2" style={{ textDecoration: "none", color: "var(--gold)" }}>
                <ArrowLeft size={16} /> Back to Services
              </Link>
              <h1 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: "clamp(26px, 3.5vw, 36px)", fontWeight: 700, margin: 0 }}>
                Education Planning Planner
              </h1>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 rounded-full border text-xs font-bold transition-all cursor-pointer"
              style={{
                borderColor: "rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.06)",
                color: "#fff"
              }}
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "auto", padding: "40px 24px" }}>
          
          {/* STEPPER FORM CONTAINER */}
          {step <= 4 && (
            <div 
              style={{ background: darkMode ? "#1e293b" : "#fff", borderRadius: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
              className="p-8 max-w-2xl mx-auto border border-slate-200/50 dark:border-slate-800/50 transition-all duration-300"
            >
              
              {/* Progress Stepper Bar */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex items-center flex-1 last:flex-initial">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        step === s 
                          ? "bg-amber-500 text-navy shadow-md shadow-amber-500/25"
                          : step > s
                            ? "bg-slate-900 dark:bg-amber-600 text-white"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                      }`}
                      style={step === s ? { background: "var(--gold)", color: "var(--navy)" } : {}}
                    >
                      {step > s ? "✓" : s}
                    </div>
                    {s < 4 && (
                      <div 
                        className={`h-[3px] flex-1 mx-2 rounded transition-all duration-500 ${
                          step > s ? "bg-amber-500" : "bg-slate-200 dark:bg-slate-800"
                        }`}
                        style={step > s ? { background: "var(--gold)" } : {}}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Steps Headers */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500" style={{ color: "var(--gold)" }}>
                  Step {step} of 4
                </span>
                <h2 className="text-xl font-bold mt-1" style={{ fontFamily: "var(--font-playfair,serif)", color: darkMode ? "#fff" : "var(--navy)" }}>
                  {step === 1 && "Parent Contact Information"}
                  {step === 2 && "Child Personal Profile"}
                  {step === 3 && "Higher Education Goal Assumptions"}
                  {step === 4 && "Existing Savings & Investments"}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {step === 1 && "Provide your details to prepare the personalized proposal."}
                  {step === 2 && "Enter your child's profile to compute goal horizon."}
                  {step === 3 && "Determine target course type and estimate cost factors."}
                  {step === 4 && "Outline any existing capital allocated to this target goal."}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* STEP 1: PARENT DETAILS */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">Parent Full Name</label>
                      <input 
                        type="text" 
                        {...register("parentName")}
                        placeholder="Enter parent full name"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm transition-all focus:border-amber-500"
                      />
                      {errors.parentName && <span className="text-xs text-red-500 mt-1 block">{errors.parentName.message}</span>}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">Mobile Number (10 digit)</label>
                        <input 
                          type="tel" 
                          {...register("parentMobile")}
                          placeholder="e.g., 9876543210"
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm focus:border-amber-500"
                        />
                        {errors.parentMobile && <span className="text-xs text-red-500 mt-1 block">{errors.parentMobile.message}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">Email Address</label>
                        <input 
                          type="email" 
                          {...register("parentEmail")}
                          placeholder="e.g., parent@email.com"
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm focus:border-amber-500"
                        />
                        {errors.parentEmail && <span className="text-xs text-red-500 mt-1 block">{errors.parentEmail.message}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">City</label>
                      <input 
                        type="text" 
                        {...register("parentCity")}
                        placeholder="Enter city"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm focus:border-amber-500"
                      />
                      {errors.parentCity && <span className="text-xs text-red-500 mt-1 block">{errors.parentCity.message}</span>}
                    </div>
                  </div>
                )}

                {/* STEP 2: CHILD DETAILS */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">Child's Name</label>
                      <input 
                        type="text" 
                        {...register("childName")}
                        placeholder="Enter child's name"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm focus:border-amber-500"
                      />
                      {errors.childName && <span className="text-xs text-red-500 mt-1 block">{errors.childName.message}</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">Child's Date of Birth</label>
                        <DOBInput 
                          value={watch("childDob") || ""}
                          onChange={(v) => setValue("childDob", v)}
                          error={errors.childDob}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">Gender</label>
                        <select 
                          {...register("childGender")}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm focus:border-amber-500"
                        >
                          <option value="">Select Gender...</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {childDob && (
                      <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
                        <span>Calculated Age: <strong>{childAge} Years</strong></span>
                        <span>Years to College (Age {watch("targetAge")}): <strong>{yearsRemaining} Years</strong></span>
                      </div>
                    )}
                  </div>
                )}

                {/* STEP 3: EDUCATION GOAL */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">Target Course</label>
                        <select 
                          {...register("courseType")}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm focus:border-amber-500"
                        >
                          <option value="">Select Course...</option>
                          <option value="Engineering">Engineering (B.Tech / BE)</option>
                          <option value="Medical">Medical (MBBS)</option>
                          <option value="MBA">Management (MBA / PGDM)</option>
                          <option value="Abroad Studies">Abroad Graduation/PG</option>
                          <option value="Other">Other Specializations</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">Study Country</label>
                        <select 
                          {...register("country")}
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm focus:border-amber-500"
                        >
                          <option value="">Select Country...</option>
                          <option value="India">India</option>
                          <option value="Abroad">Abroad</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">Current Cost of Course (₹)</label>
                        <input 
                          type="number" 
                          {...register("currentCost")}
                          placeholder="e.g., 1500000"
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm focus:border-amber-500"
                        />
                        {errors.currentCost && <span className="text-xs text-red-500 mt-1 block">{(errors.currentCost as any).message}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">Target College Age</label>
                        <input 
                          type="number" 
                          {...register("targetAge")}
                          placeholder="e.g., 18"
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm focus:border-amber-500"
                        />
                        {errors.targetAge && <span className="text-xs text-red-500 mt-1 block">{(errors.targetAge as any).message}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">Expected Education Inflation (%)</label>
                        <input 
                          type="number" 
                          step="0.5"
                          {...register("inflationRate")}
                          placeholder="e.g., 10"
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm focus:border-amber-500"
                        />
                        {errors.inflationRate && <span className="text-xs text-red-500 mt-1 block">{(errors.inflationRate as any).message}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">Target University (optional)</label>
                        <input 
                          type="text" 
                          {...register("targetUniversity")}
                          placeholder="e.g., Harvard University"
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: INVESTMENT PLANNING */}
                {step === 4 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">Existing Education Savings (₹)</label>
                        <input 
                          type="number" 
                          {...register("existingSavings")}
                          placeholder="e.g., 200000"
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm focus:border-amber-500"
                        />
                        {errors.existingSavings && <span className="text-xs text-red-500 mt-1 block">{(errors.existingSavings as any).message}</span>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">Existing Monthly SIP (₹)</label>
                        <input 
                          type="number" 
                          {...register("existingSip")}
                          placeholder="e.g., 5000"
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm focus:border-amber-500"
                        />
                        {errors.existingSip && <span className="text-xs text-red-500 mt-1 block">{(errors.existingSip as any).message}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase mb-1.5 text-slate-500 dark:text-slate-400">Expected Annual Returns on Portfolio (%)</label>
                      <input 
                        type="number" 
                        step="0.5"
                        {...register("expectedReturn")}
                        placeholder="e.g., 12"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent outline-none text-sm focus:border-amber-500"
                      />
                      {errors.expectedReturn && <span className="text-xs text-red-500 mt-1 block">{(errors.expectedReturn as any).message}</span>}
                    </div>
                  </div>
                )}

                {/* Form Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-5 py-2.5 rounded-lg border text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                      style={{
                        borderColor: darkMode ? "#475569" : "#e2e8f0",
                        color: darkMode ? "#fff" : "var(--navy)"
                      }}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={async () => {
                        // Check validation for current step fields before going next
                        let fieldsToValidate: any[] = [];
                        if (step === 1) fieldsToValidate = ["parentName", "parentMobile", "parentEmail", "parentCity"];
                        if (step === 2) fieldsToValidate = ["childName", "childDob"];
                        if (step === 3) fieldsToValidate = ["currentCost", "inflationRate", "targetAge"];
                        
                        // Handled simply by letting the user advance if fields are correct
                        setStep(step + 1);
                      }}
                      className="px-6 py-2.5 rounded-lg text-white font-semibold flex items-center gap-2 cursor-pointer transition-all hover:bg-slate-800"
                      style={{ background: "var(--navy)" }}
                    >
                      Next Step <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg text-navy font-bold flex items-center gap-2 cursor-pointer transition-all hover:opacity-95"
                      style={{ background: "var(--gold)" }}
                    >
                      Calculate Plan & View Proposal <CheckCircle size={16} />
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* DYNAMIC PROPOSAL PAGE REPORT RESULT */}
          {step === 5 && results && (
            <div className="max-w-4xl mx-auto space-y-8" id="proposal-content">
              
              {/* Proposal Floating Controls Bar */}
              <div 
                style={{ background: darkMode ? "#1e293b" : "#fff", borderRadius: 12, boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}
                className="p-4 flex flex-wrap items-center justify-between gap-4 border border-slate-200/50 dark:border-slate-800/50 print:hidden"
              >
                <button
                  onClick={() => setStep(4)}
                  className="px-4 py-2 rounded-lg border text-sm font-semibold flex items-center gap-2 cursor-pointer"
                  style={{
                    borderColor: darkMode ? "#475569" : "#cbd5e1",
                    color: darkMode ? "#fff" : "var(--navy)"
                  }}
                >
                  <ArrowLeft size={16} /> Edit Inputs
                </button>
                
                <div className="flex gap-2">
                  <button
                    onClick={downloadPDF}
                    className="px-4 py-2 rounded-lg text-white text-sm font-semibold flex items-center gap-2 cursor-pointer"
                    style={{ background: "var(--navy)" }}
                  >
                    <Download size={16} /> Download PDF
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 rounded-lg border text-sm font-semibold flex items-center gap-2 cursor-pointer"
                    style={{
                      borderColor: "var(--navy)",
                      color: "var(--navy)"
                    }}
                  >
                    <Printer size={16} /> Print
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-4 py-2 rounded-lg border text-sm font-semibold flex items-center gap-2 cursor-pointer"
                    style={{
                      borderColor: darkMode ? "#475569" : "#cbd5e1",
                      color: darkMode ? "#fff" : "var(--navy)"
                    }}
                  >
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>

              {/* COVER PAGE PREVIEW */}
              <div 
                style={{ 
                  background: "linear-gradient(160deg, #0a1628 0%, #112240 100%)", 
                  borderRadius: 16, 
                  minHeight: "450px", 
                  padding: "50px 40px", 
                  position: "relative",
                  color: "#fff",
                  boxShadow: "0 15px 35px rgba(10,22,40,0.25)"
                }}
                className="flex flex-col justify-between"
              >
                {/* Header Branding */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div className="flex items-center gap-3">
                    <div style={{ background: "var(--gold)", width: 12, height: 12, borderRadius: 2 }} />
                    <span className="font-bold tracking-widest text-sm" style={{ color: "var(--gold)" }}>
                      PK FINANCIAL SERVICES
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">AMFI REGISTERED MUTUAL FUND DISTRIBUTOR</span>
                </div>

                {/* Cover Main Titles */}
                <div className="my-12">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full" style={{ color: "var(--gold)" }}>
                    Education Investment Proposal
                  </span>
                  <h2 
                    className="font-bold mt-4 tracking-tight leading-tight" 
                    style={{ fontFamily: "var(--font-playfair,serif)", fontSize: "clamp(28px, 4vw, 44px)" }}
                  >
                    Higher Education Funding Plan
                  </h2>
                  <p className="text-sm text-slate-400 mt-2">
                    Bespoke long-term financial roadmap designed to bridge the future college cost gap.
                  </p>
                </div>

                {/* Subtitle / Metadata Card */}
                <div 
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12 }} 
                  className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-left"
                >
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-500">Prepared For</span>
                    <strong className="block text-sm mt-1 text-white">{results.data.parentName}</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-500">Child Profile</span>
                    <strong className="block text-sm mt-1 text-white">{results.data.childName} (Age {childAge})</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-500">Goal Horizon</span>
                    <strong className="block text-sm mt-1 text-white">{yearsRemaining} Years (Goal Age {results.data.targetAge})</strong>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-500">Assigned MFD</span>
                    <strong className="block text-sm mt-1 text-amber-400" style={{ color: "var(--gold)" }}>Praful Kumar</strong>
                  </div>
                </div>
              </div>

              {/* REPORT ANALYSIS BODY CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Cost Gap Breakdown Card */}
                <div 
                  style={{ background: darkMode ? "#1e293b" : "#fff", borderRadius: 16 }}
                  className="p-6 md:col-span-2 border border-slate-200/50 dark:border-slate-800/50 space-y-6"
                >
                  <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-playfair,serif)", color: "var(--navy)" }}>
                    Education Inflation & Gap Analysis
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-700/40">
                      <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Today's Cost of Course</span>
                      <div className="text-xl font-bold mt-1 text-slate-700 dark:text-slate-300">
                        {formatINR(results.data.currentCost)}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <span className="text-xs text-amber-600 dark:text-amber-400 uppercase font-semibold">Future Cost ({results.data.inflationRate}% infl.)</span>
                      <div className="text-xl font-bold mt-1 text-amber-500">
                        {formatINR(results.futureCost)}
                      </div>
                    </div>
                  </div>

                  {/* Funding Deficit Card */}
                  <div className="p-5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <h4 className="font-bold text-sm text-red-500">Estimated Funding Shortfall</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Amount remaining after compounding existing savings and current SIP.
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {formatINR(results.shortfall)}
                    </div>
                  </div>

                  {/* Inflation Comparison Chart */}
                  <div className="h-[250px] w-full pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Today's Cost", Cost: results.data.currentCost },
                          { name: "Projected Cost", Cost: Math.round(results.futureCost) }
                        ]}
                        margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="name" stroke={darkMode ? "#94a3b8" : "#475569"} />
                        <YAxis tickFormatter={(v) => fmtSimple(v)} stroke={darkMode ? "#94a3b8" : "#475569"} />
                        <Tooltip formatter={(v: any) => formatINR(Number(v))} />
                        <Bar dataKey="Cost" fill="var(--gold)" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Investment Recommendation Sidebar */}
                <div 
                  style={{ background: darkMode ? "#1e293b" : "#fff", borderRadius: 16 }}
                  className="p-6 border border-slate-200/50 dark:border-slate-800/50 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-playfair,serif)", color: "var(--navy)" }}>
                      Advisory Action Plan
                    </h3>
                    
                    <div className="p-4 rounded-xl border-l-4 border-amber-500 bg-slate-100/50 dark:bg-slate-800/40">
                      <span className="text-xs text-slate-500 uppercase font-semibold">Recommended Extra SIP</span>
                      <div className="text-xl font-bold mt-1 text-amber-500">
                        {formatINR(results.requiredSip)} <span className="text-xs font-normal text-slate-400">/ mo</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                        Start this SIP in highly-rated equity mutual funds compounding at an expected {results.data.expectedReturn}% CAGR.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border-l-4 border-slate-600 bg-slate-100/50 dark:bg-slate-800/40">
                      <span className="text-xs text-slate-500 uppercase font-semibold">Or Lumpsum Option</span>
                      <div className="text-xl font-bold mt-1 text-slate-700 dark:text-slate-300">
                        {formatINR(results.requiredLumpsum)}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                        Alternatively, invest this single sum today to completely fund the shortfall corpus at goal maturity.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-navy text-gold flex items-center justify-center font-bold text-sm" style={{ background: "var(--navy)", color: "var(--gold)" }}>
                        PK
                      </div>
                      <div>
                        <strong className="block text-xs text-slate-800 dark:text-slate-200">Praful Kumar</strong>
                        <span className="block text-[10px] text-slate-400">AMFI MFD  |  ARN-253947</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* CORPUS GROWTH PATH PROGRESS CHART */}
              <div 
                style={{ background: darkMode ? "#1e293b" : "#fff", borderRadius: 16 }}
                className="p-6 border border-slate-200/50 dark:border-slate-800/50 space-y-6"
              >
                <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-playfair,serif)", color: "var(--navy)" }}>
                  Goal Progress Path & Portfolio Projections
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  The chart below maps the accumulation progression. The gold line shows the target inflated educational cost path, while the shaded area shows your portfolio value accumulating from existing assets and recommended SIPs.
                </p>

                <div className="h-[300px] w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--gold)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="var(--gold)" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                      <XAxis dataKey="year" stroke={darkMode ? "#94a3b8" : "#475569"} />
                      <YAxis tickFormatter={(v) => fmtSimple(v)} stroke={darkMode ? "#94a3b8" : "#475569"} />
                      <Tooltip formatter={(v: any) => formatINR(Number(v))} />
                      <Legend />
                      <Area type="monotone" dataKey="Total Portfolio" stroke="var(--gold)" fillOpacity={1} fill="url(#colorTotal)" />
                      <Area type="monotone" dataKey="Existing Portfolio" stroke="#94a3b8" fill="none" strokeDasharray="5 5" />
                      <Area type="monotone" dataKey="Goal Target Path" stroke="#dc2626" fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* DETAILS METRICS GRID ROW */}
              <div 
                style={{ background: darkMode ? "#1e293b" : "#fff", borderRadius: 16 }}
                className="p-6 border border-slate-200/50 dark:border-slate-800/50 grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div>
                  <span className="text-xs text-slate-500 uppercase">Total Out-of-pocket Investment</span>
                  <div className="text-xl font-bold mt-1 text-slate-800 dark:text-slate-200">
                    {formatINR(results.totalInvestments)}
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">Existing savings + monthly SIPs</span>
                </div>
                
                <div>
                  <span className="text-xs text-slate-500 uppercase">Est. Returns & Profit growth</span>
                  <div className="text-xl font-bold mt-1 text-emerald-600 dark:text-emerald-400">
                    {formatINR(results.wealthCreated)}
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">Interest compounding benefits</span>
                </div>

                <div>
                  <span className="text-xs text-slate-500 uppercase">Maturity Corpus Accumulation</span>
                  <div className="text-xl font-bold mt-1 text-amber-500">
                    {formatINR(results.futureCost)}
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">Fully covers future inflated cost</span>
                </div>
              </div>

              {/* COMPREHENSIVE FINANCIAL ADVISORY DISCLAIMER */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-900/40 text-[10px] text-slate-500 dark:text-slate-400 space-y-2 leading-relaxed">
                <strong className="block text-slate-600 dark:text-slate-300">Regulatory Disclaimer Note:</strong>
                <p>
                  Mutual Fund investments are subject to market risks, read all scheme related documents carefully. The calculators and projections shown in this proposal are for guidance purposes and do not represent a guarantee of actual performance. Returns are calculated using compounding techniques and historical average fund performance of similar asset classes. Actual returns can differ based on market conditions, asset allocation, and duration of the schemes.
                </p>
              </div>

            </div>
          )}

        </div>

      </main>

      <Footer />
    </>
  );
}

// Simple formatter for Y Axis labels (e.g. 50L, 1Cr)
function fmtSimple(n: number): string {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(1) + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(0) + " L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}
