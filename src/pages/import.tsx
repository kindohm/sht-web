import Head from "next/head";
import { useState } from "react";
import * as Papa from "papaparse";

export default function Import() {
  const [csvInput, setCsvInput] = useState("");

  const convert = () => {
    console.log("input", csvInput);
    const result = Papa.parse(csvInput, { header: true });

    // parsed objects look like this:
    // {
    //   "name": "Northern Terminus",
    //   "isTrailhead": "FALSE",
    //   "northToSouth": "0",
    //   "southToNorth": "297.8",
    //   "size": "",
    //   "water": "",
    //   "distanceToParking": "",
    //   "overnightParking": "unknown"
    // }
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
              <button className="btn btn-primary" onClick={convert}>
                Convert
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
