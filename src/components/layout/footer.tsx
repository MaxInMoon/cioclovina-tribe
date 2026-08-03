import { getTranslations } from "next-intl/server";

import { siteConfig } from "@/content/site-config";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("common");

  return (
    <footer className="bg-charcoal text-cream">
      <div className="site-container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link className="font-serif text-2xl font-semibold" href="/">
            {siteConfig.name}
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-cream/70">{t("footer.tagline")}</p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-cream/50 uppercase">
            {t("footer.explore")}
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link className="py-1" href="/stays">
              {t("nav.stays")}
            </Link>
            <Link className="py-1" href="/experiences">
              {t("nav.experiences")}
            </Link>
            <Link className="py-1" href="/food">
              {t("nav.food")}
            </Link>
            <Link className="py-1" href="/plan-your-stay">
              {t("nav.guide")}
            </Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-cream/50 uppercase">
            {t("footer.contact")}
          </p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a className="py-1" href={siteConfig.whatsapp}>
              {siteConfig.phoneDisplay}
            </a>
            <a className="py-1" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>
            <a className="py-1" href={siteConfig.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="site-container flex flex-col gap-3 border-t border-cream/10 py-5 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. {t("footer.rights")}
        </p>
        <div className="flex gap-5">
          <Link className="py-1" href="/privacy">
            {t("footer.privacy")}
          </Link>
          <Link className="py-1" href="/legal">
            {t("footer.legal")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
