import type { Metadata } from "next";
import { Camera, Mail, MapPin, MessageCircle } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { InteriorHero } from "@/components/sections/interior-hero";
import { siteConfig } from "@/content/site-config";
import type { Locale } from "@/i18n/routing";
import { whatsappLink } from "@/lib/contact-links";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, common] = await Promise.all([
    getTranslations({ locale, namespace: "contact" }),
    getTranslations({ locale, namespace: "common" }),
  ]);
  const cards = [
    {
      key: "whatsapp",
      Icon: MessageCircle,
      label: siteConfig.phoneDisplay,
      href: whatsappLink(common("whatsapp.general")),
    },
    { key: "email", Icon: Mail, label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { key: "maps", Icon: MapPin, label: common("cta.openMaps"), href: siteConfig.maps },
    { key: "instagram", Icon: Camera, label: "@cioclovinatribe", href: siteConfig.instagram },
  ] as const;
  return (
    <>
      <InteriorHero
        eyebrow={t("eyebrow")}
        image="/images/location/pasture-near-cioclovina.webp"
        intro={t("intro")}
        title={t("title")}
      />
      <section className="section bg-cream">
        <div className="site-container grid gap-5 md:grid-cols-2">
          {cards.map(({ key, Icon, label, href }) => (
            <a
              className="group rounded-2xl bg-white p-8 transition hover:-translate-y-1"
              href={href}
              key={key}
              rel="noreferrer"
              target="_blank"
            >
              <Icon className="size-7 text-rust" strokeWidth={1.6} />
              <h2 className="mt-6 font-serif text-3xl font-semibold">{t(`${key}Title`)}</h2>
              <p className="mt-3 leading-7 text-ink-muted">{t(`${key}Text`)}</p>
              <p className="mt-6 text-sm font-bold text-forest underline decoration-forest/20 underline-offset-4">
                {label}
              </p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
