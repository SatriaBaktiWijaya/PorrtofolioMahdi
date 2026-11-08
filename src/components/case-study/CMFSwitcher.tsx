"use client";

import React, { useState } from "react";
import { Sliders, Sparkles, Layers, ShieldCheck, Check } from "lucide-react";

export interface CMFSwatch {
  id: string;
  name: string;
  hex: string;
  pantone?: string;
  finishType: "High-Gloss" | "Matte" | "Satin" | "Metallic" | "Anodized" | "Textured";
  glossUnitsGU: number; // e.g. 95 GU for Soul Red, 15 GU for Earthen Matte
  materialName: string;
  tactility: string;
  description: string;
  layerComposition: string[];
}

const DEFAULT_SWATCHES: CMFSwatch[] = [
  {
    id: "soul-red",
    name: "Soul Red Crystal Metallic",
    hex: "#8c0b14",
    pantone: "PMS 7628 C",
    finishType: "Metallic",
    glossUnitsGU: 95,
    materialName: "Automotive Candy Multi-coat Polymer",
    tactility: "Ultra-smooth specular mirror glass, cold reflective feel",
    description: "Signature Mazda high-saturation translucent red layer over reflective aluminum flake undercoat.",
    layerComposition: ["2K Polyurethane Clearcoat (35μm)", "Translucent Red Tint Resin (15μm)", "High-Reflective Aluminum Flake Base (12μm)", "Grey Primer Substrate"],
  },
  {
    id: "machine-grey",
    name: "Machine Grey Deep Shadow",
    hex: "#373a40",
    pantone: "PMS Cool Gray 11 C",
    finishType: "Metallic",
    glossUnitsGU: 88,
    materialName: "High-Density Steel-Tone Lacquer",
    tactility: "Micro-machined metallic smoothness with deep shadow contrast",
    description: "High-precision jet black pigment combined with aligned aluminum flakes evoking cast iron billet.",
    layerComposition: ["Gloss Clear Protective Coat", "Dark Reflective Pigment Layer", "Micro-Aluminum Flake Base", "Primer"],
  },
  {
    id: "polymetal-matte",
    name: "Polymetal Industrial Matte",
    hex: "#5c6b73",
    pantone: "PMS 431 U",
    finishType: "Matte",
    glossUnitsGU: 22,
    materialName: "Silica-Matte Modified Acrylic",
    tactility: "Warm satiny dry touch, zero glare under studio spotlights",
    description: "Tactile soft-sheen finish blending raw resin tone with modern utilitarian aerospace aesthetics.",
    layerComposition: ["Matte Polyurethane Clear (Low GU)", "Solid Grey Pigment Layer", "Adhesion Promoter", "Substrate"],
  },
  {
    id: "hyper-silver",
    name: "Machined Anodized Silver",
    hex: "#d1d5db",
    pantone: "PMS 877 C",
    finishType: "Anodized",
    glossUnitsGU: 70,
    materialName: "6061-T6 Aluminum Alloy",
    tactility: "Cold metallic micro-bead blasted texture",
    description: "Precision CNC turned cap and nozzle shroud with rotary hairline knurling.",
    layerComposition: ["Type II Sulfuric Anodizing (15μm)", "Electrolytic Nickel Seal", "Bead Blasted Aluminum Core"],
  },
];

interface CMFSwitcherProps {
  swatches?: CMFSwatch[];
  title?: string;
  subtitle?: string;
}

export function CMFSwitcher({
  swatches = DEFAULT_SWATCHES,
  title = "CMF Material & Finish Specification Studio",
}: CMFSwitcherProps) {
  const [activeSwatchId, setActiveSwatchId] = useState<string>(swatches[0]?.id || "soul-red");

  const current = swatches.find((s) => s.id === activeSwatchId) || swatches[0];

  if (!current) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-[#111116] border border-white/[0.08] overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-white/[0.06] bg-[#14141a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#d31a24] font-semibold uppercase tracking-widest">
              {"// COLOR, MATERIAL & FINISH (CMF)"}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
            <span className="text-xs font-mono text-zinc-400">SPECIFICATION MATRIX</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight mt-1">{title}</h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Sliders className="w-3.5 h-3.5 text-[#d31a24]" />
          <span>{swatches.length} MATERIAL FINISHES</span>
        </div>
      </div>

      {/* Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left: Swatch Selector Stage */}
        <div className="lg:col-span-5 p-6 bg-[#0f0f13] border-b lg:border-b-0 lg:border-r border-white/[0.06] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block">
              SELECT FINISH SWATCH:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {swatches.map((swatch) => {
                const isSelected = swatch.id === activeSwatchId;
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    onClick={() => setActiveSwatchId(swatch.id)}
                    className={`p-3.5 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between gap-3 group relative overflow-hidden ${
                      isSelected
                        ? "bg-[#181822] border-white/40 shadow-lg shadow-black/50"
                        : "bg-[#131319] border-white/[0.05] hover:border-white/20 hover:bg-[#16161f]"
                    }`}
                  >
                    {/* Swatch Pill with Sheen Simulation */}
                    <div className="flex items-center justify-between w-full">
                      <div
                        style={{ backgroundColor: swatch.hex }}
                        className="w-8 h-8 rounded-full border border-white/25 shadow-inner relative overflow-hidden flex items-center justify-center"
                      >
                        {/* Specular Highlight Sheen */}
                        {swatch.finishType === "High-Gloss" && (
                          <div className="absolute top-1 left-1 w-2.5 h-2.5 rounded-full bg-white/70 blur-[0.5px]" />
                        )}
                        {swatch.finishType === "Metallic" && (
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent" />
                        )}
                        {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                      </div>

                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/[0.06] text-zinc-300">
                        {swatch.glossUnitsGU} GU
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-zinc-200">
                        {swatch.name}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
                        {swatch.hex.toUpperCase()} • {swatch.finishType}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Note */}
          <div className="p-3 rounded-lg bg-black/40 border border-white/[0.04] text-[11px] text-zinc-500 font-mono flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#d31a24]" />
            <span>Tested under D65 standard daylight illuminating cabinets</span>
          </div>
        </div>

        {/* Right: Real-time Telemetry Readout & Layer Stack */}
        <div className="lg:col-span-7 p-6 bg-[#131318] flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* Active Swatch Header Card */}
            <div className="p-5 rounded-xl bg-[#181822] border border-white/[0.08] relative overflow-hidden">
              <div
                style={{
                  background: `linear-gradient(90deg, ${current.hex}44, transparent)`,
                }}
                className="absolute inset-0 pointer-events-none"
              />

              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">
                      {current.finishType.toUpperCase()}
                    </span>
                    <span>HEX: {current.hex.toUpperCase()}</span>
                    {current.pantone && <span>• {current.pantone}</span>}
                  </div>
                  <h4 className="text-2xl font-bold text-white tracking-tight">{current.name}</h4>
                  <p className="text-xs text-zinc-300 font-medium mt-1">{current.materialName}</p>
                </div>

                <div className="text-right sm:border-l sm:border-white/10 sm:pl-4 self-start sm:self-auto">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">SPECULAR GLOSS</div>
                  <div className="text-2xl font-mono font-bold text-white tabular-nums">
                    {current.glossUnitsGU}{" "}
                    <span className="text-xs font-normal text-zinc-400">GU (60°)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tactility & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#16161e] border border-white/[0.05]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#d31a24]" />
                  <span>TACTILE SENSORY EXPERIENCE</span>
                </div>
                <p className="text-zinc-300 leading-relaxed">{current.tactility}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#16161e] border border-white/[0.05]">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                  <span>FORMULATION NOTE</span>
                </div>
                <p className="text-zinc-300 leading-relaxed">{current.description}</p>
              </div>
            </div>

            {/* Micro Multi-Layer Coating Stack */}
            <div className="p-4 rounded-xl bg-[#16161e] border border-white/[0.05]">
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#d31a24]" />
                <span>CROSS-SECTION COATING STRATIGRAPHY (OUTER TO CORE)</span>
              </div>

              <div className="space-y-1.5">
                {current.layerComposition.map((layer, index) => (
                  <div
                    key={index}
                    className="p-2 rounded bg-black/40 border border-white/[0.04] text-xs font-mono flex items-center justify-between text-zinc-300"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500 text-[10px]">L{index + 1}</span>
                      <span>{layer}</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 uppercase">
                      {index === 0 ? "Top Finish" : index === current.layerComposition.length - 1 ? "Substrate" : "Interlayer"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
