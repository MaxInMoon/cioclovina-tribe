import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { InteriorHero } from "@/components/sections/interior-hero";
import { buttonVariants } from "@/components/ui/button";
import { mealPrices } from "@/content/food";
import type { Locale } from "@/i18n/routing";
import { whatsappLink } from "@/lib/contact-links";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "food.metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function FoodPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, common] = await Promise.all([
    getTranslations({ locale, namespace: "food" }),
    getTranslations({ locale, namespace: "common" }),
  ]);
  const money = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0,
  });
  const meals = ["breakfast", "lunch", "dinner", "dessert"] as const;

  return (
    <>
      <InteriorHero
        eyebrow={t("eyebrow")}
        image="/images/food/private-dining/mountain-table.webp"
        intro={t("intro")}
        title={t("title")}
      />
      <section className="section bg-cream">
        <div className="site-container">
          <p className="eyebrow">{t("mealsTitle")}</p>
          <h2 className="section-title">{t("mealsTitle")}</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {meals.map((meal) => (
              <article
                className="rounded-3xl border border-forest/10 bg-white p-7 shadow-[0_14px_40px_rgba(24,54,43,.06)] md:p-8"
                key={meal}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl font-semibold">{t(meal)}</h3>
                  <span className="text-sm font-bold text-rust">
                    {money.format(mealPrices[meal])}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-ink-muted">{t(`${meal}Text`)}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm leading-6 text-ink-muted">{t("mealsNotice")}</p>
        </div>
      </section>
      <section className="section bg-white">
        <div className="site-container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              alt=""
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              src="/images/food/private-dining/meal-service.webp"
            />
          </div>
          <div>
            <p className="eyebrow">{t("privateTitle")}</p>
            <h2 className="section-title">{t("privateTitle")}</h2>
            <p className="section-copy">{t("privateText")}</p>
            <a
              className={`${buttonVariants({ variant: "primary" })} mt-8`}
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
      <section className="section bg-forest text-cream">
        <div className="site-container grid gap-10 md:grid-cols-2">
          <article className="rounded-3xl border border-cream/20 p-7 md:p-9">
            <p className="eyebrow text-moss-light">{t("kitchenTitle")}</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold">{t("kitchenTitle")}</h2>
            <p className="mt-5 leading-7 text-cream/70">{t("kitchenText")}</p>
          </article>
          <article className="rounded-3xl border border-cream/20 p-7 md:p-9">
            <p className="eyebrow text-moss-light">{t("barTitle")}</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold">{t("barTitle")}</h2>
            <p className="mt-5 leading-7 text-cream/70">{t("barText")}</p>
          </article>
        </div>
      </section>
    </>
  );
}
