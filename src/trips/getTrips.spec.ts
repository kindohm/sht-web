import { Segment } from "./getSegments";
import { getTrips } from "./getTrips";

describe("getTrips", () => {
  it("should return one trip for one day with one segment", () => {
    const numberOfDays = 1;
    const segments: Segment[] = [
      {
        startPointId: 1,
        endPointId: 2,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: true,
      },
    ];
    const trips = getTrips({ segments, numberOfDays });

    expect(trips.length).toEqual(1);

    const [trip] = trips;
    const [segment] = trip.segments;

    expect(segment.startPointId).toEqual(1);
    expect(segment.endPointId).toEqual(2);
  });

  it("should return one trip for two days with two segments", () => {
    const numberOfDays = 2;
    const segments: Segment[] = [
      {
        startPointId: 1,
        endPointId: 2,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: false,
      },
      {
        startPointId: 2,
        endPointId: 3,
        distance: 5,
        startsAtTrailhead: false,
        endsAtTrailhead: true,
      },
    ];
    const trips = getTrips({ segments, numberOfDays });

    expect(trips.length).toEqual(1);

    const [trip] = trips;
    expect(trip.segments.length).toEqual(2);
    const [segment1, segment2] = trip.segments;

    expect(segment1.startPointId).toEqual(1);
    expect(segment1.endPointId).toEqual(2);
    expect(segment2.startPointId).toEqual(2);
    expect(segment2.endPointId).toEqual(3);
  });

  it("should return two trips for one days with two separate segments", () => {
    const numberOfDays = 2;
    const segments: Segment[] = [
      {
        startPointId: 1,
        endPointId: 2,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: true,
      },
      {
        startPointId: 100,
        endPointId: 101,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: true,
      },
    ];
    const trips = getTrips({ segments, numberOfDays });

    expect(trips.length).toEqual(2);

    const [trip1, trip2] = trips;
    expect(trip1.segments.length).toEqual(1);
    const [segment1] = trip1.segments;

    expect(segment1.startPointId).toEqual(1);
    expect(segment1.endPointId).toEqual(2);

    expect(trip2.segments.length).toEqual(1);
    const [segment2] = trip2.segments;

    expect(segment2.startPointId).toEqual(100);
    expect(segment2.endPointId).toEqual(101);
  });

  it("should return two trips for three days with in different sections", () => {
    const numberOfDays = 3;
    const segments: Segment[] = [
      {
        startPointId: 1,
        endPointId: 2,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: false,
      },
      {
        startPointId: 2,
        endPointId: 3,
        distance: 5,
        startsAtTrailhead: false,
        endsAtTrailhead: false,
      },
      {
        startPointId: 3,
        endPointId: 4,
        distance: 5,
        startsAtTrailhead: false,
        endsAtTrailhead: true,
      },
      {
        startPointId: 100,
        endPointId: 101,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: false,
      },
      {
        startPointId: 101,
        endPointId: 102,
        distance: 5,
        startsAtTrailhead: false,
        endsAtTrailhead: false,
      },
      {
        startPointId: 102,
        endPointId: 103,
        distance: 5,
        startsAtTrailhead: false,
        endsAtTrailhead: true,
      },
    ];
    const trips = getTrips({ segments, numberOfDays });

    expect(trips.length).toEqual(2);

    const [trip1, trip2] = trips;
    expect(trip1.segments.length).toEqual(3);
    const [segment1, segment2, segment3] = trip1.segments;

    expect(segment1.startPointId).toEqual(1);
    expect(segment1.endPointId).toEqual(2);
    expect(segment2.startPointId).toEqual(2);
    expect(segment2.endPointId).toEqual(3);
    expect(segment3.startPointId).toEqual(3);
    expect(segment3.endPointId).toEqual(4);
  });
});
