import { createFileRoute } from "@tanstack/react-router";
import buildingFront from "@/assets/building-front-v2.png.asset.json";
import buildingEntry from "@/assets/building-entry.png.asset.json";
import buildingSide from "@/assets/building-side-v2.png.asset.json";
import buildingSignage from "@/assets/building-signage.png.asset.json";
import iscLogo from "@/assets/isc-logo.png.asset.json";
import iscLogoWhite from "@/assets/isc-logo-white.png.asset.json";
import logoOral from "@/assets/logo-oral.png.asset.json";
import logoPedi from "@/assets/logo-pedi.png.asset.json";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/v2")({
  head: () => ({
    meta: [
      { title: "Independence Surgery Center — Opening Q4 2026" },
      {
        name: "description",
        content:
          "A doctor-owned, doctor-funded ambulatory surgery center in Independence, MO. Built so Medicaid, Medicare, and special-needs patients finally have somewhere to go.",
      },
      { property: "og:title", content: "Independence Surgery Center" },
      {
        property: "og:description",
        content:
          "The surgery center that should already exist. Doctor-owned. Doctor-funded. Opening Q4 2026 in Independence, MO.",
      },
      { property: "og:image", content: buildingFront.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: buildingFront.url },
    ],
  }),
  component: Index,
});

const navLinks = [
  { label: "Our Story", href: "#story" },
  { label: "Care", href: "#care" },
  { label: "Doctors", href: "#doctors" },
  { label: "Facility", href: "#facility" },
  { label: "Access", href: "#access" },
  { label: "Refer a Patient", href: "#refer" },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        // Stagger only within the current batch (siblings entering together),
        // capped so fast scrolls never leave anything hidden.
        const incoming = entries.filter((e) => e.isIntersecting);
        incoming.forEach((e, i) => {
          const el = e.target as HTMLElement;
          el.style.animationDelay = `${Math.min(i, 5) * 0.06}s`;
          el.classList.add("visible");
          io.unobserve(el);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => {
      // If already in or above the viewport on mount, reveal immediately.
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) {
        el.style.animationDelay = "0s";
        el.classList.add("visible");
      } else {
        io.observe(el);
      }
    });
    // Safety net: anything still hidden after a short delay (e.g. user scrolled
    // past before the observer fired) gets revealed without animation skip.
    const failsafe = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.visible)").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) {
          el.classList.add("visible");
          io.unobserve(el);
          }
      });
    }, 400);
    return () => {
      window.clearTimeout(failsafe);
      io.disconnect();
    };
  }, []);
}

function useCountUp() {
  useEffect(() => {
    const animate = (el: HTMLElement) => {
      const to = Number(el.dataset.countTo ?? "0");
      const from = Number(el.dataset.countFrom ?? "40");
      const duration = Number(el.dataset.countDur ?? "1800");
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(from - (from - to) * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const els = document.querySelectorAll<HTMLElement>(".count-up");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useMagnetic() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".magnetic");
    const onMove = (e: MouseEvent, btn: HTMLElement) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    };
    const reset = (btn: HTMLElement) => {
      btn.style.transition = "transform 0.45s cubic-bezier(0.22,1,0.36,1)";
      btn.style.transform = "translate(0,0)";
    };
    const handlers: Array<() => void> = [];
    els.forEach((btn) => {
      const move = (e: MouseEvent) => {
        btn.style.transition = "transform 0.15s ease-out";
        onMove(e, btn);
      };
      const leave = () => reset(btn);
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      handlers.push(() => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", leave);
      });
    });
    return () => handlers.forEach((fn) => fn());
  }, []);
}

function FloatingRefer() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      if (!hero) return;
      const bottom = hero.getBoundingClientRect().bottom;
      setVisible(bottom < -40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a href="#refer" className={`floating-refer magnetic ${visible ? "visible" : ""}`}>
      Refer a Patient <span aria-hidden>→</span>
    </a>
  );
}

function Index() {
  useReveal();
  useCountUp();
  useMagnetic();
  return (
    <div className="min-h-screen bg-background text-foreground v2-root">
      <ColdOpen />
      <Spine />
      <Nav />
      <Hero />
      <Story />
      <PullQuote />
      <Care />
      <Doctors />
      <HowToRefer />
      <FacilityParallax />
      <NumberWall />
      <Values />
      <Refer />
      <Footer />
      <FloatingRefer />
    </div>
  );
}

function Wordmark({ className = "", variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  const src = variant === "light" ? iscLogoWhite.url : iscLogo.url;
  return (
    <a href="#top" className={`group inline-flex items-center ${className}`}>
      <img src={src} alt="Independence Surgery Center" className="h-10 w-auto sm:h-11" />
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header id="top" className="isc-nav">
      <Wordmark />
      <div className="isc-nav-right">
        <nav className="isc-nav-links hidden lg:flex">
          {navLinks.slice(0, -1).map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#refer" className="isc-nav-cta hidden sm:inline-flex">
          Refer a Patient <span aria-hidden>→</span>
        </a>
        <button
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] lg:hidden"
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6l-12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-[var(--line)] bg-[var(--cream)] lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-[var(--ink-soft)] hover:bg-[var(--cream-deep)] hover:text-[var(--ink)]"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-grid-wrap mx-auto" style={{ maxWidth: "1440px" }}>
        <div
          className="inline-flex items-center gap-2 bg-white"
          style={{
            border: "1px solid #E7DCC9",
            borderRadius: "100px",
            padding: "8px 16px",
            color: "#6F7E5E",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          <span
            className="isc-pulse inline-block"
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "999px",
              background: "#6F7E5E",
            }}
          />
          Opening Q4 2026 · Independence, MO
        </div>

        <div className="hero-grid mt-8">
          <div className="hero-copy">
            <h1 className="hero-h1 font-serif text-[var(--ink)]">
              The surgery center
              <br />
              that{" "}
              <em style={{ fontStyle: "italic", color: "#B0593A" }}>
                should already
                <br className="hidden sm:block" /> exist.
              </em>
            </h1>
            <p className="hero-sub">
              A brand-new ambulatory surgery center. Doctor-owned. Doctor-funded. Built so
              Medicaid, Medicare, and special-needs patients finally have somewhere to go.
            </p>
            <div className="hero-cta">
              <a
                href="#refer"
                className="hero-btn-primary"
              >
                Refer a Patient
                <span aria-hidden>→</span>
              </a>
              <a
                href="#story"
                className="hero-btn-ghost"
              >
                Why we built this
              </a>
            </div>
          </div>

          <div className="hero-image relative">
            {/* Layer 1 — decorative peach shape, top-right */}
            <div
              aria-hidden
              className="pointer-events-none absolute z-0"
              style={{
                top: "-18px",
                right: "-18px",
                width: "62%",
                height: "74%",
                background: "#F1E2D2",
                borderRadius: "200px 24px 24px 24px",
              }}
            />

            {/* Layer 2 — the photo with asymmetric huge top-left radius */}
            <img
              src={buildingFront.url}
              alt="Rendering of the Independence Surgery Center building"
              className="relative z-10 block w-full object-cover"
              style={{
                borderRadius: "180px 20px 20px 20px",
                boxShadow: "0 30px 70px rgba(42,36,29,0.18)",
                aspectRatio: "4 / 3",
              }}
            />

            {/* Layer 3 — floating overlay card, bleeds left past the image */}
            <div
              className="float-slow absolute z-20 max-w-[15rem] bg-white"
              style={{
                bottom: "26px",
                left: "-26px",
                padding: "18px 24px",
                borderRadius: "18px",
                boxShadow: "0 16px 40px rgba(42,36,29,0.16)",
              }}
            >
              <div className="font-serif text-[1.35rem] leading-[1.1] text-[var(--terracotta)]">
                Increasing<br />access to care
              </div>
              <div className="mt-2 text-[0.82rem] leading-snug text-[var(--ink-soft)]">
                A focus on Medicaid<br />&amp; Medicare patients.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

function Story() {
  return (
    <section id="story" className="story-section">
      <div className="story-inner">
        <div className="story-eyebrow">Our Story</div>
        <h2 className="story-h2">Why this exists</h2>

        <div className="story-grid">
          <div className="story-text">
            <p className="story-lead">
              Two years ago, a speaker at a conference put up a single number.{" "}
              <span style={{ color: "#B0593A", fontWeight: 600 }}>Zero.</span> Not one private oral
              surgeon in the area accepted Medicaid. Then the talk turned to children.
            </p>
            <p>
              Kids with infections spreading through their jaws. Kids who needed surgery under
              general anesthesia and couldn't get into a hospital OR for up to a year.
            </p>
            <p>
              A four-year-old who won't eat because it hurts too much and can't tell you why. A
              parent on the phone for the third time this week, hearing the same answer from every
              office in the city.{" "}
              <em className="story-quote">We don't take that insurance. Try the hospital.</em> Already tried the hospital. A
              teenager with a developmental disability, nonverbal, pulling at their own face because
              that's the only way to say something is wrong. A family leaving work again, sitting in
              another ER, watching a doctor hand over the same antibiotics and the same referral to
              a surgeon who will never call back.
            </p>
            <p>
              That is what it looks like when there's nowhere to go. People in pain, calling numbers
              that lead nowhere, waiting for help that never comes.
            </p>
            <p>
              We left that conference and started drawing up plans. Not a grant proposal. Not a
              volunteer day. A building. With operating rooms. Funded entirely by the doctors who
              would work in it. No private equity. No hospital system. Independence Surgery Center
              is the result.
            </p>
          </div>

          <aside className="story-sidebar">
            <div className="story-stat">
              <div
                className="story-stat-num count-up"
                data-count-from="40"
                data-count-to="0"
                data-count-dur="1800"
              >
                40
              </div>
              <div className="story-stat-text">
                private oral surgeons in the area accepting Medicaid.
              </div>
            </div>

            <div className="story-card">
              <div className="story-card-label" style={{ color: "#6F7E5E" }}>Mission</div>
              <p className="story-card-body">
                Deliver surgical care with precision, safety, and respect. Treat every patient like
                they matter, because they do.
              </p>
            </div>

            <div className="story-card">
              <div className="story-card-label" style={{ color: "#B0593A" }}>Vision</div>
              <p className="story-card-body">
                Build the facility that should already exist. Real operating rooms. Real
                specialists. Real access for Medicaid patients, Medicare patients, and patients
                with special needs who have been waiting too long.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Care() {
  return (
    <section id="care" className="care-section">
      <div className="care-inner">
        <div className="care-header reveal">
          <div className="story-eyebrow">What we do</div>
          <h2 className="story-h2">
            The only place in KC{" "}
            <em style={{ fontStyle: "italic", color: "#B0593A" }}>that does both.</em>
          </h2>
          <p className="care-sub">
            Oral surgery and pediatric dentistry operating side by side. Every case under sedation
            and anesthesia, in a facility built specifically for it.
          </p>
        </div>

        <div className="care-grid">
          <article className="care-card reveal">
            <img src={logoOral.url} alt="Independence Oral Surgery" className="care-logo" />
            <p className="care-body">
              Full-scope oral and maxillofacial surgery led by a dual-degree MD/DMD board
              certified by ABOMS. When you refer here, your patient is treated by the owner of
              the facility. Not a resident. Not a rotation.{" "}
              <span style={{ color: "#2A241D" }}>The same surgeon, every time.</span>
            </p>
          </article>

          <article className="care-card reveal">
            <img src={logoPedi.url} alt="Independence Pediatric Dentistry" className="care-logo" />
            <p className="care-body">
              Some kids can't sit in a dental chair. Special needs, developmental disabilities,
              severe anxiety, complex treatment plans. They need an operating room, a pediatric
              dentist who has done this hundreds of times, and a facility designed around them.{" "}
              <span style={{ color: "#2A241D" }}>That is what this is.</span>
            </p>
          </article>
        </div>

        <div className="care-banner reveal">
          Two specialties. One building.{" "}
          <em style={{ fontStyle: "italic" }}>Designed from scratch</em> to handle volume and do
          it safely.
        </div>
      </div>
    </section>
  );
}

function Doctors() {
  return (
    <section id="doctors" className="doctors-section">
      <div className="care-inner">
        <div className="care-header reveal">
          <div className="story-eyebrow">Our clinicians</div>
          <h2 className="story-h2">
            The doctors who built it{" "}
            <em style={{ fontStyle: "italic", color: "#B0593A" }}>work in it.</em>
          </h2>
          <p className="care-sub">
            These aren't hired guns. They funded the building, designed the workflow, and operate
            in it every day. When you refer a patient here, you know exactly who is treating them.
          </p>
        </div>

        <div className="care-grid">
          <DoctorCard
            specialty="Oral & Maxillofacial Surgery"
            tag="Board-Certified Specialist"
            tagColor="#B0593A"
            body="MD and DMD. Fellowship trained. Board certified by the American Board of Oral and Maxillofacial Surgery. That is the ceiling of the specialty, and he is at it. He could practice anywhere. He chose to build something."
            credentials={["MD + DMD", "Board Certified ABOMS", "Owner-Operator"]}
          />
          <DoctorCard
            specialty="Pediatric Dentistry"
            tag="Board-Certified Specialist"
            tagColor="#5E6E4D"
            body="Board certified. Advanced residency in hospital-based pediatric dentistry and special needs care. The cases other offices can't handle are the ones she built her career around. She is not here by default. She helped design this place."
            credentials={["Board Certified Pediatric Dentist", "Owner-Operator"]}
          />
        </div>

        <figure className="doctors-banner reveal">
          <blockquote className="doctors-banner-quote">
            "No private equity. No hospital system. No outside investors."
          </blockquote>
          <figcaption className="doctors-banner-text">
            The doctors who operate here are the same ones who funded the building. That is a
            different kind of accountability, and you will feel it.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function DoctorCard({
  specialty,
  tag,
  tagColor,
  body,
  credentials,
}: {
  specialty: string;
  tag: string;
  tagColor: string;
  body: string;
  credentials: string[];
}) {
  return (
    <article className="doctor-card reveal">
      <h3 className="doctor-h3">{specialty}</h3>
      <div className="doctor-credential" style={{ color: tagColor }}>
        {tag}
      </div>
      <p className="doctor-body">{body}</p>
      <div className="doctor-pills">
        {credentials.map((c) => (
          <span key={c} className="doctor-pill">
            {c}
          </span>
        ))}
      </div>
    </article>
  );
}

function Facility() {
  return (
    <section id="facility" className="facility-section">
      <div className="facility-inner">
        <div className="facility-header reveal">
          <div className="story-eyebrow">The building</div>
          <h2 className="story-h2">
            Built for this.{" "}
            <em style={{ fontStyle: "italic", color: "#B0593A" }}>Not converted from something else.</em>
          </h2>
          <p className="care-sub">
            Every inch of this building was designed around surgical workflow. Multiple ORs,
            hospital-grade infrastructure, and room to scale. Independence, Missouri.
          </p>
        </div>

        <div className="building-hero-wrap reveal">
          <img
            src={buildingEntry.url}
            alt="Building entry — Independence Surgery Center"
            className="building-hero-img"
          />
        </div>

        <div className="building-gallery">
          {[buildingFront, buildingSide, buildingSignage].map((img, i) => (
            <div key={i} className="building-gallery-wrap reveal">
              <img
                src={img.url}
                alt="Exterior view of the Independence Surgery Center"
                className="building-gallery-img"
              />
            </div>
          ))}
        </div>

        <div className="facility-grid">
          {[
            ["Purpose-Built Design", "Engineered from the ground up for surgical efficiency — not converted from something else."],
            ["Multiple Operating Rooms", "Simultaneous cases running in parallel. Shorter wait times. Higher throughput."],
            ["Hospital-Grade Monitoring", "Full anesthesia capability. Same monitoring, same safety standards, same equipment as a hospital OR."],
            ["Kansas City Metro", "Centrally located in Independence. Easy access from anywhere in the KC metro."],
          ].map(([h, b]) => (
            <div key={h} className="facility-card reveal">
              <h4 className="facility-card-h">{h}</h4>
              <p className="facility-card-body">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Access() {
  return (
    <section id="access" className="access-section reveal">
      <div className="access-inner">
        <div className="access-eyebrow">Access to care</div>
        <h2 className="access-h2">
          The gap{" "}
          <em style={{ fontStyle: "italic", color: "#D98A66" }}>nobody else would close.</em>
        </h2>
        <p className="access-sub">
          Most surgical specialists do not accept Medicaid. Most facilities are not equipped for
          special-needs patients. We built one that does both.
        </p>

        <div className="access-grid">
          <AccessCard
            title="Medicare"
            body="CMS-certified ambulatory surgery center. Full Medicare acceptance. No asterisks."
          />
          <AccessCard
            title="Medicaid"
            highlight
            body="This is the gap that started everything. Most surgical specialists turn Medicaid patients away. We built a surgery center to take them in."
          />
          <AccessCard
            title="Special Needs & IDD"
            body="Patients with intellectual and developmental disabilities need operating rooms, anesthesia teams, and clinicians who know what they are doing. We designed this facility around them."
          />
        </div>
      </div>
    </section>
  );
}

function AccessCard({
  title,
  body,
  highlight,
}: {
  title: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div className={`access-card reveal ${highlight ? "access-card-featured" : ""}`}>
      <h4 className="access-card-h">{title}</h4>
      <p className={`access-card-body ${highlight ? "is-featured" : ""}`}>{body}</p>
    </div>
  );
}

function Values() {
  const items: [string, string][] = [
    ["Patient Dignity", "Your family. Your neighbor's kid. The patient nobody else will see. Same standard for all of them."],
    ["Clinical Excellence", "When the owner is the one in the OR, the standard stays high. Every case. Every day."],
    ["Integrity", "Our money is in this building. Our names are on the door. That changes every decision we make."],
    ["Accountability", "We told the community we would build this. We are building it. That is the standard going forward."],
    ["Teamwork", "Small team. Flat structure. Everyone knows the mission because the people who set it are standing right next to them."],
    ["Access & Service", "Medicaid. Medicare. Special needs. We did not just say we would serve these patients. We built an entire surgery center to prove it."],
  ];
  const pillColors = ["#B0593A", "#6F7E5E", "#8A5A39", "#B0593A", "#6F7E5E", "#8A5A39"];
  return (
    <section className="values-section">
      <div className="values-inner">
        <div className="values-header reveal">
          <div className="story-eyebrow">How we operate</div>
          <h2 className="story-h2">
            What we actually{" "}
            <em style={{ fontStyle: "italic", color: "#B0593A" }}>care about.</em>
          </h2>
        </div>

        <div className="values-grid">
          {items.map(([h, b], i) => (
            <div key={h} className="values-card reveal">
              <span className="values-pill" style={{ background: pillColors[i] }} />
              <h4 className="values-card-h">{h}</h4>
              <p className="values-card-body">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Refer() {
  const [role, setRole] = useState<"provider" | "patient">("provider");
  return (
    <section id="refer" className="refer-section">
      <div className="refer-inner">
        <div className="refer-left">
          <div className="story-eyebrow reveal">Get in touch</div>
          <h2 className="refer-h2 reveal">
            Refer a{" "}
            <em style={{ fontStyle: "italic", color: "#B0593A" }}>Patient.</em>
          </h2>
          <p className="refer-sub reveal">
            We're opening Q4 2026 and already building relationships with referring providers
            across the KC metro. Send a referral or ask us anything.
          </p>

          <div className="refer-rows">
            <ContactRow icon="phone" label="Call" value="816-271-0110" href="tel:8162710110" />
            <ContactRow
              icon="mail"
              label="Email"
              value="[email protected]"
              href="mailto:[email protected]"
            />
            <ContactRow
              icon="pin"
              label="Visit"
              value="19921 E Jackson Dr, Independence, MO 64057"
            />
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="form-card reveal"
        >
          <div className="form-tabs">
            {(["provider", "patient"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`form-tab ${role === r ? "is-active" : ""}`}
              >
                {r === "provider" ? "I'm a Provider" : "Patient / Family"}
              </button>
            ))}
          </div>

          <div className="form-fields">
            <Field label="Your name" />
            <Field
              label={role === "provider" ? "Practice / organization" : "Patient name"}
            />
            <div className="form-row">
              <Field label="Email" type="email" />
              <Field label="Phone" type="tel" />
            </div>
            <Field
              label={role === "provider" ? "Tell us about the patient or your question" : "How can we help?"}
              textarea
            />
          </div>

          <button type="submit" className="form-submit">
            Send referral <span aria-hidden>→</span>
          </button>
          <p className="form-disclaimer">
            Secure intake. We respond within one business day.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  textarea,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="form-label">
      <span className="form-label-text">{label}</span>
      {textarea ? (
        <textarea rows={4} className="form-input form-textarea" />
      ) : (
        <input type={type} className="form-input" />
      )}
    </label>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: "phone" | "mail" | "pin";
  label: string;
  value: string;
  href?: string;
}) {
  const paths: Record<string, React.ReactNode> = {
    phone: <path d="M4 5c0-.6.4-1 1-1h3l2 5-2 1a11 11 0 005 5l1-2 5 2v3c0 .6-.4 1-1 1A16 16 0 014 5z" />,
    mail: <path d="M3 6h18v12H3zM3 6l9 7 9-7" />,
    pin: <path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13zM12 11a2 2 0 100-4 2 2 0 000 4z" />,
  };
  const content = (
    <div className="contact-row">
      <span className="contact-icon">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {paths[icon]}
        </svg>
      </span>
      <div className="contact-stack">
        <div className="contact-label">{label}</div>
        <div className="contact-value">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="contact-link reveal">
      {content}
    </a>
  ) : (
    <div className="contact-link reveal">{content}</div>
  );
}

function Footer() {
  return (
    <footer className="isc-footer">
      <div className="isc-footer-inner">
        <div className="isc-footer-left">
          <img src={iscLogoWhite.url} alt="Independence Surgery Center" className="isc-footer-logo" />
          <p className="isc-footer-addr">
            19921 E Jackson Dr · Independence, Missouri 64057
          </p>
        </div>
        <div className="isc-footer-right">
          <div>
            <a href="tel:8162710110">816-271-0110</a> · <a href="mailto:[email protected]">[email protected]</a>
          </div>
          <div className="isc-footer-copy">
            © 2026 Independence Surgery Center · Doctor-owned · Opening Q4 2026
          </div>
        </div>
      </div>
    </footer>
  );
}

function HowToRefer() {
  const steps = [
    ["01", "You refer", "Submit the patient online or call. Two minutes, no fax forms, no portals to register for."],
    ["02", "We contact", "Same day. Our team reaches the patient or family directly to coordinate scheduling and insurance."],
    ["03", "Patient seen", "Most cases scheduled within weeks, not months — including Medicaid, special-needs, and complex sedation cases."],
  ];
  const accepts = ["Medicaid", "Medicare", "Most PPO", "Self-Pay"];
  return (
    <section id="how" className="how-refer-section">
      <div className="how-refer-inner">
        <div className="how-refer-header reveal">
          <div className="story-eyebrow">How referrals work</div>
          <h2 className="story-h2">
            Three steps.{" "}
            <em style={{ fontStyle: "italic", color: "#B0593A" }}>No friction.</em>
          </h2>
          <p className="care-sub">
            Built for the way busy practices actually work — not for the way insurance companies wish they did.
          </p>
        </div>

        <div className="how-refer-steps">
          {steps.map(([n, h, b]) => (
            <div key={n} className="how-refer-step reveal">
              <div className="how-refer-num">{n}</div>
              <h4>{h}</h4>
              <p>{b}</p>
            </div>
          ))}
        </div>

        <div className="accepts-row reveal">
          <span className="accepts-label">We accept</span>
          {accepts.map((a) => (
            <span key={a} className="accepts-pill">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l4 4L19 6" />
              </svg>
              {a}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// V2 ELITE LAYER
// ────────────────────────────────────────────────────────────────────────────

function ColdOpen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("isc-v2-cold-open") === "1") {
      setDone(true);
      return;
    }
    // Lock scroll while the cold open plays
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Bass tone (best-effort; browsers may block autoplay until user gesture)
    try {
      const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as
        | typeof AudioContext
        | undefined;
      if (Ctx) {
        const ctx = new Ctx();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.frequency.value = 80;
        o.type = "sine";
        g.gain.setValueAtTime(0.08, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);
        o.start();
        o.stop(ctx.currentTime + 2.6);
      }
    } catch {
      /* no-op */
    }
    const t = window.setTimeout(() => {
      sessionStorage.setItem("isc-v2-cold-open", "1");
      document.body.style.overflow = prevOverflow;
      setDone(true);
    }, 6800);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (done) return null;

  return (
    <div className="v2-cold is-running">
      <div className="v2-cold-stage">
        <div className="v2-cold-zero">Zero.</div>
        <div className="v2-cold-line2">
          <span>Private oral surgeons</span> <span>in Kansas City</span>{" "}
          <span>accepting Medicaid.</span>
        </div>
        <div className="v2-cold-line3">
          <span>We</span> <span>built</span> <span>a</span> <span>surgery</span>{" "}
          <span>center.</span>
        </div>
      </div>
    </div>
  );
}

function Spine() {
  useEffect(() => {
    const fill = document.querySelector<HTMLElement>(".v2-spine-fill");
    const spine = document.querySelector<HTMLElement>(".v2-spine");
    if (!fill || !spine) return;
    let raf = 0;
    let measureTimer = 0;
    let startY = 0;
    let endY = 0;
    fill.style.height = "100%";
    fill.style.transformOrigin = "top";
    fill.style.willChange = "transform";
    const measure = () => {
      const nav = document.getElementById("top");
      const footer = document.querySelector<HTMLElement>(".isc-footer");
      const nextStart = nav ? nav.getBoundingClientRect().bottom + window.scrollY : 0;
      const nextEnd = footer
        ? footer.getBoundingClientRect().top + window.scrollY
        : document.body.scrollHeight;
      // Avoid pointless writes that retrigger layout/ResizeObserver loops.
      if (nextStart !== startY || nextEnd !== endY) {
        startY = nextStart;
        endY = nextEnd;
        spine.style.top = `${startY}px`;
        spine.style.height = `${Math.max(endY - startY, 0)}px`;
      }
      update();
    };
    const scheduleMeasure = () => {
      window.clearTimeout(measureTimer);
      measureTimer = window.setTimeout(measure, 120);
    };
    const update = () => {
      const scroller = document.scrollingElement || document.documentElement;
      const scrollMax = Math.max(scroller.scrollHeight - window.innerHeight, 1);
      const p = scroller.scrollTop / scrollMax;
      fill.style.transform = `scaleY(${Math.min(Math.max(p, 0), 1)})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", scheduleMeasure);
    window.addEventListener("load", scheduleMeasure);
    // Re-measure when layout changes (images loading, fonts, reveals, etc.)
    // Observe only the footer + nav so reveal-animation transforms in the
    // body don't fire the observer on every frame and cause spine jitter.
    const ro = new ResizeObserver(scheduleMeasure);
    const nav = document.getElementById("top");
    const footer = document.querySelector<HTMLElement>(".isc-footer");
    if (nav) ro.observe(nav);
    if (footer) ro.observe(footer);
    measure();
    // Settle measurement after cold-open / late images
    const t1 = window.setTimeout(measure, 800);
    const t2 = window.setTimeout(measure, 2400);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", scheduleMeasure);
      window.removeEventListener("load", scheduleMeasure);
      ro.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(measureTimer);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="v2-spine" aria-hidden>
      <div className="v2-spine-fill" />
    </div>
  );
}

function PullQuote() {
  return (
    <section className="v2-pullquote reveal">
      <p>
        "A four-year-old who won't eat because it hurts too much — and can't tell you why."
      </p>
    </section>
  );
}

function NumberWall() {
  const items: [string, string][] = [
    ["MEDICARE", "CMS-certified. Full acceptance. No asterisks."],
    ["MEDICAID", "The gap that started everything. We take them in."],
    ["SPECIAL NEEDS", "ORs, anesthesia, and clinicians who know what they're doing."],
  ];
  return (
    <section id="access" className="v2-numberwall">
      <div className="v2-numberwall-eyebrow">Access</div>
      {items.map(([h, b]) => (
        <div key={h} className="v2-numberwall-row reveal">
          <h3>{h}</h3>
          <p>{b}</p>
        </div>
      ))}
    </section>
  );
}

function FacilityParallax() {
  useEffect(() => {
    const imgs = document.querySelectorAll<HTMLImageElement>(".v2-building-img");
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        imgs.forEach((img) => {
          const parent = img.parentElement;
          if (!parent) return;
          const rect = parent.getBoundingClientRect();
          const ratio = rect.top / window.innerHeight;
          img.style.transform = `translateY(${ratio * 12}%)`;
        });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const moments: [string, string][] = [
    [buildingEntry.url, "Multiple ORs. Hospital-grade. Designed around surgical workflow."],
    [buildingFront.url, "Independence, Missouri. Central to the KC metro."],
    [buildingSide.url, "New construction. Built for this — not converted from something else."],
  ];

  return (
    <section id="facility" className="v2-facility">
      <div className="v2-facility-header reveal">
        <div className="story-eyebrow">The building</div>
        <h2 className="story-h2">
          Built for this.{" "}
          <em style={{ fontStyle: "italic", color: "#B0593A" }}>
            Not converted from something else.
          </em>
        </h2>
      </div>
      {moments.map(([src, caption]) => (
        <div key={src} className="v2-building-moment">
          <img src={src} alt="Independence Surgery Center" className="v2-building-img" />
          <div className="v2-building-caption reveal">{caption}</div>
        </div>
      ))}
    </section>
  );
}
