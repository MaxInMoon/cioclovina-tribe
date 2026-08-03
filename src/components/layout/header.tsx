"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/content/site-config";
import { Link, usePathname } from "@/i18n/navigation";
import { whatsappLink } from "@/lib/contact-links";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const whatsapp = whatsappLink(t("whatsapp.general"));

  function isActive(href: (typeof navigation)[number][1]) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frame: number | null = null;

    function updateHeader() {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 16);

      if (open || currentScrollY < 96) {
        setVisible(true);
      } else if (Math.abs(currentScrollY - lastScrollY) > 8) {
        setVisible(currentScrollY < lastScrollY);
      }

      lastScrollY = currentScrollY;
      frame = null;
    }

    function handleScroll() {
      if (frame === null) frame = requestAnimationFrame(updateHeader);
    }

    updateHeader();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => {
      mobilePanelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !mobilePanelRef.current) return;
      const focusable = Array.from(
        mobilePanelRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled]), select:not([disabled])",
        ),
      );
      const first = focusable[0];
      const last = focusable.at(-1);

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-white transition-[transform,background-color,box-shadow] duration-300",
        visible || open ? "translate-y-0" : "-translate-y-full",
        scrolled || open
          ? "bg-forest/95 shadow-[0_8px_30px_rgba(13,32,25,.18)] backdrop-blur-md"
          : "bg-gradient-to-b from-black/45 to-transparent",
      )}
    >
      <div className="site-container flex h-20 items-center justify-between md:h-24">
        <Link
          className="font-serif text-xl font-semibold tracking-tight"
          href="/"
          onClick={() => setOpen(false)}
        >
          {siteConfig.name}
        </Link>
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label={t("labels.primaryNavigation")}
        >
          {navigation.map(([key, href]) => (
            <Link
              aria-current={isActive(href) ? "page" : undefined}
              className="text-sm font-medium hover:text-white/75 aria-[current=page]:underline aria-[current=page]:decoration-white/50 aria-[current=page]:underline-offset-8"
              href={href}
              key={key}
            >
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
          aria-controls="mobile-navigation"
          aria-expanded={open}
          aria-label={open ? t("labels.close") : t("labels.menu")}
          className="flex size-12 items-center justify-center rounded-full border-2 border-white/45 transition-colors hover:bg-white/10 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          ref={menuButtonRef}
          type="button"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div
          className="max-h-[calc(100svh-5rem)] overflow-y-auto border-t border-white/20 bg-forest px-6 py-7 lg:hidden"
          id="mobile-navigation"
          ref={mobilePanelRef}
        >
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1"
            aria-label={t("labels.mobileNavigation")}
          >
            {navigation.map(([key, href]) => (
              <Link
                aria-current={isActive(href) ? "page" : undefined}
                className="rounded-xl px-3 py-3.5 text-lg transition-colors hover:bg-white/10 aria-[current=page]:bg-white/10 aria-[current=page]:font-bold aria-[current=page]:text-moss-light"
                href={href}
                key={key}
                onClick={() => setOpen(false)}
              >
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
