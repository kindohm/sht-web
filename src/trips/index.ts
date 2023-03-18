import { findTrips } from "./findTrips";
import { getAllSegments, Segment } from "./getAllSegments";
import { points as allPoints, Point } from "./points";

const args = { minDailyDistance: 3, maxDailyDistance: 7, numberOfDays: 4 };

const segments = getAllSegments({
  points: allPoints,
  minDailyDistance: args.minDailyDistance,
  maxDailyDistance: args.maxDailyDistance,
});

const hasUnreliableWater = (segment: Segment) => {
  const first = segment.points[0];
  const last = segment.points[1];

  if (first.type === "campsite" && first.unreliableWater) {
    return true;
  }

  if (last.type === "campsite" && last.unreliableWater) {
    return true;
  }

  return false;
};

console.log("finding trips:", args);

const trips = findTrips({ segments, numberOfDays: args.numberOfDays });

console.log(trips.length, "trips");

trips.forEach((trip) => {
  console.log(trip.description, trip.totalDistance.toFixed(1));

  trip.segments.forEach((seg, i) => {
    console.log(
      "\tday",
      i + 1,
      seg.name,
      seg.distance.toFixed(1),
      hasUnreliableWater(seg) ? "🏜️" : ""
    );
  });
});
