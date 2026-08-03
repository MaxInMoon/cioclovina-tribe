import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { Accommodation } from "@/content/types";
import { Link } from "@/i18n/navigation";

type StayCardProps = {
  stay: Accommodation;
  name: string;
  tagline: string;
  price: string;
  bathroom: string;
};

export function StayCard({ stay, name, tagline, price, bathroom }: StayCardProps) {
  return (
    <Link className="group" href={{ pathname: "/stays/[slug]", params: { slug: stay.slug } }}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
        <Image
          alt={name}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
          src={stay.image}
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-semibold group-hover:text-rust">{name}</h2>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-muted">{tagline}</p>
        </div>
        <ArrowRight className="mt-1 size-5 shrink-0 transition-transform group-hover:translate-x-1" />
      </div>
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs font-bold tracking-[0.06em] text-rust uppercase">
        <span>{price}</span>
        <span aria-hidden>·</span>
        <span>{bathroom}</span>
      </div>
    </Link>
  );
}
