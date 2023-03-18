import { PlainPoint, pointData } from "./pointData";

export type Point = PlainPoint & {
  id: string;
  previousId?: number;
  nextId?: number;
};

const sortPoints = (points: PlainPoint[]) => {
  return points.sort((a, b) => {
    return a.mile > b.mile ? -1 : 1;
  });
};

export const points = sortPoints(pointData).map((p, i) => ({
  ...p,
  id: `point${i}`,
  previousId: i > 0 ? i - 1 : undefined,
  nextId: i < pointData.length - 1 ? i + 1 : undefined,
}));
