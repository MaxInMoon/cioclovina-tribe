import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Bike, CookingPot, House, MapPin } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { accommodations } from "@/content/accommodations";
import { siteConfig, siteUrl } from "@/content/site-config";
import { getPathname, Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { whatsappLink } from "@/lib/contact-links";
import { cn } from "@/lib/utils";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home.metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { ro: "/ro", en: "/en", fr: "/fr" },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      images: ["/images/location/aerial-property-view.webp"],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, common, stays] = await Promise.all([
    getTranslations({ locale, namespace: "home" }),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "stays" }),
  ]);
  const whatsapp = whatsappLink(common("whatsapp.general"));
  const currency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LodgingBusiness",
          name: siteConfig.name,
          url: `${siteUrl}${getPathname({ locale, href: "/" })}`,
          description: t("metadata.description"),
          telephone: siteConfig.phoneInternational,
          email: siteConfig.email,
          image: [
            `${siteUrl}/images/location/aerial-property-view.webp`,
            `${siteUrl}/images/hero/cabin-interior-mountain-view.webp`,
          ],
          sameAs: [siteConfig.instagram],
          hasMap: siteConfig.maps,
        }}
      />
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-forest text-white">
        <Image
          alt={t("hero.imageAlt")}
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src="/images/location/aerial-property-view.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,32,25,.18)_15%,rgba(13,32,25,.78)_100%)]" />
        <div className="site-container relative z-10 pb-16 md:pb-24">
          <p className="eyebrow text-white/75">{t("hero.eyebrow")}</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.02] font-medium text-balance md:text-7xl lg:text-[5.5rem]">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 md:text-xl">
            {t("hero.description")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className={buttonVariants({ variant: "light" })} href="/stays">
              {common("cta.exploreStays")} <ArrowRight className="ml-2 size-4" />
            </Link>
            <a
              className="inline-flex min-h-11 items-center rounded-full border border-white/45 px-5 text-sm font-semibold hover:bg-white/10"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              {common("cta.availability")}
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-forest/10 bg-cream">
        <div className="site-container grid divide-y divide-forest/10 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
          {[
            ["stays", House],
            ["experiences", Bike],
            ["food", CookingPot],
            ["arrival", MapPin],
          ].map(([key, Icon]) => (
            <div className="flex gap-4 py-8 md:px-7 first:pl-0 last:pr-0" key={key as string}>
              <Icon className="mt-1 size-5 shrink-0 text-rust" strokeWidth={1.7} />
              <div>
                <h2 className="font-serif text-xl font-semibold">{t(`highlights.${key}.title`)}</h2>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  {t(`highlights.${key}.text`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-cream">
        <div className="site-container">
          <div className="max-w-2xl">
            <p className="eyebrow">{t("stays.eyebrow")}</p>
            <h2 className="section-title">{t("stays.title")}</h2>
            <p className="section-copy">{t("stays.description")}</p>
          </div>
          <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {accommodations.slice(0, 6).map((stay) => (
              <Link
                className="group"
                href={{ pathname: "/stays/[slug]", params: { slug: stay.slug } }}
                key={stay.id}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
                  <Image
                    alt={stays(`items.${stay.id}.name`)}
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    src={stay.image}
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold group-hover:text-rust">
                      {stays(`items.${stay.id}.name`)}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-muted">
                      {stays(`items.${stay.id}.tagline`)}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 size-5 shrink-0 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-4 text-xs font-bold tracking-[0.08em] text-rust uppercase">
                  {common("labels.from")} {currency.format(stay.pricing[0].amount)} ·{" "}
                  {common("labels.perNight")}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-12">
            <Link className={buttonVariants({ variant: "outline" })} href="/stays">
              {common("cta.exploreStays")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:order-2">
            <Image
              alt={t("story.imageAlt")}
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/images/hero/cabin-interior-mountain-view.webp"
            />
          </div>
          <div>
            <p className="eyebrow">{t("story.eyebrow")}</p>
            <h2 className="section-title">{t("story.title")}</h2>
            <p className="section-copy">{t("story.text")}</p>
            <Link className={cn(buttonVariants({ variant: "outline" }), "mt-8")} href="/about">
              {common("cta.learnMore")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-forest text-cream">
        <div className="site-container grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="eyebrow text-moss-light">{t("experiences.eyebrow")}</p>
            <h2 className="section-title text-cream">{t("experiences.title")}</h2>
            <p className="section-copy text-cream/70">{t("experiences.text")}</p>
            <Link className={cn(buttonVariants({ variant: "light" }), "mt-8")} href="/experiences">
              {common("cta.learnMore")}
            </Link>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
            <Image
              alt=""
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              src="/images/experiences/e-bike-trail.webp"
            />
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="site-container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
            <Image
              alt={t("food.imageAlt")}
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/images/food/private-dining/mountain-table.webp"
            />
          </div>
          <div>
            <p className="eyebrow">{t("food.eyebrow")}</p>
            <h2 className="section-title">{t("food.title")}</h2>
            <p className="section-copy">{t("food.text")}</p>
            <Link className={cn(buttonVariants({ variant: "outline" }), "mt-8")} href="/food">
              {common("cta.learnMore")}
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="site-container grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow">{t("hosts.eyebrow")}</p>
            <h2 className="section-title">{t("hosts.title")}</h2>
            <p className="section-copy">{t("hosts.text")}</p>
            <Link className={cn(buttonVariants({ variant: "outline" }), "mt-8")} href="/about">
              {common("cta.learnMore")}
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              alt={t("hosts.imageAlt")}
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              src="/images/hosts/roxana-bogdan-family.webp"
            />
          </div>
        </div>
      </section>

      <section className="section relative overflow-hidden bg-sand">
        <div className="site-container relative z-10 grid gap-8 lg:grid-cols-[1fr_.8fr]">
          <div>
            <p className="eyebrow">{t("location.eyebrow")}</p>
            <h2 className="section-title">{t("location.title")}</h2>
            <p className="section-copy">{t("location.text")}</p>
          </div>
          <div className="rounded-2xl bg-cream p-7 md:p-9">
            <p className="text-base leading-7 text-ink-muted">{t("location.note")}</p>
            <a
              className={cn(buttonVariants({ variant: "primary" }), "mt-6")}
              href={siteConfig.maps}
              target="_blank"
              rel="noreferrer"
            >
              {common("cta.openMaps")}
            </a>
          </div>
        </div>
      </section>

      <section className="section bg-rust text-white">
        <div className="site-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl font-semibold text-balance md:text-6xl">
              {t("finalCta.title")}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/80">{t("finalCta.text")}</p>
          </div>
          <a
            className={buttonVariants({ variant: "light" })}
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            {common("cta.availability")}
          </a>
        </div>
      </section>
    </>
  );
}
