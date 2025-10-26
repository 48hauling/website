import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HardDrive, Navigation, Shield, Code2, ServerCog, Database, Network, Bug, BarChart3 } from "lucide-react";

export const metadata = {
  title: "Dev Ops & Integrations • 48 Hauling",
  description: "Scalable operations and integrations to fit your existing infrastructure and maximize efficiency.",
};

export default function DevOpsPage() {
  const items = [
    { title: "Scalable Dispatch", copy: "From single jobsite to statewide lanes — scale capacity fast without chaos.", icon: <HardDrive className="h-5 w-5 text-[#E7B75F]" /> },
    { title: "Systems Integration", copy: "APIs and webhooks tie into your ERP, PM, and accounting (e.g., QuickBooks).", icon: <Navigation className="h-5 w-5 text-[#E7B75F]" /> },
    { title: "Operational Efficiency", copy: "Live ETAs, geofencing, eBOL + photos — paperwork that just works.", icon: <Shield className="h-5 w-5 text-[#E7B75F]" /> },
  ];
  return (
    <div className="px-4 py-10">
      <section className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-white">Dev Ops & Integrations</h1>
          <p className="mt-3 text-[#DEDACB]">We fit into your existing infrastructure to maximize efficiency — not replace it. Our software and systems integrate cleanly so your teams keep moving.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((i, idx) => (
            <Card key={idx} className="border-[#E7B75F]/20 bg-[#121214]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">{i.icon}{i.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-[#DEDACB]">{i.copy}</CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-[#E7B75F]/20">
            <Image src="/devops/api1.png" alt="API integration example 1" fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-[#E7B75F]/20">
            <Image src="/devops/api2.png" alt="API integration example 2" fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card className="border-[#E7B75F]/20 bg-[#121214]">
            <CardHeader>
              <CardTitle className="text-white">What we integrate with</CardTitle>
            </CardHeader>
            <CardContent className="text-[#DEDACB] text-sm">
              • ERP/Accounting (QuickBooks) • Project Mgmt • SSO/RBAC • Data exports (CSV/JSON) • Webhooks/APIs
            </CardContent>
          </Card>
          <Card className="border-[#E7B75F]/20 bg-[#121214]">
            <CardHeader>
              <CardTitle className="text-white">Outcomes</CardTitle>
            </CardHeader>
            <CardContent className="text-[#DEDACB] text-sm">
              • Faster scheduling • Fewer callbacks • Clean invoices • Proven delivery photos • Reliable ETAs
            </CardContent>
          </Card>
        </div>

        {/* Engineering team */}
        <div className="mt-12 mx-auto max-w-5xl">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white">Engineering Team</h2>
            <p className="mt-2 text-[#DEDACB]">A full‑stack crew embedded with ops—shipping tools that make trucking faster, safer, and clearer.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-[#E7B75F]/20 bg-[#121214]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white"><Code2 className="h-5 w-5 text-[#E7B75F]" /> Full‑Stack Engineers</CardTitle>
              </CardHeader>
              <CardContent className="text-[#DEDACB] text-sm">Build dispatch UIs, driver workflows, and customer portals. Ship fast with TypeScript/Next, Tailwind, and tested APIs.</CardContent>
            </Card>
            <Card className="border-[#E7B75F]/20 bg-[#121214]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white"><Network className="h-5 w-5 text-[#E7B75F]" /> Integrations</CardTitle>
              </CardHeader>
              <CardContent className="text-[#DEDACB] text-sm">Connect telematics, geofencing, eBOL, and accounting systems. Webhooks and API bridges reduce double‑entry.</CardContent>
            </Card>
            <Card className="border-[#E7B75F]/20 bg-[#121214]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white"><Database className="h-5 w-5 text-[#E7B75F]" /> Data & Reporting</CardTitle>
              </CardHeader>
              <CardContent className="text-[#DEDACB] text-sm">Surface ETAs, on‑time rates, and POD photos. Export clean CSV/JSON; align invoices with quotes automatically.</CardContent>
            </Card>
            <Card className="border-[#E7B75F]/20 bg-[#121214]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white"><ServerCog className="h-5 w-5 text-[#E7B75F]" /> DevOps/SRE</CardTitle>
              </CardHeader>
              <CardContent className="text-[#DEDACB] text-sm">Keep systems fast and reliable. CI/CD, observability, and incident response tuned for field operations.</CardContent>
            </Card>
            <Card className="border-[#E7B75F]/20 bg-[#121214]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white"><Bug className="h-5 w-5 text-[#E7B75F]" /> QA & Automation</CardTitle>
              </CardHeader>
              <CardContent className="text-[#DEDACB] text-sm">Automated tests for critical flows: quotes, dispatch, POD, invoicing. Less downtime, fewer callbacks.</CardContent>
            </Card>
            <Card className="border-[#E7B75F]/20 bg-[#121214]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white"><BarChart3 className="h-5 w-5 text-[#E7B75F]" /> Product Ops</CardTitle>
              </CardHeader>
              <CardContent className="text-[#DEDACB] text-sm">Translate field pain points into shippable features. Prioritize impact: faster turnarounds and fewer surprises.</CardContent>
            </Card>
          </div>
          <Card className="mt-6 border-[#E7B75F]/20 bg-[#121214]">
            <CardHeader>
              <CardTitle className="text-white">How we plug into trucking</CardTitle>
            </CardHeader>
            <CardContent className="text-[#DEDACB] text-sm">
              • Embed with dispatch to map lanes and SLAs • Wire live ETAs into jobsite comms • Sync quotes→POD→invoice • Automate photo proof and signatures • Keep your tools—add the missing glue.
            </CardContent>
          </Card>
        </div>
        
      </section>
    </div>
  );
}
