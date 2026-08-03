import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ro", "en", "fr"],
  defaultLocale: "ro",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/stays": {
      ro: "/cazare",
      en: "/stays",
      fr: "/hebergements",
    },
    "/stays/[slug]": {
      ro: "/cazare/[slug]",
      en: "/stays/[slug]",
      fr: "/hebergements/[slug]",
    },
    "/experiences": {
      ro: "/experiente",
      en: "/experiences",
      fr: "/experiences",
    },
    "/food": {
      ro: "/gastronomie",
      en: "/food",
      fr: "/gastronomie",
    },
    "/plan-your-stay": {
      ro: "/pregateste-sejurul",
      en: "/plan-your-stay",
      fr: "/preparer-le-sejour",
    },
    "/about": {
      ro: "/despre",
      en: "/about",
      fr: "/a-propos",
    },
    "/contact": "/contact",
    "/privacy": {
      ro: "/confidentialitate",
      en: "/privacy",
      fr: "/confidentialite",
    },
    "/legal": {
      ro: "/mentiuni-legale",
      en: "/legal",
      fr: "/mentions-legales",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
