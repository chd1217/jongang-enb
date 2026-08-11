import type { MetadataRoute } from "next";
import { news } from "@/lib/site";

const SITE = "https://jungangenb.co.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "/", priority: 1, freq: "weekly" as const },
    { path: "/about", priority: 0.8, freq: "monthly" as const },
    { path: "/about/history", priority: 0.5, freq: "yearly" as const },
    { path: "/about/certificates", priority: 0.6, freq: "yearly" as const },
    { path: "/about/location", priority: 0.6, freq: "yearly" as const },
    { path: "/business", priority: 0.9, freq: "monthly" as const },
    { path: "/business/waste", priority: 0.9, freq: "monthly" as const },
    { path: "/business/aggregate", priority: 0.9, freq: "monthly" as const },
    { path: "/business/transport", priority: 0.8, freq: "monthly" as const },
    { path: "/process", priority: 0.7, freq: "monthly" as const },
    { path: "/equipment", priority: 0.6, freq: "monthly" as const },
    { path: "/news", priority: 0.7, freq: "weekly" as const },
    { path: "/contact", priority: 0.9, freq: "monthly" as const },
  ];

  const now = new Date();

  return [
    ...staticPaths.map((p) => ({
      url: `${SITE}${p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...news.map((n) => ({
      url: `${SITE}/news/${n.id}`,
      lastModified: new Date(n.date),
      changeFrequency: "yearly" as const,
      priority: 0.4,
    })),
  ];
}
