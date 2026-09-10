"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { navLinks, site } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled ? "border-b border-white/10 bg-ink-950/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <Link href="/" aria-label={`${site.brand} početna`}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "link-swap rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-white/5",
                pathname === link.href ? "text-white" : "text-steel-400",
              )}
            >
              <span>{link.label}</span>
              <span className="grid place-items-center">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phones.mobile.href}
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-volt/40 hover:bg-volt/10 sm:inline-flex"
          >
            <Phone className="h-4 w-4 text-volt" />
            {site.phones.mobile.label}
          </a>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/#ponuda">Zatražite ponudu</Link>
          </Button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-white/10 bg-ink-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container flex flex-col gap-1 py-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3.5 text-base font-medium text-steel-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 grid gap-2.5">
                <Button asChild size="lg">
                  <Link href="/#ponuda" onClick={() => setOpen(false)}>
                    Zatražite ponudu
                  </Link>
                </Button>
                <Button asChild variant="glass" size="lg">
                  <a href={site.phones.mobile.href}>
                    <Phone className="h-4 w-4 text-volt" />
                    {site.phones.mobile.label}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
