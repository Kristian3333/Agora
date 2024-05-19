import {useEffect, useState} from "react"
import Head from "next/head";
import clientPromise from "../lib/mongodb";

export default function Home({ isConnected }) {
  const [restaurants, setRestaurants] = useState([])
  useEffect(() => {
    (async () => {
      const results = await fetch("/api/list");
      const resultsJson = await results.json();
      setRestaurants(resultsJson);
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
          Welcome to <a href="https://nextjs.org">Next.js with MongoDB!</a>
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
};

