"use client";
import { useState, useEffect, useRef } from "react";
import ReviewModal from "@/components/ReviewModal";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data = await res.json();
        setTestimonials(data || []);
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (isPlaying && testimonials.length > 0) {
      autoPlayTimer.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isPlaying, testimonials.length]);

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const emptyPlaceholder = {
    init: "P",
    name: "PK Financial Services",
    role: "Mutual Fund Distributor & Advisor",
    text: "No reviews have been submitted yet. If you have invested through us, please share your journey by clicking the 'Write a Review' button on the right!",
    category: "Client Review",
    rating: 5
  };

  const safeIndex = activeIndex < testimonials.length ? activeIndex : 0;
  const current = testimonials[safeIndex] || emptyPlaceholder;

  // Helper to render rating stars
  const renderStars = (ratingCount: number) => {
    return "★".repeat(ratingCount) + "☆".repeat(5 - ratingCount);
  };

  return (
    <section 
      style={{ background: "var(--cream)", padding: "80px 24px" }}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div style={{ maxWidth: 1200, margin: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>Client Stories</div>
          <h2 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--navy)" }}>
            What Our Clients <span style={{ color: "var(--gold)" }}>Say</span>
          </h2>
        </div>

        <div className="testimonial-layout">
          {/* Active Testimonial Card */}
          <div className="active-card-container">
            <div key={safeIndex} className="active-card animate-fade-in">
              <div className="card-header">
                <span className="category-tag">{current.category}</span>
                <span className="stars">{renderStars(current.rating || 5)}</span>
              </div>
              <div className="quote-mark">“</div>
              <p className="testimonial-text">{current.text}</p>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 20, borderTop: "1px solid rgba(0,0,0,0.06)" }} className="card-footer">
                <div>
                  <h4 style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)", marginBottom: 4 }}>{current.name}</h4>
                  <p style={{ fontSize: 13, color: "var(--gray)" }}>{current.role}</p>
                </div>
                
                {/* Navigation Controls */}
                <div style={{ display: "flex", gap: 10, alignItems: "center" }} className="controls-container">
                  <button 
                    onClick={handlePrev}
                    className="nav-btn"
                    aria-label="Previous testimonial"
                  >
                    ←
                  </button>
                  <button 
                    onClick={handleNext}
                    className="nav-btn"
                    aria-label="Next testimonial"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar selector */}
          <div className="selector-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {testimonials.length > 0 ? (
                testimonials.map((t, idx) => {
                  const isActive = idx === safeIndex;
                  return (
                    <button
                      key={t.name + idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`selector-item ${isActive ? "active" : ""}`}
                    >
                      <div className={`avatar ${isActive ? "active" : ""}`}>
                        {t.init}
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <div className="selector-name">{t.name}</div>
                        <div className="selector-role">{t.role}</div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "24px 20px",
                  textAlign: "center",
                  border: "1.5px dashed rgba(201,168,76,0.3)",
                  color: "var(--navy)",
                  fontSize: 13,
                  fontWeight: 600,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "150px",
                  gap: 8
                }}>
                  <span style={{ fontSize: 24 }}>💬</span>
                  <span>No reviews yet</span>
                  <span style={{ fontSize: 11, fontWeight: "normal", color: "var(--gray)", lineHeight: 1.4 }}>
                    Submit the first client review to show it here!
                  </span>
                </div>
              )}
            </div>

            {/* Write Review CTA Box */}
            <div style={{
              background: "linear-gradient(135deg, var(--navy) 0%, #112240 100%)",
              borderRadius: 14,
              padding: "24px",
              boxShadow: "0 10px 25px rgba(10,22,40,0.1)",
              border: "1px solid rgba(201,168,76,0.2)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              justifyContent: "center"
            }}>
              <div style={{ color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "var(--font-playfair, serif)" }}>Have you invested with us?</div>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>
                Share your journey! Your feedback helps us serve you and others better.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  background: "var(--gold)",
                  color: "var(--navy)",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 18px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s ease",
                  fontFamily: "inherit"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(201,168,76,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Write a Review ✍️
              </button>
            </div>
          </div>
        </div>
      </div>

      <ReviewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewAdded={fetchReviews}
      />

      <style>{`
        .testimonial-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: stretch;
        }
        
        .active-card-container {
          position: relative;
          min-height: 380px;
          display: flex;
        }

        .active-card {
          background: #fff;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 15px 35px rgba(10,22,40,0.05);
          border: 1px solid rgba(201,168,76,0.15);
          display: flex;
          flex-direction: column;
          width: 100%;
          transition: all 0.3s ease;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .category-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--gold);
          background: rgba(201,168,76,0.1);
          padding: 6px 14px;
          border-radius: 20px;
        }

        .stars {
          color: var(--gold);
          font-size: 16px;
          letter-spacing: 2px;
        }

        .quote-mark {
          font-family: var(--font-playfair, serif);
          font-size: 80px;
          line-height: 1;
          color: var(--gold);
          opacity: 0.15;
          margin-top: -20px;
          margin-bottom: -30px;
          pointer-events: none;
        }

        .testimonial-text {
          font-family: var(--font-playfair, serif);
          font-size: clamp(16px, 1.8vw, 20px);
          line-height: 1.8;
          color: var(--navy2);
          font-style: italic;
          margin-bottom: 30px;
          position: relative;
          z-index: 1;
        }

        .write-review-btn {
          background: none;
          border: 1.5px dashed var(--gold);
          color: var(--navy);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-right: 6px;
          outline: none;
          font-family: inherit;
        }

        .write-review-btn:hover {
          background: var(--navy);
          color: var(--gold);
          border-style: solid;
          border-color: var(--navy);
          transform: scale(1.03);
        }

        .nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.3);
          background: #fff;
          color: var(--navy);
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .nav-btn:hover {
          background: var(--navy);
          color: var(--gold);
          border-color: var(--navy);
          transform: scale(1.05);
        }

        .selector-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .selector-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.03);
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
          width: 100%;
        }

        .selector-item:hover {
          transform: translateX(6px);
          box-shadow: 0 8px 20px rgba(10,22,40,0.05);
          border-color: rgba(201,168,76,0.3);
        }

        .selector-item.active {
          background: var(--navy);
          border-color: var(--gold);
          box-shadow: 0 10px 25px rgba(10,22,40,0.15);
        }

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--navy);
          color: var(--gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-playfair, serif);
          font-size: 18px;
          font-weight: 700;
          flex-shrink: 0;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .avatar.active {
          background: var(--gold);
          color: var(--navy);
          border-color: #fff;
        }

        .selector-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--navy);
          transition: color 0.3s ease;
        }

        .selector-item.active .selector-name {
          color: #fff;
        }

        .selector-role {
          font-size: 12px;
          color: var(--gray);
          transition: color 0.3s ease;
        }

        .selector-item.active .selector-role {
          color: rgba(255,255,255,0.7);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media(max-width: 900px) {
          .testimonial-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .selector-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .active-card-container {
            min-height: auto;
          }
        }

        @media(max-width: 650px) {
          .card-footer {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 20px;
          }
          .controls-container {
            width: 100%;
            justify-content: space-between;
          }
          .write-review-btn {
            margin-right: 0;
          }
        }

        @media(max-width: 600px) {
          .selector-grid {
            grid-template-columns: 1fr;
          }
          .selector-item:hover {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </section>
  );
}
