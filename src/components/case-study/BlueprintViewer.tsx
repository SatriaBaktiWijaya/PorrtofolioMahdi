"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

export interface BlueprintSheet {
  id: number;
  sheetNumber: string;
  title: string;
  titleId: string;
  scale: string;
  src: string;
  dimensionsDescription: string;
  keyCallouts: string[];
}

const DEFAULT_SHEETS: BlueprintSheet[] = [
  {
    id: 1,
    sheetNumber: "SHEET 01 / 04",
    title: "Orthographic Projections",
    titleId: "GAMBAR TAMPAK (ORTHOGONAL)",
    scale: "SKALA 1:2 (A3)",
    src: "/projects/twist-n-pour/blueprints/blueprint-sheet-1-gambar-tampak.png",
    dimensionsDescription: "Overall dimensions: Height 178.4 mm, Width 180.0 mm, Depth 65.0 mm. Torus outer radius R95.0 mm, inner radius R50.0 mm, base footprint 91.1 x 65.0 mm.",
    keyCallouts: [
      "Tampak Belakang (Rear View) with 65.0 mm depth datum",
      "Tampak Samping (Side View) with 178.4 mm total vertical reach",
      "Tampak Atas (Top View) showing Ø48.1 mm fill port",
      "Isometric Perspective showing compound curvature",
    ],
  },
  {
    id: 2,
    sheetNumber: "SHEET 02 / 04",
    title: "Sectional Cross-Cut Drawings",
    titleId: "GAMBAR POTONGAN (SECTIONS A-A & B-B)",
    scale: "SKALA 1:1 (A3)",
    src: "/projects/twist-n-pour/blueprints/blueprint-sheet-2-gambar-potongan.png",
    dimensionsDescription: "Wall thickness: 2.0 mm uniform polymer cross-section. Internal fluid conduit with smooth draft angle for clean ejection during molding.",
    keyCallouts: [
      "Potongan A-A: Internal fluid conduit path & reservoir volume",
      "Potongan B-B: Toroidal handle hollow cavity and weight distribution",
      "Uniform 2.0 mm polymer shell thickness verification",
      "Parting line allocation along maximum diameter perimeter",
    ],
  },
  {
    id: 3,
    sheetNumber: "SHEET 03 / 04",
    title: "Mechanical Joint & Detail Drawings",
    titleId: "GAMBAR DETAIL (COMPONENTS & JOINTS)",
    scale: "SKALA 1:2 & 1:1 (A3)",
    src: "/projects/twist-n-pour/blueprints/blueprint-sheet-3-gambar-detail.png",
    dimensionsDescription: "Precision fit tolerances: Detail A Nozzle Cap, Detail B Can Lid, Detail C Mechanical Hinges & silicone seal groove.",
    keyCallouts: [
      "Detail A: Nozzle cap mechanical rotation snap-ring",
      "Detail B: Can lid flush seated perimeter flange",
      "Detail C: Pivot joint with integrated travel limiter (90° stop)",
      "O-ring elastomeric seal compression channel",
    ],
  },
  {
    id: 4,
    sheetNumber: "SHEET 04 / 04",
    title: "Exploded Assembly & BOM",
    titleId: "GAMBAR EXPLODED VIEW & BILL OF MATERIALS",
    scale: "SKALA 1:1 (A3)",
    src: "/projects/twist-n-pour/blueprints/blueprint-sheet-4-exploded-view.png",
    dimensionsDescription: "Complete four-component assembly sequence with Bill of Materials (BOM), part numbers, material specs, and manufacturing tooling.",
    keyCallouts: [
      "Item 1: Can Body (Polypropylene 2.0 mm, Blow molded)",
      "Item 2: Nozzle Spout (HDPE Injection molded)",
      "Item 3: Can Lid (Polypropylene overmolded)",
      "Item 4: Nozzle Cap (CNC turned Anodized Aluminum / POM)",
    ],
  },
];

interface BlueprintViewerProps {
  sheets?: BlueprintSheet[];
  title?: string;
  projectSlug?: string;
}

export function BlueprintViewer({
  sheets = DEFAULT_SHEETS,
  title = "A3 Engineering CAD Blueprints (Gambar Kerja)",
}: BlueprintViewerProps) {
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const activeSheet = sheets[activeSheetIndex] || sheets[0];

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="rounded-2xl bg-[#0f0f14] border border-white/[0.08] overflow-hidden shadow-2xl">
      {/* Blueprint Header */}
      <div className="p-4 sm:p-6 border-b border-white/[0.06] bg-[#14141c] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#d31a24] font-semibold uppercase tracking-widest">
              {"// TECHNICAL DRAFTING STANDARDS"}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
            <span className="text-xs font-mono text-zinc-400">300 DPI RETINA RENDER</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight mt-1">{title}</h3>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#0a0a0c] border border-white/10 rounded-lg p-1 text-xs font-mono text-zinc-300">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 hover:text-white hover:bg-white/[0.06] rounded transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 py-0.5 tabular-nums text-[11px]">{Math.round(zoomLevel * 100)}%</span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 hover:text-white hover:bg-white/[0.06] rounded transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="px-2 py-1 text-[10px] text-zinc-500 hover:text-white hover:bg-white/[0.06] rounded transition-colors"
            >
              RESET
            </button>
          </div>

          <a
            href={activeSheet.src}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#191924] border border-white/10 text-zinc-300 hover:text-white hover:bg-[#202030] transition-colors flex items-center gap-1.5 text-xs font-mono"
            title="Open raw full-res 4963x3509 px file"
          >
            <Maximize2 className="w-3.5 h-3.5 text-[#d31a24]" />
            <span className="hidden sm:inline">RAW 4963px</span>
          </a>
        </div>
      </div>

      {/* Sheet Tabs */}
      <div className="flex overflow-x-auto border-b border-white/[0.06] bg-[#111117] p-2 gap-2">
        {sheets.map((sheet, idx) => {
          const isActive = idx === activeSheetIndex;
          return (
            <button
              key={sheet.id}
              type="button"
              onClick={() => {
                setActiveSheetIndex(idx);
                setZoomLevel(1);
              }}
              className={`px-3.5 py-2 rounded-xl text-left font-mono text-xs whitespace-nowrap transition-all duration-200 border flex flex-col ${
                isActive
                  ? "bg-[#181822] text-white border-white/30 shadow-md shadow-black/40"
                  : "bg-transparent text-zinc-400 border-transparent hover:text-zinc-200 hover:bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`text-[10px] ${isActive ? "text-[#d31a24] font-bold" : "text-zinc-500"}`}>
                  {sheet.sheetNumber}
                </span>
                <span className="text-[10px] text-zinc-500">{sheet.scale}</span>
              </div>
              <span className="font-semibold text-xs mt-0.5">{sheet.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Blueprint Viewport Stage */}
      <div className="relative overflow-auto min-h-[450px] max-h-[700px] bg-[#0c0d12] flex items-center justify-center p-6 border-b border-white/[0.06]">
        {/* Subtle CAD Grid Background */}
        <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />

        {/* Scaled Blueprint Image */}
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "center center",
            transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          className="relative max-w-4xl w-full shadow-2xl border border-white/20 rounded-lg overflow-hidden bg-white"
        >
          <div className="relative aspect-[4963/3509] w-full">
            <Image
              src={activeSheet.src}
              alt={activeSheet.titleId}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Blueprint Title Block & Telemetry Bar */}
      <div className="p-6 bg-[#121218] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
        <div className="space-y-1">
          <div className="text-[10px] font-mono text-zinc-500 uppercase">ACTIVE SHEET</div>
          <div className="text-sm font-bold text-white font-mono">{activeSheet.titleId}</div>
          <div className="text-xs text-zinc-400 font-mono">{activeSheet.scale} • FORMAT A3</div>
        </div>

        <div className="space-y-1">
          <div className="text-[10px] font-mono text-zinc-500 uppercase">DIMENSIONAL SUMMARY</div>
          <p className="text-xs text-zinc-300 leading-relaxed">{activeSheet.dimensionsDescription}</p>
        </div>

        <div className="space-y-2">
          <div className="text-[10px] font-mono text-zinc-500 uppercase">KEY ANNOTATION CALLOUTS</div>
          <ul className="space-y-1 text-zinc-400">
            {activeSheet.keyCallouts.slice(0, 3).map((callout, i) => (
              <li key={i} className="flex items-start gap-1.5 text-[11px]">
                <span className="text-[#d31a24] font-mono font-bold">•</span>
                <span>{callout}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
