import type { Metadata } from "next";
import { CircleCheck, MapPin, MessageCircle } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { InteriorHero } from "@/components/sections/interior-hero";
import { StaticLocationMap } from "@/components/maps/static-location-map";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/content/site-config";
import type { Locale } from "@/i18n/routing";
import { whatsappLink } from "@/lib/contact-links";

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
            <article
              className="rounded-3xl border border-forest/10 bg-white p-7 shadow-[0_14px_40px_rgba(24,54,43,.06)] md:p-9"
              id={title === "arrivalTitle" ? "getting-here" : undefined}
              key={title}
            >
              <h2 className="font-serif text-3xl font-semibold">{t(title)}</h2>
              <ul className="mt-7 space-y-4">
                {(t.raw(items) as string[]).map((item) => (
                  <li className="flex gap-3 text-sm leading-6 text-ink-muted" key={item}>
                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-rust" />
                    {item}
                  </li>
                ))}
              </ul>
              {title === "arrivalTitle" ? (
                <>
                  <StaticLocationMap
                    alt={t("mapAlt")}
                    className="mt-7 rounded-2xl border border-forest/10"
                  />
                  <a
                    className={`${buttonVariants({ variant: "outline" })} mt-5`}
                    href={siteConfig.maps}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <MapPin aria-hidden className="size-4" />
                    {common("cta.openMaps")}
                  </a>
                </>
              ) : null}
            </article>
          ))}
        </div>
        <div className="site-container mt-8 rounded-3xl border border-forest/10 bg-sand p-7 md:flex md:items-center md:justify-between md:gap-8 md:p-10">
          <p className="max-w-3xl leading-7 text-ink-muted">{t("notice")}</p>
          <div className="mt-6 flex shrink-0 flex-wrap gap-3 md:mt-0 md:justify-end">
            <a
              className={buttonVariants({ variant: "primary" })}
              href={whatsappLink(common("whatsapp.general"))}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden className="size-4" />
              {common("cta.availability")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
