"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Compass } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About & Ethos", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0c]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl shadow-black/50"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Studio Designation */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d31a24] to-[#800c12] flex items-center justify-center border border-white/20 shadow-lg shadow-[#d31a24]/20 group-hover:scale-105 transition-transform duration-200">
              <span className="font-mono text-xs font-bold tracking-wider text-white">MW</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white group-hover:text-white/90 transition-colors flex items-center gap-1.5">
                MAHDI WIRAWAN
                <span className="text-[10px] text-zinc-500 font-mono tracking-widest hidden sm:inline-block">/ 剣聖</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                Industrial & Automotive Design
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#121218]/70 border border-white/[0.08] px-3 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Academic Status Badge & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#181820]/80 border border-white/[0.08] text-[11px] text-zinc-300 font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Telkom University Purwokerto</span>
            </div>

            <Link
              href="mailto:mahdiiwirawaan74@gmail.com"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-[#d31a24] hover:bg-[#e62631] px-4 py-2 rounded-full border border-red-500/30 transition-all duration-200 shadow-md shadow-[#d31a24]/20 hover:scale-[1.02]"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#14141a] border border-white/10 text-zinc-300 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0c]/95 border-b border-white/[0.08] px-4 pt-4 pb-6 mt-3 space-y-3 backdrop-blur-2xl">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#14141a] border border-white/5 text-[11px] text-zinc-300 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Telkom University Purwokerto (Product Design)</span>
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                    isActive
                      ? "bg-white/10 text-white font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <span>{link.name}</span>
                  <Compass className="w-4 h-4 opacity-40" />
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/[0.08] flex flex-col gap-2">
            <Link
              href="mailto:mahdiiwirawaan74@gmail.com"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-xs font-medium text-white bg-[#d31a24] hover:bg-[#e62631] py-2.5 rounded-lg transition-colors shadow-md shadow-[#d31a24]/20"
            >
              Contact Mahdi (mahdiiwirawaan74@gmail.com)
            </Link>
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 px-1 pt-1">
              <span>KETUA HIDEO 2026</span>
              <span>+62 813 9011 2566</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

