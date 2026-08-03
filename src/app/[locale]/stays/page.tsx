import type { Metadata } from "next";
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
      <section className="section bg-white">
        <div className="site-container grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">{t("facilitiesTitle")}</p>
            <h2 className="section-title">{t("facilitiesTitle")}</h2>
            <p className="section-copy">{t("facilitiesText")}</p>
          </div>
          <div className="rounded-2xl bg-sand p-8 lg:p-10">
            <p className="leading-7 text-ink-muted">{t("pricingNote")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                className={buttonVariants({ variant: "primary" })}
                href={whatsappLink(common("whatsapp.general"))}
                rel="noreferrer"
                target="_blank"
              >
                {common("cta.availability")}
              </a>
              <a
                className={buttonVariants({ variant: "outline" })}
                href={siteConfig.booking}
                rel="noreferrer"
                target="_blank"
              >
                {common("cta.booking")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
