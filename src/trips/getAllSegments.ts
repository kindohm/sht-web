import { Point } from "./points";

export type Segment = {
  id: string;
  points: Point[];
  startsAtTrailhead: boolean;
  endsAtTrailhead: boolean;
  name: string;
  reverseName: string;
  distance: number;
  startPointId: string;
  endPointId: string;
};

export const getAllSegments = ({
  points,
  minDailyDistance,
  maxDailyDistance,
}: {
  points: Point[];
  minDailyDistance?: number;
  maxDailyDistance: number;
}): Segment[] => {
  const segments: Segment[] = [];
  const minDaily = minDailyDistance ?? 1;

  let segmentId = 10000;

  return points.reduce((segments: Segment[], point: Point) => {
    const { mile, id } = point;

    const maxMile = mile + maxDailyDistance;
    const minMile = mile + minDaily;
    const pointsWithinDistance = points.filter(
      (p) => p.id !== id && p.mile <= maxMile && p.mile >= minMile
    );

    const currentPointSegments = pointsWithinDistance.map(
      (p: Point): Segment => {
        const pointsBetween = pointsWithinDistance.filter(
          (b) => b.mile > point.mile && b.mile < p.mile
        );
        segmentId++;
        return {
          id: segmentId.toString(),
          points: [point, ...pointsBetween, p],
          startsAtTrailhead: point.type === "trailhead",
          endsAtTrailhead: p.type === "trailhead",
          name: `${point.name} to ${p.name}`,
          reverseName: `${p.name} to ${point.name}`,
          distance: p.mile - point.mile,
          startPointId: point.id,
          endPointId: p.id,
        };
      }
    );

    return segments.concat(currentPointSegments);
  }, segments);
};
