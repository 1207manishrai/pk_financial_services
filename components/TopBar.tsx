export default function TopBar() {
  return (
    <div style={{ background: "var(--navy)", color: "#a0aec0", fontSize: 12, padding: "7px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
      <span>⏰ Opening Time: Mon–Sat 09:00 to 18:00</span>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <a href="#" style={{ color: "#a0aec0", textDecoration: "none" }}>FAQ</a>
        <a href="#" style={{ color: "#a0aec0", textDecoration: "none" }}>Help Desk</a>
        <a href="#" style={{ color: "#a0aec0", textDecoration: "none" }}>PMS</a>
        <a href="#" style={{ color: "#a0aec0", textDecoration: "none" }}>NRI Desk</a>
        <a href="#" style={{ color: "#a0aec0", textDecoration: "none" }}>FD / Bonds</a>
      </div>
    </div>
  );
}
