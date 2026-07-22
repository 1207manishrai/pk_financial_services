"use client";
import { useState, useEffect } from "react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export default function EnquiryModal({ isOpen, onClose, defaultService = "" }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: defaultService,
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    whatsappUrl: string;
    fullName: string;
    service: string;
  } | null>(null);

  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service: defaultService }));
    }
  }, [defaultService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit enquiry.");
      }

      setSubmittedData({
        whatsappUrl: data.whatsappUrl,
        fullName: data.data.fullName,
        service: data.data.service,
      });

      // Automatically open WhatsApp to deliver enquiry directly to PK Financial Services (+91 83184 42129)
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      service: defaultService,
      message: "",
    });
    setSubmittedData(null);
    setError(null);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(15, 23, 42, 0.75)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        overflowY: "auto",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          maxWidth: 540,
          width: "100%",
          padding: 32,
          position: "relative",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
          margin: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "#f1f5f9",
            border: "none",
            borderRadius: "50%",
            width: 32,
            height: 32,
            fontSize: 16,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748b",
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", color: "var(--gold)" }}>
            PK Financial Services
          </span>
          <h3 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 24, color: "var(--navy)", marginTop: 4 }}>
            Submit Your Enquiry
          </h3>
        </div>

        {submittedData ? (
          <div style={{ textAlign: "center", padding: "16px 8px" }}>
            <div style={{ width: 56, height: 56, background: "#dcfce7", color: "#16a34a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 14px" }}>
              ✓
            </div>
            <h4 style={{ color: "var(--navy)", fontFamily: "var(--font-playfair,serif)", fontSize: 20, marginBottom: 8 }}>
              Enquiry Submitted!
            </h4>
            <p style={{ color: "var(--gray)", fontSize: 13.5, lineHeight: 1.5, marginBottom: 20 }}>
              Thank you <strong>{submittedData.fullName}</strong>. We have received your enquiry for <strong>{submittedData.service}</strong>. Our advisor will reach out to you shortly.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a
                href={submittedData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: "#25D366",
                  color: "#fff",
                  textDecoration: "none",
                  padding: "12px 18px",
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 14
                }}
              >
                <span>💬</span> Send Enquiry on WhatsApp (+91 83184 42129)
              </a>
              <button
                onClick={() => {
                  handleReset();
                  onClose();
                }}
                style={{ background: "var(--navy)", color: "#fff", border: "none", padding: "12px 18px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 14 }}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: "#fee2e2", border: "1px solid #f87171", color: "#991b1b", padding: "10px 14px", borderRadius: 6, fontSize: 13, marginBottom: 14 }}>
                ⚠️ {error}
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }} className="modal-row">
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", marginBottom: 4 }}>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Ravi"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #ddd6ca", borderRadius: 6, fontSize: 13.5, color: "#1e293b", background: "#fff", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", marginBottom: 4 }}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Kumar"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #ddd6ca", borderRadius: 6, fontSize: 13.5, color: "#1e293b", background: "#fff", outline: "none" }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }} className="modal-row">
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", marginBottom: 4 }}>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #ddd6ca", borderRadius: 6, fontSize: 13.5, color: "#1e293b", background: "#fff", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", marginBottom: 4 }}>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="ravi@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #ddd6ca", borderRadius: 6, fontSize: 13.5, color: "#1e293b", background: "#fff", outline: "none" }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", marginBottom: 4 }}>Service Interested In *</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #ddd6ca", borderRadius: 6, fontSize: 13.5, color: "#1e293b", background: "#fff", outline: "none" }}
              >
                <option value="">Select a Service</option>
                {["Mutual Fund Investment", "Life / Health Insurance", "Retirement Planning", "Education Planning", "Marriage Planning", "Tax Saving Solutions", "Financial Planning"].map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", marginBottom: 4 }}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Details about your enquiry..."
                rows={3}
                style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #ddd6ca", borderRadius: 6, fontSize: 13.5, color: "#1e293b", background: "#fff", outline: "none", resize: "vertical" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: 12,
                background: loading ? "#94a3b8" : "var(--navy)",
                color: "#fff",
                border: "none",
                borderRadius: 7,
                fontSize: 14.5,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {loading ? "Submitting..." : "Submit Enquiry"}
            </button>
          </form>
        )}
      </div>
      <style>{`
        @media(max-width:550px){ .modal-row{ grid-template-columns:1fr !important; } }
      `}</style>
    </div>
  );
}
