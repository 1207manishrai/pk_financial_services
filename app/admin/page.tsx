"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

interface Enquiry {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  status: string;
  submittedAt: string;
}

interface Review {
  init: string;
  name: string;
  role: string;
  text: string;
  category: string;
  rating: number;
}

export default function AdminPortal() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Data States
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"enquiries" | "reviews">("enquiries");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updateMessage, setUpdateMessage] = useState("");

  // Check sessionStorage on mount
  useEffect(() => {
    const auth = sessionStorage.getItem("pk_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      fetchAdminData();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.toLowerCase() === "admin" && password === "admin123") {
      sessionStorage.setItem("pk_admin_auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
      fetchAdminData();
    } else {
      setLoginError("Invalid Administrator credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("pk_admin_auth");
    setIsAuthenticated(false);
    setEnquiries([]);
    setReviews([]);
  };

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [enqRes, revRes] = await Promise.all([
        fetch("/api/enquiry"),
        fetch("/api/reviews")
      ]);
      
      const enqData = await enqRes.json();
      if (enqData.success) {
        setEnquiries(enqData.enquiries || []);
      }
      
      const revData = await revRes.json();
      if (Array.isArray(revData)) {
        setReviews(revData);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (phone: string, submittedAt: string, newStatus: string) => {
    try {
      const res = await fetch("/api/enquiry", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, submittedAt, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        // Update local list state
        setEnquiries(prev => prev.map(e => {
          if (e.phone === phone && e.submittedAt === submittedAt) {
            return { ...e, status: newStatus };
          }
          return e;
        }));
        
        setUpdateMessage(`Successfully updated status to "${newStatus}"`);
        setTimeout(() => setUpdateMessage(""), 3000);
      } else {
        alert(data.error || "Failed to update status.");
      }
    } catch (err) {
      alert("Error updating status. Please try again.");
    }
  };

  // Helper Stats calculations
  const totalEnquiries = enquiries.length;
  const pendingEnquiries = enquiries.filter(e => e.status === "Pending Review" || !e.status).length;
  const contactedEnquiries = enquiries.filter(e => e.status === "In Contact").length;
  const resolvedEnquiries = enquiries.filter(e => e.status === "Resolved").length;

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) 
    : "N/A";

  // Filtered enquiries
  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = 
      e.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery) ||
      e.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const mappedStatus = e.status || "Pending Review";
    const matchesStatus = statusFilter === "All" || mappedStatus === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <TopBar />
      
      {/* Mini Breadcrumb Header */}
      <div style={{ background: "var(--navy)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid var(--gold)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/" style={{ color: "var(--gold)", textDecoration: "none", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
            ← Home
          </Link>
          <span style={{ color: "rgba(255,255,255,0.4)" }}>|</span>
          <span style={{ color: "#ffffff", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
            Advisor Admin Portal
          </span>
        </div>
        {isAuthenticated && (
          <button onClick={handleLogout} style={{ background: "none", border: "1px solid var(--gold)", color: "var(--gold)", padding: "4px 12px", borderRadius: 4, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>
            LOGOUT
          </button>
        )}
      </div>

      <main style={{ minHeight: "75vh", background: "var(--cream)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          
          {/* LOGIN GATE */}
          {!isAuthenticated ? (
            <div style={{
              background: "#ffffff",
              borderRadius: 16,
              boxShadow: "0 15px 40px rgba(10,22,40,0.08)",
              border: "1px solid #e5e0d8",
              maxWidth: 420,
              margin: "60px auto",
              textAlign: "center"
            }}>
              <div style={{ display: "inline-flex", justifyContent: "center", marginBottom: 20 }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ width: 80, height: 80 }} fill="url(#goldGradient)">
                  <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--gold)" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                  {/* Head */}
                  <ellipse cx="50" cy="32" rx="16" ry="21" />
                  {/* Shoulders / Suit */}
                  <path d="M14,90 C14,80 18,70 32,63 C40,58 42,58 45,71 L48,80 L52,80 L55,71 C58,58 60,58 68,63 C82,70 86,80 86,90 L86,92 C86,94.2 84.2,96 82,96 L18,96 C15.8,96 14,94.2 14,92 Z" />
                  {/* Tie */}
                  <polygon points="48,72 52,72 51,77 49,77" />
                  <polygon points="49.2,78 50.8,78 52,90 50,93 48,90" />
                </svg>
              </div>
              <h2 style={{ fontFamily: "var(--font-playfair, serif)", color: "var(--navy)", margin: "0 0 8px 0", fontSize: 24, fontWeight: 700 }}>
                Advisor Login
              </h2>
              <p style={{ color: "var(--gray)", fontSize: 13.5, margin: "0 0 28px 0", lineHeight: 1.5 }}>
                Enter credentials to securely view investor enquiries and client reviews.
              </p>

              <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--navy)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. admin"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 6,
                      border: "1px solid #cbd5e1",
                      fontSize: 14,
                      outline: "none"
                    }}
                  />
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--navy)", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 6,
                      border: "1px solid #cbd5e1",
                      fontSize: 14,
                      outline: "none"
                    }}
                  />
                </div>

                {loginError && (
                  <div style={{ color: "#ef4444", fontSize: 12.5, fontWeight: 500, marginBottom: 18 }}>
                    ⚠️ {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, var(--navy), #1e3a5f)",
                    color: "#ffffff",
                    border: "none",
                    padding: "12px",
                    borderRadius: 6,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(10,22,40,0.15)"
                  }}
                >
                  Access Dashboard
                </button>
              </form>
            </div>
          ) : (
            // LOGGED-IN DASHBOARD VIEW
            <div>
              {/* Analytics Section */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 20,
                marginBottom: 32
              }}>
                <div style={{ background: "#ffffff", border: "1px solid #e5e0d8", padding: "20px 24px", borderRadius: 12, boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--gray)", textTransform: "uppercase", letterSpacing: 0.5 }}>Total Enquiries</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "var(--navy)", marginTop: 6 }}>{totalEnquiries}</div>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid #e5e0d8", padding: "20px 24px", borderRadius: 12, boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#d97706", textTransform: "uppercase", letterSpacing: 0.5 }}>Pending Review</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#d97706", marginTop: 6 }}>{pendingEnquiries}</div>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid #e5e0d8", padding: "20px 24px", borderRadius: 12, boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#2563eb", textTransform: "uppercase", letterSpacing: 0.5 }}>In Contact</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#2563eb", marginTop: 6 }}>{contactedEnquiries}</div>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid #e5e0d8", padding: "20px 24px", borderRadius: 12, boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: 0.5 }}>Resolved</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#16a34a", marginTop: 6 }}>{resolvedEnquiries}</div>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid #e5e0d8", padding: "20px 24px", borderRadius: 12, boxShadow: "0 4px 15px rgba(0,0,0,0.02)" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: 0.5 }}>Average Rating</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "var(--gold)", marginTop: 6 }}>{averageRating} ★</div>
                </div>
              </div>

              {/* Toast message alert */}
              {updateMessage && (
                <div style={{
                  background: "#ecfdf5",
                  border: "1px solid #10b981",
                  color: "#065f46",
                  padding: "12px 18px",
                  borderRadius: 6,
                  marginBottom: 20,
                  fontSize: 14,
                  fontWeight: 600,
                  transition: "opacity 0.3s ease"
                }}>
                  ✅ {updateMessage}
                </div>
              )}

              {/* Tabs Section */}
              <div style={{ display: "flex", borderBottom: "2px solid #e5e0d8", marginBottom: 24, gap: 12 }}>
                <button
                  onClick={() => setActiveTab("enquiries")}
                  style={{
                    background: "none",
                    border: "none",
                    borderBottom: activeTab === "enquiries" ? "3px solid var(--navy)" : "3px solid transparent",
                    color: activeTab === "enquiries" ? "var(--navy)" : "var(--gray)",
                    padding: "10px 16px",
                    cursor: "pointer",
                    fontSize: 15,
                    fontWeight: 700,
                    fontFamily: "inherit"
                  }}
                >
                  📁 Client Enquiries ({enquiries.length})
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  style={{
                    background: "none",
                    border: "none",
                    borderBottom: activeTab === "reviews" ? "3px solid var(--navy)" : "3px solid transparent",
                    color: activeTab === "reviews" ? "var(--navy)" : "var(--gray)",
                    padding: "10px 16px",
                    cursor: "pointer",
                    fontSize: 15,
                    fontWeight: 700,
                    fontFamily: "inherit"
                  }}
                >
                  💬 Client Reviews ({reviews.length})
                </button>
              </div>

              {/* Loader */}
              {loading ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div className="spinner-admin" />
                  <p style={{ marginTop: 12, color: "var(--navy)", fontWeight: 600 }}>Syncing records...</p>
                </div>
              ) : activeTab === "enquiries" ? (
                
                // TAB 1: ENQUIRIES PANEL
                <div>
                  {/* Filters Bar */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    flexWrap: "wrap",
                    marginBottom: 20
                  }}>
                    <input
                      type="text"
                      placeholder="Search enquiries by name, phone, service..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        flex: "1 1 300px",
                        padding: "10px 16px",
                        borderRadius: 8,
                        border: "1px solid #cbd5e1",
                        fontSize: 14,
                        outline: "none"
                      }}
                    />

                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>Status:</span>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{
                          padding: "10px 14px",
                          borderRadius: 8,
                          border: "1px solid #cbd5e1",
                          fontSize: 13.5,
                          fontWeight: 600,
                          outline: "none",
                          cursor: "pointer"
                        }}
                      >
                        <option value="All">All Statuses</option>
                        <option value="Pending Review">Pending Review</option>
                        <option value="In Contact">In Contact</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                  </div>

                  {/* List Board */}
                  {filteredEnquiries.length === 0 ? (
                    <div style={{ background: "#ffffff", padding: "40px", borderRadius: 12, border: "1px solid #e5e0d8", textAlign: "center", color: "var(--gray)" }}>
                      No enquiries found matching this search or filter.
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {filteredEnquiries.map((e, idx) => {
                        const currentStatus = e.status || "Pending Review";
                        let statusColor = "#d97706"; // orange
                        let statusBg = "#fef3c7";
                        if (currentStatus === "In Contact") {
                          statusColor = "#2563eb"; // blue
                          statusBg = "#dbeafe";
                        } else if (currentStatus === "Resolved") {
                          statusColor = "#16a34a"; // green
                          statusBg = "#dcfce7";
                        }

                        return (
                          <div key={idx} style={{
                            background: "#ffffff",
                            border: "1px solid #e5e0d8",
                            borderRadius: 12,
                            boxShadow: "0 4px 15px rgba(0,0,0,0.01)",
                            padding: "24px",
                            display: "flex",
                            flexDirection: "column",
                            gap: 16
                          }}>
                            {/* Card Top */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                              <div>
                                <h3 style={{ margin: "0 0 4px 0", color: "var(--navy)", fontSize: 16, fontWeight: 800 }}>
                                  {e.fullName}
                                </h3>
                                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13, color: "var(--gray)" }}>
                                  <span>📞 {e.phone}</span>
                                  {e.email && <span>✉️ {e.email}</span>}
                                  <span>📅 {new Date(e.submittedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                                </div>
                              </div>

                              {/* Status Select Box */}
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span style={{
                                  background: statusBg,
                                  color: statusColor,
                                  fontSize: 11,
                                  fontWeight: 700,
                                  padding: "4px 10px",
                                  borderRadius: 20,
                                  textTransform: "uppercase"
                                }}>
                                  {currentStatus}
                                </span>
                                <select
                                  value={currentStatus}
                                  onChange={(evt) => handleStatusChange(e.phone, e.submittedAt, evt.target.value)}
                                  style={{
                                    padding: "4px 8px",
                                    borderRadius: 6,
                                    border: "1px solid #cbd5e1",
                                    fontSize: 12,
                                    fontWeight: 600,
                                    outline: "none",
                                    cursor: "pointer"
                                  }}
                                >
                                  <option value="Pending Review">Pending Review</option>
                                  <option value="In Contact">In Contact</option>
                                  <option value="Resolved">Resolved</option>
                                </select>
                              </div>
                            </div>

                            {/* Divider */}
                            <div style={{ height: "1px", background: "#f1f5f9" }} />

                            {/* Service and Message details */}
                            <div>
                              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                                Requested Service:
                              </div>
                              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--gold)", background: "rgba(201,168,76,0.06)", padding: "3px 8px", borderRadius: 4, display: "inline-block", marginBottom: 8 }}>
                                {e.service}
                              </span>

                              {e.message && (
                                <div style={{ marginTop: 8 }}>
                                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>
                                    Message:
                                  </div>
                                  <p style={{ margin: 0, fontSize: 13.5, color: "#475569", lineHeight: 1.5, background: "rgba(10,22,40,0.01)", padding: "10px 14px", borderRadius: 8, border: "1px solid #f1f5f9" }}>
                                    {e.message}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                
                // TAB 2: REVIEWS PANEL
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
                  {reviews.length === 0 ? (
                    <div style={{ gridColumn: "1/-1", background: "#ffffff", padding: "40px", borderRadius: 12, border: "1px solid #e5e0d8", textAlign: "center", color: "var(--gray)" }}>
                      No client reviews submitted yet.
                    </div>
                  ) : (
                    reviews.map((r, idx) => (
                      <div key={idx} style={{
                        background: "#ffffff",
                        border: "1px solid #e5e0d8",
                        borderRadius: 12,
                        padding: "24px",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.01)"
                      }}>
                        {/* Rating header */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                          <span style={{ color: "var(--gold)", fontSize: 16, fontWeight: "bold" }}>
                            {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                          </span>
                          <span style={{ background: "rgba(10,22,40,0.04)", fontSize: 11, color: "var(--navy)", fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                            {r.category}
                          </span>
                        </div>

                        <p style={{ margin: "0 0 16px 0", fontSize: 13.5, color: "#475569", lineHeight: 1.6, fontStyle: "italic" }}>
                          "{r.text}"
                        </p>

                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{
                            width: 38,
                            height: 38,
                            borderRadius: "50%",
                            background: "var(--navy)",
                            color: "var(--gold)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            fontWeight: 700
                          }}>
                            {r.init || r.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 style={{ margin: 0, color: "var(--navy)", fontSize: 13.5, fontWeight: 700 }}>{r.name}</h4>
                            <span style={{ fontSize: 11, color: "var(--gray)" }}>{r.role}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              )}

            </div>
          )}

        </div>
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        .spinner-admin {
          width: 36px;
          height: 36px;
          border: 3.5px solid rgba(201,168,76,0.15);
          border-top-color: var(--navy);
          border-radius: 50%;
          display: inline-block;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}} />
    </>
  );
}
