"use client";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    whatsappUrl: string;
    fullName: string;
    service: string;
  } | null>(null);

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
      service: "",
      message: "",
    });
    setSubmittedData(null);
    setError(null);
  };

  return (
    <section id="contact" style={{ background: "#fff", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>Reach Out</div>
          <h2 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--navy)" }}>Get In Touch With <span style={{ color: "var(--gold)" }}>Us</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 60, alignItems: "start" }} className="contact-grid">
          <div>
            <h3 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 24, color: "var(--navy)", marginBottom: 18 }}>We&apos;d Love to Hear From You</h3>
            <p style={{ color: "var(--gray)", lineHeight: 1.8, marginBottom: 28 }}>Whether you&apos;re just starting your investment journey or want to review your existing portfolio, our expert advisors are here to help.</p>
            {[
              { ico: "📍", label: "Address", val: "Sector-16A/232, Vrindavan Yojna-4, Raebareli Road, Lucknow - 226029" },
              { ico: "📞", label: "Phone", val: <><a href="tel:+918318442129" style={{ color: "inherit", textDecoration: "none" }}>+91 83184 42129</a> | <a href="tel:+919936408150" style={{ color: "inherit", textDecoration: "none" }}>+91 99364 08150</a></> },
              { ico: "✉️", label: "Email", val: <a href="mailto:pkfinance11@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>pkfinance11@gmail.com</a> },
              { ico: "⏰", label: "Working Hours", val: "Mon–Sat: 9:00 AM – 6:00 PM" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 42, height: 42, background: "var(--light)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{item.ico}</div>
                <div>
                  <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "var(--gray)" }}>{item.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)" }}>{item.val}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--cream)", borderRadius: 16, padding: 36, boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 22, color: "var(--navy)", marginBottom: 24 }}>Send Us a Message</h3>
            {submittedData ? (
              <div style={{ textAlign: "center", padding: "20px 12px" }}>
                <div style={{ width: 64, height: 64, background: "#dcfce7", color: "#16a34a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 16px" }}>✓</div>
                <h4 style={{ color: "var(--navy)", fontFamily: "var(--font-playfair,serif)", fontSize: 22, marginBottom: 8 }}>Enquiry Submitted Successfully!</h4>
                <p style={{ color: "var(--gray)", fontSize: 14.5, lineHeight: 1.6, marginBottom: 24 }}>
                  Thank you, <strong>{submittedData.fullName}</strong>. We have received your enquiry for <strong>{submittedData.service}</strong>. Our advisor will reach out to you shortly.
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
                      padding: "13px 22px",
                      borderRadius: 8,
                      fontWeight: 700,
                      fontSize: 14.5,
                      boxShadow: "0 4px 12px rgba(37,211,102,0.3)"
                    }}
                  >
                    <span>💬</span> Send Enquiry on WhatsApp (+91 83184 42129)
                  </a>
                  <button
                    onClick={handleReset}
                    style={{ background: "transparent", color: "var(--navy)", border: "1.5px solid var(--navy)", padding: "10px 20px", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 14 }}
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div style={{ background: "#fee2e2", border: "1px solid #f87171", color: "#991b1b", padding: "10px 14px", borderRadius: 6, fontSize: 13, marginBottom: 16 }}>
                    ⚠️ {error}
                  </div>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }} className="form-row">
                  <Field label="First Name *" name="firstName" placeholder="Ravi" value={formData.firstName} onChange={handleChange} required />
                  <Field label="Last Name" name="lastName" placeholder="Kumar" value={formData.lastName} onChange={handleChange} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }} className="form-row">
                  <Field label="Phone *" name="phone" placeholder="+91 98765 43210" type="tel" value={formData.phone} onChange={handleChange} required />
                  <Field label="Email" name="email" placeholder="ravi@email.com" type="email" value={formData.email} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", letterSpacing: .5, marginBottom: 6 }}>Service Interested In *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #ddd6ca", borderRadius: 7, fontSize: 14, color: "#1e293b", background: "#fff", outline: "none", fontFamily: "inherit" }}
                  >
                    <option value="">Select a Service</option>
                    {["Mutual Fund Investment", "Life / Health Insurance", "Retirement Planning", "Education Planning", "Marriage Planning", "Tax Saving Solutions", "Financial Planning"].map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", letterSpacing: .5, marginBottom: 6 }}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your financial goals or questions..."
                    style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #ddd6ca", borderRadius: 7, fontSize: 14, color: "#1e293b", background: "#fff", outline: "none", fontFamily: "inherit", resize: "vertical", minHeight: 100 }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: 13,
                    background: loading ? "#94a3b8" : "var(--navy)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 7,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "inherit",
                    transition: "background .2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "var(--gold)"; }}
                  onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = "var(--navy)"; }}
                >
                  {loading ? (
                    <>
                      <span style={{ display: "inline-block", width: 16, height: 16, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                      Submitting Enquiry...
                    </>
                  ) : (
                    "Submit Enquiry"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media(max-width:900px){ .contact-grid{ grid-template-columns:1fr !important; } }
        @media(max-width:550px){ .form-row{ grid-template-columns:1fr !important; } }
      `}</style>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", letterSpacing: .5, marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #ddd6ca", borderRadius: 7, fontSize: 14, color: "#1e293b", background: "#fff", outline: "none", fontFamily: "inherit" }}
      />
    </div>
  );
}
