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
    const { southToNorth, id } = point;

    const maxMile = southToNorth + maxDailyDistance;
    const minMile = southToNorth + minDaily;
    const pointsWithinDistance = points.filter(
      (p) =>
        p.id !== id && p.southToNorth <= maxMile && p.southToNorth >= minMile
    );

    const currentPointSegments = pointsWithinDistance.map(
      (p: Point): Segment => {
        const pointsBetween = pointsWithinDistance.filter(
          (b) =>
            b.southToNorth > point.southToNorth &&
            b.southToNorth < p.southToNorth
        );
        const segmentPoints = [point, ...pointsBetween, p].sort((a, b) => {
          return a.id > b.id ? -1 : 1;
        });

        segmentId++;
        return {
          id: segmentId.toString(),
          points: segmentPoints,
          startsAtTrailhead: point.type === "trailhead",
          endsAtTrailhead: p.type === "trailhead",
          name: `${point.name} to ${p.name}`,
          reverseName: `${p.name} to ${point.name}`,
          distance: p.southToNorth - point.southToNorth,
          startPointId: point.id,
          endPointId: p.id,
        };
      }
    );

    return segments.concat(currentPointSegments);
  }, segments);
};
