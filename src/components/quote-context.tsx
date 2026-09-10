"use client";

import * as React from "react";

export type QuoteDraft = {
  profile?: string;
  kva?: number;
  product?: string;
  note?: string;
};

type QuoteContextValue = {
  draft: QuoteDraft;
  setDraft: (draft: QuoteDraft) => void;
};

const QuoteContext = React.createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = React.useState<QuoteDraft>({});
  const value = React.useMemo(() => ({ draft, setDraft }), [draft]);

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const context = React.useContext(QuoteContext);
  if (!context) throw new Error("useQuote mora biti korišćen unutar QuoteProvider-a");
  return context;
}
