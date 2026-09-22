"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Code2, Palette, Server, Database, GitPullRequest, Globe, LayoutGrid, Atom, Zap, Brush, Terminal, TrendingUp, FileCode, Layout } from "lucide-react";
import { SKILLS_DATA, SKILL_CATEGORIES, Skill } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const ICON_MAP: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  FileCode: <FileCode className="w-5 h-5" />,
  Atom: <Atom className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Brush: <Brush className="w-5 h-5" />,
  LayoutGrid: <LayoutGrid className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  Globe: <Globe className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  GitPullRequest: <GitPullRequest className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Search: <Search className="w-5 h-5" />,
};

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group relative p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-sky-500/30 hover:bg-zinc-900/80 transition-all duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 group-hover:bg-sky-500/20 transition-colors">
          {ICON_MAP[skill.icon] ?? <Code2 className="w-5 h-5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-white truncate">{skill.name}</p>
            <span className="text-[11px] font-mono text-sky-400 shrink-0">{skill.level}%</span>
          </div>
          <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed line-clamp-2">{skill.description}</p>
          <div className="mt-2 h-1 rounded-full bg-zinc-800 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-sky-400"
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 0.8, delay: index * 0.03 + 0.2, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}


export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredSkills = useMemo(() => {
    return SKILLS_DATA.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" || skill.category === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Tech Ecosystem"
          title="Technologies I Work With"
          subtitle="A comprehensive toolkit engineered for speed, high scalability, robust type-safety, and intuitive user delight."
          align="center"
        />

        {/* Filter controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl bg-zinc-950/60 dark:bg-zinc-950/60 light:bg-slate-100 backdrop-blur-md border border-white/5 dark:border-white/5 light:border-slate-200">
            {SKILL_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    isSelected
                      ? "text-sky-400 font-semibold"
                      : "text-zinc-400 hover:text-white dark:text-zinc-400 dark:hover:text-white light:text-slate-600 light:hover:text-slate-900"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute inset-0 bg-sky-500/15 border border-sky-500/30 rounded-xl -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {category}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl text-xs bg-zinc-950/60 dark:bg-zinc-950/60 light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 text-white dark:text-white light:text-slate-900 placeholder:text-zinc-500 focus:outline-none focus:border-sky-500/60 transition-colors"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 text-zinc-400 text-sm font-mono">
            No technologies found matching &quot;{searchQuery}&quot;. Try adjusting your filter.
          </div>
        )}
      </div>
    </section>
  );
}
