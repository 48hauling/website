"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function DriversPage() {
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [employment, setEmployment] = useState([
    { employer: "", position: "", start: "", end: "", dot: false, reason: "" },
  ]);
  const [accidents, setAccidents] = useState([
    { date: "", nature: "", fatalities: "0", injuries: "0", hazmat: "No" },
  ]);
  const [convictions, setConvictions] = useState([
    { date: "", location: "", charge: "", penalty: "" },
  ]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const base = new FormData(e.currentTarget);
    const fd = new FormData();
    base.forEach((v, k) => fd.append(k, v));
    fd.append("employment", JSON.stringify(employment));
    fd.append("accidents", JSON.stringify(accidents));
    fd.append("convictions", JSON.stringify(convictions));
    if (resume) fd.append("resume", resume, resume.name);
    setSubmitting(true);
    setOk(null);
    try {
      const res = await fetch("/api/drivers", { method: "POST", body: fd });
      setOk(res.ok);
      if (res.ok) (e.currentTarget as HTMLFormElement).reset();
    } catch {
      setOk(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#0B0B0C] text-[#F5F1E6]">
      <section className="border-b border-[#E7B75F]/15">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Driver Application</h1>
          <p className="mt-2 max-w-2xl text-[#DEDACB]">
            Complete this FMCSA-aligned application. Provide accurate information for the last 3 years per 49 CFR 391.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <form onSubmit={onSubmit} className="space-y-8" aria-label="FMCSA driver application">
          <Card className="border-[#E7B75F]/20 bg-[#121214]">
            <CardHeader>
              <CardTitle className="text-white">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 text-[#DEDACB]">
              <input name="firstName" required placeholder="First Name" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-4 py-3 text-white placeholder:text-[#8E8872]" />
              <input name="lastName" required placeholder="Last Name" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-4 py-3 text-white placeholder:text-[#8E8872]" />
              <input name="email" type="email" required placeholder="Email" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-4 py-3 text-white placeholder:text-[#8E8872]" />
              <input name="phone" required placeholder="Phone" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-4 py-3 text-white placeholder:text-[#8E8872]" />
              <input name="address" required placeholder="Address" className="md:col-span-2 rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-4 py-3 text-white placeholder:text-[#8E8872]" />
              <input name="dob" type="date" required placeholder="Date of Birth" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-4 py-3 text-white placeholder:text-[#8E8872]" />
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm">Resume (PDF/DOC)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={(e) => setResume(e.target.files?.[0] ?? null)}
                  className="w-full rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-4 py-2 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-[#E7B75F] file:px-3 file:py-2 file:text-[#0B0B0C]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#E7B75F]/20 bg-[#121214]">
            <CardHeader>
              <CardTitle className="text-white">License Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 text-[#DEDACB]">
              <input name="licenseNumber" required placeholder="License Number" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-4 py-3 text-white placeholder:text-[#8E8872]" />
              <input name="licenseState" required placeholder="License State" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-4 py-3 text-white placeholder:text-[#8E8872]" />
              <select name="licenseClass" required className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-3 text-white">
                <option value="">License Class</option>
                <option value="A">Class A</option>
                <option value="B">Class B</option>
                <option value="C">Class C</option>
              </select>
              <input name="endorsements" placeholder="Endorsements (e.g., N, T, H)" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-4 py-3 text-white placeholder:text-[#8E8872]" />
            </CardContent>
          </Card>

          <Card className="border-[#E7B75F]/20 bg-[#121214]">
            <CardHeader>
              <CardTitle className="text-white">Employment History (3 years)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-[#DEDACB]">
              {employment.map((emp, idx) => (
                <div key={idx} className="grid grid-cols-1 gap-3 md:grid-cols-3 rounded-xl border border-[#E7B75F]/20 p-3">
                  <input value={emp.employer} onChange={(e)=>{
                    const n=[...employment]; n[idx].employer=e.target.value; setEmployment(n);
                  }} placeholder="Employer" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
                  <input value={emp.position} onChange={(e)=>{
                    const n=[...employment]; n[idx].position=e.target.value; setEmployment(n);
                  }} placeholder="Position" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
                  <div className="grid grid-cols-2 gap-2 md:col-span-1 md:grid-cols-2">
                    <input type="month" value={emp.start} onChange={(e)=>{ const n=[...employment]; n[idx].start=e.target.value; setEmployment(n); }} placeholder="Start" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
                    <input type="month" value={emp.end} onChange={(e)=>{ const n=[...employment]; n[idx].end=e.target.value; setEmployment(n); }} placeholder="End" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
                  </div>
                  <input value={emp.reason} onChange={(e)=>{ const n=[...employment]; n[idx].reason=e.target.value; setEmployment(n); }} placeholder="Reason for leaving" className="md:col-span-2 rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={emp.dot} onChange={(e)=>{ const n=[...employment]; n[idx].dot=e.target.checked; setEmployment(n); }} /> DOT-regulated
                  </label>
                  <div className="flex items-center justify-end gap-2 md:col-span-3">
                    {employment.length > 1 && (
                      <button type="button" onClick={()=>{ const n=[...employment]; n.splice(idx,1); setEmployment(n); }} className="inline-flex items-center gap-1 rounded-lg border border-red-400/40 px-3 py-1 text-red-300">
                        <Trash2 className="h-4 w-4" /> Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button type="button" onClick={()=> setEmployment([...employment, { employer:"", position:"", start:"", end:"", dot:false, reason:"" }])} className="inline-flex items-center gap-2 rounded-xl border border-[#E7B75F] px-3 py-2 text-[#E7B75F] hover:bg-[#E7B75F]/10">
                <Plus className="h-4 w-4" /> Add Employer
              </button>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-[#E7B75F]/20 bg-[#121214]">
              <CardHeader>
                <CardTitle className="text-white">Accidents (3 years)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {accidents.map((a, idx) => (
                  <div key={idx} className="grid grid-cols-1 gap-3 rounded-xl border border-[#E7B75F]/20 p-3 text-[#DEDACB]">
                    <input type="date" value={a.date} onChange={(e)=>{ const n=[...accidents]; n[idx].date=e.target.value; setAccidents(n);} } placeholder="Date" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
                    <input value={a.nature} onChange={(e)=>{ const n=[...accidents]; n[idx].nature=e.target.value; setAccidents(n);} } placeholder="Nature of accident" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
                    <div className="grid grid-cols-3 gap-2">
                      <input type="number" min="0" value={a.fatalities} onChange={(e)=>{ const n=[...accidents]; n[idx].fatalities=e.target.value; setAccidents(n);} } placeholder="Fatalities" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
                      <input type="number" min="0" value={a.injuries} onChange={(e)=>{ const n=[...accidents]; n[idx].injuries=e.target.value; setAccidents(n);} } placeholder="Injuries" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
                      <select value={a.hazmat} onChange={(e)=>{ const n=[...accidents]; n[idx].hazmat=e.target.value; setAccidents(n);} } className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white">
                        <option>No Hazmat Spill</option>
                        <option>Hazmat Spill</option>
                      </select>
                    </div>
                    <div className="flex justify-end">
                      {accidents.length > 1 && (
                        <button type="button" onClick={()=>{ const n=[...accidents]; n.splice(idx,1); setAccidents(n); }} className="inline-flex items-center gap-1 rounded-lg border border-red-400/40 px-3 py-1 text-red-300">
                          <Trash2 className="h-4 w-4" /> Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button type="button" onClick={()=> setAccidents([...accidents, { date:"", nature:"", fatalities:"0", injuries:"0", hazmat:"No" }])} className="inline-flex items-center gap-2 rounded-xl border border-[#E7B75F] px-3 py-2 text-[#E7B75F] hover:bg-[#E7B75F]/10">
                  <Plus className="h-4 w-4" /> Add Accident
                </button>
              </CardContent>
            </Card>
            <Card className="border-[#E7B75F]/20 bg-[#121214]">
              <CardHeader>
                <CardTitle className="text-white">Traffic Convictions (3 years)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {convictions.map((c, idx) => (
                  <div key={idx} className="grid grid-cols-1 gap-3 rounded-xl border border-[#E7B75F]/20 p-3 text-[#DEDACB]">
                    <input type="date" value={c.date} onChange={(e)=>{ const n=[...convictions]; n[idx].date=e.target.value; setConvictions(n);} } placeholder="Date" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
                    <input value={c.location} onChange={(e)=>{ const n=[...convictions]; n[idx].location=e.target.value; setConvictions(n);} } placeholder="Location" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
                    <input value={c.charge} onChange={(e)=>{ const n=[...convictions]; n[idx].charge=e.target.value; setConvictions(n);} } placeholder="Charge" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
                    <input value={c.penalty} onChange={(e)=>{ const n=[...convictions]; n[idx].penalty=e.target.value; setConvictions(n);} } placeholder="Penalty" className="rounded-xl border border-[#E7B75F]/20 bg-[#0B0B0C] px-3 py-2 text-white" />
                    <div className="flex justify-end">
                      {convictions.length > 1 && (
                        <button type="button" onClick={()=>{ const n=[...convictions]; n.splice(idx,1); setConvictions(n); }} className="inline-flex items-center gap-1 rounded-lg border border-red-400/40 px-3 py-1 text-red-300">
                          <Trash2 className="h-4 w-4" /> Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button type="button" onClick={()=> setConvictions([...convictions, { date:"", location:"", charge:"", penalty:"" }])} className="inline-flex items-center gap-2 rounded-xl border border-[#E7B75F] px-3 py-2 text-[#E7B75F] hover:bg-[#E7B75F]/10">
                  <Plus className="h-4 w-4" /> Add Conviction
                </button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-[#E7B75F]/20 bg-[#121214]">
            <CardHeader>
              <CardTitle className="text-white">Consents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-[#DEDACB]">
              <label className="flex items-start gap-2">
                <input name="consentPreviousEmployers" type="checkbox" required className="mt-1" />
                <span>
                  I consent to previous employer safety performance history requests per 49 CFR 391.23 and MVR inquiries.
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input name="consentDrugAlcohol" type="checkbox" required className="mt-1" />
                <span>
                  I consent to pre‑employment controlled substances/alcohol testing consistent with FMCSA regulations.
                </span>
              </label>
            </CardContent>
          </Card>

          <div className="flex items-center gap-3">
            <Button disabled={submitting} className="bg-[#E7B75F] text-[#0B0B0C] hover:bg-[#C6912A]">
              {submitting ? "Submitting…" : "Submit Application"}
            </Button>
            {ok === true && <span className="text-green-400 text-sm">Submitted. We’ll reach out shortly.</span>}
            {ok === false && <span className="text-red-400 text-sm">Submission failed. Try again.</span>}
          </div>
        </form>
      </section>
    </div>
  );
}

