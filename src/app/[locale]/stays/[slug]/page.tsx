import type { Metadata } from "next";
import Image from "next/image";
import { Check, ChevronLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { StayCard } from "@/components/stays/stay-card";
import { buttonVariants } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { accommodations } from "@/content/accommodations";
import { siteConfig, siteUrl } from "@/content/site-config";
import { getPathname, Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { whatsappLink } from "@/lib/contact-links";

type PageProps = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export function generateStaticParams() {
  return accommodations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const stay = accommodations.find((item) => item.slug === slug);
  if (!stay) return {};
  const t = await getTranslations({ locale, namespace: "stays" });
  return {
    title: `${t(`items.${stay.id}.name`)} | Cioclovina Tribe`,
    description: t(`items.${stay.id}.description`),
  };
}

export default async function StayDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const stay = accommodations.find((item) => item.slug === slug);
  if (!stay) notFound();

  const [t, common] = await Promise.all([
    getTranslations({ locale, namespace: "stays" }),
    getTranslations({ locale, namespace: "common" }),
  ]);
  const name = t(`items.${stay.id}.name`);
  const money = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  });
  const alternatives = accommodations.filter((item) => item.id !== stay.id).slice(0, 2);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Cioclovina Tribe",
              item: `${siteUrl}${getPathname({ locale, href: "/" })}`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: common("nav.stays"),
              item: `${siteUrl}${getPathname({ locale, href: "/stays" })}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name,
              item: `${siteUrl}${getPathname({
                locale,
                href: { pathname: "/stays/[slug]", params: { slug: stay.slug } },
              })}`,
            },
          ],
        }}
      />
      <section className="bg-forest pt-32 pb-10 text-cream">
        <div className="site-container">
          <Link
            className="inline-flex items-center gap-2 text-sm text-cream/70 hover:text-cream"
            href="/stays"
          >
            <ChevronLeft className="size-4" /> {common("nav.stays")}
          </Link>
          <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow text-moss-light">{common("labels.indicativePrice")}</p>
              <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold md:text-7xl">
                {name}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/75">
                {t(`items.${stay.id}.tagline`)}
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl">
                {common("labels.from")} {money.format(stay.pricing[0].amount)}
              </p>
              <p className="mt-1 text-sm text-cream/60">
                {common(
                  stay.pricing[0].unit === "personNight"
                    ? "labels.perPersonNight"
                    : "labels.perNight",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-5 md:py-8">
        <div className="site-container grid gap-4 md:grid-cols-2">
          {stay.gallery.map((image, index) => (
            <div
              className={`relative overflow-hidden rounded-2xl ${index === 0 ? "aspect-[16/10] md:col-span-2" : "aspect-[4/3]"}`}
              key={image}
            >
              <Image
                alt={index === 0 ? name : ""}
                className="object-cover"
                fill
                priority={index === 0}
                sizes={index === 0 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                src={image}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-white">
        <div className="site-container grid gap-14 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="eyebrow">{t("detail.features")}</p>
            <h2 className="section-title">{name}</h2>
            <p className="section-copy">{t(`items.${stay.id}.description`)}</p>
            <ul className="mt-9 grid gap-4 sm:grid-cols-2">
              {stay.featureKeys.map((feature) => (
                <li className="flex items-center gap-3 text-sm" key={feature}>
                  <span className="flex size-7 items-center justify-center rounded-full bg-moss-light/40 text-forest">
                    <Check className="size-4" />
                  </span>
                  {t(`features.${feature}`)}
                </li>
              ))}
              <li className="flex items-center gap-3 text-sm">
                <span className="flex size-7 items-center justify-center rounded-full bg-moss-light/40 text-forest">
                  <Check className="size-4" />
                </span>
                {common(
                  `labels.${stay.bathroom === "private" ? "privateBathroom" : "sharedBathroom"}`,
                )}
              </li>
            </ul>
          </div>
          <aside className="h-fit rounded-2xl bg-sand p-8 lg:sticky lg:top-8">
            <p className="eyebrow">{t("detail.practical")}</p>
            <p className="mt-5 leading-7 text-ink-muted">{t("pricingNote")}</p>
            <a
              className={`${buttonVariants({ variant: "primary" })} mt-7 w-full`}
              href={whatsappLink(common("whatsapp.stay", { stay: name }))}
              rel="noreferrer"
              target="_blank"
            >
              {common("cta.availability")}
            </a>
            <a
              className={`${buttonVariants({ variant: "outline" })} mt-3 w-full`}
              href={siteConfig.booking}
              rel="noreferrer"
              target="_blank"
            >
              {common("cta.booking")}
            </a>
          </aside>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="site-container">
          <h2 className="font-serif text-4xl font-semibold">{t("detail.alternatives")}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {alternatives.map((item) => (
              <StayCard
                bathroom={common(
                  `labels.${item.bathroom === "private" ? "privateBathroom" : "sharedBathroom"}`,
                )}
                key={item.id}
                name={t(`items.${item.id}.name`)}
                price={`${common("labels.from")} ${money.format(item.pricing[0].amount)}`}
                stay={item}
                tagline={t(`items.${item.id}.tagline`)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
