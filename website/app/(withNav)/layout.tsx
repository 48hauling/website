import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Info, Wrench, Factory, Phone, BadgeCheck, User, Mail } from "lucide-react";

export default function WithNavLayout({ children }: { children: React.ReactNode }) {
  const linkBase = "flex items-center gap-3 rounded-xl px-3 py-2 text-[#DEDACB] hover:text-white hover:bg-white/5";
  const iconCls = "h-4 w-4 text-[#E7B75F]";

  return (
    <div className="min-h-screen w-full bg-[#0B0B0C] text-[#F5F1E6]">
      <aside className="fixed inset-y-0 left-0 z-40 w-60 border-r border-[#E7B75F]/15 bg-[#0B0B0C]/95 px-4 py-5">
        <Link href="/" className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl ring-1 ring-[#E7B75F]/20 bg-[#E7B75F]/10">
            <Image src="/logo.png" alt="48 Hauling" width={40} height={40} className="object-contain" />
          </div>
          <div className="leading-tight">
            <div className="text-base font-semibold tracking-wide">48 Hauling</div>
            <div className="text-[10px] text-[#E7B75F] uppercase tracking-widest">Dump Trucks • Commercial Transportation</div>
          </div>
        </Link>
        <nav className="space-y-1 text-sm">
          <Link href="/" className={linkBase}><Home className={iconCls} /> Home</Link>
          <Link href="/#about" className={linkBase}><Info className={iconCls} /> About</Link>
          <Link href="/#services" className={linkBase}><Wrench className={iconCls} /> Services</Link>
          <Link href="/#industries" className={linkBase}><Factory className={iconCls} /> Industries</Link>
          <Link href="/devops" className={linkBase}><Wrench className={iconCls} /> Dev Ops</Link>
          <Link href="/#contact" className={linkBase}><Phone className={iconCls} /> Contact</Link>
          <Link href="/drivers" className={linkBase}><BadgeCheck className={iconCls} /> Drivers</Link>
          <a href="https://web-panel-indol.vercel.app/login" className={linkBase}><User className={iconCls} /> Admin Portal</a>
        </nav>
        <div className="absolute inset-x-0 bottom-0 p-4 border-t border-[#E7B75F]/15 text-xs text-[#DEDACB] space-y-2">
          <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#E7B75F]" /> Office: <a className="hover:text-white" href="tel:+14805501733">(480) 550-1733</a></div>
          <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#E7B75F]" /> Dispatch: <a className="hover:text-white" href="tel:+16029802192">(602) 980-2192</a></div>
          <a className="flex items-center gap-2 hover:text-white" href="mailto:Javier@48hauling.com"><Mail className="h-4 w-4 text-[#E7B75F]" /> Javier@48hauling.com</a>
        </div>
      </aside>
      <main className="pl-60">{children}</main>
    </div>
  );
}
