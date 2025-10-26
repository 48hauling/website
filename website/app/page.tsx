"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Truck, MapPin, Phone, Clock, Shield, DollarSign, Navigation, HardDrive, Mail, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Brand palette pulled from logo vibe
// charcoal: #0B0B0C, onyx: #121214, warmGray: #1A1A1C, bone: #F5F1E6, gold: #E7B75F, goldDark: #C6912A

export default function Landing48Hauling() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  return (
    <div className="min-h-screen w-full bg-[#0B0B0C] text-[#F5F1E6]">
      <SiteNav onOpenQuote={() => setQuoteOpen(true)} />
      <Hero onOpenQuote={() => setQuoteOpen(true)} />
      <TrustBar />
      <Services onOpenQuote={() => setQuoteOpen(true)} />
      <Stats />
      <Industries />
      <About />
      <CTA onOpenQuote={() => setQuoteOpen(true)} />
      <Contact />
      <Footer />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}

function SiteNav({ onOpenQuote }: { onOpenQuote: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#E7B75F]/20 bg-[#0B0B0C]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <a href="#" className="flex items-center gap-2 md:gap-3" data-testid="brand-link">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl ring-1 ring-[#E7B75F]/20 bg-[#E7B75F]/10 flex-shrink-0">
            <Image src="/logo.png" alt="48 Hauling" width={40} height={40} className="object-contain" priority />
          </div>
          <div className="leading-tight">
            <div className="text-base md:text-lg font-semibold tracking-wide">48 Hauling</div>
            <div className="text-[10px] md:text-xs text-[#E7B75F] uppercase tracking-widest hidden sm:block">Dump Trucks • Commercial Transportation</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#about" className="text-[#DEDACB] hover:text-white transition-colors">About</a>
          <a href="#services" className="text-[#DEDACB] hover:text-white transition-colors" data-testid="nav-services">Services</a>
          <a href="#industries" className="text-[#DEDACB] hover:text-white transition-colors">Industries</a>
          <Link href="/devops" className="text-[#DEDACB] hover:text-white transition-colors">Dev Ops</Link>
          <a href="#contact" className="text-[#DEDACB] hover:text-white transition-colors">Contact</a>
          <Link href="/drivers" className="text-[#DEDACB] hover:text-white transition-colors">Drivers</Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#E7B75F] hover:bg-[#E7B75F]/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop Buttons */}
          <Button className="hidden md:inline-flex bg-[#E7B75F] text-[#0B0B0C] hover:bg-[#C6912A]" size="sm" data-testid="btn-quote" onClick={onOpenQuote}>Get a Quote</Button>
          <a href="https://webpanel-five.vercel.app/login" className="hidden md:inline-flex">
            <Button variant="secondary" size="sm" className="border border-[#E7B75F] bg-transparent text-[#E7B75F] hover:bg-[#E7B75F]/10" data-testid="btn-admin">Admin Portal</Button>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E7B75F]/20 bg-[#0B0B0C]/95 backdrop-blur-lg">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-[#DEDACB] hover:text-white py-3 px-4 rounded-lg hover:bg-[#E7B75F]/10 transition-colors">About</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-[#DEDACB] hover:text-white py-3 px-4 rounded-lg hover:bg-[#E7B75F]/10 transition-colors">Services</a>
            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="text-[#DEDACB] hover:text-white py-3 px-4 rounded-lg hover:bg-[#E7B75F]/10 transition-colors">Industries</a>
            <Link href="/devops" onClick={() => setMobileMenuOpen(false)} className="text-[#DEDACB] hover:text-white py-3 px-4 rounded-lg hover:bg-[#E7B75F]/10 transition-colors">Dev Ops</Link>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-[#DEDACB] hover:text-white py-3 px-4 rounded-lg hover:bg-[#E7B75F]/10 transition-colors">Contact</a>
            <Link href="/drivers" onClick={() => setMobileMenuOpen(false)} className="text-[#DEDACB] hover:text-white py-3 px-4 rounded-lg hover:bg-[#E7B75F]/10 transition-colors">Drivers</Link>
            <div className="pt-3 border-t border-[#E7B75F]/20 space-y-3">
              <Button onClick={() => { onOpenQuote(); setMobileMenuOpen(false); }} className="w-full bg-[#E7B75F] text-[#0B0B0C] hover:bg-[#C6912A]">Get a Quote</Button>
              <a href="https://webpanel-five.vercel.app/login" className="block">
                <Button variant="secondary" className="w-full border border-[#E7B75F] bg-transparent text-[#E7B75F] hover:bg-[#E7B75F]/10">Admin Portal</Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero({ onOpenQuote }: { onOpenQuote: () => void }) {
  return (
    <section className="relative overflow-hidden border-b border-[#E7B75F]/15" aria-label="Hero">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(231,183,95,0.10),transparent_60%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ willChange: "opacity, transform" }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Reliable hauling, <span className="bg-gradient-to-r from-[#E7B75F] to-[#FFF7DC] bg-clip-text text-transparent">built for the grind</span>
          </h1>
          <p className="mt-4 max-w-xl text-[#DEDACB]">
            Phoenix‑based. Fleet‑managed. Dispatch‑driven. We keep your materials moving—on schedule, on budget, without the BS.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="bg-[#E7B75F] text-[#0B0B0C] hover:bg-[#C6912A]" onClick={onOpenQuote} id="quote-open">Get a Quote</Button>
            <a href="tel:+16029802192">
              <Button size="lg" variant="secondary" className="border border-[#E7B75F] bg-transparent text-[#E7B75F] hover:bg-[#E7B75F]/10">Call Dispatch</Button>
            </a>
          </div>
          <ul className="mt-6 grid max-w-xl grid-cols-2 gap-4 text-sm text-[#DEDACB]">
            <li className="flex items-center gap-2"><Shield className="h-4 w-4 text-[#E7B75F]" /> Fully insured & compliant</li>
            <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-[#E7B75F]" /> On‑time pickup & delivery</li>
            <li className="flex items-center gap-2"><Navigation className="h-4 w-4 text-[#E7B75F]" /> GPS tracked fleet</li>
            <li className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-[#E7B75F]" /> Transparent pricing</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          style={{ willChange: "opacity, transform" }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[#E7B75F]/20 bg-gradient-to-br from-[#121214] to-[#1A1A1C] flex items-center justify-center">
            <Image
              src="/48Hauling_Vector.svg"
              alt="48 Hauling Logo"
              width={600}
              height={450}
              className="object-contain p-8"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: <HardDrive className="h-5 w-5 text-[#E7B75F]" />, label: "eBOL + Photo Proof" },
    { icon: <Shield className="h-5 w-5 text-[#E7B75F]" />, label: "E‑Logs + DVIR" },
    { icon: <Navigation className="h-5 w-5 text-[#E7B75F]" />, label: "GPS + Geofencing" },
    { icon: <DollarSign className="h-5 w-5 text-[#E7B75F]" />, label: "QuickBooks Sync" },
  ];
  return (
    <div className="border-b border-[#E7B75F]/15">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 text-sm text-[#DEDACB] md:grid-cols-4">
        {items.map((i, idx) => (
          <div key={idx} className="flex items-center justify-center gap-2 rounded-xl bg-[#E7B75F]/10 p-3 ring-1 ring-[#E7B75F]/15">
            {i.icon}
            <span>{i.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Services({ onOpenQuote }: { onOpenQuote: () => void }) {
  const services = [
    {
      title: "Aggregate & Dirt",
      desc: "Gravel, sand, rip rap, millings, and spoils — short or long haul.",
      bullet: ["Simple 16", "Simple 18", "End & Side Dumps (upon request)", "Hourly or per‑ton"]
    },
    {
      title: "Chip Seal",
      desc: "Aggregate delivery and oil coordination to support chip seal crews — day or night.",
      bullet: ["Calibrated drop timing", "Lane‑closure friendly routing", "Millings and cleanup"]
    },
    {
      title: "Pavement",
      desc: "Asphalt delivery and haul‑off for paving, overlays, and mill & fill.",
      bullet: ["Hot mix and millings", "Crew‑sync'd dispatch", "On‑site standby available"]
    },
    {
      title: "Demo Haul-Off",
      desc: "Construction debris, concrete, and demolition material removal — fast and reliable.",
      bullet: ["Concrete and asphalt removal", "Construction debris cleanup"]
    },
    {
      title: "Jobsite Support",
      desc: "On‑site truck standby, load‑out coordination, and multi‑drop routes.",
      bullet: ["On‑site standby (trucks only)", "eBOL + photo POD", "Multi‑drop sequencing"]
    },
  ];
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What we haul</h2>
        <p className="mt-3 text-[#DEDACB]">Built around Arizona construction, manufacturing, and utilities.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <Card key={i} className="border-[#E7B75F]/20 bg-[#121214]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-white">
                <Truck className="h-5 w-5 text-[#E7B75F]" /> {s.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-[#DEDACB]">
              <p>{s.desc}</p>
              <ul className="list-inside list-disc space-y-1 marker:text-[#E7B75F]">
                {s.bullet.map((b, idx) => (<li key={idx}>{b}</li>))}
              </ul>
              <Button className="mt-4 w-full bg-[#E7B75F] text-[#0B0B0C] hover:bg-[#C6912A]" onClick={onOpenQuote}>Request a Quote</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { label: "Loads Completed", value: "12,480+" },
    { label: "On‑time Rate", value: "98.7%" },
    { label: "Avg Response", value: "< 5 min" },
    { label: "Fleet Size", value: "50+ units" },
  ];
  return (
    <section className="border-y border-[#E7B75F]/15 bg-[#121214]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="rounded-2xl bg-[#0B0B0C] p-6 text-center ring-1 ring-[#E7B75F]/20">
            <div className="text-3xl font-bold text-white">{s.value}</div>
            <div className="mt-2 text-sm text-[#DEDACB]">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Industries() {
  const items = [
    { title: "Construction", copy: "Aggregates, asphalt millings, and demo haul‑off." },
    { title: "Road Infrastructure", copy: "Aggregate and pavement hauling for roadwork, overlays, and maintenance." },
    { title: "Energy & Utilities", copy: "Aggregate haul, demo haul‑off, and site hauling support." },
  ];
  return (
    <section id="industries" className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Industries we serve</h2>
        <p className="mt-3 text-[#DEDACB]">Tuned to AZ growth corridors and beyond.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((i, idx) => (
          <Card key={idx} className="border-[#E7B75F]/20 bg-[#121214]">
            <CardHeader>
              <CardTitle className="text-white">{i.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-[#DEDACB]">{i.copy}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function About() {
  const values = [
    { title: "Safety First", copy: "DOT‑compliant operations, daily DVIRs, and rigorous driver training." },
    { title: "On‑Time, Every Time", copy: "Live dispatch, route optimization, and GPS‑verified ETAs." },
    { title: "Transparent Pricing", copy: "Clear quotes, eBOLs, and photo proof at delivery." },
  ];

  const milestones = [
    { year: "2018", text: "Started with two units serving metro Phoenix." },
    { year: "2021", text: "Renewed entire fleet with 48-month refresh cycle." },
    { year: "2024", text: "Launched live dispatch platform and eBOL workflows." },
  ];

  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">About 48 Hauling</h2>
        <p className="mt-3 text-[#DEDACB]">A family-owned business built in Arizona, for Arizona. We serve the communities and families of our state through safety, integrity, and opportunity — moving what builds Arizona with reliability and zero drama.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {values.map((v, i) => (
          <Card key={i} className="border-[#E7B75F]/20 bg-[#121214]">
            <CardHeader>
              <CardTitle className="text-white">{v.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-[#DEDACB]">{v.copy}</CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 grid items-start gap-6 md:grid-cols-2">
        <Card className="border-[#E7B75F]/20 bg-[#121214]">
          <CardHeader>
            <CardTitle className="text-white">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#DEDACB]">
            <p>
              As a <span className="text-white">family-owned and operated</span> business, we started with a simple promise: <span className="text-white">show up on time, communicate fast, and never cut corners</span>.
              We're committed to serving Arizona families and communities by providing not just reliable hauling, but also creating opportunities for local drivers and their families.
              Today our fleet supports construction, manufacturing, and utilities across the Valley and beyond, building both projects and livelihoods.
            </p>
            <ul className="space-y-2">
              {milestones.map((m, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-12 shrink-0 items-center justify-center rounded-full bg-[#E7B75F]/20 text-xs font-semibold text-white">{m.year}</span>
                  <span>{m.text}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-[#E7B75F]/20 bg-[#121214]">
          <CardHeader>
            <CardTitle className="text-white">Leadership</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-[#DEDACB]">
            <div className="rounded-2xl bg-[#0B0B0C] p-4 ring-1 ring-[#E7B75F]/20">
              <div className="text-sm text-[#BEB8A2]">Founder & CEO</div>
              <div className="text-lg font-semibold text-white">Javier Hernandez</div>
              <p className="mt-2 text-sm">Javier runs 48 Hauling with a builder mindset and a dispatcher clock.</p>
              <ul className="mt-3 list-inside list-disc space-y-1 text-sm marker:text-[#E7B75F]">
                <li>Logistics first: clear site details, smart routing, proactive communication.</li>
                <li>Efficiency: tuned lanes, same day swaps, paperwork that works.</li>
                <li>Safety: DOT compliant operations, daily DVIRs, trained professional drivers.</li>
                <li>Integrity: quotes match invoices, ETAs hold up, photo proof provided.</li>
                <li>Standard: show up, do it safely, leave the customer with zero headaches.</li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-[#0B0B0C] p-3 ring-1 ring-[#E7B75F]/20">Dispatch • Live ETAs</div>
              <div className="rounded-xl bg-[#0B0B0C] p-3 ring-1 ring-[#E7B75F]/20">Compliance • DVIR</div>
              <div className="rounded-xl bg-[#0B0B0C] p-3 ring-1 ring-[#E7B75F]/20">Fleet • Maintenance</div>
              <div className="rounded-xl bg-[#0B0B0C] p-3 ring-1 ring-[#E7B75F]/20">Customer Success</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card className="border-[#E7B75F]/20 bg-[#121214]">
          <CardHeader>
            <CardTitle className="text-white">Fleet Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-[#DEDACB]">
            Tandems, Super‑10s, side/end dumps, and roll‑off trucks (10–40 yd).
          </CardContent>
        </Card>
        <Card className="border-[#E7B75F]/20 bg-[#121214]">
          <CardHeader>
            <CardTitle className="text-white">Service Area</CardTitle>
          </CardHeader>
          <CardContent className="text-[#DEDACB]">
            Phoenix metro, Loop 101/202/303, I‑10 corridor, SR‑85, and statewide lanes.
          </CardContent>
        </Card>
        <Card className="border-[#E7B75F]/20 bg-[#121214]">
          <CardHeader>
            <CardTitle className="text-white">Careers</CardTitle>
          </CardHeader>
          <CardContent className="text-[#DEDACB]">
            Looking for A‑game drivers and dispatch pros. Clean records, safety‑first mindset.
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function CTA({ onOpenQuote }: { onOpenQuote: () => void }) {
  return (
    <section className="relative overflow-hidden border-y border-[#E7B75F]/15">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(231,183,95,0.10),transparent_60%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold md:text-3xl">Need trucks on site tomorrow?</h3>
          <p className="mt-3 max-w-prose text-[#DEDACB]">
            Our live dispatch has your back—quotes in minutes, trucks scheduled in hours. Transparent pricing and GPS‑tracked ETAs keep your crew moving.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Button size="lg" className="bg-[#E7B75F] text-[#0B0B0C] hover:bg-[#C6912A]" onClick={onOpenQuote}>Get a Quote</Button>
          <a href="tel:+16029802192">
            <Button size="lg" variant="secondary" className="border border-[#E7B75F] bg-transparent text-[#E7B75F] hover:bg-[#E7B75F]/10">
              <Phone className="mr-2 h-4 w-4" /> (602) 980‑2192
            </Button>
          </a>
        </div>
      </div>
      
      {/* Trucks gallery */}
      <div className="mt-12 mx-auto max-w-7xl px-4 pb-8">
        <div className="mb-6 text-center">
          <h3 className="text-2xl font-bold tracking-tight text-white">Our Fleet In Action</h3>
          <p className="mt-2 text-sm text-[#DEDACB]">Professional equipment. Phoenix-based operation.</p>
        </div>

        {/* Action photos - top row */}
        <div className="mb-6">
          <h4 className="mb-4 text-lg font-semibold text-[#E7B75F]">On The Job</h4>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-[#E7B75F]/20 bg-[#121214]">
              <Image src="/action/action1.jpg" alt="48 Hauling truck in action - job site" fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-[#E7B75F]/20 bg-[#121214]">
              <Image src="/action/action 2.jpg" alt="48 Hauling crew working on site" fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-[#E7B75F]/20 bg-[#121214]">
              <Image src="/action/action3.jpg" alt="48 Hauling truck hauling materials" fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
          </div>
        </div>

        {/* Fleet photos - bottom section */}
        <div>
          <h4 className="mb-4 text-lg font-semibold text-[#E7B75F]">Fleet Gallery</h4>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E7B75F]/20 bg-[#121214]">
              <Image src="/fleet/fleet 1.jpg" alt="48 Hauling dump truck" fill className="object-cover" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 50vw" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E7B75F]/20 bg-[#121214]">
              <Image src="/fleet/fleet 2.jpg" alt="48 Hauling fleet truck" fill className="object-cover" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 50vw" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E7B75F]/20 bg-[#121214]">
              <Image src="/fleet/fleet 3.jpg" alt="48 Hauling professional truck" fill className="object-cover" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 50vw" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E7B75F]/20 bg-[#121214]">
              <Image src="/fleet/fleet 4.jpg" alt="48 Hauling fleet lineup" fill className="object-cover" sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 50vw" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

 

function QuoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    setOk(null);
    try {
      const res = await fetch("/api/quote", { method: "POST", body: fd });
      setOk(res.ok);
      if (res.ok) {
        (e.currentTarget as HTMLFormElement).reset();
      }
    } catch {
      setOk(false);
    } finally {
      setSubmitting(false);
    }
  }
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-[#E7B75F]/20 bg-[#121214] p-4 shadow-2xl">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-white text-lg font-semibold">Request a Quote</h3>
          <button onClick={onClose} className="rounded-lg p-1 text-[#DEDACB] hover:bg-white/5"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3 md:grid-cols-2 text-[#DEDACB]">
          <input name="company" placeholder="Company" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
          <input name="contactName" placeholder="Contact Name" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
          <input name="email" type="email" required placeholder="Email" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
          <input name="phone" placeholder="Phone" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
          <input name="pickup" placeholder="Pickup (address or site)" className="md:col-span-2 rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
          <input name="drop" placeholder="Drop (address or site)" className="md:col-span-2 rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
          <input name="material" placeholder="Material" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
          <input name="quantity" placeholder="Quantity (tons/yds/loads)" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
          <textarea name="notes" rows={3} placeholder="Notes" className="md:col-span-2 rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
          <div className="md:col-span-2">
            <label className="mb-1 block text-sm">Attach photos (site, materials, PO) — up to 6</label>
            <input name="photos" type="file" accept="image/*" multiple className="w-full rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-[#E7B75F] file:px-3 file:py-2 file:text-[#0B0B0C]" />
          </div>
          <div className="md:col-span-2 flex items-center gap-3 pt-1">
            <Button disabled={submitting} className="bg-[#E7B75F] text-[#0B0B0C] hover:bg-[#C6912A]">{submitting ? "Sending…" : "Send Request"}</Button>
            {ok === true && <span className="text-green-400 text-sm">Sent. We’ll reply shortly.</span>}
            {ok === false && <span className="text-red-400 text-sm">Failed to send. Try again.</span>}
          </div>
        </form>
      </div>
    </div>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="border-[#E7B75F]/20 bg-[#121214]">
          <CardHeader>
            <CardTitle className="text-white">Get a fast quote</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 gap-4 md:grid-cols-2" aria-label="Quote request form">
              <label className="sr-only" htmlFor="company">Company</label>
              <input id="company" name="company" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-4 py-3 text-white outline-none placeholder:text-[#8E8872]" placeholder="Company" />
              <label className="sr-only" htmlFor="contactName">Contact Name</label>
              <input id="contactName" name="contactName" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-4 py-3 text-white outline-none placeholder:text-[#8E8872]" placeholder="Contact Name" />
              <label className="sr-only" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-4 py-3 text-white outline-none placeholder:text-[#8E8872]" placeholder="Email" />
              <label className="sr-only" htmlFor="phone">Phone</label>
              <input id="phone" name="phone" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-4 py-3 text-white outline-none placeholder:text-[#8E8872]" placeholder="Phone" />
              <label className="sr-only" htmlFor="details">Pickup • Drop • Material • Qty</label>
              <input id="details" name="details" className="md:col-span-2 rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-4 py-3 text-white outline-none placeholder:text-[#8E8872]" placeholder="Pickup • Drop • Material • Qty" />
              <Button className="md:col-span-2 bg-[#E7B75F] text-[#0B0B0C] hover:bg-[#C6912A]">Send Request</Button>
            </form>
          </CardContent>
        </Card>
        <Card className="border-[#E7B75F]/20 bg-[#121214]">
          <CardHeader>
            <CardTitle className="text-white">HQ & Operating Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-[#DEDACB]">
            <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-[#E7B75F]" /> Phoenix, Arizona</div>
            <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-[#E7B75F]" /> Mon–Fri 5:00–18:00 • Sat by appt.</div>
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-[#E7B75F]" /> Office: (480) 550‑1733</div>
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-[#E7B75F]" /> Dispatch: (602) 980‑2192</div>
            <a href="mailto:Javier@48hauling.com" className="flex items-center gap-3 hover:text-white"><Mail className="h-5 w-5 text-[#E7B75F]" /> Javier@48hauling.com</a>
            <div className="mt-4 rounded-xl bg-[#E7B75F]/10 px-4 py-3 ring-1 ring-[#E7B75F]/20">
              <span className="font-semibold text-white">Sí, hablo español</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#E7B75F]/15">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-[#BEB8A2] md:flex-row">
        <div>© {new Date().getFullYear()} 48 Hauling • All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="https://web-panel-indol.vercel.app/login" className="hover:text-white">Admin Portal</a>
        </div>
      </div>
    </footer>
  );
}
