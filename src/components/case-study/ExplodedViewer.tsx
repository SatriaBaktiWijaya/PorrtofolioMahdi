"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Info, Layers, Activity } from "lucide-react";

export interface ExplodedPartDetail {
  id: number;
  partNumber: string;
  name: string;
  nameId: string;
  function: string;
  material: string;
  manufacturingProcess: string;
  ergonomicRationale: string;
  position: { x: number; y: number }; // percentage coordinates
}

const DEFAULT_PARTS: ExplodedPartDetail[] = [
  {
    id: 1,
    partNumber: "P-01",
    name: "Can Main Body",
    nameId: "Bodi Utama Penyiram",
    function: "Primary water reservoir (0.75 L) with integrated asymmetrical toroidal loop serving as high/sloped ergonomic handle.",
    material: "Polypropylene (PP) with matte earthen micro-texture filler",
    manufacturingProcess: "Two-stage blow molding / rotational polymer casting, wall thickness 2.0 mm",
    ergonomicRationale: "Uy et al. (2013) demonstrated that limiting fluid capacity between 0.5–1.0 L prevents forearm muscle exhaustion (<15% max grip strength). Torus outer radius R95 mm ensures balanced center of gravity throughout pouring arcs.",
    position: { x: 48, y: 56 },
  },
  {
    id: 2,
    partNumber: "P-02",
    name: "Rotating Nozzle Spout",
    nameId: "Corong Nozzle Putar",
    function: "Fluid conduit seamlessly concealed within the circular silhouette, revealed via 90° mechanical rotation.",
    material: "High-density Polyethylene (HDPE) with food-grade silicone O-ring seal",
    manufacturingProcess: "Precision injection molding with snap-fit pivot joint",
    ergonomicRationale: "High & Sloped handle geometry keeps the user's wrist in neutral posture (<10° deviation), significantly reducing extensor carpi radialis tension during continuous watering cycles.",
    position: { x: 70, y: 38 },
  },
  {
    id: 3,
    partNumber: "P-03",
    name: "Dual-Mode Nozzle Cap",
    nameId: "Tutup Pengatur Nozzle",
    function: "Precision metering cap providing Mode A (aerated shower for delicate succulents) and Mode B (laminar stream for root-directed irrigation).",
    material: "Anodized Aluminum / Precision Molded POM",
    manufacturingProcess: "CNC turning and laser micro-perforation (0.8 mm apertures)",
    ergonomicRationale: "Handle diameter engineered at 24.8 mm (~25 mm per Uy et al. 2013 findings), proven to produce the lowest forearm muscle EMG activity across pouring tasks.",
    position: { x: 82, y: 28 },
  },
  {
    id: 4,
    partNumber: "P-04",
    name: "Fill Aperture Lid",
    nameId: "Tutup Lubang Pengisian",
    function: "Low-profile recessed seal covering the Ø48.1 mm top filling port, preventing accidental splashback while replenishing.",
    material: "Soft-touch elastomer overmolded Polypropylene",
    manufacturingProcess: "Two-shot injection overmolding (2K)",
    ergonomicRationale: "Flush top placement allows single-handed thumb depression while holding the vessel under domestic tap faucets without awkward wrist pronation.",
    position: { x: 38, y: 32 },
  },
];

interface ExplodedViewerProps {
  assembledImage?: string;
  explodedImage?: string;
  parts?: ExplodedPartDetail[];
  title?: string;
}

export function ExplodedViewer({
  assembledImage = "/projects/twist-n-pour/twist-hero-main.png",
  explodedImage = "/projects/twist-n-pour/twist-exploded-perspective.png",
  parts = DEFAULT_PARTS,
  title = "Interactive Exploded Perspective & Part Breakdown",
}: ExplodedViewerProps) {
  const [viewMode, setViewMode] = useState<"assembled" | "exploded">("exploded");
  const [activePartId, setActivePartId] = useState<number>(1);

  const activePart = parts.find((p) => p.id === activePartId) || parts[0];

  if (!activePart) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-[#111116] border border-white/[0.08] overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="p-4 sm:p-6 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#14141a]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#d31a24] font-semibold uppercase tracking-widest">
              {"// CAD ENGINEERING ARCHITECTURE"}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
            <span className="text-xs font-mono text-zinc-400">SKALA 1:1 CAD</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight mt-1">{title}</h3>
        </div>

        {/* View State Toggle Button */}
        <div className="inline-flex p-1 rounded-xl bg-[#0a0a0c] border border-white/10 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("assembled")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-mono transition-all duration-200 ${
              viewMode === "assembled"
                ? "bg-white/10 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            [ Assembled State ]
          </button>
          <button
            type="button"
            onClick={() => setViewMode("exploded")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-mono transition-all duration-200 ${
              viewMode === "exploded"
                ? "bg-[#d31a24] text-white shadow-md shadow-[#d31a24]/30"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            [ Exploded Perspective ]
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Viewport with Interactive Pins */}
        <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] bg-black/60 p-6 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/[0.06]">
          {/* Blueprint Grid Watermark */}
          <div className="absolute inset-0 blueprint-grid-dense opacity-20 pointer-events-none" />

          {/* Current Render View */}
          <div className="relative w-full aspect-[4/3] max-w-lg mx-auto">
            <Image
              src={viewMode === "exploded" ? explodedImage : assembledImage}
              alt={viewMode === "exploded" ? "Exploded perspective schematic" : "Assembled product"}
              fill
              className="object-contain transition-opacity duration-300"
              priority
            />

            {/* Interactive Hotspot Pins (active in exploded mode) */}
            {viewMode === "exploded" &&
              parts.map((part) => {
                const isSelected = part.id === activePartId;
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => setActivePartId(part.id)}
                    style={{ left: `${part.position.x}%`, top: `${part.position.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 group z-20 ${
                      isSelected ? "scale-125" : "hover:scale-110"
                    }`}
                    title={part.name}
                  >
                    <span className="relative flex h-7 w-7 items-center justify-center">
                      {isSelected && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d31a24] opacity-75" />
                      )}
                      <span
                        className={`relative inline-flex items-center justify-center rounded-full h-6 w-6 text-xs font-mono font-bold shadow-lg border ${
                          isSelected
                            ? "bg-[#d31a24] text-white border-white"
                            : "bg-[#181822] text-zinc-300 border-white/30 group-hover:bg-white group-hover:text-black"
                        }`}
                      >
                        {part.id}
                      </span>
                    </span>
                  </button>
                );
              })}
          </div>

          {/* Viewport Overlay Caption */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>MODE: {viewMode.toUpperCase()}</span>
            <span>CLICK NUMBERS TO INSPECT COMPONENT</span>
          </div>
        </div>

        {/* Right: Technical Part Inspection Telemetry Drawer */}
        <div className="lg:col-span-5 p-6 bg-[#121217] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Part Index Badge */}
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded bg-[#d31a24]/15 border border-[#d31a24]/30 text-xs font-mono font-bold text-[#d31a24]">
                {activePart.partNumber}
              </span>
              <span className="text-xs font-mono text-zinc-500">BOM ITEM #{activePart.id} OF 4</span>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white tracking-tight">{activePart.name}</h4>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">{activePart.nameId}</p>
            </div>

            {/* Specifications Cards */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-[#171720] border border-white/[0.05]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#d31a24]" />
                  <span>FUNCTIONAL UTILITY</span>
                </div>
                <p className="text-zinc-200 leading-relaxed">{activePart.function}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#171720] border border-white/[0.05]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-zinc-400" />
                  <span>MATERIAL & TOOLING PROCESS</span>
                </div>
                <p className="text-zinc-200 font-medium">{activePart.material}</p>
                <p className="text-zinc-400 text-[11px] mt-1">{activePart.manufacturingProcess}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#181822]/70 border border-[#d31a24]/20">
                <div className="text-[10px] font-mono text-[#d31a24] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#d31a24]" />
                  <span>ERGONOMIC POSTURE EVIDENCE (UY ET AL. 2013)</span>
                </div>
                <p className="text-zinc-300 text-[11px] leading-relaxed">
                  {activePart.ergonomicRationale}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Part Selector Tabs */}
          <div className="pt-4 border-t border-white/[0.06]">
            <div className="text-[10px] font-mono uppercase text-zinc-500 mb-2">
              QUICK PART SELECTOR
            </div>
            <div className="grid grid-cols-2 gap-2">
              {parts.map((p) => {
                const isActive = p.id === activePartId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePartId(p.id)}
                    className={`p-2 rounded-lg text-left transition-all duration-150 flex items-center gap-2 text-xs ${
                      isActive
                        ? "bg-[#d31a24]/20 border border-[#d31a24]/50 text-white font-medium"
                        : "bg-[#16161d] border border-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="font-mono text-[10px] text-zinc-500">{p.partNumber}</span>
                    <span className="truncate">{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
