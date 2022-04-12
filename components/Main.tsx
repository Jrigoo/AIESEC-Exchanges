import React from "react";
import { Form } from "../components/Form";
import { Success } from "../components/Success";
import { useData } from "../hooks/useContext";

export const Main = () => {
  const { success } = useData();
  return (
    <>
      {success ? (
        <Success />
      ) : (
        <main className="p-5 relative min-h-screen bg-white text-zinc-800 grid place-content-center grid-cols-1 xs:grid-cols-[300px] grid-rows-[fit-content] md:grid-cols-[400px]">
          <Form />
        </main>
      )}
    </>
  );
};
