import { createFileRoute, Link } from "@tanstack/react-router";
import iscLogo from "@/assets/isc-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Independence Surgery Center — Design Versions" },
      { name: "description", content: "Browse the design directions for Independence Surgery Center." },
    ],
  }),
  component: Hub,
});

type Version = {
  to: "/v1" | "/v2" | "/v3" | "/v4" | "/v5";
  tag: string;
  name: string;
  desc: string;
  palette: string[];
};

const versions: Version[] = [
  {
    to: "/v1",
    tag: "v1",
    name: "Design A — Warm Editorial",
    desc: "Cream, rust, and sage. Spectral serif. The original warm direction.",
    palette: ["#F4EFE6", "#B85C38", "#4A6B5C", "#1A1A1A"],
  },
  {
    to: "/v2",
    tag: "v2",
    name: "Design A — Enhanced",
    desc: "Cold open, spine progress line, parallax, typographic number wall.",
    palette: ["#0B0B0B", "#F4EFE6", "#B85C38", "#4A6B5C"],
  },
  {
    to: "/v3",
    tag: "v3",
    name: "Design B — Grounded Clinical",
    desc: "Forest green, warm tan, Mulish + Newsreader. Full-bleed clinical.",
    palette: ["#F2EDE2", "#1F4A3D", "#0F2A22", "#C9A66B"],
  },
  {
    to: "/v4",
    tag: "v4",
    name: "Design B — Enhanced",
    desc: "Line-reveal hero, parallax, diagonal cut, urgency-led copy.",
    palette: ["#0F2A22", "#FFD2A8", "#F2EDE2", "#1F4A3D"],
  },
];

function Hub() {
  return (
    <main className="hub">
      <header className="hub-nav">
        <img src={iscLogo.url} alt="Independence Surgery Center" />
        <span className="hub-nav-meta">Design Index · 2026</span>
      </header>

      <section className="hub-intro">
        <p className="hub-eyebrow"><span className="hub-dot" /> Independence Surgery Center</p>
        <h1 className="hub-title">2 designs. 4 prototypes to choose from.</h1>
      </section>

      <section className="hub-grid">
        {versions.map((v, i) => (
          <Link key={v.to} to={v.to} className="hub-card" style={{ animationDelay: `${0.08 * i}s` }}>
            <div className="hub-card-head">
              <span className="hub-tag">{v.tag}</span>
              <span className="hub-arrow" aria-hidden>→</span>
            </div>
            <div className="hub-swatch">
              {v.palette.map((c) => <span key={c} style={{ background: c }} />)}
            </div>
            <h2>{v.name}</h2>
            <p>{v.desc}</p>
            <span className="hub-cta">View version</span>
          </Link>
        ))}
      </section>

      <footer className="hub-foot">
        <span>© 2026 Independence Surgery Center</span>
        <span>Opening Q4 2026 · Independence, MO</span>
      </footer>
    </main>
  );
}
