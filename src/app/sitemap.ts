import type { MetadataRoute } from "next";
import { site } from "@/config/site";

const routes = [
  { path: "", priority: 1 },
  { path: "/agregati", priority: 0.9 },
  { path: "/kalkulator", priority: 0.8 },
  { path: "/galerija", priority: 0.7 },
  { path: "/o-nama", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.domain}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route.priority,
  }));
}
