import type { MetadataRoute } from "next";

import { accommodations } from "@/content/accommodations";
import { siteUrl } from "@/content/site-config";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const staticPages = [
  "/",
  "/stays",
  "/experiences",
  "/food",
  "/plan-your-stay",
  "/about",
  "/contact",
  "/privacy",
  "/legal",
] as const;

type StaticPage = (typeof staticPages)[number];

function absolute(pathname: string) {
  return `${siteUrl}${pathname}`;
}

function staticUrl(locale: Locale, href: StaticPage) {
  return absolute(getPathname({ locale, href }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap((href) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, staticUrl(locale, href)]),
    );

    return routing.locales.map((locale) => ({
      url: staticUrl(locale, href),
      changeFrequency: href === "/" ? "weekly" : "monthly",
      priority: href === "/" ? 1 : href === "/stays" ? 0.9 : 0.7,
      alternates: { languages },
    }));
  });

  const stayEntries: MetadataRoute.Sitemap = accommodations.flatMap((stay) => {
    const href = {
      pathname: "/stays/[slug]" as const,
      params: { slug: stay.slug },
    };
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, absolute(getPathname({ locale, href }))]),
    );

    return routing.locales.map((locale) => ({
      url: absolute(getPathname({ locale, href })),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages },
    }));
  });

  return [...staticEntries, ...stayEntries];
}
