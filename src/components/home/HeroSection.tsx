"use client";

import React from "react";
import Link from "next/link";
import { ArrowDownRight, Sparkles, Layers, Cpu, Compass } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-12 pb-20 studio-spotlight">
      {/* Precision Blueprint Grid Overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Telemetry Strip */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181822]/90 border border-white/10 text-[11px] font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-[#d31a24] animate-pulse" />
            <span className="tracking-wider uppercase">{"// PRODUCT DESIGN STUDIO"}</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14141c]/60 border border-white/5 text-[11px] font-mono text-zinc-400">
            <span>RHINOCEROS 8 NURBS</span>
            <span className="text-zinc-600">•</span>
            <span>A3 BLUEPRINTS</span>
            <span className="text-zinc-600">•</span>
            <span>CMF SPECIFICATION</span>
          </div>

          <div className="ml-auto hidden lg:inline-flex items-center gap-2 text-[11px] font-mono text-zinc-500 tabular-nums">
            <Compass className="w-3.5 h-3.5 text-[#d31a24]" />
            <span>PURWOKERTO 7.4243° S, 109.2302° E</span>
          </div>
        </div>

        {/* Hero Editorial Display Typography */}
        <div className="space-y-4 max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#d31a24] font-semibold">
              PORTFOLIO 2025–2026
            </span>
            <span className="h-px w-12 bg-[#d31a24]/50 hidden sm:block" />
            <span className="text-xs font-mono text-zinc-500 tracking-wider">
              MAHASISWA DESAIN PRODUK TUP
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white uppercase leading-[1.05]">
            MAHDI WIRAWAN
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 pt-1">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-zinc-300 tracking-tight">
              Industrial & Automotive Product Design
            </h2>
            <span className="text-sm sm:text-base font-mono text-zinc-500 tracking-widest uppercase">
              / 剣聖 • JINBA ITTAI
            </span>
          </div>

          <p className="text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed pt-2">
            Bridging rigorous ergonomic human factors, orthographic A3 technical blueprints, 
            and emotional automotive surfacing. Grounded in Dieter Rams&apos; principle of{" "}
            <em className="text-white not-italic font-medium">&quot;Weniger, aber besser&quot;</em> and the dynamic flow of Mazda KODO design philosophy.
          </p>
        </div>

        {/* Action Buttons & Quick Anchors */}
        <div className="flex flex-wrap items-center gap-4 pt-10">
          <Link
            href="#flagship-showcase"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#d31a24] hover:bg-[#e62631] text-white text-sm font-medium tracking-tight transition-all duration-200 shadow-xl shadow-[#d31a24]/25 hover:scale-[1.02] border border-red-500/30 group"
          >
            <span>Explore Flagship Projects</span>
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </Link>

          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#181822]/90 hover:bg-[#20202c] text-zinc-200 hover:text-white text-sm font-medium tracking-tight border border-white/10 hover:border-white/20 transition-all duration-200"
          >
            <span>Designer Profile & Leadership</span>
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-zinc-400 hover:text-white text-sm font-mono text-xs tracking-wider uppercase transition-colors"
          >
            <span>{"// ARCHIVE INDEX [4 PROJECTS]"}</span>
          </Link>
        </div>

        {/* Telemetry Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 pt-8 border-t border-white/[0.08]">
          <div className="p-4 rounded-xl bg-[#121218]/50 border border-white/[0.06] backdrop-blur-sm">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider">PROJECTS IN FOCUS</span>
              <Sparkles className="w-3.5 h-3.5 text-[#d31a24]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">04</div>
            <div className="text-xs text-zinc-400 mt-1">Automotive, Fragrance & Micro-mobility</div>
          </div>

          <div className="p-4 rounded-xl bg-[#121218]/50 border border-white/[0.06] backdrop-blur-sm">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider">CAD BLUEPRINTS</span>
              <Layers className="w-3.5 h-3.5 text-zinc-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">300 DPI</div>
            <div className="text-xs text-zinc-400 mt-1">4 A3 Sheets (Ortogonal, Potongan, Detail)</div>
          </div>

          <div className="p-4 rounded-xl bg-[#121218]/50 border border-white/[0.06] backdrop-blur-sm">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider">PRIMARY CAD TOOL</span>
              <Cpu className="w-3.5 h-3.5 text-[#d31a24]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">RHINO 8</div>
            <div className="text-xs text-zinc-400 mt-1">NURBS Surfacing & KeyShot Rendering</div>
          </div>

          <div className="p-4 rounded-xl bg-[#121218]/50 border border-white/[0.06] backdrop-blur-sm">
            <div className="flex items-center justify-between text-zinc-500 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider">LEADERSHIP ROLE</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">KETUA 2026</div>
            <div className="text-xs text-zinc-400 mt-1">Himpunan Desain Produk (HIDEO TUP)</div>
          </div>
        </div>
      </div>
    </section>
  );
}
