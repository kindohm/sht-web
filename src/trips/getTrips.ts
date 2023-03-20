import { Segment } from "./getSegments";
import { v4 as uuidv4 } from "uuid";

export type Trip = {
  id: string;
  segments: Segment[];
  totalDistance: number;
  description: string;
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
  onlyReliableWater,
}: {
  segments: Segment[];
  numberOfDays: number;
  onlyReliableWater?: boolean;
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

  const trips = segmentsStartingAtTrailheads
    .reduce((accum: Trip[], startingSegment: Segment) => {
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
        const totalDistance = v.reduce((sum, x) => x.distance + sum, 0);
        const description = `${v[0].startPoint.name} to ${
          v[v.length - 1].endPoint.name
        }`;
        return { id: uuidv4(), segments: v, totalDistance, description };
      });

      return accum.concat(mapped);
    }, [])
    .filter((t) => t.segments.length === numberOfDays);

  const tripsWithoutTrailheadsInMiddle = trips.filter((trip) => {
    if (trip.segments.length === 1) return true;

    const middleSegments = trip.segments.slice(1, trip.segments.length - 1);

    const segmentsWithTrailheads = middleSegments.filter(
      (s) => s.startsAtTrailhead || s.endsAtTrailhead
    );
    return segmentsWithTrailheads.length === 0;
  });

  const waterFilt = tripsWithoutTrailheadsInMiddle.filter((t) => {
    if (!onlyReliableWater) {
      return true;
    }
    const segmentsWithUnreliableWater = t.segments.filter((s) => {
      return s.startPoint.unreliableWater || s.endPoint.unreliableWater;
    });

    return segmentsWithUnreliableWater.length === 0;
  });

  return waterFilt;
};
