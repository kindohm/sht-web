import { FindTrip } from "@/components/FindTrip";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>SHT Trip Finder</title>
        <meta name="description" content="SHT Trip Finder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <main>
          <h1>SHT Trip Finder</h1>
          <FindTrip />
        </main>
        <footer className="mt-5">
          <small>
            &copy; 2023 Mike Hodnick. Unauthorized duplication may result in
            sudden death or dismemberment.
          </small>
        </footer>
      </div>
    </>
  );
}
