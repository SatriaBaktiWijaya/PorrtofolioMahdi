import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getAllProjects, getProjectBySlug } from "@/data/projects";
import { ExplodedViewer } from "@/components/case-study/ExplodedViewer";
import { CMFSwitcher } from "@/components/case-study/CMFSwitcher";
import { BlueprintViewer } from "@/components/case-study/BlueprintViewer";
import {
  ArrowLeft,
  Activity,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} — Mahdi Wirawan Industrial Design`,
    description: `${project.subtitle}. ${project.story.challenge}`,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  // Specific CMF swatches based on project slug
  const projectSwatches = project.cmf.colors.map((c, i) => ({
    id: `swatch-${i}`,
    name: c.name,
    hex: c.hex,
    pantone: c.pantone,
    finishType: (c.finishType as "High-Gloss" | "Matte" | "Satin" | "Metallic" | "Anodized" | "Textured") || "Metallic",
    glossUnitsGU: c.glossLevelGU || (c.finishType === "High-Gloss" ? 95 : c.finishType === "Matte" ? 20 : 60),
    materialName: project.cmf.materials[i % project.cmf.materials.length]?.name || "Specialty Polymer Compound",
    tactility: project.cmf.finishes[i % project.cmf.finishes.length]?.tactility || "Precision micro-machined surface",
    description: project.cmf.finishes[i % project.cmf.finishes.length]?.name || "High-durability industrial protective coating",
    layerComposition: [
      "Top Clear Protective Finish",
      `${c.name} Pigment Layer`,
      "Primer Substrate",
    ],
  }));

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-20">
      {/* 1. Breadcrumbs & Return Navigation */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>RETURN TO ARCHIVE</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <span>PROJECT {project.order} OF 4</span>
          <span>•</span>
          <span className="text-[#d31a24] uppercase">{project.category}</span>
        </div>
      </div>

      {/* 2. Hero & Telemetry Matrix (Stage 1) */}
      <section className="space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
              {"// CASE STUDY "}{project.order.toString().padStart(2, "0")}
            </span>
            <span className="h-px w-8 bg-[#d31a24]/50" />
            <span className="text-xs font-mono text-zinc-400 uppercase">
              {project.semester} ({project.year})
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-3">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white uppercase">
              {project.title}
            </h1>
            {project.japaneseTitle && (
              <span className="text-2xl sm:text-3xl font-mono text-[#d31a24] font-medium tracking-widest">
                {project.japaneseTitle}
              </span>
            )}
          </div>

          <p className="text-lg sm:text-xl text-zinc-300 font-medium max-w-3xl">
            {project.subtitle} — <span className="italic text-zinc-400">&quot;{project.tagline}&quot;</span>
          </p>
        </div>

        {/* Hero Image Showcase */}
        <div className="relative aspect-[16/9] w-full rounded-3xl bg-[#0c0d12] border border-white/[0.1] overflow-hidden shadow-2xl flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-contain p-4"
            priority
          />
        </div>

        {/* Engineering Specification Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#14141a] border border-white/[0.08] text-xs font-mono">
          <div>
            <div className="text-[10px] text-zinc-500 uppercase">DESIGNER & MODELER</div>
            <div className="text-zinc-200 font-medium mt-1">{project.role}</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase">STUDIO & CONTEXT</div>
            <div className="text-zinc-200 font-medium mt-1">{project.semester} • Telkom University</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase">PRIMARY CAD TOOLS</div>
            <div className="text-zinc-200 font-medium mt-1">{project.software.slice(0, 2).join(", ")}</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase">DIMENSIONS & MASS</div>
            <div className="text-zinc-200 font-medium mt-1 tabular-nums">
              {project.dimensions
                ? `${project.dimensions.lengthMm} × ${project.dimensions.widthMm} × ${project.dimensions.heightMm} mm`
                : "Parametric Scalable CAD"}
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Challenge & Context Narrative (Stage 2) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/[0.08] pt-16">
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
            <span>{"// 02. DESIGN CONTEXT"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            The Design Challenge
          </h2>
          <p className="text-xs font-mono text-zinc-500">
            PROBLEM FORMULATION & TARGET USER PERSONA
          </p>
        </div>

        <div className="lg:col-span-8 space-y-6 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <p className="text-lg font-medium text-white leading-relaxed">
            {project.story.challenge}
          </p>

          <p>{project.story.contextNarrative}</p>

          {/* Ergonomics Research Spotlight (for Twist n Pour and related projects) */}
          {project.story.ergonomicsResearch && (
            <div className="p-6 rounded-2xl bg-[#14141e] border border-[#d31a24]/30 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#d31a24] font-bold uppercase tracking-wider">
                <Activity className="w-4 h-4" />
                <span>ERGONOMIC POSTURE RESEARCH & SCIENTIFIC CITATION</span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {project.story.ergonomicsResearch.summary}
              </p>

              {project.story.ergonomicsResearch.academicCitations && (
                <div className="p-3 rounded-lg bg-black/50 border border-white/5 text-xs font-mono text-zinc-400">
                  <span className="text-zinc-500 block text-[10px] uppercase">Academic Reference:</span>
                  {project.story.ergonomicsResearch.academicCitations.join("; ")}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-semibold text-zinc-400 uppercase">
                    Observed Pain Points:
                  </span>
                  <ul className="space-y-1 text-xs text-zinc-300">
                    {project.story.ergonomicsResearch.keyPainPoints.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#d31a24] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-semibold text-zinc-400 uppercase">
                    Ergonomic Engineering Solutions:
                  </span>
                  <ul className="space-y-1 text-xs text-zinc-300">
                    {project.story.ergonomicsResearch.ergonomicSolutions.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Ideation Sketches & Form Variations (Stage 3) */}
      <section className="space-y-8 border-t border-white/[0.08] pt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
              <span>{"// 03. FORM IDEATION"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              Ideation Sketches & Exploratory Studies
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400 max-w-md">
            {project.story.ideation.narrative}
          </p>
        </div>

        {/* Sketches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.story.ideation.sketches.map((sketch, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#121218] border border-white/[0.08] overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full bg-black/40">
                <Image
                  src={sketch.src}
                  alt={sketch.alt}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-4 border-t border-white/[0.04] bg-[#14141a]">
                <div className="text-xs font-semibold text-white">{sketch.alt}</div>
                {sketch.caption && (
                  <div className="text-[11px] text-zinc-400 mt-0.5">{sketch.caption}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 3D CAD, Exploded View & Engineering Blueprints (Stage 4) */}
      <section className="space-y-12 border-t border-white/[0.08] pt-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
            <span>{"// 04. CAD & MECHANICAL SURFACING"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Rhinoceros 8 NURBS Modeling & Exploded View
          </h2>
          <div className="flex flex-wrap gap-2 pt-3">
            {project.story.cadAndEngineering.softwareUsed.map((tool, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-[#181822] border border-white/10 text-xs font-mono text-zinc-300"
              >
                {tool}
              </span>
            ))}
            {project.story.cadAndEngineering.tolerancesMm && (
              <span className="px-2.5 py-1 rounded bg-[#d31a24]/10 border border-[#d31a24]/30 text-xs font-mono text-[#d31a24]">
                TOLERANCES: {project.story.cadAndEngineering.tolerancesMm}
              </span>
            )}
          </div>
        </div>

        {/* Interactive Exploded Viewer (Custom tailored for Twist n Pour or general CAD exploded view) */}
        {slug === "twist-n-pour" ? (
          <ExplodedViewer
            assembledImage="/projects/twist-n-pour/twist-hero-main.png"
            explodedImage="/projects/twist-n-pour/twist-exploded-perspective.png"
            title="Twist n Pour Exploded Perspective & Ergonomic BOM"
          />
        ) : (
          /* General High-Res Exploded / Detail View */
          <div className="rounded-2xl bg-[#111116] border border-white/[0.08] p-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#d31a24] font-semibold">CAD DETAIL / EXPLODED SCHEMATIC</span>
              <span className="text-zinc-500">G2 CURVATURE CONTINUITY</span>
            </div>
            <div className="relative aspect-[16/9] w-full rounded-xl bg-black/60 overflow-hidden">
              <Image
                src={project.thumbnailImage}
                alt="CAD Surfacing Detail"
                fill
                className="object-contain p-4"
              />
            </div>
          </div>
        )}

        {/* 300 DPI CAD Blueprint Viewer (For Twist n Pour) */}
        {slug === "twist-n-pour" && (
          <BlueprintViewer title="A3 Engineering CAD Blueprints (Gambar Kerja — Skala 1:1 & 1:2)" />
        )}
      </section>

      {/* 6. Physical Prototyping & CMF Studio (Stage 5) */}
      <section className="space-y-12 border-t border-white/[0.08] pt-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
            <span>{"// 05. FABRICATION & CMF SPECIFICATION"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Physical Prototyping & Multi-layer Finishing
          </h2>
          <p className="text-xs font-mono text-zinc-400 mt-2">
            Scale {project.story.prototypingAndManufacturing.scale} fabrication workflow utilizing{" "}
            {project.story.prototypingAndManufacturing.materialsUsed.join(", ")}.
          </p>
        </div>

        {/* Prototyping Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.story.prototypingAndManufacturing.steps.map((step) => (
            <div
              key={step.stepNumber}
              className="p-6 rounded-2xl bg-[#14141a] border border-white/[0.08] flex flex-col justify-between space-y-4 hover:border-white/20 transition-colors"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#d31a24]">
                  STEP 0{step.stepNumber}
                </span>
                <h4 className="text-base font-bold text-white tracking-tight">{step.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{step.description}</p>
              </div>

              {step.image && (
                <div className="relative aspect-[4/3] w-full rounded-xl bg-black/50 overflow-hidden border border-white/5">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive CMF Studio Switcher */}
        <CMFSwitcher
          swatches={projectSwatches}
          title={`${project.title} CMF Material Swatch Telemetry`}
        />
      </section>

      {/* 7. Studio Gallery (Stage 6) */}
      <section className="space-y-8 border-t border-white/[0.08] pt-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
            <span>{"// 06. STUDIO PRESENTATION GALLERY"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            High-Resolution Renders & Presentation Plates
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.story.gallery.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#121218] border border-white/[0.08] overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] w-full bg-black/60">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-4 border-t border-white/[0.04] bg-[#14141a]">
                <div className="text-xs font-semibold text-white">{item.alt}</div>
                {item.caption && (
                  <div className="text-[11px] text-zinc-400 mt-0.5">{item.caption}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Pagination: Previous & Next Project */}
      <section className="pt-12 border-t border-white/[0.08]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/projects/${prevProject.slug}`}
            className="p-6 rounded-2xl bg-[#14141a] border border-white/[0.08] hover:border-white/20 transition-all duration-200 group flex items-center justify-between"
          >
            <div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase flex items-center gap-1.5">
                <ChevronLeft className="w-3.5 h-3.5 text-[#d31a24]" />
                <span>PREVIOUS CASE STUDY</span>
              </div>
              <div className="text-lg font-bold text-white mt-1 group-hover:text-zinc-200">
                {prevProject.title}
              </div>
            </div>
            <span className="text-xs font-mono text-zinc-500">{prevProject.year}</span>
          </Link>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="p-6 rounded-2xl bg-[#14141a] border border-white/[0.08] hover:border-white/20 transition-all duration-200 group flex items-center justify-between text-right"
          >
            <span className="text-xs font-mono text-zinc-500">{nextProject.year}</span>
            <div>
              <div className="text-[10px] font-mono text-zinc-500 uppercase flex items-center justify-end gap-1.5">
                <span>NEXT CASE STUDY</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#d31a24]" />
              </div>
              <div className="text-lg font-bold text-white mt-1 group-hover:text-zinc-200">
                {nextProject.title}
              </div>
            </div>
          </Link>
        </div>
      </section>
    </article>
  );
}
