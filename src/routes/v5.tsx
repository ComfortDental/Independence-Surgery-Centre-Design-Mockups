import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import buildingFront from "@/assets/building-front-v2.png.asset.json";
import buildingEntry from "@/assets/building-entry.png.asset.json";
import buildingSide from "@/assets/building-side-v2.png.asset.json";
import buildingSignage from "@/assets/building-signage.png.asset.json";
import iscLogo from "@/assets/isc-logo.png.asset.json";
import iscLogoWhite from "@/assets/isc-logo-white.png.asset.json";

export const Route = createFileRoute("/v5")({
  head: () => ({
    meta: [
      { title: "Independence Surgery Center — The door that opens" },
      {
        name: "description",
        content:
          "A doctor-owned surgery center built for the patients everyone else sent home. Opening Q4 2026 in Independence, Missouri.",
      },
      { property: "og:title", content: "Independence Surgery Center" },
      {
        property: "og:description",
        content: "For the patients everyone else sent home. Opening Q4 2026.",
      },
      { property: "og:image", content: buildingFront.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: buildingFront.url },
    ],
  }),
  component: V5,
});

const SECTIONS = [
  { id: "problem", index: "01", label: "The problem" },
  { id: "why", index: "02", label: "Why this exists" },
  { id: "place", index: "03", label: "The place" },
  { id: "care", index: "04", label: "What we do" },
  { id: "people", index: "05", label: "The people" },
  { id: "promise", index: "06", label: "The promise" },
  { id: "refer", index: "07", label: "Refer" },
];

const DOCTORS = [
  { name: "Dr. Sarah Chen", credential: "Oral & Maxillofacial Surgery", img: buildingEntry.url },
  { name: "Dr. Marcus Reed", credential: "Pediatric Dentistry, DDS", img: buildingSide.url },
  { name: "Dr. Amara Okafor", credential: "Anesthesiology, MD", img: buildingSignage.url },
  { name: "Dr. James Whitley", credential: "OMFS, Trauma Reconstruction", img: buildingFront.url },
];

/* ---------- hooks ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.filter((e) => e.isIntersecting).forEach((e, i) => {
          const el = e.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(i, 6) * 80}ms`;
          el.classList.add("is-in");
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92) {
        el.classList.add("is-in");
      } else io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

function useCountUp(ref: React.RefObject<HTMLElement | null>, target: number, duration = 1600) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, target, duration]);
}

function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0]);
  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id);
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = SECTIONS[0];
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].offsetTop <= y) current = SECTIONS[i];
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return active;
}

/* ---------- page ---------- */
function V5() {
  useReveal();
  const [coldOpen, setColdOpen] = useState(true);
  const active = useActiveSection();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setColdOpen(false);
      document.body.style.overflow = "";
    }, 2800);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="v5">
      {coldOpen && (
        <div className="v5-cold">
          <p className="v5-cold-line">Twelve. That's the average.</p>
        </div>
      )}

      <Nav />

      {/* Sticky left rail */}
      <aside className="v5-rail" aria-hidden="true">
        <div className="v5-rail-inner">
          <span className="v5-rail-num">{active.index}</span>
          <span className="v5-rail-bar" />
          <span className="v5-rail-label">{active.label}</span>
        </div>
      </aside>

      <Hero />
      <Problem />
      <Why />
      <Place />
      <Care />
      <People />
      <Promise />
      <Refer />
      <Footer />
    </div>
  );
}

/* ---------- nav ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const items = [
    { l: "Problem", h: "#problem" },
    { l: "Why", h: "#why" },
    { l: "Place", h: "#place" },
    { l: "Care", h: "#care" },
    { l: "People", h: "#people" },
  ];

  return (
    <header className={`v5-nav ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#top" className="v5-nav-brand">
        <img src={iscLogo.url} alt="Independence Surgery Center" />
      </a>
      <nav className="v5-nav-links">
        {items.map((i) => (
          <a key={i.h} href={i.h} className="v5-link">
            <span>{i.l}</span>
            <span aria-hidden="true">{i.l}</span>
          </a>
        ))}
      </nav>
      <a href="#refer" className="v5-nav-cta">Refer a patient</a>
      <button
        className={`v5-burger ${open ? "is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>
      <div className={`v5-overlay ${open ? "is-open" : ""}`} onClick={() => setOpen(false)}>
        <nav onClick={(e) => e.stopPropagation()}>
          {items.map((i) => (
            <a key={i.h} href={i.h} onClick={() => setOpen(false)}>{i.l}</a>
          ))}
          <a href="#refer" onClick={() => setOpen(false)} className="v5-overlay-cta">
            Refer a patient →
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ---------- sections ---------- */
function Hero() {
  return (
    <section id="top" className="v5-hero">
      <div className="v5-hero-img" style={{ backgroundImage: `url(${buildingFront.url})` }} />
      <div className="v5-hero-veil" />
      <div className="v5-hero-inner">
        <div className="v5-eyebrow v5-hero-eyebrow">
          <span className="v5-dot" /> Opening Q4 2026 · Independence, Missouri
        </div>
        <h1 className="v5-display v5-hero-h1">
          <span className="v5-line"><span>A surgery center</span></span>
          <span className="v5-line"><span>for the patients</span></span>
          <span className="v5-line"><span><em>everyone else sent home.</em></span></span>
        </h1>
        <div className="v5-hero-cta" data-reveal>
          <a href="#refer" className="v5-ghost">Refer a patient</a>
          <a href="#problem" className="v5-scroll-hint">
            <span>Scroll</span>
            <span className="v5-scroll-line" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref, 12);
  return (
    <section id="problem" className="v5-section v5-problem">
      <div className="v5-shell">
        <p className="v5-eyebrow" data-reveal>01 — The problem</p>
        <div className="v5-problem-row">
          <span ref={ref} className="v5-bignum" data-reveal>0</span>
          <p className="v5-problem-lede" data-reveal>
            private oral surgeons in greater Kansas City accept Medicaid.
            <br />
            <span>That number is why this building exists.</span>
          </p>
        </div>
        <ul className="v5-stats">
          <li data-reveal>
            <span className="v5-stat-k">Avg. 12</span>
            <span className="v5-stat-v">offices a family calls before they're seen.</span>
          </li>
          <li data-reveal>
            <span className="v5-stat-k">6+ months</span>
            <span className="v5-stat-v">typical wait for a special-needs surgical case.</span>
          </li>
          <li data-reveal>
            <span className="v5-stat-k">0</span>
            <span className="v5-stat-v">centers like this one in the metro. Until now.</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section id="why" className="v5-section v5-why">
      <div className="v5-shell v5-why-grid">
        <aside data-reveal>
          <p className="v5-eyebrow">02 — Why this exists</p>
          <blockquote className="v5-pullquote">
            <em>
              "We didn't build this to be different. We built it because
              someone had to."
            </em>
          </blockquote>
          <p className="v5-quote-attrib">— The founding clinicians</p>
        </aside>
        <div className="v5-why-prose">
          <p data-reveal>
            <span className="v5-dropcap">F</span>or two decades the answer for
            a Medicaid family needing oral surgery in this region was a phone
            tree, a waitlist, or a four-hour drive. The system didn't break.
            It was built this way.
          </p>
          <p data-reveal>
            Independence Surgery Center is the response of a group of
            surgeons, anesthesiologists, and operators who decided the next
            patient turned away would be the last.
          </p>
          <p data-reveal>
            Doctor-owned. Doctor-funded. No private equity. No hospital
            system. Four operating rooms, running simultaneously, built to
            the same standard you'd expect on the wealthiest side of any
            city — and open to the patients the wealthiest side won't see.
          </p>
        </div>
      </div>
    </section>
  );
}

function Place() {
  return (
    <section id="place" className="v5-section v5-place">
      <p className="v5-eyebrow v5-place-eyebrow" data-reveal>03 — The place</p>
      <div className="v5-place-img" data-reveal>
        <img src={buildingSide.url} alt="Independence Surgery Center" />
      </div>
      <div className="v5-place-meta" data-reveal>
        <span>19921 E Jackson Dr</span>
        <span>4 operating rooms</span>
        <span>Owner-operated</span>
        <span>No PE · No hospital system</span>
      </div>
    </section>
  );
}

function Care() {
  const tiles = [
    {
      n: "01",
      name: "Oral & Maxillofacial",
      line: "Wisdom teeth, impactions, trauma reconstruction, full-mouth rehabilitation under general anesthesia.",
      img: buildingEntry.url,
    },
    {
      n: "02",
      name: "Pediatric Dental",
      line: "Comprehensive dental treatment for children and special-needs patients in a true OR setting.",
      img: buildingSignage.url,
    },
  ];
  return (
    <section id="care" className="v5-section v5-care">
      <div className="v5-shell">
        <p className="v5-eyebrow" data-reveal>04 — What we do</p>
        <h2 className="v5-h2" data-reveal>
          Two specialties. <em>Done thoroughly.</em>
        </h2>
        <div className="v5-care-grid">
          {tiles.map((t) => (
            <article key={t.n} className="v5-tile" data-reveal>
              <div className="v5-tile-img" style={{ backgroundImage: `url(${t.img})` }} />
              <div className="v5-tile-body">
                <span className="v5-tile-n">{t.n}</span>
                <h3>{t.name}</h3>
                <p>{t.line}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function People() {
  return (
    <section id="people" className="v5-section v5-people">
      <div className="v5-shell">
        <p className="v5-eyebrow" data-reveal>05 — The people</p>
        <h2 className="v5-h2" data-reveal>
          The clinicians <em>who showed up.</em>
        </h2>
      </div>
      <div className="v5-people-row">
        {DOCTORS.map((d, i) => (
          <figure key={d.name} className="v5-doc" data-reveal style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="v5-doc-img" style={{ backgroundImage: `url(${d.img})` }} />
            <figcaption>
              <p className="v5-doc-name">{d.name}</p>
              <p className="v5-doc-cred">{d.credential}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Promise() {
  return (
    <section id="promise" className="v5-section v5-promise">
      <div className="v5-promise-clip" data-reveal>
        <p className="v5-eyebrow v5-promise-eyebrow">06 — The promise</p>
        <p className="v5-promise-line">
          If you've been turned away, <em>we will see you.</em>
        </p>
      </div>
    </section>
  );
}

function Refer() {
  const [tab, setTab] = useState<"provider" | "family">("provider");
  return (
    <section id="refer" className="v5-section v5-refer">
      <div className="v5-shell v5-refer-grid">
        <div className="v5-refer-intro">
          <p className="v5-eyebrow" data-reveal>07 — Refer</p>
          <h2 className="v5-h2" data-reveal>
            Building our referral network <em>now.</em>
          </h2>
          <p className="v5-refer-urg" data-reveal>
            Doors open Q4 2026. Get your patients on the list before we open.
          </p>
          <ul className="v5-refer-contact" data-reveal>
            <li><span>Call</span><a href="tel:8162710110">816-271-0110</a></li>
            <li><span>Email</span><a href="mailto:info@independencesc.com">info@independencesc.com</a></li>
            <li><span>Visit</span><span>19921 E Jackson Dr, Independence, MO 64057</span></li>
          </ul>
        </div>
        <form className="v5-form" data-reveal onSubmit={(e) => e.preventDefault()}>
          <div className="v5-tabs">
            <button
              type="button"
              className={tab === "provider" ? "is-active" : ""}
              onClick={() => setTab("provider")}
            >I'm a provider</button>
            <button
              type="button"
              className={tab === "family" ? "is-active" : ""}
              onClick={() => setTab("family")}
            >Patient / family</button>
          </div>
          <label>
            <span>Name</span>
            <input type="text" placeholder="Your full name" />
          </label>
          <label>
            <span>{tab === "provider" ? "Practice / organization" : "Relationship"}</span>
            <input type="text" placeholder={tab === "provider" ? "e.g. KC Pediatric Dental" : "e.g. Parent, guardian"} />
          </label>
          <div className="v5-form-row">
            <label>
              <span>Email</span>
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              <span>Phone</span>
              <input type="tel" placeholder="(816) 000-0000" />
            </label>
          </div>
          <label>
            <span>About the case</span>
            <textarea rows={4} placeholder="A few sentences about the patient or your question." />
          </label>
          <button type="submit" className="v5-submit">
            Send referral <span aria-hidden="true">→</span>
          </button>
          <p className="v5-form-note">Secure intake. We respond within one business day.</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="v5-footer">
      <div className="v5-shell v5-footer-grid">
        <div>
          <img src={iscLogoWhite.url} alt="Independence Surgery Center" className="v5-footer-logo" />
          <p>For the patients everyone else sent home.</p>
        </div>
        <div>
          <p>19921 E Jackson Dr</p>
          <p>Independence, Missouri 64057</p>
        </div>
        <div>
          <p>816-271-0110</p>
          <p>info@independencesc.com</p>
        </div>
      </div>
      <div className="v5-footer-base">
        <span>© 2026 Independence Surgery Center</span>
        <span>Opening Q4 2026</span>
      </div>
    </footer>
  );
}
