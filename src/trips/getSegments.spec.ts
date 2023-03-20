import { getSegments } from "./getSegments";
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

describe("getSegments", () => {
  it("should get segment with two points", () => {
    const minDistancePerSegment = 1;
    const maxDistancePerSegment = 10;

    const points: Point[] = [
      { ...mockPoint, id: 1, southToNorth: 1 },
      { ...mockPoint, id: 2, southToNorth: 2 },
    ];

    const segments = getSegments({
      points,
      minDistancePerSegment,
      maxDistancePerSegment,
    });

    expect(segments.length).toEqual(1);
    const [segment] = segments;
    expect(segment.startPointId).toEqual(1);
    expect(segment.endPointId).toEqual(2);
  });

  it("should get no segments when max distance is small", () => {
    const minDistancePerSegment = 1;
    const maxDistancePerSegment = 2;

    const points: Point[] = [
      { ...mockPoint, id: 1, southToNorth: 1 },
      { ...mockPoint, id: 2, southToNorth: 10 },
    ];

    const segments = getSegments({
      points,
      minDistancePerSegment,
      maxDistancePerSegment,
    });

    expect(segments.length).toEqual(0);
  });

  it("should get no segments when min distance is large", () => {
    const minDistancePerSegment = 10;
    const maxDistancePerSegment = 20;

    const points: Point[] = [
      { ...mockPoint, id: 1, southToNorth: 1 },
      { ...mockPoint, id: 2, southToNorth: 2 },
    ];

    const segments = getSegments({
      points,
      minDistancePerSegment,
      maxDistancePerSegment,
    });

    expect(segments.length).toEqual(0);
  });

  it("should get three segments for three points in a cluster", () => {
    const minDistancePerSegment = 1;
    const maxDistancePerSegment = 20;

    const points: Point[] = [
      { ...mockPoint, id: 1, nextId: 2, southToNorth: 1 },
      { ...mockPoint, id: 2, previousId: 1, southToNorth: 2 },
      { ...mockPoint, id: 3, previousId: 2, southToNorth: 3 },
    ];

    const segments = getSegments({
      points,
      minDistancePerSegment,
      maxDistancePerSegment,
    });

    expect(segments.length).toEqual(3);
    const [segment1, segment2, segment3] = segments;

    expect(segment1.startPointId).toEqual(1);
    expect(segment1.endPointId).toEqual(2);
    expect(segment2.startPointId).toEqual(1);
    expect(segment2.endPointId).toEqual(3);
    expect(segment3.startPointId).toEqual(2);
    expect(segment3.endPointId).toEqual(3);
  });

  it("should get two segments for three points in a long stretch", () => {
    const minDistancePerSegment = 1;
    const maxDistancePerSegment = 10;

    const points: Point[] = [
      { ...mockPoint, id: 1, southToNorth: 1 },
      { ...mockPoint, id: 2, southToNorth: 9 },
      { ...mockPoint, id: 3, southToNorth: 17 },
    ];

    const segments = getSegments({
      points,
      minDistancePerSegment,
      maxDistancePerSegment,
    });

    expect(segments.length).toEqual(2);
    const [segment1, segment2] = segments;

    expect(segment1.startPointId).toEqual(1);
    expect(segment1.endPointId).toEqual(2);
    expect(segment2.startPointId).toEqual(2);
    expect(segment2.endPointId).toEqual(3);
  });

  it("should get three segments for four points in a long stretch", () => {
    const minDistancePerSegment = 1;
    const maxDistancePerSegment = 10;

    const points: Point[] = [
      { ...mockPoint, id: 1, southToNorth: 1 },
      { ...mockPoint, id: 2, southToNorth: 9 },
      { ...mockPoint, id: 3, southToNorth: 17 },
      { ...mockPoint, id: 4, southToNorth: 26 },
    ];

    const segments = getSegments({
      points,
      minDistancePerSegment,
      maxDistancePerSegment,
    });

    expect(segments.length).toEqual(3);
    const [segment1, segment2, segment3] = segments;

    expect(segment1.startPointId).toEqual(1);
    expect(segment1.endPointId).toEqual(2);
    expect(segment2.startPointId).toEqual(2);
    expect(segment2.endPointId).toEqual(3);
    expect(segment3.startPointId).toEqual(3);
    expect(segment3.endPointId).toEqual(4);
  });

  it("should get two segments for two sections not connected", () => {
    const minDistancePerSegment = 1;
    const maxDistancePerSegment = 10;

    const points: Point[] = [
      { ...mockPoint, id: 1, southToNorth: 1 },
      { ...mockPoint, id: 2, southToNorth: 5 },
      { ...mockPoint, id: 3, southToNorth: 100 },
      { ...mockPoint, id: 4, southToNorth: 105 },
    ];

    const segments = getSegments({
      points,
      minDistancePerSegment,
      maxDistancePerSegment,
    });

    expect(segments.length).toEqual(2);
    const [segment1, segment2] = segments;

    expect(segment1.startPointId).toEqual(1);
    expect(segment1.endPointId).toEqual(2);
    expect(segment2.startPointId).toEqual(3);
    expect(segment2.endPointId).toEqual(4);
  });
});
