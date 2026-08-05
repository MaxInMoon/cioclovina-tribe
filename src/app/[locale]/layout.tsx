import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-400-italic.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/inter/latin-700-italic.css";
import "@fontsource/inter/latin-ext-400.css";
import "@fontsource/inter/latin-ext-400-italic.css";
import "@fontsource/inter/latin-ext-700.css";
import "@fontsource/inter/latin-ext-700-italic.css";
import "@maptiler/sdk/dist/maptiler-sdk.css";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { siteUrl } from "@/content/site-config";
import { routing } from "@/i18n/routing";

import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Cioclovina Tribe", template: "%s" },
  icons: { icon: "/favicon.ico" },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common.labels" });

  return (
    <html lang={locale}>
      <body className="font-sans">
        <NextIntlClientProvider>
          <a
            className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-full bg-cream px-5 py-3 font-semibold text-forest shadow-lg transition-transform focus:translate-y-0"
            href="#main-content"
          >
            {t("skipToContent")}
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
