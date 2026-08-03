"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { siteConfig } from "@/content/site-config";
import { Link } from "@/i18n/navigation";
import { whatsappLink } from "@/lib/contact-links";
import { buttonVariants } from "@/components/ui/button";

import { LocaleSwitcher } from "./locale-switcher";

const navigation = [
  ["stays", "/stays"],
  ["experiences", "/experiences"],
  ["food", "/food"],
  ["guide", "/plan-your-stay"],
  ["about", "/about"],
] as const;

export function Header() {
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  const whatsapp = whatsappLink(t("whatsapp.general"));

  return (
    <header className="absolute inset-x-0 top-0 z-50 text-white">
      <div className="site-container flex h-24 items-center justify-between">
        <Link className="font-serif text-xl font-semibold tracking-tight" href="/">
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navigation.map(([key, href]) => (
            <Link className="text-sm font-medium hover:text-white/75" href={href} key={key}>
              {t(`nav.${key}`)}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <a
            className={buttonVariants({ variant: "light" })}
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            {t("cta.availability")}
          </a>
        </div>
        <button
          aria-expanded={open}
          aria-label={open ? t("labels.close") : t("labels.menu")}
          className="flex size-11 items-center justify-center rounded-full border border-white/35 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-white/20 bg-forest px-5 py-6 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Mobile">
            {navigation.map(([key, href]) => (
              <Link className="py-3 text-lg" href={href} key={key} onClick={() => setOpen(false)}>
                {t(`nav.${key}`)}
              </Link>
            ))}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <LocaleSwitcher />
              <a
                className={buttonVariants({ variant: "light" })}
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                {t("cta.availability")}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
