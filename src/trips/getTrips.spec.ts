import { Segment } from "./getSegments";
import { getTrips } from "./getTrips";
import { Point } from "./points";

const mockPoint: Point = {
  id: 0,
  name: "",
  northToSouth: 0,
  southToNorth: 0,
  type: "campsite",
  size: "S",
  unreliableWater: false,
  waterNotes: "",
  distanceToParking: 0,
  overnightParking: "unknown",
};

describe("getTrips", () => {
  it("should return one trip for one day with one segment", () => {
    const numberOfDays = 1;
    const segments: Segment[] = [
      {
        id: "",
        startPointId: 1,
        endPointId: 2,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: true,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
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
        id: "",
        startPointId: 1,
        endPointId: 2,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: false,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
      },
      {
        id: "",
        startPointId: 2,
        endPointId: 3,
        distance: 5,
        startsAtTrailhead: false,
        endsAtTrailhead: true,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
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
        id: "",
        startPointId: 1,
        endPointId: 2,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: true,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
      },
      {
        id: "",
        startPointId: 100,
        endPointId: 101,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: true,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
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
        id: "",
        startPointId: 1,
        endPointId: 2,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: false,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
      },
      {
        id: "",
        startPointId: 2,
        endPointId: 3,
        distance: 5,
        startsAtTrailhead: false,
        endsAtTrailhead: false,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
      },
      {
        id: "",
        startPointId: 3,
        endPointId: 4,
        distance: 5,
        startsAtTrailhead: false,
        endsAtTrailhead: true,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
      },
      {
        id: "",
        startPointId: 100,
        endPointId: 101,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: false,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
      },
      {
        id: "",
        startPointId: 101,
        endPointId: 102,
        distance: 5,
        startsAtTrailhead: false,
        endsAtTrailhead: false,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
      },
      {
        id: "",
        startPointId: 102,
        endPointId: 103,
        distance: 5,
        startsAtTrailhead: false,
        endsAtTrailhead: true,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
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

    expect(trip2.segments.length).toEqual(3);
    const [segment4, segment5, segment6] = trip2.segments;

    expect(segment4.startPointId).toEqual(100);
    expect(segment4.endPointId).toEqual(101);
    expect(segment5.startPointId).toEqual(101);
    expect(segment5.endPointId).toEqual(102);
    expect(segment6.startPointId).toEqual(102);
    expect(segment6.endPointId).toEqual(103);
  });

  it("should exclude one trip that doesnt match days", () => {
    const numberOfDays = 2;
    const segments: Segment[] = [
      {
        id: "",
        startPointId: 1,
        endPointId: 2,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: false,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
      },
      {
        id: "",
        startPointId: 2,
        endPointId: 3,
        distance: 5,
        startsAtTrailhead: false,
        endsAtTrailhead: false,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
      },
      {
        id: "",
        startPointId: 3,
        endPointId: 4,
        distance: 5,
        startsAtTrailhead: false,
        endsAtTrailhead: true,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
      },
      {
        id: "",
        startPointId: 100,
        endPointId: 101,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: false,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
      },
      {
        id: "",
        startPointId: 101,
        endPointId: 102,
        distance: 5,
        startsAtTrailhead: false,
        endsAtTrailhead: true,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
      },
    ];
    const trips = getTrips({ segments, numberOfDays });

    expect(trips.length).toEqual(1);

    const [trip2] = trips;
    const [segment1, segment2] = trip2.segments;

    expect(segment1.startPointId).toEqual(100);
    expect(segment1.endPointId).toEqual(101);
    expect(segment2.startPointId).toEqual(101);
    expect(segment2.endPointId).toEqual(102);
  });

  it("should exclude trips that have an trailhead segment in the middle", () => {
    const numberOfDays = 3;
    const segments: Segment[] = [
      {
        id: "",
        startPointId: 1,
        endPointId: 2,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: true,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
      },
      {
        id: "",
        startPointId: 2,
        endPointId: 3,
        distance: 5,
        startsAtTrailhead: true,
        endsAtTrailhead: false,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
      },
      {
        id: "",
        startPointId: 3,
        endPointId: 4,
        distance: 5,
        startsAtTrailhead: false,
        endsAtTrailhead: true,
        startPoint: { ...mockPoint },
        endPoint: { ...mockPoint },
      },
    ];

    const trips = getTrips({ segments, numberOfDays });

    expect(trips.length).toEqual(0);
  });
});
