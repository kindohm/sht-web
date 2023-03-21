import { FindTrip } from "@/components/FindTrip";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Superior Hiking Trail Trip Finder</title>
        <meta
          name="description"
          content="Find multi-day trips on the trail that fit your style."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mt-3">
        <main>
          <h1>
            <Link
              href="/"
              className="link-dark"
              style={{ textDecoration: "none" }}
            >
              Superior Hiking Trail Trip Finder
            </Link>
          </h1>
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
