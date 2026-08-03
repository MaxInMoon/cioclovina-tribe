import type { Experience } from "./types";

export const experiences: readonly Experience[] = [
  {
    id: "e-bike",
    status: "provisional",
    durationHours: [4, 6],
    price: { amount: 250, currency: "RON", unit: "person" },
    image: "/images/experiences/e-bike-trail.webp",
  },
  {
    id: "jeep-fundatura",
    status: "provisional",
    minimumGuests: 2,
    price: { amount: 200, currency: "RON", unit: "person" },
  },
  {
    id: "guided-hike",
    status: "provisional",
    durationHours: [6, 8],
    price: { amount: 50, currency: "RON", unit: "person" },
  },
  {
    id: "jeep-dacian-fortresses",
    status: "provisional",
    minimumGuests: 2,
    price: { amount: 250, currency: "RON", unit: "person" },
  },
] as const;
