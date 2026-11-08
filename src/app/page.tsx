import React from "react";
import Link from "next/link";
import { HeroSection } from "@/components/home/HeroSection";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getAllProjects } from "@/data/projects";
import {
  ArrowUpRight,
  Layers,
  Cpu,
  Mail,
  Phone,
  Sparkles,
  Award,
} from "lucide-react";

export default function HomePage() {
  const allProjects = getAllProjects();

  const dieterRamsPrinciples = [
    { num: "01", title: "Innovative", desc: "Technology and design advance concurrently; innovative form serves new utility." },
    { num: "02", title: "Makes Product Useful", desc: "Primary emphasis on psychological and physical ergonomic utility." },
    { num: "03", title: "Aesthetic", desc: "The aesthetic quality of a product is integral to its daily usefulness." },
    { num: "04", title: "Understandable", desc: "Clarifies the product structure and self-explains its operational mode." },
    { num: "05", title: "Unobtrusive", desc: "Products are neutral tools, not decorative or flamboyant monuments." },
    { num: "06", title: "Honest", desc: "Never manipulates consumers with illusions of non-existent value." },
    { num: "07", title: "Long-Lasting", desc: "Avoids ephemeral trends; endures physically and visually for decades." },
    { num: "08", title: "Thorough Detail", desc: "Nothing is arbitrary. Care and precision manifest respect for the user." },
    { num: "09", title: "Eco-Friendly", desc: "Minimizes physical pollution and material consumption across lifecycles." },
    { num: "10", title: "As Little Design as Possible", desc: "Less, but better — concentrated upon the essential aspects." },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Flagship Case Studies Showcase */}
      <section id="flagship-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
              <span>{"// 01. SELECTED CASE STUDIES"}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
              <span className="text-zinc-500">2025–2026 ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
              Flagship Industrial & Automotive Works
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>VIEW ALL WORKS IN SPEC TABLE</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#d31a24]" />
          </Link>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allProjects.map((project, idx) => (
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
      </section>

      {/* 3. Design Philosophy Section: Dieter Rams & Jinba Ittai */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-[#14141c] to-[#0d0d12] border border-white/[0.08] p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d31a24]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
              <span>{"// 02. DESIGN ETHOS & PHILOSOPHY"}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
              <span>DIETER RAMS × JINBA ITTAI</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              &quot;Weniger, aber besser&quot; — Less, but better.
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
              Industrial design is not about superficial ornamentation; it is the deliberate elimination 
              of noise until only pure functional utility and emotional resonance remain. Combining Dieter Rams&apos; 
              celebrated 10 Principles of Good Design with Mazda&apos;s Japanese concept of{" "}
              <strong className="text-white font-semibold">人馬一体 (Jinba Ittai)</strong> — the emotional oneness between user and tool — 
              my work seeks harmony between mechanical rigor and sensory delight.
            </p>
          </div>

          {/* 10 Principles Mini Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12 pt-8 border-t border-white/[0.08] relative z-10">
            {dieterRamsPrinciples.map((principle) => (
              <div
                key={principle.num}
                className="p-4 rounded-xl bg-black/40 border border-white/[0.05] hover:border-white/20 transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-[#d31a24] font-bold block mb-1">
                    {principle.num}
                  </span>
                  <h4 className="text-sm font-semibold text-white tracking-tight">
                    {principle.title}
                  </h4>
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed mt-2">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Technical Capabilities & Software Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
            <span>{"// 03. TOOLING & METHODOLOGY"}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
            <span>FULL-STACK HARDWARE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
            Precision CAD, Visualization & Prototyping
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: CAD & Modeling */}
          <div className="p-6 rounded-2xl bg-[#14141a] border border-white/[0.08] space-y-4 hover:border-white/20 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#d31a24]/10 border border-[#d31a24]/20 flex items-center justify-center text-[#d31a24]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">3D CAD & NURBS</h3>
              <p className="text-xs text-zinc-400 mt-1">Mathematical surface continuity & parametric accuracy</p>
            </div>
            <ul className="space-y-1.5 text-xs font-mono text-zinc-300 pt-2 border-t border-white/[0.04]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d31a24]" />
                <span>Rhinoceros 8 (G2 NURBS)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>CAD Drafting (A3 Blueprints)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>Inkscape 2D Vector Layout</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>Bill of Materials (BOM)</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Rendering & Digital Painting */}
          <div className="p-6 rounded-2xl bg-[#14141a] border border-white/[0.08] space-y-4 hover:border-white/20 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Visualization & CMF</h3>
              <p className="text-xs text-zinc-400 mt-1">Photorealistic light transport & materials staging</p>
            </div>
            <ul className="space-y-1.5 text-xs font-mono text-zinc-300 pt-2 border-t border-white/[0.04]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>KeyShot 11 Raytracing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>Blender Cycles Lighting</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>Adobe Photoshop Surfacing</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>Automotive Livery Graphics</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Physical Prototyping */}
          <div className="p-6 rounded-2xl bg-[#14141a] border border-white/[0.08] space-y-4 hover:border-white/20 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Rapid Prototyping</h3>
              <p className="text-xs text-zinc-400 mt-1">From paper maquettes to multi-coat automotive paint</p>
            </div>
            <ul className="space-y-1.5 text-xs font-mono text-zinc-300 pt-2 border-t border-white/[0.04]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>1:1 Paper Study Maquettes</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>FDM 3D Printing (PLA/Resin)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>2K Putty, Filler & Sanding</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>High-Gloss Lacquer Buffing</span>
              </li>
            </ul>
          </div>

          {/* Card 4: Research & Academic Leadership */}
          <div className="p-6 rounded-2xl bg-[#14141a] border border-white/[0.08] space-y-4 hover:border-white/20 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Leadership & Research</h3>
              <p className="text-xs text-zinc-400 mt-1">Organizational management and ergonomic rigor</p>
            </div>
            <ul className="space-y-1.5 text-xs font-mono text-zinc-300 pt-2 border-t border-white/[0.04]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Ketua HIDEO 2026 (TUP)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>Wakil Ketua HIDEO 2025</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>Aslab Gambar Teknik 2025</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                <span>Ergonomics (Uy et al. 2013)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Direct Contact Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#14141d] border border-white/[0.1] p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
              {"// LET'S COLLABORATE"}
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Open for Industrial Design Internships, Commissions & Concept Inquiries.
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Available for automotive design styling, consumer product development, 3D CAD modeling, 
              and technical drafting. Based in Purwokerto, Central Java, Indonesia.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href="mailto:mahdiiwirawaan74@gmail.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#d31a24] hover:bg-[#e62631] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 shadow-xl shadow-[#d31a24]/30 hover:scale-[1.02]"
            >
              <Mail className="w-4 h-4" />
              <span>mahdiiwirawaan74@gmail.com</span>
            </a>

            <a
              href="https://wa.me/6281390112566"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black/60 hover:bg-black/90 text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-wider border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>+62 813 9011 2566</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
