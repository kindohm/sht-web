// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Trip, getTrips } from "@/trips/getTrips";
import { getSegments } from "@/trips/getSegments";
import { points } from "@/trips/points";
import type { NextApiRequest, NextApiResponse } from "next";

const getNumber = (
  input: string | string[] | undefined
): number | undefined => {
  if (!input) {
    return undefined;
  }

  if (Array.isArray(input)) {
    return undefined;
  }
  return +input;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Trip[]>
) {
  const { query } = req;
  const minDailyDistance = getNumber(query.minDailyDistance) ?? 1;
  const maxDailyDistance = getNumber(query.maxDailyDistance) ?? 10;
  const numberOfDays = getNumber(query.numberOfDays) ?? 3;
  const removeDuplicates = query.removeDuplicates === "true";
  const onlyReliableWater = query.onlyReliableWater === "true";

  const segments = getSegments({
    points,
    minDistancePerSegment: minDailyDistance,
    maxDistancePerSegment: maxDailyDistance,
  });

  const trips = getTrips({ segments, numberOfDays, onlyReliableWater });

  const afterDupCheck = trips.reduce((reduced: Trip[], trip: Trip) => {
    if (!removeDuplicates) {
      return reduced.concat(trip);
    }

    if (!reduced.find((r) => r.description === trip.description)) {
      return reduced.concat(trip);
    }
    return reduced;
  }, []);

  res.status(200).json(afterDupCheck);
}
