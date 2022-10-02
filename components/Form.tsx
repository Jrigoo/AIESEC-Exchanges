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

/* 
FALTA
 - Probar registro en ambas plataformas -> CHECK
 - Pagina post registro
 - Mejorar el UI con lo que mande Ingris
 - Pagina del 404

MÁS ADELANTE:
 - Contacto de manager post registro
 */

interface Props {
  className?: string;
}

export const Form: React.FC<Props> = ({ className }) => {
  const [error, setError] = React.useState<Array<string | undefined>>([]);
  const [loader, setLoader] = React.useState(false);
  const { setSuccess, Program } = useData();

  const onSubmit: React.FormEventHandler = async (e) => {
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

    //Si no hay errores de validación procedemos al registro en Expa y Podio
    const register = new Register(formData as IFormData);
    const result = await register.expaRegister();

    //Validamos si hay algún error de EXPA (No lo capta el catch, viene en el response)
    if (result || typeof result === "object") {
      if (Object.keys(result).includes("errors")) {
        let expaError: Array<string> = [];
        for (const err of Object.keys(result.errors)) {
          expaError.push(`${err} ${result.errors[err][0]}`);
        }
        setError(expaError);
        setLoader(false);
        return;
      }
    }

    //Si expa está check, registramos Podio
    register.podioRegister();

    //Una vez podio es exitoso, lanzamos succes page
    setSuccess(true);
    setLoader(false);
    return;
  };

  return (
    <>
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
    </>
  );
};
