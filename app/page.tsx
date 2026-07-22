"use client";
import { useState } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CalcStrip from "@/components/CalcStrip";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import News from "@/components/News";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOpenEnquiry = (service: string = "") => {
    setSelectedService(service);
    setModalOpen(true);
  };

  return (
    <>
      <TopBar />
      <Header />
      <Hero onOpenEnquiry={() => handleOpenEnquiry()} />
      <About />
      <Stats />
      <Services onEnquire={(service) => handleOpenEnquiry(service)} />
      <CalcStrip />

      {/* Quote Banner */}
      <div style={{ background: "linear-gradient(135deg,var(--navy) 0%,#1a3560 100%)", padding: "60px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: "clamp(24px,3vw,36px)", color: "#fff", marginBottom: 22 }}>
          Get One Personalised <span style={{ color: "var(--gold)" }}>Financial Plan</span> for Yourself
        </h2>
        <button
          onClick={() => handleOpenEnquiry("Financial Planning")}
          style={{ background: "var(--gold)", color: "var(--navy)", padding: "13px 28px", borderRadius: 5, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", display: "inline-block", fontFamily: "inherit" }}
        >
          Get a Free Quote →
        </button>
      </div>

      <Testimonials />
      <Contact />
      <News />
      <Footer />

      {/* Global Enquiry Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedService}
      />



      {/* Floating Enquire Now Button */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 990,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "flex-end",
        }}
      >
        <button
          onClick={() => handleOpenEnquiry()}
          style={{
            background: "linear-gradient(135deg, var(--gold), #d97706)",
            color: "var(--navy)",
            border: "none",
            borderRadius: 30,
            padding: "12px 22px",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "transform 0.2s, box-shadow 0.2s",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
        >
          <span>📋</span> Submit Enquiry
        </button>
      </div>
    </>
  );
}

