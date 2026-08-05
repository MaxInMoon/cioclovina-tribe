"use client";

import { Map, Marker, config } from "@maptiler/sdk";
import { useEffect, useRef } from "react";

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
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

  useEffect(() => {
    const mapContainer = mapContainerRef.current;

    if (!apiKey || !mapContainer) return;

    config.apiKey = apiKey;

    const map = new Map({
      container: mapContainer,
      center: [coordinates.longitude, coordinates.latitude],
      zoom: coordinates.zoom,
      style: `https://api.maptiler.com/maps/${mapId}/style.json?key=${encodeURIComponent(apiKey)}`,
    });

    const markerElement = document.createElement("div");
    markerElement.className =
      "relative flex size-11 items-center justify-center rounded-full bg-rust shadow-lg ring-4 ring-cream/85";
    markerElement.setAttribute("aria-label", alt);

    const markerDot = document.createElement("span");
    markerDot.className = "size-3 rounded-full bg-white";
    markerElement.append(markerDot);

    const markerTip = document.createElement("span");
    markerTip.className =
      "absolute top-[calc(100%-0.35rem)] left-1/2 size-4 -translate-x-1/2 rotate-45 rounded-br-sm bg-rust";
    markerElement.append(markerTip);

    const marker = new Marker({
      anchor: "bottom",
      element: markerElement,
    })
      .setLngLat([coordinates.longitude, coordinates.latitude])
      .addTo(map);

    return () => {
      marker.remove();
      map.remove();
    };
  }, [alt, apiKey]);

  if (!apiKey) return null;

  return (
    <div
      className={cn(
        "group relative block aspect-[4/3] overflow-hidden bg-sand focus-visible:outline-offset-4",
        className,
      )}
    >
      <div
        ref={mapContainerRef}
        aria-label={alt}
        className="absolute inset-0 size-full transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.015]"
        role="img"
      />
    </div>
  );
}
