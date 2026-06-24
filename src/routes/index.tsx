import { createFileRoute } from "@tanstack/react-router";
import buildingFront from "@/assets/building-front-v2.png.asset.json";
import buildingEntry from "@/assets/building-entry.png.asset.json";
import buildingSide from "@/assets/building-side-v2.png.asset.json";
import buildingSignage from "@/assets/building-signage.png.asset.json";
import iscLogo from "@/assets/isc-logo.png.asset.json";
import iscLogoWhite from "@/assets/isc-logo-white.png.asset.json";
import logoOral from "@/assets/logo-oral.png.asset.json";
import logoPedi from "@/assets/logo-pedi.png.asset.json";
import { useState } from "react";

export const Route = createFileRoute("/")({
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

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Story />
      <Care />
      <Doctors />
      <Facility />
      <Access />
      <Values />
      <Refer />
      <Footer />
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
    <header id="top" className="sticky top-0 z-40 border-b border-[var(--line)]/60 bg-[var(--cream)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Wordmark />
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.slice(0, -1).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#refer"
            className="hidden rounded-full bg-[var(--terracotta)] px-5 py-2.5 text-sm font-medium text-[var(--cream)] shadow-[0_1px_0_rgba(0,0,0,0.06)] transition-all hover:bg-[var(--terracotta-deep)] sm:inline-flex"
          >
            Refer a Patient
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
      <div className="mx-auto max-w-7xl px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--cream)] px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--ink-soft)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--terracotta)]" />
          Opening Q4 2026 · Independence, MO
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <h1 className="font-serif text-[2.6rem] leading-[1.02] tracking-[-0.02em] text-[var(--ink)] sm:text-6xl md:text-7xl lg:text-[5.4rem]">
              The surgery center
              <br />
              that{" "}
              <em className="italic text-[var(--terracotta)]">
                should already
                <br className="hidden sm:block" /> exist.
              </em>
            </h1>
            <p className="mt-7 max-w-md text-[1.02rem] leading-relaxed text-[var(--ink-soft)]">
              A brand-new ambulatory surgery center. Doctor-owned. Doctor-funded. Built so
              Medicaid, Medicare, and special-needs patients finally have somewhere to go.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#refer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--terracotta)] px-6 py-3 text-sm font-medium text-[var(--cream)] transition-all hover:bg-[var(--terracotta-deep)]"
              >
                Refer a Patient
                <span aria-hidden>→</span>
              </a>
              <a
                href="#story"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--cream)] px-6 py-3 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--ink-soft)]"
              >
                Why we built this
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-6 z-10 hidden max-w-[14rem] rounded-2xl border border-[var(--line)] bg-[var(--cream)] p-4 shadow-[0_10px_30px_-12px_rgba(91,82,71,0.25)] sm:block">
              <div className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--terracotta)]">
                Increasing access to care
              </div>
              <div className="mt-2 text-sm text-[var(--ink-soft)]">
                A focus on Medicaid &amp; Medicare patients.
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--cream-deep)] shadow-[0_20px_60px_-30px_rgba(91,82,71,0.4)]">
              <img
                src={buildingFront.url}
                alt="Rendering of the Independence Surgery Center building"
                className="aspect-[4/3] w-full object-cover"
              />
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
    <section id="story" className="border-t border-[var(--line)]/70">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionLabel>Our story</SectionLabel>
        <h2 className="mt-4 font-serif text-4xl tracking-[-0.02em] text-[var(--ink)] sm:text-5xl md:text-6xl">
          Why this exists
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="space-y-5 text-[1.02rem] leading-[1.75] text-[var(--ink-soft)]">
            <p>
              Two years ago, a speaker at a conference put up a single number.{" "}
              <span className="font-semibold italic text-[var(--terracotta)]">Zero.</span> Not one
              private oral surgeon in the area accepted Medicaid. Then the talk turned to children.
              Kids with infections spreading through their jaws. Kids who needed surgery under
              general anesthesia and couldn't get into a hospital OR for up to a year.
            </p>
            <p>
              A four-year-old who won't eat because it hurts too much and can't tell you why. A
              parent on the phone for the third time this week, hearing the same answer from every
              office in the city.{" "}
              <em>We don't take that insurance. Try the hospital.</em> Already tried the hospital. A
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

          <div className="space-y-5">
            <div className="rounded-3xl bg-[var(--terracotta)] p-8 text-[var(--cream)] shadow-[0_20px_50px_-30px_rgba(176,89,58,0.6)]">
              <div className="font-serif text-[7rem] leading-none tracking-[-0.04em]">0</div>
              <div className="mt-3 text-sm leading-relaxed text-[var(--cream)]/85">
                private oral surgeons in the area accepting Medicaid.
              </div>
              <div className="mt-4 border-t border-[var(--cream)]/25 pt-4 text-xs uppercase tracking-[0.22em] text-[var(--cream)]/80">
                That number is why this building is going up.
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--cream)] p-6">
              <div className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[var(--terracotta)]">
                Mission
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                Deliver surgical care with precision, safety, and respect. Treat every patient like
                they matter, because they do.
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--cream)] p-6">
              <div className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[var(--terracotta)]">
                Vision
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
                Build the facility that should already exist. Real operating rooms. Real
                specialists. Real access for Medicaid patients, Medicare patients, and patients
                with special needs who have been waiting too long.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Care() {
  return (
    <section id="care" className="border-t border-[var(--line)]/70 bg-[var(--cream-deep)]/50">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionLabel>What we do</SectionLabel>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-[-0.02em] text-[var(--ink)] sm:text-5xl md:text-6xl">
          Two specialties.
          <br />
          <em className="italic text-[var(--terracotta)]">One</em> surgical center.
        </h2>
        <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-[var(--ink-soft)]">
          Oral surgery and pediatric dentistry operating side by side. Every case under sedation
          and anesthesia, in a facility built specifically for it.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <article className="group flex flex-col rounded-3xl border border-[var(--line)] bg-[var(--cream)] p-7 transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(91,82,71,0.4)]">
            <div className="flex h-20 items-center">
              <img src={logoOral.url} alt="Independence Oral Surgery" className="max-h-16 w-auto" />
            </div>
            <p className="mt-6 text-[0.98rem] leading-relaxed text-[var(--ink-soft)]">
              Full-scope oral and maxillofacial surgery led by a dual-degree MD/DMD board certified
              by ABOMS. When you refer here, your patient is treated by the owner of the facility.
              Not a resident. Not a rotation.{" "}
              <span className="text-[var(--ink)]">The same surgeon, every time.</span>
            </p>
          </article>

          <article className="group flex flex-col rounded-3xl border border-[var(--line)] bg-[var(--cream)] p-7 transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(91,82,71,0.4)]">
            <div className="flex h-20 items-center">
              <img src={logoPedi.url} alt="Independence Pediatric Dentistry" className="max-h-16 w-auto" />
            </div>
            <p className="mt-6 text-[0.98rem] leading-relaxed text-[var(--ink-soft)]">
              Some kids can't sit in a dental chair. Special needs, developmental disabilities,
              severe anxiety, complex treatment plans. They need an operating room, a pediatric
              dentist who has done this hundreds of times, and a facility designed around them.{" "}
              <span className="text-[var(--ink)]">That is what this is.</span>
            </p>
          </article>
        </div>

        <div className="mt-6 rounded-3xl bg-[var(--espresso)] p-7 text-center text-[var(--cream)]/90 sm:p-8">
          <p className="font-serif text-xl tracking-tight sm:text-2xl">
            Two specialties. One building.{" "}
            <em className="italic text-[var(--cream)]">Designed from scratch</em> to handle volume
            and do it safely.
          </p>
        </div>
      </div>
    </section>
  );
}

function Doctors() {
  return (
    <section id="doctors" className="border-t border-[var(--line)]/70">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionLabel>Our clinicians</SectionLabel>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-[-0.02em] text-[var(--ink)] sm:text-5xl md:text-6xl">
          The doctors who built it{" "}
          <em className="italic text-[var(--terracotta)]">work in it.</em>
        </h2>
        <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-[var(--ink-soft)]">
          These aren't hired guns. They funded the building, designed the workflow, and operate in
          it every day. When you refer a patient here, you know exactly who is treating them.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <DoctorCard
            specialty="Oral & Maxillofacial Surgery"
            tag="Board-Certified Specialist"
            body="MD and DMD. Fellowship trained. Board certified by the American Board of Oral and Maxillofacial Surgery. That is the ceiling of the specialty, and he is at it. He could practice anywhere. He chose to build something."
            credentials={["MD + DMD", "Board Certified ABOMS", "Owner-Operator"]}
          />
          <DoctorCard
            specialty="Pediatric Dentistry"
            tag="Board-Certified Specialist"
            body="Board certified. Advanced residency in hospital-based pediatric dentistry and special needs care. The cases other offices can't handle are the ones she built her career around. She is not here by default. She helped design this place."
            credentials={["Board Certified Pediatric Dentist", "Owner-Operator"]}
          />
        </div>

        <figure className="mt-10 grid gap-6 rounded-3xl border border-[var(--terracotta)]/30 bg-[var(--terracotta)]/[0.07] p-8 sm:grid-cols-[1.2fr_1fr] sm:p-10">
          <blockquote className="font-serif text-2xl leading-[1.2] tracking-tight text-[var(--ink)] sm:text-3xl">
            "No private equity. No hospital system. No outside investors."
          </blockquote>
          <figcaption className="text-sm leading-relaxed text-[var(--ink-soft)] sm:border-l sm:border-[var(--terracotta)]/30 sm:pl-8">
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
  body,
  credentials,
}: {
  specialty: string;
  tag: string;
  body: string;
  credentials: string[];
}) {
  return (
    <article className="flex flex-col rounded-3xl border border-[var(--line)] bg-[var(--cream)] p-7">
      <div className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[var(--terracotta)]">
        {tag}
      </div>
      <h3 className="mt-3 font-serif text-2xl tracking-tight text-[var(--ink)] sm:text-[1.7rem]">
        {specialty}
      </h3>
      <p className="mt-4 text-[0.98rem] leading-relaxed text-[var(--ink-soft)]">{body}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {credentials.map((c) => (
          <span
            key={c}
            className="rounded-full border border-[var(--line)] bg-[var(--cream-deep)]/50 px-3 py-1 text-xs font-medium text-[var(--ink-soft)]"
          >
            {c}
          </span>
        ))}
      </div>
    </article>
  );
}

function Facility() {
  return (
    <section id="facility" className="border-t border-[var(--line)]/70 bg-[var(--cream-deep)]/50">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionLabel>The building</SectionLabel>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-[-0.02em] text-[var(--ink)] sm:text-5xl md:text-6xl">
          New construction.{" "}
          <em className="italic text-[var(--terracotta)]">Ground up.</em>
        </h2>
        <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-[var(--ink-soft)]">
          Every inch of this building was designed around surgical workflow. Multiple ORs,
          hospital-grade infrastructure, and room to scale. Independence, Missouri.
        </p>

        <div className="mt-12 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--cream)] shadow-[0_30px_80px_-40px_rgba(91,82,71,0.45)]">
          <img
            src={buildingEntry.url}
            alt="Building entry — Independence Surgery Center"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[buildingFront, buildingSide, buildingSignage].map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--cream)]"
            >
              <img
                src={img.url}
                alt="Exterior view of the Independence Surgery Center"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Purpose-Built Design", "Engineered from the ground up for surgical efficiency — not converted from something else."],
            ["Multiple Operating Rooms", "Simultaneous cases running in parallel. Shorter wait times. Higher throughput."],
            ["Hospital-Grade Monitoring", "Full anesthesia capability. Same monitoring, same safety standards, same equipment as a hospital OR."],
            ["Kansas City Metro", "Centrally located in Independence. Easy access from anywhere in the KC metro."],
          ].map(([h, b]) => (
            <div key={h} className="bg-[var(--cream)] p-7">
              <div className="h-2 w-8 rounded-full bg-[var(--terracotta)]" />
              <h3 className="mt-4 font-serif text-xl tracking-tight text-[var(--ink)]">{h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Access() {
  return (
    <section id="access" className="bg-[var(--espresso)] text-[var(--cream)]">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-[var(--terracotta)]">
          Access to care
        </div>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-[var(--cream)] sm:text-5xl md:text-6xl">
          The reason this{" "}
          <em className="italic text-[var(--terracotta)]">building exists.</em>
        </h2>
        <p className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-[var(--cream)]/75">
          Most surgical specialists do not accept Medicaid. Most facilities are not equipped for
          special-needs patients. We built one that does both.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
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
    <div
      className={`rounded-3xl p-7 ${
        highlight
          ? "bg-[var(--terracotta)] text-[var(--cream)]"
          : "border border-[var(--cream)]/12 bg-[var(--cream)]/[0.04] text-[var(--cream)]"
      }`}
    >
      <div
        className={`h-2 w-8 rounded-full ${
          highlight ? "bg-[var(--cream)]" : "bg-[var(--terracotta)]"
        }`}
      />
      <h3 className="mt-4 font-serif text-2xl tracking-tight">{title}</h3>
      <p
        className={`mt-3 text-sm leading-relaxed ${
          highlight ? "text-[var(--cream)]/90" : "text-[var(--cream)]/70"
        }`}
      >
        {body}
      </p>
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
  return (
    <section className="border-t border-[var(--line)]/70">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionLabel>How we operate</SectionLabel>
        <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-[-0.02em] text-[var(--ink)] sm:text-5xl md:text-6xl">
          What we actually{" "}
          <em className="italic text-[var(--terracotta)]">care about.</em>
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([h, b], i) => (
            <div key={h} className="bg-[var(--cream)] p-7">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-[var(--terracotta)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-xl tracking-tight text-[var(--ink)]">{h}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{b}</p>
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
    <section id="refer" className="border-t border-[var(--line)]/70 bg-[var(--cream-deep)]/40">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionLabel>Get in touch</SectionLabel>
            <h2 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.02em] text-[var(--ink)] sm:text-5xl md:text-6xl">
              Refer a patient, or just{" "}
              <em className="italic text-[var(--terracotta)]">reach out.</em>
            </h2>
            <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-[var(--ink-soft)]">
              We're opening Q4 2026 and already building relationships with referring providers
              across the KC metro. Send a referral or ask us anything.
            </p>

            <dl className="mt-10 space-y-5">
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
            </dl>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-3xl border border-[var(--line)] bg-[var(--cream)] p-6 shadow-[0_30px_80px_-40px_rgba(91,82,71,0.4)] sm:p-8"
          >
            <div className="flex gap-2 rounded-full bg-[var(--cream-deep)] p-1">
              {(["provider", "patient"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    role === r
                      ? "bg-[var(--terracotta)] text-[var(--cream)]"
                      : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                  }`}
                >
                  {r === "provider" ? "I'm a Provider" : "Patient / Family"}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4">
              <Field label="Your name" />
              <Field
                label={role === "provider" ? "Practice / organization" : "Patient name"}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" type="email" />
                <Field label="Phone" type="tel" />
              </div>
              <Field
                label={role === "provider" ? "Tell us about the patient or your question" : "How can we help?"}
                textarea
              />
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--terracotta)] px-6 py-3.5 text-sm font-medium text-[var(--cream)] transition-all hover:bg-[var(--terracotta-deep)]"
            >
              Send referral
              <span aria-hidden>→</span>
            </button>
            <p className="mt-3 text-center text-xs text-[var(--ink-soft)]">
              Secure intake. We respond within one business day.
            </p>
          </form>
        </div>
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
  const base =
    "w-full rounded-xl border border-[var(--line)] bg-[var(--cream)] px-4 py-3 text-sm text-[var(--ink)] placeholder:text-[var(--ink-soft)]/60 outline-none transition-colors focus:border-[var(--terracotta)] focus:ring-2 focus:ring-[var(--terracotta)]/15";
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        {label}
      </span>
      {textarea ? (
        <textarea rows={4} className={base} />
      ) : (
        <input type={type} className={base} />
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
    <div className="grid grid-cols-[auto_1fr] items-center gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--line)] bg-[var(--cream)] text-[var(--terracotta)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {paths[icon]}
        </svg>
      </span>
      <div className="min-w-0">
        <div className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[var(--ink-soft)]">
          {label}
        </div>
        <div className="truncate font-serif text-lg text-[var(--ink)]">{value}</div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-80">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--espresso)] text-[var(--cream)]">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <Wordmark variant="light" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--cream)]/70">
              19921 E Jackson Dr · Independence, Missouri 64057
              <br />
              816-271-0110 · [email protected]
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--cream)]/70">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[var(--cream)]">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-[var(--cream)]/15 pt-6 text-xs text-[var(--cream)]/60 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Independence Surgery Center. All rights reserved.</span>
          <span>Doctor-owned · Doctor-funded · Opening Q4 2026</span>
        </div>
      </div>
    </footer>
  );
}
