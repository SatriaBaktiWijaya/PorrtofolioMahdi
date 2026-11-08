"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Layers, Sliders } from "lucide-react";

export interface ProjectCardProps {
  id: string;
  slug: string;
  title: string;
  kanji?: string;
  subtitle: string;
  category: string;
  year: string;
  role: string;
  tools: string[];
  heroImage: string;
  thumbnailImage?: string;
  cmfColors?: Array<{ name: string; hex: string; desc?: string }>;
  primaryMaterial?: string;
  dimensionsSummary?: string;
  featured?: boolean;
  orderNumber: string;
}

export function ProjectCard({
  slug,
  title,
  kanji,
  subtitle,
  category,
  year,
  tools,
  heroImage,
  cmfColors = [],
  primaryMaterial,
  dimensionsSummary,
  orderNumber,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(-4px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)",
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="group relative rounded-2xl bg-[#14141a] border border-white/[0.08] hover:border-white/25 overflow-hidden flex flex-col justify-between transition-colors duration-300 shadow-xl shadow-black/40"
    >
      {/* Specular Top Light Catcher Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-white/50 transition-all duration-300 z-20" />

      {/* Card Header: Monospaced Index & Category */}
      <div className="p-6 pb-4 flex items-center justify-between text-xs font-mono border-b border-white/[0.04] z-10 bg-[#14141a]/90 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="text-[#d31a24] font-semibold">{orderNumber}</span>
          <span className="text-zinc-500">•</span>
          <span className="text-zinc-400 uppercase tracking-wider">{category}</span>
        </div>
        <span className="text-zinc-500 font-mono">{year}</span>
      </div>

      {/* Image Viewport */}
      <Link href={`/projects/${slug}`} className="block relative aspect-[16/10] overflow-hidden bg-black/60">
        <Image
          src={heroImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Ambient Subtle Hover Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141a] via-transparent to-transparent opacity-80" />

        {/* Floating Quick Action */}
        <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-[#1e1e28]/90 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200 shadow-lg">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </Link>

      {/* Card Body */}
      <div className="p-6 pt-4 flex-1 flex flex-col justify-between space-y-4 z-10">
        <div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-zinc-100 transition-colors">
              <Link href={`/projects/${slug}`} className="hover:underline">
                {title}
              </Link>
            </h3>
            {kanji && (
              <span className="text-xs font-mono text-[#d31a24] font-medium tracking-widest">
                {kanji}
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
            {subtitle}
          </p>
        </div>

        {/* CMF & Telemetry Micro Strip */}
        <div className="space-y-3 pt-3 border-t border-white/[0.06]">
          {cmfColors.length > 0 && (
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <Sliders className="w-3 h-3 text-[#d31a24]" />
                <span>CMF PALETTE</span>
              </span>
              <div className="flex items-center gap-1.5">
                {cmfColors.slice(0, 3).map((c, i) => (
                  <span
                    key={i}
                    title={`${c.name} (${c.hex})`}
                    style={{ backgroundColor: c.hex }}
                    className="w-3.5 h-3.5 rounded-full border border-white/20 inline-block shadow-inner"
                  />
                ))}
              </div>
            </div>
          )}

          {primaryMaterial && (
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-zinc-400" />
                <span>PRIMARY MATERIAL</span>
              </span>
              <span className="text-zinc-300 font-medium truncate max-w-[180px]">
                {primaryMaterial}
              </span>
            </div>
          )}

          {dimensionsSummary && (
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-500">DIMENSIONS</span>
              <span className="text-zinc-400 tabular-nums">{dimensionsSummary}</span>
            </div>
          )}

          {/* Software / CAD Tool Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tools.slice(0, 3).map((tool, index) => (
              <span
                key={index}
                className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-zinc-400 border border-white/[0.05]"
              >
                {tool}
              </span>
            ))}
            {tools.length > 3 && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.02] text-zinc-500">
                +{tools.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Link */}
      <Link
        href={`/projects/${slug}`}
        className="px-6 py-3.5 bg-white/[0.02] hover:bg-[#d31a24]/10 border-t border-white/[0.06] text-xs font-mono font-medium text-zinc-400 hover:text-white flex items-center justify-between transition-colors duration-200"
      >
        <span>INSPECT CASE STUDY</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#d31a24]" />
      </Link>
    </div>
  );
}

