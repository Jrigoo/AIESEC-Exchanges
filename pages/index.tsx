import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
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
