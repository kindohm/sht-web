import { findTrips } from "./findTrips";
import { Point } from "./points";
import { Segment } from "./getAllSegments";

const points: Point[] = [
  { name: "asdf", mile: 1, type: "campsite", id: "point0" },
];

const mockSegment: Segment = {
  id: "10000",
  points: [],
  startsAtTrailhead: false,
  endsAtTrailhead: false,
  name: "",
  reverseName: "",
  distance: 1,
  startPointId: "",
  endPointId: "",
};

describe("findTrips", () => {
  it("should return empty array when there are no segments", () => {
    const numberOfDays = 10;
    const segments: Segment[] = [];

    const trips = findTrips({
      segments,
      numberOfDays,
    });

    expect(trips.length).toEqual(0);
  });

  it("should return empty when there is one segment that does not start or end at trailhead", () => {
    const segments: Segment[] = [
      { ...mockSegment, startsAtTrailhead: false, endsAtTrailhead: false },
    ];

    const numberOfDays = 10;

    const trips = findTrips({
      segments,
      numberOfDays,
    });

    expect(trips.length).toEqual(0);
  });

  it("should return empty when there is one segment and it does not start at trailhead", () => {
    const segments: Segment[] = [
      { ...mockSegment, startsAtTrailhead: false, endsAtTrailhead: true },
    ];

    const numberOfDays = 10;

    const trips = findTrips({
      segments,
      numberOfDays,
    });

    expect(trips.length).toEqual(0);
  });

  it("should return empty when there is one segment and it does not end at trailhead", () => {
    const segments: Segment[] = [
      { ...mockSegment, startsAtTrailhead: true, endsAtTrailhead: false },
    ];

    const numberOfDays = 10;

    const trips = findTrips({
      segments,
      numberOfDays,
    });

    expect(trips.length).toEqual(0);
  });

  it("should return one trip when there is one segment that starts and ends at trailheads", () => {
    const segments: Segment[] = [
      { ...mockSegment, startsAtTrailhead: true, endsAtTrailhead: true },
    ];

    const numberOfDays = 10;

    const trips = findTrips({
      segments,
      numberOfDays,
    });

    expect(trips.length).toEqual(1);
  });

  it("should return one trip with two segments", () => {
    const segments: Segment[] = [
      {
        ...mockSegment,
        id: "10000",
        startPointId: "1",
        endPointId: "2",
        startsAtTrailhead: true,
        endsAtTrailhead: false,
      },
      {
        ...mockSegment,
        id: "10001",
        startPointId: "2",
        endPointId: "3",
        startsAtTrailhead: false,
        endsAtTrailhead: true,
      },
    ];

    const numberOfDays = 2;

    const trips = findTrips({
      segments,
      numberOfDays,
    });

    expect(trips.length).toEqual(1);
  });

  it("should return one trip with three segments", () => {
    const segments: Segment[] = [
      {
        ...mockSegment,
        id: "10000",
        startPointId: "1",
        endPointId: "2",
        startsAtTrailhead: true,
        endsAtTrailhead: false,
      },
      {
        ...mockSegment,
        id: "10001",
        startPointId: "2",
        endPointId: "3",
        startsAtTrailhead: false,
        endsAtTrailhead: false,
      },
      {
        ...mockSegment,
        id: "10002",
        startPointId: "3",
        endPointId: "4",
        startsAtTrailhead: false,
        endsAtTrailhead: true,
      },
    ];

    const numberOfDays = 3;

    const trips = findTrips({
      segments,
      numberOfDays,
    });

    expect(trips.length).toEqual(1);
    const [trip] = trips;
    expect(trip.segments.length).toEqual(3);
  });

  it("should return two trips with three segments", () => {
    const segments: Segment[] = [
      {
        ...mockSegment,
        id: "10000",
        startPointId: "1",
        endPointId: "2",
        startsAtTrailhead: true,
        endsAtTrailhead: false,
      },
      {
        ...mockSegment,
        id: "10001",
        startPointId: "2",
        endPointId: "3",
        startsAtTrailhead: false,
        endsAtTrailhead: false,
      },
      {
        ...mockSegment,
        id: "10002",
        startPointId: "3",
        endPointId: "4",
        startsAtTrailhead: false,
        endsAtTrailhead: true,
      },

      {
        ...mockSegment,
        startPointId: "11",
        endPointId: "12",
        startsAtTrailhead: true,
        endsAtTrailhead: false,
      },
      {
        ...mockSegment,
        id: "10003",
        startPointId: "12",
        endPointId: "13",
        startsAtTrailhead: false,
        endsAtTrailhead: false,
      },
      {
        ...mockSegment,
        id: "10004",
        startPointId: "13",
        endPointId: "14",
        startsAtTrailhead: false,
        endsAtTrailhead: true,
      },
    ];

    const numberOfDays = 3;

    const trips = findTrips({
      segments,
      numberOfDays,
    });

    expect(trips.length).toEqual(2);
    const [trip1, trip2] = trips;
    expect(trip1.segments.length).toEqual(3);
    expect(trip2.segments.length).toEqual(3);
  });

  it("should return two trips for multiple options from same start segment", () => {
    const segments: Segment[] = [
      {
        ...mockSegment,
        id: "10000",
        startPointId: "1",
        endPointId: "2",
        startsAtTrailhead: true,
        endsAtTrailhead: false,
      },
      {
        ...mockSegment,
        id: "10001",
        startPointId: "2",
        endPointId: "3",
        startsAtTrailhead: false,
        endsAtTrailhead: false,
      },
      {
        ...mockSegment,
        id: "10002",
        startPointId: "3",
        endPointId: "4",
        startsAtTrailhead: false,
        endsAtTrailhead: true,
      },
      // 2nd trip, only two segments
      {
        ...mockSegment,
        id: "10003",
        startPointId: "1",
        endPointId: "3",
        startsAtTrailhead: true,
        endsAtTrailhead: false,
      },
    ];

    const numberOfDays = 3;

    const trips = findTrips({
      segments,
      numberOfDays,
    });

    expect(trips.length).toEqual(2);
    const [trip1, trip2] = trips;
    expect(trip1.segments.length).toEqual(3);
    expect(trip2.segments.length).toEqual(2);
  });

  it("should return two trips for multiple options in the middle", () => {
    const segments: Segment[] = [
      {
        ...mockSegment,
        id: "10000",
        startPointId: "1",
        endPointId: "2",
        startsAtTrailhead: true,
        endsAtTrailhead: false,
      },
      {
        ...mockSegment,
        id: "10001",
        startPointId: "2",
        endPointId: "3",
        startsAtTrailhead: false,
        endsAtTrailhead: false,
      },
      // extra option
      {
        ...mockSegment,
        id: "10002",
        startPointId: "2",
        endPointId: "4",
        startsAtTrailhead: false,
        endsAtTrailhead: true,
      },
      {
        ...mockSegment,
        id: "10003",
        startPointId: "3",
        endPointId: "4",
        startsAtTrailhead: false,
        endsAtTrailhead: true,
      },
    ];

    const numberOfDays = 5;

    const trips = findTrips({
      segments,
      numberOfDays,
    });

    expect(trips.length).toEqual(2);
    const [trip1, trip2] = trips;
    expect(trip1.segments.length).toEqual(3);
    expect(trip2.segments.length).toEqual(2);
  });
});
