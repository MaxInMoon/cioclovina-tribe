import type { Accommodation, AccommodationId } from "./types";

export const accommodations = [
  {
    id: "hammock-cabin",
    slug: "hammock-cabin",
    status: "provisional",
    priceStatus: "provisional",
    pricing: [{ amount: 400, currency: "RON", unit: "night" }],
    bathroom: "private",
    featureKeys: ["doubleBed", "panoramicVeranda", "hammock", "heating", "electricity"],
    image: "/images/accommodations/hammock-cabin/bedroom-panoramic-view.webp",
    gallery: [
      "/images/accommodations/hammock-cabin/bedroom-panoramic-view.webp",
      "/images/accommodations/hammock-cabin/bathroom-shower-view.webp",
      "/images/accommodations/hammock-cabin/stone-basin.webp",
    ],
  },
  {
    id: "orchard-cabin",
    slug: "orchard-cabin",
    status: "provisional",
    priceStatus: "provisional",
    pricing: [{ amount: 400, currency: "RON", unit: "night" }],
    bathroom: "private",
    featureKeys: [
      "doubleBed",
      "sofaChairBed",
      "traditionalFurniture",
      "airConditioning",
      "heating",
      "electricity",
    ],
    image: "/images/accommodations/orchard-cabin/veranda-seating.webp",
    gallery: [
      "/images/accommodations/orchard-cabin/veranda-seating.webp",
      "/images/accommodations/orchard-cabin/bedroom.webp",
      "/images/accommodations/orchard-cabin/private-bathroom.webp",
    ],
  },
  {
    id: "meadow-glamping",
    slug: "meadow-glamping",
    status: "provisional",
    priceStatus: "provisional",
    pricing: [{ amount: 300, currency: "RON", unit: "night" }],
    occupancyPricing: [
      { guests: 2, amount: 300 },
      { guests: 3, amount: 350 },
      { guests: 4, amount: 400 },
    ],
    bathroom: "private",
    featureKeys: ["doubleBed", "sofaBed", "raisedPlatform", "heating", "electricity"],
    image: "/images/accommodations/meadow-glamping/exterior.webp",
    gallery: [
      "/images/accommodations/meadow-glamping/exterior.webp",
      "/images/accommodations/meadow-glamping/interior.webp",
      "/images/accommodations/meadow-glamping/private-basin.webp",
    ],
  },
  {
    id: "star-tent",
    slug: "star-tent",
    status: "provisional",
    priceStatus: "provisional",
    pricing: [{ amount: 250, currency: "RON", unit: "night" }],
    bathroom: "shared",
    featureKeys: ["doubleBed", "childBed", "panoramicWindows", "heating", "electricity"],
    image: "/images/accommodations/star-tent/exterior-mountain-view.webp",
    gallery: [
      "/images/accommodations/star-tent/exterior-mountain-view.webp",
      "/images/accommodations/star-tent/interior-bed.webp",
      "/images/accommodations/star-tent/bedside-table.webp",
    ],
  },
  {
    id: "red-tent",
    slug: "red-tent",
    status: "provisional",
    priceStatus: "provisional",
    pricing: [{ amount: 250, currency: "RON", unit: "night" }],
    bathroom: "shared",
    featureKeys: ["doubleBed", "childBed", "panoramicWindows", "heating", "electricity"],
    image: "/images/accommodations/red-tent/exterior.webp",
    gallery: [
      "/images/accommodations/red-tent/exterior.webp",
      "/images/accommodations/red-tent/interior-bed.webp",
      "/images/accommodations/red-tent/bedside-lantern.webp",
    ],
  },
  {
    id: "a-tent",
    slug: "a-tent",
    status: "provisional",
    priceStatus: "provisional",
    pricing: [{ amount: 180, currency: "RON", unit: "night" }],
    bathroom: "shared",
    featureKeys: ["smallDoubleBed", "woodenPlatform", "pergola", "heating", "electricity"],
    image: "/images/accommodations/a-tent/exterior.webp",
    gallery: [
      "/images/accommodations/a-tent/exterior.webp",
      "/images/accommodations/a-tent/entrance.webp",
      "/images/accommodations/a-tent/interior-bed.webp",
    ],
  },
  {
    id: "own-tent-camping",
    slug: "own-tent-camping",
    status: "provisional",
    priceStatus: "provisional",
    pricing: [{ amount: 50, currency: "RON", unit: "personNight" }],
    bathroom: "shared",
    featureKeys: ["pitchOnProperty", "sharedFacilities"],
    image: "/images/accommodations/own-tent-camping/tent-in-orchard.webp",
    gallery: [
      "/images/accommodations/own-tent-camping/tent-in-orchard.webp",
      "/images/accommodations/own-tent-camping/hammock.webp",
    ],
  },
] as const satisfies readonly Accommodation[];

export function getAccommodation(id: AccommodationId) {
  return accommodations.find((accommodation) => accommodation.id === id);
}
