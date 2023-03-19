import { Segment } from "./getAllSegments";

export type Trip = {
  id: string;
  segments: Segment[];
  description: string;
  totalDistance: number;
};

type SegmentTree = Segment & {
  possibleNextSegments?: SegmentTree[];
};

const addChildSegments = (
  segment: Segment,
  allSegments: Segment[],
  numberOfDays: number,
  currentDepth: number
): SegmentTree => {
  if (currentDepth > numberOfDays) {
    return { ...segment, possibleNextSegments: [] };
  }

  const following = allSegments.filter(
    (s) => s.startPointId === segment.endPointId
  );
  const followingWithChildren = following.map((f) =>
    addChildSegments(f, allSegments, numberOfDays, currentDepth + 1)
  );
  return { ...segment, possibleNextSegments: followingWithChildren };
};

const getPartialTripsFromSegmentTree = (segment: SegmentTree): Segment[][] => {
  let inner: Segment[][] = [];

  if (
    !segment.possibleNextSegments ||
    segment.possibleNextSegments.length === 0
  ) {
    return [[segment]];
  }

  segment.possibleNextSegments?.forEach((nextSeg) => {
    const childs = getPartialTripsFromSegmentTree(nextSeg);
    childs.forEach((c) => {
      inner.push([segment, ...c]);
    });
  });

  return inner;
};

export const findTrips = ({
  segments,
  numberOfDays,
}: {
  segments: Segment[];
  numberOfDays: number;
}): Trip[] => {
  if (!segments || segments.length === 0 || numberOfDays <= 0) {
    return [];
  }

  const segmentsStartingAtTrailheads = segments.filter(
    (s) => s.startsAtTrailhead
  );

  const segmentsWithChildren = segmentsStartingAtTrailheads.map((s) =>
    addChildSegments(s, segments, numberOfDays, 1)
  );

  const possibles = segmentsWithChildren.map((s) =>
    getPartialTripsFromSegmentTree(s)
  );

  let finalSegmentIds: Segment[][] = [];

  possibles.forEach((p) => {
    p.forEach((pp) => {
      finalSegmentIds.push(pp);
    });
  });

  const trips = finalSegmentIds
    .map((trip, i) => {
      return { id: i.toString(), segments: trip };
    })
    .filter((trip) => {
      return trip.segments[trip.segments.length - 1].endsAtTrailhead;
    })
    .filter((trip) => {
      const trailHeadInMiddle = trip.segments.filter(
        (seg, i) =>
          i > 0 &&
          i < trip.segments.length - 1 &&
          (seg.endsAtTrailhead || seg.startsAtTrailhead)
      );
      return trailHeadInMiddle.length === 0;
    });

  const tripsWithCorrectDays = trips.filter(
    (trip) => trip.segments.length === numberOfDays
  );

  return tripsWithCorrectDays.map((trip) => {
    const totalDistance = trip.segments.reduce(
      (sum, seg) => sum + seg.distance,
      0
    );
    const description =
      trip.segments[0]?.points[0]?.name +
      " to " +
      trip.segments[trip.segments.length - 1]?.points[1]?.name;
    return { ...trip, totalDistance, description };
  });
};
