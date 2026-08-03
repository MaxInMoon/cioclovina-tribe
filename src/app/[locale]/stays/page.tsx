import type { Metadata } from "next";
import Image from "next/image";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { InteriorHero } from "@/components/sections/interior-hero";
import { StayCard } from "@/components/stays/stay-card";
import { buttonVariants } from "@/components/ui/button";
import { accommodations } from "@/content/accommodations";
import { siteConfig } from "@/content/site-config";
import type { Locale } from "@/i18n/routing";
import { whatsappLink } from "@/lib/contact-links";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "stays.metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function StaysPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, common] = await Promise.all([
    getTranslations({ locale, namespace: "stays" }),
    getTranslations({ locale, namespace: "common" }),
  ]);
  const money = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  });

  return (
    <>
      <InteriorHero
        eyebrow={t("eyebrow")}
        image="/images/hero/cabin-interior-mountain-view.webp"
        intro={t("intro")}
        title={t("title")}
      />
      <section className="section bg-cream">
        <div className="site-container">
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {accommodations.map((stay) => (
              <StayCard
                bathroom={common(
                  `labels.${stay.bathroom === "private" ? "privateBathroom" : "sharedBathroom"}`,
                )}
                key={stay.id}
                name={t(`items.${stay.id}.name`)}
                price={`${common("labels.from")} ${money.format(stay.pricing[0].amount)} · ${common(stay.pricing[0].unit === "personNight" ? "labels.perPersonNight" : "labels.perNight")}`}
                stay={stay}
                tagline={t(`items.${stay.id}.tagline`)}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-white" id="facilities">
        <div className="site-container">
          <div className="max-w-3xl">
            <p className="eyebrow">{t("facilitiesTitle")}</p>
            <h2 className="section-title">{t("facilitiesTitle")}</h2>
            <p className="section-copy">{t("facilitiesText")}</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["bathrooms", "/images/facilities/shared-bathroom/shower.webp"],
              ["kitchen", "/images/facilities/shared-kitchen/outdoor-kitchen-grill.webp"],
              ["dining", "/images/facilities/shared-kitchen/covered-dining-area.webp"],
            ].map(([key, image]) => (
              <article
                className="overflow-hidden rounded-3xl border border-forest/10 bg-cream"
                key={key}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    alt={t(`facilities.${key}ImageAlt`)}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    src={image}
                  />
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="text-xl font-bold">{t(`facilities.${key}Title`)}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-muted">
                    {t(`facilities.${key}Text`)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-rust text-white">
        <div className="site-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-balance md:text-5xl">{t("bookingCtaTitle")}</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">{t("bookingCtaText")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              className={buttonVariants({ variant: "light" })}
              href={whatsappLink(common("whatsapp.general"))}
              rel="noreferrer"
              target="_blank"
            >
              <MessageCircle aria-hidden className="size-4" />
              {common("cta.availability")}
            </a>
            <a
              className={buttonVariants({ variant: "inverted" })}
              href={siteConfig.booking}
              rel="noreferrer"
              target="_blank"
            >
              <CalendarCheck aria-hidden className="size-4" />
              {common("cta.booking")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
