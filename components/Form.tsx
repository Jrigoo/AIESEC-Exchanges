import React from "react";

import { FormItem } from "./FormItem";
import { Dropdown } from "./Dropdown";
import { FileInput } from "./FileInput";
import { Register } from "../utils/Register";
import { Error } from "./Error";
import { Loader } from "./Loader";
import { MultiSelect } from "./MultiSelect";

import { useData } from "../hooks/useContext";
import { Validators } from "../utils/Validators";
import { FORMINPUTS, DROPDOWNITEMS, MULTISELECTITEMS } from "../utils/data";
import { IFormItem } from "../utils/interfaces";

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
  const { setSuccess, Programs } = useData();

  const onSubmit: React.FormEventHandler = async (e): Promise<void> => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const rawData = Object.fromEntries(form.entries());
    const formData = { ...rawData, Programs };
    const errorValidacion = Validators.empty(formData as IFormItem);
    /* Revisamos si no hay errores de validación 
      - Si el error es un string, como el useState recibe solo array, le pasamos: [error]
      - Si el error es un array, pasamos el array
    */
    if (errorValidacion) {
      setLoader(false);
      return setError(
        typeof errorValidacion === "string"
          ? [errorValidacion]
          : errorValidacion
      );
    }

    //Si no hay errores de validación procedemos al registro en Expa
    const register = new Register(formData as IFormItem);
    const expaResponse = await register.expaRegister();

    //Revisamos si no hay errores de expa
    if (Object.keys(expaResponse).includes("errors")) {
      let e = [];
      for (const err of Object.keys(expaResponse.errors)) {
        e.push(`${err} ${expaResponse.errors[err][0]}`);
      }
      setError(e);
      setLoader(false);
      return;
    }

    //Si expa ta check, procedemos a Registrar en Podio. Que debería estar check
    register.podioRegister();
    setSuccess(true); //triggers success page
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

          {/* Programa de Interes */}
          {MULTISELECTITEMS.map((data, idx) => (
            <MultiSelect key={idx} atributos={data} />
          ))}

          {/* Dropdowns */}
          {DROPDOWNITEMS.map((data, idx) => (
            <Dropdown key={idx} atributos={data} />
          ))}

          {/* File input - Solo para Pasantias y profesores */}
          {(Programs.includes("Pasantia") || Programs.includes("Profesor")) && (
            <FileInput />
          )}

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
