import Head from "next/head";
import { useState } from "react";
import * as Papa from "papaparse";
import { PointOfInterest } from "@/trips/points";

type ParsedRow = {
  name: string;
  isTrailhead: string;
  northToSouth: string;
  southToNorth: string;
  size: string;
  water: string;
  distanceToParking: string;
  overnightParking: string;
};

const convert = (rows: ParsedRow[]): PointOfInterest[] => {
  return rows.map((row, i) => {
    return {
      id: rows.length - 1 - i,
      name: row.name,
      northToSouth: +row.northToSouth,
      southToNorth: +row.southToNorth,
      type: row.isTrailhead === "TRUE" ? "trailhead" : "campsite",
      size:
        row.size.toLowerCase() === "s"
          ? "S"
          : row.size.toLowerCase() === "l"
          ? "L"
          : "M",
      unreliableWater: row.water && row.water.trim() !== "" ? true : false,
      waterNotes: row.water,
      distanceToParking: +row.distanceToParking,
      overnightParking:
        row.overnightParking === "yes"
          ? "yes"
          : row.overnightParking === "no"
          ? "no"
          : "unknown",
    };
  });
};

export default function Import({ whereAmI }: { whereAmI: string }) {
  const [csvInput, setCsvInput] = useState("");
  const [output, setOutput] = useState("");

  const convertClick = () => {
    const result = Papa.parse(csvInput, { header: true });

    // @ts-expect-error its ok
    const data: ParsedRow[] = result.data;
    const converted = convert(data);
    setOutput(JSON.stringify(converted, null, 2));
  };

  return (
    <>
      <Head>
        <title>Import Data</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="container">
          <h1>Import SHT Data</h1>
          <div>
            <div className="mb-3">
              <label htmlFor="csvInput" className="form-label">
                CSV
              </label>
              <textarea
                className="form-control"
                id="csvInput"
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={convertClick}>
                Convert
              </button>
            </div>
            <div className="mb-3">
              <label htmlFor="csvInput" className="form-label">
                Output:
              </label>
              <textarea
                className="form-control"
                id="output"
                value={output}
                readOnly={true}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const isLocal = process.env.NODE_ENV === "development";
  return {
    props: {
      isLocal,
    },
    notFound: !isLocal,
  };
}
