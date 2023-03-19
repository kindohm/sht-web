// export type BasePoint = {
//   name: string;
//   mile: number;
//   type: string;
//   unreliableWater?: boolean;
// };

// export type Campsite = BasePoint & {
//   type: "campsite";
// };

// export type Trailhead = BasePoint & {
//   type: "trailhead";
//   distanceToParking: number;
// };

// export type PlainPoint = Campsite | Trailhead;

// export type PointOfInterest = {
//   name: string;
//   type: "campsite" | "trailhead";
//   northToSouth: number;
//   southToNorth: number;
//   size: "S" | "M" | "L";
//   unreliableWater: boolean;
//   waterNotes: string;
//   distanceToParking: number;
//   overnightParking: "yes" | "no" | "unknown";
// };

// export const pointData: PlainPoint[] = [
//   {
//     name: "Onion River Road Trailhead",
//     mile: 209.1,
//     type: "trailhead",
//     distanceToParking: 0,
//   },
//   {
//     name: "Onion River Campsite",
//     mile: 208.7,
//     type: "campsite",
//   },
//   {
//     name: "East Leveaux Pond Campsite",
//     mile: 207.5,
//     type: "campsite",
//   },
//   {
//     name: "West Leveaux Pond Campsite",
//     mile: 207.4,
//     type: "campsite",
//   },
//   {
//     name: "Springdale Creek Campsite",
//     mile: 205.2,
//     type: "campsite",
//   },
//   {
//     name: "Sawbill Trail Trailhead",
//     mile: 203.6,
//     type: "trailhead",
//     distanceToParking: 0,
//   },
//   {
//     name: "Temperance River Wayside Trailhead",
//     mile: 208.7,
//     type: "trailhead",
//     distanceToParking: 0.2,
//   },
//   {
//     name: "Temperance River Wayside Trailhead @ Temperance River bridge",
//     mile: 199.0,
//     type: "trailhead",
//     distanceToParking: 0.2,
//   },
//   {
//     name: "Temperance River Road Trailhead",
//     mile: 198.2,
//     type: "trailhead",
//     distanceToParking: 0,
//   },
//   {
//     name: "Skou Road Trailhead",
//     mile: 196.3,
//     type: "trailhead",
//     distanceToParking: 1.4,
//   },
//   {
//     name: "South Cross River Campsite",
//     mile: 196.3,
//     type: "campsite",
//   },
//   {
//     name: "North Cross River Campsite",
//     mile: 196.2,
//     type: "campsite",
//   },
//   {
//     name: "The Ledge Campsite",
//     mile: 195.6,
//     type: "campsite",
//   },
//   {
//     name: "The Falls Campsite",
//     mile: 194.8,
//     type: "campsite",
//   },
//   {
//     name: "Fredenberg Creek Campsite",
//     mile: 193.0,
//     type: "campsite",
//   },
//   {
//     name: "Cook County Road 1 Trailhead",
//     mile: 191.4,
//     type: "trailhead",
//     distanceToParking: 0,
//   },
//   {
//     name: "Dyers Creek Campsite",
//     mile: 190.1,
//     type: "campsite",
//   },
//   {
//     name: "Sugarloaf Pond",
//     mile: 186.7,
//     type: "campsite",
//   },
//   {
//     name: "Sugarloaf Road Trailhead",
//     mile: 185.8,
//     type: "trailhead",
//     distanceToParking: 0,
//   },
//   {
//     name: "Crystal Creek",
//     mile: 184.3,
//     type: "campsite",
//   },
//   {
//     name: "East Caribou River",
//     mile: 183.1,
//     type: "campsite",
//   },
//   {
//     name: "Caribou Falls State Wayside Trailhead",
//     mile: 183.1,
//     type: "trailhead",
//     distanceToParking: 0.7,
//   },
//   {
//     name: "West Caribou River",
//     mile: 183.0,
//     type: "campsite",
//   },
//   {
//     name: "Horseshoe Ridge",
//     mile: 180.2,
//     type: "campsite",
//     unreliableWater: true,
//   },
//   {
//     name: "George Crosby Manitou State Park Trailhead",
//     mile: 176.1,
//     type: "trailhead",
//     distanceToParking: 0.5,
//   },
//   {
//     name: "Aspen Knob",
//     mile: 175.2,
//     type: "campsite",
//   },
//   {
//     name: "Blesener Creek",
//     mile: 173.2,
//     type: "campsite",
//   },
//   {
//     name: "East Branch Baptism River",
//     mile: 172.6,
//     type: "campsite",
//   },
//   {
//     name: "Sonju Lake Road Trailhead",
//     mile: 172.1,
//     type: "trailhead",
//     distanceToParking: 0.5,
//   },
//   {
//     name: "Nornth Sonju Lake",
//     mile: 170.8,
//     type: "campsite",
//   },
//   {
//     name: "South Sonju Lake",
//     mile: 170.5,
//     type: "campsite",
//   },
//   {
//     name: "North Egge Lake",
//     mile: 167.5,
//     type: "campsite",
//   },
//   {
//     name: "South Egge Lake",
//     mile: 167.3,
//     type: "campsite",
//   },
//   {
//     name: "Lake County Road 7 Trailhead",
//     mile: 164.8,
//     type: "trailhead",
//     distanceToParking: 0.3,
//   },
// ];
