import { Point } from "./points";
import { v4 as uuidv4 } from "uuid";

export type Segment = {
  id: string;
  startPointId: number;
  endPointId: number;
  distance: number;
  startsAtTrailhead: boolean;
  endsAtTrailhead: boolean;
  startPoint: Point;
  endPoint: Point;
};

export const getSegments = ({
  points,
  minDistancePerSegment,
  maxDistancePerSegment,
}: {
  points: Point[];
  minDistancePerSegment: number;
  maxDistancePerSegment: number;
}): Segment[] => {
  const sorted = points.sort((a, b) => {
    return a.id < b.id ? -1 : 1;
  });

  const segments = sorted.reduce((accum: Segment[], point: Point) => {
    const pointsAfter = sorted.filter((s) => {
      return (
        s.id > point.id &&
        s.southToNorth - point.southToNorth <= maxDistancePerSegment &&
        s.southToNorth - point.southToNorth >= minDistancePerSegment
      );
    });

    const newSegments: Segment[] = pointsAfter.map((pointAfter) => {
      return {
        id: uuidv4(),
        startPointId: point.id,
        endPointId: pointAfter.id,
        distance: pointAfter.southToNorth - point.southToNorth,
        startsAtTrailhead: point.type === "trailhead",
        endsAtTrailhead: pointAfter.type === "trailhead",
        startPoint: point,
        endPoint: pointAfter,
      };
    });

    return accum.concat(newSegments);
  }, []);

  const sortedSegments = segments.sort((a, b) => {
    if (a.startPointId < b.startPointId) {
      return -1;
    }

    if (a.endPointId < b.endPointId) {
      return -1;
    }

    return 1;
  });

  return sortedSegments;
};
