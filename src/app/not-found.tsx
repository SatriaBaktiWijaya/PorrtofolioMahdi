import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24 overflow-hidden">
      {/* Background Ambience: Technical Blueprint Grid & Studio Spotlight */}
      <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 studio-spotlight pointer-events-none" />

      {/* Center Frosted Glass & Specular Panel */}
      <div className="relative max-w-xl w-full p-8 sm:p-12 rounded-3xl bg-[#121218]/85 backdrop-blur-2xl border border-white/[0.1] shadow-2xl specular-card space-y-8 text-center sm:text-left">
        
        {/* Technical Telemetry Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d31a24] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d31a24]" />
            </span>
            <span className="text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
              {"// ERROR 404: SPECIFICATION NOT FOUND"}
            </span>
          </div>

          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider text-center sm:text-right">
            HTTP_STATUS: 404
          </div>
        </div>

        {/* Editorial Headline & Telemetry */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-zinc-400">
            <AlertCircle className="w-3.5 h-3.5 text-[#d31a24]" />
            <span>UNRESOLVED_ROUTE_IDENTIFIER</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            Artifact Not Located
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed pt-1">
            The requested design specification, NURBS CAD geometry, or project archive does not exist at this coordinate. It may have been relocated, decommissioned, or never entered production.
          </p>
        </div>

        {/* Dieter Rams Philosophy Quote */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] text-xs font-mono text-zinc-400 flex items-start gap-3">
          <span className="text-[#d31a24] font-bold text-sm">“</span>
          <div className="space-y-0.5">
            <div className="text-zinc-300 italic font-sans text-xs">
              &quot;Weniger, aber besser&quot; — Good design is thorough down to the last detail.
            </div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
              Dieter Rams • Ten Principles for Good Design
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#d31a24] hover:bg-[#e62631] text-white text-xs font-mono font-semibold tracking-wider transition-all duration-200 shadow-lg shadow-[#d31a24]/25 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>RETURN TO HOME</span>
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#181822] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10 text-xs font-mono font-medium tracking-wider transition-all duration-200"
          >
            <Compass className="w-4 h-4 text-zinc-400" />
            <span>BROWSE CATALOG</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
