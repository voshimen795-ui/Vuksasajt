"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Check, Maximize2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TiltCard } from "@/components/ui/tilt-card";
import { GeneratorArt } from "@/components/visuals/generator-art";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/45 bg-ink-800 text-left transition-[border-color,box-shadow] duration-500 hover:border-volt/60 hover:shadow-panel"
        >
          <div className="relative flex h-48 items-center justify-center overflow-hidden border-b border-white/45 bg-gradient-to-b from-white/[0.05] to-transparent">
            <div className="absolute inset-x-10 bottom-0 h-24 rounded-full bg-volt/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
            {project.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <GeneratorArt
                variant={project.art}
                className="relative h-32 w-auto transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-ink-950/70 text-steel-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <Maximize2 className="h-4 w-4" />
            </span>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="font-display text-lg font-bold text-white">{project.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-steel-500">
              {project.summary}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/45 bg-white/[0.18] px-3 py-1.5 text-[11px] font-medium text-steel-300">
                <Zap className="h-3 w-3 text-volt-400" />
                {project.power}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/45 bg-white/[0.18] px-3 py-1.5 text-[11px] font-medium text-steel-300">
                <Building2 className="h-3 w-3 text-volt-400" />
                {project.objectType}
              </span>
            </div>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="pr-10 font-display text-2xl font-bold text-white">
          {project.title}
        </DialogTitle>
        <DialogDescription className="mt-3 text-[15px] leading-relaxed text-steel-400">
          {project.summary}
        </DialogDescription>

        <div className="mt-6 grid grid-cols-2 gap-2 text-xs">
          <span className="rounded-lg border border-white/45 bg-white/[0.12] px-3 py-2.5 text-steel-300">
            Snaga: <span className="font-semibold text-white">{project.power}</span>
          </span>
          <span className="rounded-lg border border-white/45 bg-white/[0.12] px-3 py-2.5 text-steel-300">
            Objekat: <span className="font-semibold text-white">{project.objectType}</span>
          </span>
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-steel-500">
          Obim radova
        </p>
        <ul className="mt-3 space-y-2">
          {project.scope.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-steel-300">
              <Check className="h-4 w-4 shrink-0 text-volt-400" strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>

        <Button asChild size="lg" className="mt-7 w-full">
          <a href="/#ponuda">Zatražite sličan posao</a>
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export function Gallery() {
  const [active, setActive] = React.useState<ProjectCategory | "svi">("svi");

  const visible = React.useMemo(
    () => (active === "svi" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <section className="section pt-4">
      <div className="container">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {projectCategories.map((category) => {
            const isActive = category.id === active;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActive(category.id)}
                aria-pressed={isActive}
                className={cn(
                  "relative shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-300",
                  isActive
                    ? "border-transparent text-white"
                    : "border-white/45 bg-white/[0.12] text-steel-400 hover:border-white/60 hover:text-white",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="gallery-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full border border-volt/50 bg-volt/25 shadow-volt-sm"
                  />
                )}
                {category.label}
              </button>
            );
          })}
        </div>

        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-0"
              >
                <TiltCard className="h-full">
                  <ProjectCard project={project} />
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
