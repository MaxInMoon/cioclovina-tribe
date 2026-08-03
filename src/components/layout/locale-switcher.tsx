"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

import { routing, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";

const localeLabels: Record<Locale, string> = {
  ro: "RO",
  en: "EN",
  fr: "FR",
};

type StaticPathname =
  | "/"
  | "/stays"
  | "/experiences"
  | "/food"
  | "/plan-your-stay"
  | "/about"
  | "/contact"
  | "/privacy"
  | "/legal";

export function LocaleSwitcher() {
  const t = useTranslations("common.labels");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams<{ slug?: string }>();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function changeLocale(nextLocale: Locale) {
    startTransition(() => {
      if (pathname === "/stays/[slug]" && params.slug) {
        router.replace({ pathname, params: { slug: params.slug } }, { locale: nextLocale });
        return;
      }

      router.replace(pathname as StaticPathname, { locale: nextLocale });
    });
  }

  return (
    <label className="relative">
      <span className="sr-only">{t("language")}</span>
      <select
        aria-label={t("language")}
        className="h-11 appearance-none rounded-full border border-current/20 bg-transparent py-2 pr-8 pl-3 text-xs font-bold tracking-[0.12em] outline-offset-2"
        disabled={isPending}
        onChange={(event) => changeLocale(event.target.value as Locale)}
        value={locale}
      >
        {routing.locales.map((item) => (
          <option key={item} value={item}>
            {localeLabels[item]}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute top-3 right-3">
        ↓
      </span>
    </label>
  );
}
