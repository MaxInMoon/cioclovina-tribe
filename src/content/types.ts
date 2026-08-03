export type ContentStatus = "confirmed" | "provisional";

export type Money = {
  amount: number;
  currency: "RON";
  unit: "night" | "personNight" | "person" | "personDay" | "trip";
};

export type AccommodationId =
  | "hammock-cabin"
  | "orchard-cabin"
  | "meadow-glamping"
  | "star-tent"
  | "red-tent"
  | "a-tent"
  | "own-tent-camping";

export type Accommodation = {
  id: AccommodationId;
  slug: AccommodationId;
  status: ContentStatus;
  priceStatus: ContentStatus;
  pricing: readonly Money[];
  occupancyPricing?: readonly { guests: number; amount: number }[];
  bathroom: "private" | "shared";
  featureKeys: readonly string[];
  image: string;
  gallery: readonly string[];
};

export type ExperienceId = "e-bike" | "jeep-fundatura" | "guided-hike" | "jeep-dacian-fortresses";

export type Experience = {
  id: ExperienceId;
  status: ContentStatus;
  durationHours?: readonly [number, number];
  minimumGuests?: number;
  price: Money;
  image?: string;
};
