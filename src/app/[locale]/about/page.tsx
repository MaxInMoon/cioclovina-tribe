import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { InteriorHero } from "@/components/sections/interior-hero";
import { buttonVariants } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { whatsappLink } from "@/lib/contact-links";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, common] = await Promise.all([
    getTranslations({ locale, namespace: "about" }),
    getTranslations({ locale, namespace: "common" }),
  ]);
  return (
    <>
      <InteriorHero
        eyebrow={t("eyebrow")}
        image="/images/hosts/roxana-bogdan-family.webp"
        imageAlt={t("imageAlt")}
        intro={t("intro")}
        title={t("title")}
      />
      <section className="section bg-cream">
        <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow">{t("valuesTitle")}</p>
            <h2 className="section-title">{t("valuesTitle")}</h2>
            <p className="section-copy">{t("story")}</p>
            <p className="section-copy">{t("valuesText")}</p>
            <a
              className={`${buttonVariants({ variant: "primary" })} mt-8`}
              href={whatsappLink(common("whatsapp.general"))}
              rel="noreferrer"
              target="_blank"
            >
              {common("cta.availability")}
            </a>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              alt=""
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/images/food/outdoor-event-mountain-view.webp"
            />
          </div>
        </div>
      </section>
    </>
  );
}
