import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

const coordinates = {
  longitude: 23.1449832,
  latitude: 45.5907484,
  zoom: 12,
} as const;

const mapId = "019fc802-a5ce-7277-bef0-c1098dc4f5f7";

type StaticLocationMapProps = {
  alt: string;
  className?: string;
};

export function StaticLocationMap({ alt, className }: StaticLocationMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

  if (!apiKey) return null;

  const src = `https://api.maptiler.com/maps/${mapId}/?key=${encodeURIComponent(apiKey)}#${coordinates.zoom}/${coordinates.latitude}/${coordinates.longitude}`;

  return (
    <div
      className={cn(
        "group relative block aspect-[4/3] overflow-hidden bg-sand focus-visible:outline-offset-4",
        className,
      )}
    >
      <iframe
        className="absolute inset-0 size-full border-0 transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.015]"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        src={src}
        title={alt}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 z-10 flex size-11 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full bg-rust text-white shadow-lg"
      >
        <MapPin className="size-6" strokeWidth={2.2} />
      </span>
    </div>
  );
}
