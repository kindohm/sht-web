import { useRouter } from "next/router";
import { Trip as TripType } from "@/trips/getTrips";
import { useEffect, useState } from "react";
import { Trip } from "./Trip";

export const FindTrip = () => {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const {
      numberOfDays: numberOfDaysQuery,
      maxDailyDistance: maxDailyDistanceQuery,
      minDailyDistance: minDailyDistanceQuery,
      removeDuplicates: removeDuplicatesQuery,
      onlyReliableWater: onlyReliableWaterQuery,
      onlyOvernightParking: onlyOvernightParkingQuery,
    } = query;

    numberOfDaysQuery !== undefined && setNumberOfDays(+numberOfDaysQuery);
    maxDailyDistanceQuery !== undefined &&
      setMaxDailyDistance(+maxDailyDistanceQuery);
    minDailyDistanceQuery !== undefined &&
      setMinDailyDistance(+minDailyDistanceQuery);
    removeDuplicatesQuery !== undefined &&
      setRemoveDuplicates(removeDuplicatesQuery === "true");
    onlyReliableWaterQuery !== undefined &&
      setOnlyReliableWater(onlyReliableWaterQuery === "true");
    onlyOvernightParkingQuery !== undefined &&
      setOnlyOvernightParking(onlyOvernightParkingQuery === "true");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const [searching, setSearching] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(3);
  const [maxDailyDistance, setMaxDailyDistance] = useState(10);
  const [minDailyDistance, setMinDailyDistance] = useState(3);
  const [trips, setTrips] = useState<TripType[] | null>(null);
  const [removeDuplicates, setRemoveDuplicates] = useState<boolean>(true);
  const [onlyReliableWater, setOnlyReliableWater] = useState<boolean>(false);
  const [onlyOvernightParking, setOnlyOvernightParking] =
    useState<boolean>(true);
  const [shareUrl, setShareUrl] = useState<string>("");

  const getQuery = () => {
    return `?numberOfDays=${numberOfDays.toString()}&maxDailyDistance=${maxDailyDistance}&minDailyDistance=${minDailyDistance}&removeDuplicates=${removeDuplicates}&onlyReliableWater=${onlyReliableWater}&onlyOvernightParking=${onlyOvernightParking}`;
  };

  const getShareUrl = () => {
    const path = window.location.href.split("?")[0];
    return `${path}${getQuery()}`;
  };

  useEffect(() => {
    setShareUrl(getShareUrl());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    numberOfDays,
    maxDailyDistance,
    minDailyDistance,
    removeDuplicates,
    onlyReliableWater,
    onlyOvernightParking,
  ]);

  const findTripsClick = async () => {
    try {
      setSearching(true);
      setTrips(null);
      const resp = await fetch(`/api/trips${getQuery()}`);
      const data = await resp.json();
      setTrips(data);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="numberOfDays" className="form-label">
          Hiking Days:
        </label>
        <input
          type="number"
          className="form-control"
          id="numberOfDays"
          placeholder="3"
          value={numberOfDays}
          min={0}
          onChange={(e) => setNumberOfDays(+e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="maxDailyDistance" className="form-label">
          Max Daily Distance:
        </label>
        <input
          type="number"
          className="form-control"
          id="maxDailyDistance"
          placeholder="10"
          value={maxDailyDistance}
          min={0}
          onChange={(e) => setMaxDailyDistance(+e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="minDailyDistance" className="form-label">
          Min Daily Distance:
        </label>
        <input
          type="number"
          className="form-control"
          id="minDailyDistance"
          placeholder="3"
          value={minDailyDistance}
          min={0}
          onChange={(e) => setMinDailyDistance(+e.target.value)}
        />
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="removeDuplicates"
          checked={removeDuplicates}
          onChange={(e) => setRemoveDuplicates(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="removeDuplicates">
          Remove similar trips from the same trailheads
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="onlyReliableWater"
          checked={onlyReliableWater}
          onChange={(e) => setOnlyReliableWater(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="onlyReliableWater">
          Only show trips with 100% reliable water
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="onlyOvernightParking"
          checked={onlyOvernightParking}
          onChange={(e) => setOnlyOvernightParking(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="onlyOvernightParking">
          Only show trailheads with overnight parking
        </label>
      </div>

      <div className="mt-3">
        <button
          className="btn btn-primary"
          onClick={findTripsClick}
          disabled={searching}
        >
          {searching ? "Searching..." : "Find Trips"}
        </button>
      </div>
      {!searching && trips !== null ? (
        <div className="mt-3">
          <div className="row">
            <div className="col-8">
              <h3>Found {trips.length} trips.</h3>
            </div>
            <div className="col">
              <input
                readOnly={true}
                value={shareUrl}
                className="form-control form-control-sm"
                type="text"
              />
            </div>
          </div>
          {trips.map((trip) => {
            return <Trip key={trip.id} trip={trip} />;
          })}
        </div>
      ) : null}
    </div>
  );
};
