import { pointsOfInterest } from "./pointsOfInterest";

export type PointOfInterest = {
  id: number;
  name: string;
  type: "campsite" | "trailhead";
  northToSouth: number;
  southToNorth: number;
  size: "S" | "M" | "L";
  unreliableWater: boolean;
  waterNotes: string;
  distanceToParking: number;
  overnightParking: "yes" | "no" | "unknown";
};

export type Point = PointOfInterest & { previousId?: number; nextId?: number };

const sortPoints = (points: PointOfInterest[]) => {
  return points.sort((a, b) => {
    return a.southToNorth > b.southToNorth ? -1 : 1;
  });
};

// @ts-expect-error its fine
const rawPoints: PointOfInterest[] = pointsOfInterest;

export const points = sortPoints(rawPoints).map((p, i) => ({
  ...p,
  previousId: i > 0 ? i - 1 : undefined,
  nextId: i < rawPoints.length - 1 ? i + 1 : undefined,
}));
