import { Point } from "./points";

export type Segment = {
  id: string;
  startPointId: string;
  endPointId: string;
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
  const segments = points.reduce((accum: Segment[], point: Point) => {
    return accum;
  }, []);

  return segments;
};
