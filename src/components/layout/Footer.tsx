"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, Phone, ExternalLink, ShieldCheck } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-[#0a0a0c] relative z-10 text-zinc-400">
      {/* Engineering Blueprint Accent Stripe */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d31a24]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Identity & Dieter Rams Ethos (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#d31a24] flex items-center justify-center font-mono text-xs font-bold text-white shadow-lg shadow-[#d31a24]/20">
                MW
              </div>
              <div>
                <span className="font-semibold text-white tracking-tight text-base block">
                  MAHDI WIRAWAN
                </span>
                <span className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase block">
                  NIM: 106092430002 • TELKOM UNIVERSITY PURWOKERTO
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-zinc-400 max-w-sm pt-2">
              Industrial & Automotive Product Design. Dedicated to the synthesis of ergonomic human factors, 
              precise CAD engineering drawings, and emotional automotive styling inspired by Mazda KODO & Jinba Ittai.
            </p>

            {/* Dieter Rams 10 Principles badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14141a] border border-white/5 text-[11px] font-mono text-zinc-300">
              <span className="text-[#d31a24] font-bold">10/10</span>
              <span>Weniger, aber besser — Less, but better</span>
            </div>
          </div>

          {/* Column 2: Flagship Case Studies */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-300 font-semibold">
              {"// Flagship Projects"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/projects/mazda-kensei"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Mazda Project Kensei</span>
                  <span className="text-[10px] font-mono text-zinc-600 group-hover:text-[#d31a24]">2025</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/twist-n-pour"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Twist n Pour Watering Can</span>
                  <span className="text-[10px] font-mono text-zinc-600 group-hover:text-[#d31a24]">2025</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/esprit-otoped"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Esprit Otoped (Lotus S1)</span>
                  <span className="text-[10px] font-mono text-zinc-600 group-hover:text-[#d31a24]">2025</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/automotive-wheels"
                  className="hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Automotive Styling & CAD</span>
                  <span className="text-[10px] font-mono text-zinc-600 group-hover:text-[#d31a24]">2026</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Leadership & Roles */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-300 font-semibold">
              {"// Academic Leadership"}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="border-l-2 border-[#d31a24] pl-3 py-0.5">
                <span className="font-medium text-white block text-xs">Ketua HIDEO</span>
                <span className="text-[11px] text-zinc-400 block">Himpunan Desain Produk TUP</span>
                <span className="text-[10px] font-mono text-zinc-500">Periode 2026</span>
              </div>
              <div className="border-l-2 border-zinc-700 pl-3 py-0.5">
                <span className="font-medium text-zinc-300 block text-xs">Wakil Ketua HIDEO</span>
                <span className="text-[11px] text-zinc-500 block">Himpunan Desain Produk TUP</span>
                <span className="text-[10px] font-mono text-zinc-500">Periode 2025</span>
              </div>
              <div className="border-l-2 border-zinc-700 pl-3 py-0.5">
                <span className="font-medium text-zinc-300 block text-xs">Asisten Praktikum</span>
                <span className="text-[11px] text-zinc-500 block">Gambar Teknik (Technical Drawing)</span>
                <span className="text-[10px] font-mono text-zinc-500">2025</span>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-300 font-semibold">
              {"// Direct Inquiries"}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="mailto:mahdiiwirawaan74@gmail.com"
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#d31a24]" />
                  <span className="truncate">mahdiiwirawaan74@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281390112566"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <Phone className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400" />
                  <span>+62 813 9011 2566</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/mahdywrn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-zinc-500 group-hover:text-pink-400" />
                  <span>@mahdywrn</span>
                  <ExternalLink className="w-3 h-3 text-zinc-600" />
                </a>
              </li>
              <li className="pt-2">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Purwokerto, Jawa Tengah, ID</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Engineering Colophon & Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 2026 MAHDI WIRAWAN. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-zinc-600">RHINOCEROS 8 NURBS // A3 BLUEPRINTS // LENIS GSAP</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14141a] border border-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-200 group text-[11px]"
          >
            <span>RETURN TO SUMMIT</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
