import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { InteriorHero } from "@/components/sections/interior-hero";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/content/site-config";
import type { Locale } from "@/i18n/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "guide.metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function GuidePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, common] = await Promise.all([
    getTranslations({ locale, namespace: "guide" }),
    getTranslations({ locale, namespace: "common" }),
  ]);
  const blocks = [
    ["arrivalTitle", "arrivalSteps"],
    ["bringTitle", "bringItems"],
    ["onsiteTitle", "onsiteItems"],
    ["rulesTitle", "rulesItems"],
  ] as const;

  return (
    <>
      <InteriorHero
        eyebrow={t("eyebrow")}
        image="/images/hero/forest-arrival-road.webp"
        intro={t("intro")}
        title={t("title")}
      />
      <section className="section bg-cream">
        <div className="site-container grid gap-6 md:grid-cols-2">
          {blocks.map(([title, items]) => (
            <article className="rounded-2xl bg-white p-7 md:p-9" key={title}>
              <h2 className="font-serif text-3xl font-semibold">{t(title)}</h2>
              <ul className="mt-7 space-y-4">
                {(t.raw(items) as string[]).map((item) => (
                  <li className="flex gap-3 text-sm leading-6 text-ink-muted" key={item}>
                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-rust" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="site-container mt-8 rounded-2xl bg-sand p-7 md:flex md:items-center md:justify-between md:gap-8 md:p-9">
          <p className="max-w-3xl leading-7 text-ink-muted">{t("notice")}</p>
          <a
            className={`${buttonVariants({ variant: "primary" })} mt-6 shrink-0 md:mt-0`}
            href={siteConfig.maps}
            rel="noreferrer"
            target="_blank"
          >
            {common("cta.openMaps")}
          </a>
        </div>
      </section>
    </>
  );
}
