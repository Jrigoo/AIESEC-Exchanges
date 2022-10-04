import React from "react";

import { FormItem } from "./FormItem";
import { Dropdown } from "./Dropdown";
import { FileInput } from "./FileInput";
import { Register } from "../utils/Register";
import { Error } from "./Error";
import { Loader } from "./Loader";

import { useData } from "../hooks/useContext";
import { Validators } from "../utils/Validators";
import { FORMINPUTS, DROPDOWNITEMS } from "../utils/data";
import { IFormData } from "../utils/interfaces";

interface Props {
  className?: string;
}

export const Form: React.FC<Props> = ({ className }) => {
  const [error, setError] = React.useState<Array<string | undefined>>([]);
  const [loader, setLoader] = React.useState(false);
  const { setSuccess, Program, setUser } = useData();

  const onSubmit: React.FormEventHandler = async (e): Promise<void> => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const formData: unknown = Object.fromEntries(form.entries());
    const validationError = Validators.empty(formData as IFormData);

    /* Revisamos si no hay errores de validación 
      - Si el error es un string, como el useState recibe solo array, le pasamos: [error]
      - Si el error es un array, pasamos el array
    */
    if (validationError.length > 0) {
      setLoader(false);
      setError(validationError);
      return;
    }

    //Si no hay errores de validación procedemos al registro en Expa
    const register = new Register(formData as IFormData);
    const expaResponse = await register.expaRegister();

    //Revisamos si hay errores de EXPA
    if (Object.keys(expaResponse).includes("errors")) {
      let e = [];
      for (const err of Object.keys(expaResponse.errors)) {
        e.push(`${err} ${expaResponse.errors[err][0]}`);
      }
      setError(e);
      setLoader(false);
      return;
    }

    //Si expa ta check, procedemos a Registrar en Podio.
    register.podioRegister();

    setUser(formData as IFormData); //Hacemos un set del usuario
    setSuccess(true); //triggers success page
    setLoader(false);
    return;
  };

  return (
    <main className="p-5 relative min-h-screen bg-white text-zinc-800 grid place-content-center grid-cols-1 xs:grid-cols-[300px] grid-rows-[fit-content] md:grid-cols-[400px]">
      {loader && <Loader />}

      <form
        className={`w-full ${className}`}
        onSubmit={onSubmit}
        onFocus={() => setError([])}
        noValidate
      >
        <h1 className="mb-2 text-3xl font-extrabold tracking-wide md:text-4xl md:mb-4">
          Registrarse
        </h1>
        <h2 className="mb-5 text-xs tracking-wide text-zinc-500 md:text-sm md:mb-7">
          Programa de Pasantías y Voluntariados con AIESEC
        </h2>
        <section className="w-full mb-5">
          {/* Inputs */}
          {FORMINPUTS.map((data, idx: number) => (
            <FormItem key={idx} atributos={data} />
          ))}

          {/* Dropdowns */}
          {DROPDOWNITEMS.map((data, idx) => (
            <Dropdown key={idx} atributos={data} />
          ))}

          {/* File input - Solo para Pasantias y profesores */}
          {(Program === "Pasantia" || Program === "Profesor") && <FileInput />}

          {/* Submit button */}
          <input
            type="submit"
            className={`w-full text-xs my-3 cursor-pointer rounded outline-none px-2 py-3 bg-aiesec text-notWhite font-medium hover:scale-105 transition-all duration-200 md:text-sm md:my-4`}
            onClick={() => setLoader(true)}
          />
          {/* Errores */}
          {error.map((err, idx) => (
            <Error key={idx} error={err as string} />
          ))}
        </section>
      </form>
    </main>
  );
};
