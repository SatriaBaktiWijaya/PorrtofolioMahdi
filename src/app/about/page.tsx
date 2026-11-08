import React from "react";
import Image from "next/image";
import { DESIGNER_PROFILE } from "@/data/projects";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import {
  Compass,
  Mail,
  Phone,
  Award,
  Layers,
  Cpu,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "About & Design Ethos — Mahdi Wirawan",
  description:
    "Biographical profile, organizational leadership, academic credentials, and design ethos of Mahdi Wirawan, Industrial & Automotive Product Designer at Telkom University Purwokerto.",
};

export default function AboutPage() {
  const profile = DESIGNER_PROFILE;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* 1. Header Profile Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Portrait & Studio Spec Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative aspect-square max-w-md mx-auto rounded-3xl bg-[#14141c] border border-white/[0.1] overflow-hidden shadow-2xl group">
            <Image
              src={profile.portraitImage || "/profile/mahdi-portrait.jpg"}
              alt={profile.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />

            {/* Specular Edge Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent opacity-80" />

            {/* Floating Academic Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#121218]/90 backdrop-blur-md border border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono text-zinc-300 uppercase tracking-wider font-semibold">
                  STUDENT ID: {profile.nim}
                </span>
              </div>
              <div className="text-sm font-bold text-white mt-1">{profile.department}</div>
              <div className="text-xs text-zinc-400 font-mono mt-0.5">
                {profile.university} • {profile.semester}
              </div>
            </div>
          </div>

          {/* Quick Contact & Coordinates Box */}
          <div className="p-6 rounded-2xl bg-[#14141a] border border-white/[0.08] space-y-4">
            <h4 className="text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
              {"// DIRECT TELEMETRY & CHANNELS"}
            </h4>
            <div className="space-y-3 text-xs font-mono">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#181822] border border-white/5 text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#d31a24]" />
                  <span className="truncate max-w-[200px]">{profile.email}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <a
                href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#181822] border border-white/5 text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>{profile.phone}</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <a
                href={`https://instagram.com/${profile.instagram.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#181822] border border-white/5 text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <InstagramIcon className="w-4 h-4 text-pink-400" />
                  <span>{profile.instagram}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#181822] border border-white/5 text-zinc-400 text-[11px]">
                <Compass className="w-4 h-4 text-[#d31a24]" />
                <span>Purwokerto, Jawa Tengah, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Biographical Narrative & Design Ethos */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
              <span>{"// BIOGRAPHICAL PROFILE"}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
              <span>S1 PRODUCT DESIGN</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase mt-2">
              {profile.name}
            </h1>
            <p className="text-xl text-zinc-300 font-medium mt-1">
              {profile.role}
            </p>
          </div>

          <div className="prose prose-invert max-w-none text-zinc-300 space-y-4 text-base leading-relaxed">
            <p>
              Saya adalah mahasiswa S1 Desain Produk di{" "}
              <strong className="text-white font-semibold">{profile.university}</strong> yang memiliki minat mendalam dan fokus terpadu pada{" "}
              <strong className="text-white font-semibold">desain produk industri fisik</strong>,{" "}
              <strong className="text-white font-semibold">styling otomotif</strong>, pemodelan permukaan matematis digital (NURBS G2 Curvature Continuity di Rhinoceros 8), dan pengerjaan prototipe fungsional berpresisi tinggi.
            </p>

            <p>
              Bagi saya, perancangan produk bukan semata pencarian bentuk artistik, melainkan sebuah sintesis antara rekayasa ergonomi tubuh manusia (human factors engineering), gambar kerja ortogonal terstandarisasi (technical CAD drafting), dan penyajian material yang jujur (Color, Material, & Finish / CMF). 
            </p>

            <p>
              Dalam setiap karya — mulai dari konsep botol parfum mewah bertema Mazda KODO (*Mazda Project Kensei*), alat penyiram tanaman ergonomis berbasis riset kelelahan otot (*Twist n Pour*), hingga kick scooter urban geometris terinspirasi Lotus Esprit S1 (*Esprit Otoped*) — saya selalu mengedepankan filosofi Dieter Rams{" "}
              <em className="text-white not-italic font-semibold">&quot;Weniger, aber besser&quot;</em> (Kurang, tapi lebih baik) yang diperkaya dengan semangat otomotif Jepang{" "}
              <strong className="text-white font-semibold">人馬一体 (Jinba Ittai)</strong>, di mana tercipta kesatuan rasa yang harmonis antara pengguna dan peranti yang digunakannya.
            </p>
          </div>

          {/* Academic & Organizational Leadership */}
          <div className="space-y-4 pt-4 border-t border-white/[0.08]">
            <h3 className="text-xs font-mono text-zinc-400 font-semibold tracking-widest uppercase flex items-center gap-2">
              <Award className="w-4 h-4 text-[#d31a24]" />
              <span>ORGANIZATIONAL LEADERSHIP & ACADEMIC POSTS</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.leadership.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#14141a] border border-white/[0.06] hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#d31a24] mb-1">
                    <span className="font-bold">{item.title}</span>
                    <span className="text-zinc-500">{item.period}</span>
                  </div>
                  <div className="text-sm font-semibold text-white tracking-tight">
                    {item.organization}
                  </div>
                </div>
              ))}

              {profile.experience.map((item, idx) => (
                <div
                  key={`exp-${idx}`}
                  className="p-4 rounded-xl bg-[#14141a] border border-white/[0.06] hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1">
                    <span className="font-bold text-zinc-300">{item.role}</span>
                    <span className="text-zinc-500">{item.period}</span>
                  </div>
                  <div className="text-sm font-semibold text-white tracking-tight">
                    {item.organization}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Full Technical Toolset & Software Competency Matrix */}
      <section className="space-y-8 border-t border-white/[0.08] pt-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
            <span>{"// TECHNICAL COMPETENCIES"}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
            <span>SOFTWARE & FABRICATION WORKFLOW</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white mt-1">
            Tools, Methods & Engineering Competencies
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-[#14141a] border border-white/[0.06] space-y-4">
            <div className="flex items-center justify-between text-[#d31a24]">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">{"01 // 3D MODELING"}</span>
              <Cpu className="w-4 h-4" />
            </div>
            <ul className="space-y-2 text-xs font-mono text-zinc-300">
              {profile.skills.modeling.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d31a24]" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#14141a] border border-white/[0.06] space-y-4">
            <div className="flex items-center justify-between text-purple-400">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">{"02 // RENDERING"}</span>
              <Sparkles className="w-4 h-4" />
            </div>
            <ul className="space-y-2 text-xs font-mono text-zinc-300">
              {profile.skills.rendering.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#14141a] border border-white/[0.06] space-y-4">
            <div className="flex items-center justify-between text-amber-400">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">{"03 // PROTOTYPING"}</span>
              <Layers className="w-4 h-4" />
            </div>
            <ul className="space-y-2 text-xs font-mono text-zinc-300">
              {profile.skills.prototyping.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-[#14141a] border border-white/[0.06] space-y-4">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="text-xs font-mono font-bold uppercase tracking-wider">{"04 // RESEARCH"}</span>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <ul className="space-y-2 text-xs font-mono text-zinc-300">
              {profile.skills.designThinking.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Favorite Design Houses & Influences */}
      <section className="p-8 sm:p-12 rounded-3xl bg-[#121218] border border-white/[0.08] space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#d31a24] font-semibold tracking-widest uppercase">
          <span>{"// DESIGN TRADITIONS & INFLUENCES"}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Aesthetic Benchmarks That Shape My Practice
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          <div className="p-5 rounded-xl bg-black/40 border border-white/[0.05]">
            <h4 className="text-base font-bold text-white tracking-tight">Mazda KODO</h4>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Soul of Motion aesthetic, handcrafted clay sculpture surfacing, dynamic light reflections, and the Jinba Ittai bond between human and machine.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-black/40 border border-white/[0.05]">
            <h4 className="text-base font-bold text-white tracking-tight">Dieter Rams / Braun</h4>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Radical minimalism, functional honesty, discrete typography, and the timeless mantra: &quot;Good design is as little design as possible.&quot;
            </p>
          </div>

          <div className="p-5 rounded-xl bg-black/40 border border-white/[0.05]">
            <h4 className="text-base font-bold text-white tracking-tight">Lotus / Giugiaro</h4>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Giorgetto Giugiaro&apos;s 1970s folded-paper &quot;Origami&quot; wedge design philosophy embodied in the lightweight chassis of the Lotus Esprit S1.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-black/40 border border-white/[0.05]">
            <h4 className="text-base font-bold text-white tracking-tight">Apple Hardware</h4>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Micron-precision unibody CNC aluminum tooling, flawless tactile feedback, and unified integration of physical and digital surfaces.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
