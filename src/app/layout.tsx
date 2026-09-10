import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileCallDock } from "@/components/layout/mobile-call-dock";
import { site } from "@/config/site";
import "./globals.css";

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Agregati i generatori struje — prodaja, iznajmljivanje i servis | DRMTN",
    template: `%s | ${site.brand}`,
  },
  description: site.description,
  keywords: [
    "agregati",
    "generatori struje",
    "dizel agregati",
    "benzinski agregati",
    "iznajmljivanje agregata",
    "servis agregata",
    "ATS ormari",
    "vodene pumpe",
    "Beograd",
    "Srbija",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: site.domain,
    siteName: site.legalName,
    title: "Neprekidna energija za vaš biznis i dom",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.legalName,
  alternateName: site.brand,
  description: site.description,
  url: site.domain,
  email: site.email,
  telephone: ["+381112085910", "+381638251531"],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: `${site.address.district}, ${site.address.city}`,
    postalCode: site.address.postal,
    addressCountry: "RS",
  },
  areaServed: "Srbija",
  openingHours: ["Mo-Fr 08:00-17:00", "Sa 09:00-14:00"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className={`${sans.variable} ${display.variable} dark`}>
      <body className="min-h-screen overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="pb-20 sm:pb-0">{children}</main>
        <Footer />
        <MobileCallDock />
      </body>
    </html>
  );
}
