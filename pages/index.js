import { useEffect, useState } from "react";
import Head from "next/head";
import clientPromise from "../lib/mongodb";

export default function Home({ isConnected }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const results = await fetch("/api/list");
        const resultsJson = await results.json();
        // Ensure that the fetched data is an array
        if (Array.isArray(resultsJson)) {
          setRestaurants(resultsJson);
        } else {
          console.error("Fetched data is not an array:", resultsJson);
          setRestaurants([]); // Reset to an empty array if the data is not as expected
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setRestaurants([]); // Reset to an empty array in case of error
      }
    })();
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
         WEEE <a href="https://nextjs.org">PEPE!</a>
        </h1>

        <div className="grid">
          {restaurants.map((restaurant) => (
            <div className="card" key={restaurant._id}>
              <h2>{restaurant.name}</h2>
              <p>{restaurant.cuisine}</p>
            </div>
          ))}
        </div>
      </main>
      
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error("MongoDB connection error:", e);
    return {
      props: { isConnected: false },
    };
  }
}
