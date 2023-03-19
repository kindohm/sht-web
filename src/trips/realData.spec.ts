import { findTrips } from "./findTrips";
import { getAllSegments } from "./getAllSegments";
import { points } from "./points";

describe("realdata", () => {
  it("should", () => {
    const maxDailyDistance = 11;
    const minDailyDistance = 3;
    const segments = getAllSegments({
      points,
      maxDailyDistance,
      minDailyDistance,
    });

    // const found = segments.filter((s) => s.points[0].id === "115");

    // expect(found.length).toBeGreaterThan(0);

    const trips = findTrips({ segments, numberOfDays: 1 });
    console.log("stuff", {
      segments: segments.length,
      trips: trips.length,
    });

    expect(segments.length).toBeGreaterThan(0);
  });
});
