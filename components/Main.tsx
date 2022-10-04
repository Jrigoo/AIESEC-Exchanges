import React from "react";
import Image from "next/image";
import { Form } from "../components/Form";
import { Success } from "../components/Success";
import { useData } from "../hooks/useContext";

export const Main = () => {
  const { success } = useData();
  return (
    <>
      {!success ? (
        <Success />
      ) : (
        <>
          <nav className="w-full px-5 py-3 sticky top-0 left-0 bg-white z-50 opacity-90">
            <div className="relative left-0 w-32 md:w-44">
              <Image
                src="/Images/AIESEC.png"
                alt="AIESEC Logo"
                layout="responsive"
                width={640}
                height={131}
                className="object-contain w-full h-full"
              />
            </div>
          </nav>

          <Form />
        </>
      )}
    </>
  );
};
