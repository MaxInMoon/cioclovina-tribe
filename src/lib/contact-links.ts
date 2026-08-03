import { siteConfig } from "@/content/site-config";

export function whatsappLink(message: string) {
  return `${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mailtoLink(subject: string) {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}
