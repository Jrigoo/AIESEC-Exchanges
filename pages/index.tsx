import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Provider } from "../context";
import { Main } from "../components/Main";
import { connectMongo } from "../db/connect.db";

const Home: NextPage = () => {
  return (
    <Provider>
      <Head>
        <title>AIESEC en Panamá</title>
        <meta
          name="description"
          content="Form de registro para Pasantias/voluntariados"
        />
        <link rel="icon" href="/AIESEC-icon.png" />
      </Head>

      {/* Navbar */}
      <nav className="w-full px-5 py-3 sticky top-0 left-0 bg-white z-50 opacity-90">
        <a href="http://aiesec.org.pa/">
          <div className="relative w-32 md:w-44">
            <Image
              src="/Images/AIESEC.png"
              alt="AIESEC Logo"
              layout="responsive"
              width={640}
              height={131}
              className="object-contain w-full h-full hover:scale-105 transition-all duration-300"
            />
          </div>
        </a>
      </nav>

      {/* Main */}
      <Main />
    </Provider>
  );
};

//Conectamos a la base de datos en el build
export async function getStaticProps() {
  await connectMongo();
  return {
    props: {},
  };
}

export default Home;
