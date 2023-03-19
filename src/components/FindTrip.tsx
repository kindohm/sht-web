import { Trip } from "@/trips/findTrips";
import { useState } from "react";

export const FindTrip = () => {
  const [searching, setSearching] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(3);
  const [maxDailyDistance, setMaxDailyDistance] = useState(10);
  const [minDailyDistance, setMinDailyDistance] = useState(3);
  const [trips, setTrips] = useState<Trip[] | null>(null);
  const [removeDuplicates, setRemoveDuplicates] = useState<boolean>(false);

  const findTripsClick = async () => {
    try {
      setSearching(true);
      setTrips([]);
      const resp = await fetch(
        `/api/trips?numberOfDays=${numberOfDays.toString()}&maxDailyDistance=${maxDailyDistance}&minDailyDistance=${minDailyDistance}&removeDuplicates=${removeDuplicates}`
      );
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

      <div className="mt-3">
        <button
          className="btn btn-primary"
          onClick={findTripsClick}
          disabled={searching}
        >
          Find Trips
        </button>
      </div>
      {trips !== null ? (
        <div className="mt-3">
          <h3>Found {trips.length} trips.</h3>
          {trips.map((trip) => {
            return (
              <div key={trip.id} className="mt-4 mb-5">
                <h4>
                  {trip.description} ({trip.totalDistance.toFixed(1)} miles)
                </h4>
                <table className="table table-condensed">
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Miles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trip.segments.map((segment, i) => {
                      return (
                        <tr key={segment.id}>
                          <td style={{ width: "50px" }}>
                            {(i + 1).toString()}
                          </td>
                          <td style={{ width: "400px" }}>
                            {segment.points[0].name}{" "}
                            {segment.points[0].type === "trailhead"
                              ? `(${segment.points[0].distanceToParking.toFixed(
                                  1
                                )} mi)`
                              : ""}
                            {segment.points[0].unreliableWater ? "🏜️" : ""}
                          </td>
                          <td style={{ width: "400px" }}>
                            {segment.points[segment.points.length - 1].name}{" "}
                            {segment.points[segment.points.length - 1].type ===
                            "trailhead"
                              ? `(${segment.points[
                                  segment.points.length - 1
                                ].distanceToParking.toFixed(1)} mi)`
                              : ""}
                            {segment.points[segment.points.length - 1]
                              .unreliableWater
                              ? "🏜️"
                              : ""}
                          </td>
                          <td style={{ margin: "auto" }}>
                            {segment.distance.toFixed(1)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};