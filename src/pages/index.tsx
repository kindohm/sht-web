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
      <main>
        <div className="container">
          <h1>SHT Trip Finder</h1>
          <FindTrip />
        </div>
      </main>
    </>
  );
}
