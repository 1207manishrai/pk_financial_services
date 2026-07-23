"use client";
import { useState, useEffect } from "react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewAdded: () => void;
}

export default function ReviewModal({ isOpen, onClose, onReviewAdded }: ReviewModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    category: "Wealth Management",
    text: "",
  });
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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

    if (!formData.name.trim() || !formData.role.trim() || !formData.text.trim()) {
      setError("All fields marked with * are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit review.");
      }

      setSuccess(true);
      onReviewAdded(); // Refresh dynamic list
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      role: "",
      category: "Wealth Management",
      text: "",
    });
    setRating(5);
    setSuccess(false);
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
          maxWidth: 500,
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
            Client Feedback
          </span>
          <h3 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 24, color: "var(--navy)", marginTop: 4 }}>
            Write a Review
          </h3>
        </div>

        {success ? (
          <div style={{ textAlign: "center", padding: "16px 8px" }}>
            <div style={{ width: 56, height: 56, background: "#dcfce7", color: "#16a34a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 14px" }}>
              ✓
            </div>
            <h4 style={{ color: "var(--navy)", fontFamily: "var(--font-playfair,serif)", fontSize: 20, marginBottom: 8 }}>
              Review Submitted!
            </h4>
            <p style={{ color: "var(--gray)", fontSize: 13.5, lineHeight: 1.5, marginBottom: 20 }}>
              Thank you for sharing your experience. Your review has been saved and is now visible on the website!
            </p>
            <button
              onClick={() => {
                handleReset();
                onClose();
              }}
              style={{
                background: "var(--navy)",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 14,
                width: "100%",
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: "#fee2e2", border: "1px solid #f87171", color: "#991b1b", padding: "10px 14px", borderRadius: 6, fontSize: 13, marginBottom: 14 }}>
                ⚠️ {error}
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", marginBottom: 6 }}>Your Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #ddd6ca", borderRadius: 6, fontSize: 13.5, color: "#1e293b", background: "#fff", outline: "none" }}
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", marginBottom: 6 }}>Designation & City *</label>
              <input
                type="text"
                name="role"
                placeholder="e.g., Software Engineer, Noida"
                value={formData.role}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #ddd6ca", borderRadius: 6, fontSize: 13.5, color: "#1e293b", background: "#fff", outline: "none" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, marginBottom: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", marginBottom: 6 }}>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #ddd6ca", borderRadius: 6, fontSize: 13.5, color: "#1e293b", background: "#fff", outline: "none" }}
                >
                  <option value="Wealth Management">Wealth Management</option>
                  <option value="Retirement Planning">Retirement Planning</option>
                  <option value="Tax Planning">Tax Planning</option>
                  <option value="Mutual Funds & SIP">Mutual Funds & SIP</option>
                  <option value="NRI Services & Tax">NRI Services & Tax</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", marginBottom: 6 }}>Rating *</label>
                <div style={{ display: "flex", gap: 4, height: "38px", alignItems: "center" }}>
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isLit = (hoverRating !== null ? hoverRating : rating) >= star;
                    return (
                      <span
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        onClick={() => setRating(star)}
                        style={{
                          fontSize: 24,
                          cursor: "pointer",
                          color: isLit ? "var(--gold)" : "#d1d5db",
                          transition: "color 0.15s ease",
                        }}
                      >
                        ★
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", marginBottom: 6 }}>Your Review *</label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleChange}
                placeholder="Write your review here..."
                rows={4}
                required
                style={{ width: "100%", padding: "9px 12px", border: "1.5px solid #ddd6ca", borderRadius: 6, fontSize: 13.5, color: "#1e293b", background: "#fff", outline: "none", resize: "vertical", lineHeight: 1.5 }}
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
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
