"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { num: 6, suffix: "+", label: "Years of Experience" },
  { num: 1000, suffix: "+", label: "Happy Clients", prefix: "" },
  { num: 98, suffix: "%", label: "Client Satisfaction" },
];

function Counter({ num, suffix, prefix = "" }: { num: number; suffix: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setVal(Math.round(ease * num));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [num]);
  return <span ref={ref}>{prefix}{val.toLocaleString("en-IN")}{suffix}</span>;
}

export default function Stats() {
  return (
    <div style={{ background: "var(--gold)", padding: "28px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, textAlign: "center" }} className="stats-grid">
        {stats.map((s) => (
          <div key={s.label}>
            <div style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 36, fontWeight: 700, color: "var(--navy)" }}>
              <Counter num={s.num} suffix={s.suffix} prefix={s.prefix} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "rgba(10,22,40,.7)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:600px){ .stats-grid{ grid-template-columns:repeat(2,1fr) !important; } }`}</style>
    </div>
  );
}
