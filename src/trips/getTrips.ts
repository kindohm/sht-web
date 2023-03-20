import { Segment } from "./getSegments";

export type Trip = {
  segments: Segment[];
};

const getChildSegments = ({
  segment,
  allSegments,
  numberOfDays,
  day,
}: {
  segment: Segment;
  allSegments: Segment[];
  numberOfDays: number;
  day: number;
}): Segment[][] => {
  if (day === numberOfDays) {
    return [[segment]];
  }

  const followingSegments = allSegments.filter(
    (s) => s.startPointId === segment.endPointId
  );
  if (followingSegments.length === 0) {
    return [[segment]];
  }

  const followingSegmentsBuiltOut = followingSegments.reduce(
    (accum: Segment[][], seg: Segment) => {
      const builtOut = getChildSegments({
        segment: seg,
        allSegments,
        numberOfDays,
        day: day + 1,
      });

      return accum.concat(builtOut);
    },
    []
  );

  const addMe = followingSegmentsBuiltOut.map((x) => {
    return [segment, ...x].sort((a, b) => {
      if (a.startPointId < b.startPointId) {
        return -1;
      }

      if (a.endPointId < b.endPointId) {
        return -1;
      }

      return 1;
    });
  });

  return addMe;
};

export const getTrips = ({
  segments,
  numberOfDays,
}: {
  segments: Segment[];
  numberOfDays: number;
}): Trip[] => {
  const sortedSegments = segments.sort((a, b) => {
    if (a.startPointId < b.startPointId) {
      return -1;
    }

    if (a.endPointId < b.endPointId) {
      return -1;
    }

    return 1;
  });

  const segmentsStartingAtTrailheads = sortedSegments.filter(
    (s) => s.startsAtTrailhead
  );

  const trips = segmentsStartingAtTrailheads.reduce(
    (accum: Trip[], startingSegment: Segment) => {
      const segmentsAfter = sortedSegments.filter((other) => {
        return (
          other.startPointId > startingSegment.endPointId ||
          other.endPointId > startingSegment.endPointId
        );
      });

      const thisSegmentTrips = getChildSegments({
        segment: startingSegment,
        numberOfDays,
        day: 1,
        allSegments: segmentsAfter,
      });

      // filter out trips that do not start or end at trailheads
      const valid = thisSegmentTrips.filter(
        (s) => s[0].startsAtTrailhead && s[s.length - 1].endsAtTrailhead
      );

      const mapped = valid.map((v) => {
        return { segments: v };
      });

      return accum.concat(mapped);
    },
    []
  );

  return trips;
};
