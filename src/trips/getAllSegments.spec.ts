import { getAllSegments } from "./getAllSegments";
import { Point } from "./points";

describe("getAllSegments", () => {
  it("should return a single segment with two points", () => {
    const maxDailyDistance = 1;

    const points: Point[] = [
      {
        name: "1",
        southToNorth: 1,
        northToSouth: 1,
        type: "campsite",
        id: "point1",
        size: "S",
        unreliableWater: false,
        waterNotes: "",
        distanceToParking: 0,
        overnightParking: "unknown",
      },
      {
        name: "2",
        southToNorth: 2,
        northToSouth: 2,
        type: "campsite",
        id: "point2",
        size: "S",
        unreliableWater: false,
        waterNotes: "",
        distanceToParking: 0,
        overnightParking: "unknown",
      },
    ];

    const segments = getAllSegments({ points, maxDailyDistance });
    expect(segments.length).toEqual(1);
    expect(segments[0].points.length).toEqual(2);
    expect(segments[0].points[0].id).toEqual("point1");
    expect(segments[0].points[1].id).toEqual("point2");
  });

  it("should return one segment when third point is too far", () => {
    const maxDailyDistance = 1;

    const points: Point[] = [
      {
        name: "1",
        southToNorth: 1,
        northToSouth: 1,
        type: "campsite",
        id: "point1",
        size: "S",
        unreliableWater: false,
        waterNotes: "",
        distanceToParking: 0,
        overnightParking: "unknown",
      },
      {
        name: "2",
        southToNorth: 2,
        northToSouth: 1,
        type: "campsite",
        id: "point2",
        size: "S",
        unreliableWater: false,
        waterNotes: "",
        distanceToParking: 0,
        overnightParking: "unknown",
      },
      {
        name: "3",
        southToNorth: 3333,
        northToSouth: 1,
        type: "campsite",
        id: "point3",
        size: "S",
        unreliableWater: false,
        waterNotes: "",
        distanceToParking: 0,
        overnightParking: "unknown",
      },
    ];

    const segments = getAllSegments({ points, maxDailyDistance });
    expect(segments.length).toEqual(1);
    expect(segments[0].points.length).toEqual(2);
    expect(segments[0].points[0].id).toEqual("point1");
    expect(segments[0].points[1].id).toEqual("point2");
  });

  it("should return one segment when first point is too far back", () => {
    const maxDailyDistance = 1;

    const points: Point[] = [
      {
        name: "1",
        southToNorth: 1,
        northToSouth: 1,
        type: "campsite",
        id: "point1",
        size: "S",
        unreliableWater: false,
        waterNotes: "",
        distanceToParking: 0,
        overnightParking: "unknown",
      },
      {
        name: "2",
        southToNorth: 2000,
        northToSouth: 1,
        type: "campsite",
        id: "point2",
        size: "S",
        unreliableWater: false,
        waterNotes: "",
        distanceToParking: 0,
        overnightParking: "unknown",
      },
      {
        name: "3",
        southToNorth: 2001,
        northToSouth: 1,
        type: "campsite",
        id: "point3",
        size: "S",
        unreliableWater: false,
        waterNotes: "",
        distanceToParking: 0,
        overnightParking: "unknown",
      },
    ];

    const segments = getAllSegments({ points, maxDailyDistance });
    expect(segments.length).toEqual(1);
    expect(segments[0].points.length).toEqual(2);
    expect(segments[0].points[0].id).toEqual("point2");
    expect(segments[0].points[1].id).toEqual("point3");
  });

  it("should return two segments when three points are equidistant", () => {
    const maxDailyDistance = 1;

    const points: Point[] = [
      {
        name: "1",
        southToNorth: 1,
        northToSouth: 0,
        type: "campsite",
        id: "point1",
        size: "S",
        unreliableWater: false,
        waterNotes: "",
        distanceToParking: 0,
        overnightParking: "unknown",
      },
      {
        name: "2",
        southToNorth: 2,
        northToSouth: 0,
        type: "campsite",
        id: "point2",
        size: "S",
        unreliableWater: false,
        waterNotes: "",
        distanceToParking: 0,
        overnightParking: "unknown",
      },
      {
        name: "3",
        southToNorth: 3,
        northToSouth: 0,
        type: "campsite",
        id: "point3",
        size: "S",
        unreliableWater: false,
        waterNotes: "",
        distanceToParking: 0,
        overnightParking: "unknown",
      },
    ];

    const segments = getAllSegments({ points, maxDailyDistance });
    expect(segments.length).toEqual(2);
    const [segment1, segment2] = segments;

    expect(segment1.points.length).toEqual(2);
    expect(segment1.points[0].id).toEqual("point1");
    expect(segment1.points[1].id).toEqual("point2");

    expect(segment2.points.length).toEqual(2);
    expect(segment2.points[0].id).toEqual("point2");
    expect(segment2.points[1].id).toEqual("point3");
  });

  it("should return a third complete segment when three points are in a small cluster", () => {
    const maxDailyDistance = 1;

    const points: Point[] = [
      {
        name: "1",
        southToNorth: 1,
        northToSouth: 0,
        type: "campsite",
        id: "point1",
        size: "S",
        unreliableWater: false,
        waterNotes: "",
        distanceToParking: 0,
        overnightParking: "unknown",
      },
      {
        name: "2",
        southToNorth: 1.1,
        type: "campsite",
        northToSouth: 0,
        id: "point2",
        size: "S",
        unreliableWater: false,
        waterNotes: "",
        distanceToParking: 0,
        overnightParking: "unknown",
      },
      {
        name: "3",
        southToNorth: 1.2,
        northToSouth: 0,
        type: "campsite",
        id: "point3",
        size: "S",
        unreliableWater: false,
        waterNotes: "",
        distanceToParking: 0,
        overnightParking: "unknown",
      },
    ];

    const segments = getAllSegments({
      points,
      minDailyDistance: 0.01,
      maxDailyDistance,
    });
    expect(segments.length).toEqual(3);
    const [segment1, segment2, segment3] = segments;

    expect(segment1.points.length).toEqual(2);
    expect(segment1.points[0].id).toEqual("point1");
    expect(segment1.startPointId).toEqual("point1");
    expect(segment1.points[1].id).toEqual("point2");
    expect(segment1.endPointId).toEqual("point2");

    expect(segment2.points.length).toEqual(3);
    expect(segment2.points[0].id).toEqual("point1");
    expect(segment2.points[1].id).toEqual("point2");
    expect(segment2.points[2].id).toEqual("point3");

    expect(segment3.points.length).toEqual(2);
    expect(segment3.points[0].id).toEqual("point2");
    expect(segment3.points[1].id).toEqual("point3");
  });
});
