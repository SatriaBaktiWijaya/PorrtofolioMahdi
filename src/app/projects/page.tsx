"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getAllProjects } from "@/data/projects";
import {
  LayoutGrid,
  Table as TableIcon,
  ArrowUpRight,
  FolderSearch,
} from "lucide-react";

export default function ProjectsPage() {
  const allProjects = getAllProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Dynamically aligned with the exact project categories in src/data/projects.ts
  const dynamicCategories = Array.from(
    new Set(allProjects.map((p) => p.category))
  );
  const categories = ["All", ...dynamicCategories];

  const filteredProjects =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 border-b border-white/[0.08] pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
          <span>{"// PROJECT ARCHIVE & TECHNICAL INDEX"}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
          <span>STUDIO DP1 & DP2 WORKS</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase">
          Design Projects & Works
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
          Comprehensive catalog of industrial products, automotive fragrance vessels, urban personal 
          mobility prototypes, and parametric NURBS 3D CAD models developed between 2024 and 2026.
        </p>
      </div>

      {/* Filter and View Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#14141a] border border-white/[0.08]">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? "bg-[#d31a24] text-white font-semibold shadow-md shadow-[#d31a24]/30"
                    : "bg-[#181822] text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/5"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* View Switcher: Bento vs Table */}
        <div className="flex items-center gap-1 bg-[#0a0a0c] border border-white/10 p-1 rounded-xl self-start md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              viewMode === "grid"
                ? "bg-white/10 text-white font-medium"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>BENTO GRID</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              viewMode === "table"
                ? "bg-white/10 text-white font-medium"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>SPEC TABLE</span>
          </button>
        </div>
      </div>

      {/* Results View */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl bg-[#111116] border border-white/[0.08] p-12 sm:p-16 text-center space-y-6 specular-card">
          <div className="inline-flex p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-zinc-400">
            <FolderSearch className="w-6 h-6 text-[#d31a24]" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <div className="text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
              {"// TELEMETRY: ZERO ARTIFACTS"}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              No Projects in this Classification
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              No industrial design artifacts or CAD models are currently assigned to the category{" "}
              <span className="text-white font-mono font-medium">&quot;{selectedCategory}&quot;</span>.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#181822] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200"
            >
              <span>RESET FILTER TO ALL</span>
            </button>
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              slug={project.slug}
              title={project.title}
              kanji={project.japaneseTitle}
              subtitle={project.subtitle}
              category={project.category}
              year={project.year.toString()}
              role={project.role}
              tools={project.software}
              heroImage={project.heroImage}
              thumbnailImage={project.thumbnailImage}
              cmfColors={project.cmf?.colors?.map((c) => ({
                name: c.name,
                hex: c.hex,
                desc: c.finishType,
              }))}
              primaryMaterial={project.cmf?.materials?.[0]?.name}
              dimensionsSummary={
                project.dimensions
                  ? `${project.dimensions.lengthMm} × ${project.dimensions.widthMm} × ${project.dimensions.heightMm} mm`
                  : undefined
              }
              orderNumber={`// 0${idx + 1}`}
              featured={project.featured}
            />
          ))}
        </div>
      ) : (
        /* Technical Spec Table View */
        <div className="rounded-2xl bg-[#111116] border border-white/[0.08] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#161620] border-b border-white/[0.08] text-zinc-400 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-4 px-6">#</th>
                  <th className="py-4 px-6">Project Title & Concept</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Semester</th>
                  <th className="py-4 px-6">Primary Material</th>
                  <th className="py-4 px-6">CAD Software</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {filteredProjects.map((project, idx) => (
                  <tr
                    key={project.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-4 px-6 text-[#d31a24] font-semibold">
                      {"// 0"}{idx + 1}
                    </td>
                    <td className="py-4 px-6">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="font-sans font-bold text-sm text-white group-hover:text-[#d31a24] transition-colors flex items-center gap-2"
                      >
                        <span>{project.title}</span>
                        {project.japaneseTitle && (
                          <span className="text-xs text-zinc-500 font-mono">
                            {project.japaneseTitle}
                          </span>
                        )}
                      </Link>
                      <div className="text-[11px] text-zinc-400 font-sans mt-0.5">
                        {project.subtitle}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-zinc-300">
                      <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5">
                        {project.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-zinc-400">
                      {project.semester} ({project.year})
                    </td>
                    <td className="py-4 px-6 text-zinc-300">
                      {project.cmf?.materials?.[0]?.name || "Multi-material"}
                    </td>
                    <td className="py-4 px-6 text-zinc-400">
                      {project.software.slice(0, 2).join(", ")}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1 text-[#d31a24] hover:text-[#e62631] font-semibold"
                      >
                        <span>CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
