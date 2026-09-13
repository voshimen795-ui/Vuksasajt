"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Phone } from "lucide-react";
import { site } from "@/config/site";

export function MobileCallDock() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.18] bg-ink-950/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl sm:hidden"
        >
          <div className="flex items-center gap-2.5">
            <a
              href={site.phones.mobile.href}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-volt text-sm font-bold text-white shadow-volt-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-white/80" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Pozovite odmah
            </a>
            <a
              href="/#ponuda"
              aria-label="Zatražite ponudu"
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.11] text-white"
            >
              <FileText className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
