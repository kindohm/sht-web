import { Trip as TripType } from "@/trips/getTrips";

export const Trip = ({ trip }: { trip: TripType }) => {
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
                <td style={{ width: "50px" }}>{(i + 1).toString()}</td>
                <td style={{ width: "400px" }}>
                  {segment.startPoint.name}{" "}
                  {segment.startPoint.type === "trailhead"
                    ? `(${segment.startPoint.distanceToParking.toFixed(1)} mi)`
                    : ""}
                  {segment.startPoint.overnightParking === "yes" && " 🚗"}
                  {segment.startPoint.overnightParking === "no" && " ⛔"}
                  {segment.startPoint.type === "campsite"
                    ? segment.startPoint.unreliableWater
                      ? "🏜️"
                      : "💧"
                    : ""}
                </td>
                <td style={{ width: "400px" }}>
                  {segment.endPoint.name}{" "}
                  {segment.endPoint.type === "trailhead"
                    ? `(${segment.endPoint.distanceToParking.toFixed(1)} mi)`
                    : ""}
                  {segment.endPoint.overnightParking === "yes" && " 🚗"}
                  {segment.endPoint.overnightParking === "no" && "⛔"}
                  {segment.endPoint.type === "campsite"
                    ? segment.endPoint.unreliableWater
                      ? "🏜️"
                      : "💧"
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
};
