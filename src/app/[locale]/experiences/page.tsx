import type { Metadata } from "next";
import Image from "next/image";
import { Clock, MessageCircle, Users } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { InteriorHero } from "@/components/sections/interior-hero";
import { buttonVariants } from "@/components/ui/button";
import { experiences } from "@/content/experiences";
import type { Locale } from "@/i18n/routing";
import { whatsappLink } from "@/lib/contact-links";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "experiences.metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function ExperiencesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, common] = await Promise.all([
    getTranslations({ locale, namespace: "experiences" }),
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
        image="/images/experiences/e-bike-trail.webp"
        imageAlt={t("imageAlts.hero")}
        intro={t("intro")}
        title={t("title")}
      />
      <section className="section bg-cream">
        <div className="site-container">
          <p className="eyebrow">{t("guidedTitle")}</p>
          <h2 className="section-title">{t("guidedTitle")}</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {experiences.map((experience) => {
              const name = t(`items.${experience.id}.name`);
              return (
                <article
                  className="rounded-3xl border border-forest/10 bg-white p-7 shadow-[0_14px_40px_rgba(24,54,43,.06)] md:p-9"
                  key={experience.id}
                >
                  <h3 className="font-serif text-3xl font-semibold">{name}</h3>
                  <p className="mt-4 leading-7 text-ink-muted">
                    {t(`items.${experience.id}.description`)}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4 text-sm text-ink-muted">
                    {experience.durationHours ? (
                      <span className="flex items-center gap-2">
                        <Clock className="size-4 text-rust" />
                        {common("labels.durationHours", {
                          min: experience.durationHours[0],
                          max: experience.durationHours[1],
                        })}
                      </span>
                    ) : null}
                    {experience.minimumGuests ? (
                      <span className="flex items-center gap-2">
                        <Users className="size-4 text-rust" />
                        {common("labels.minimumGuests", {
                          count: experience.minimumGuests,
                        })}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-forest/10 pt-6">
                    <p className="text-sm font-bold text-rust">
                      {common("labels.perPersonPrice", {
                        price: money.format(experience.price.amount),
                      })}
                    </p>
                    <a
                      className={buttonVariants({ variant: "outline" })}
                      href={whatsappLink(common("whatsapp.experience", { experience: name }))}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <MessageCircle aria-hidden className="size-4" />
                      {common("cta.availability")}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-8 rounded-xl border border-rust/20 bg-rust/5 p-5 text-sm leading-6 text-ink-muted">
            {t("notice")}
          </p>
        </div>
      </section>
      <section className="section bg-forest text-cream">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-moss-light">{t("onSiteTitle")}</p>
            <h2 className="section-title text-cream">{t("onSiteTitle")}</h2>
            <p className="section-copy text-cream/70">{t("onSiteText")}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              alt={t("imageAlts.onSite")}
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/images/location/pasture-near-cioclovina.webp"
            />
          </div>
        </div>
      </section>
      <section className="section bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                alt={t("imageAlts.canyoningWaterfall")}
                className="object-cover"
                fill
                sizes="25vw"
                src="/images/experiences/canyoning-waterfall.webp"
              />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-2xl">
              <Image
                alt={t("imageAlts.canyoningGroup")}
                className="object-cover"
                fill
                sizes="25vw"
                src="/images/experiences/canyoning-group.webp"
              />
            </div>
          </div>
          <div>
            <p className="eyebrow">{t("nearbyTitle")}</p>
            <h2 className="section-title">{t("nearbyTitle")}</h2>
            <p className="section-copy">{t("nearbyText")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
