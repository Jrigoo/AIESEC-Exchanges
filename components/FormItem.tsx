import React from "react";
import { Error } from "./Error";
import { IAtributos } from "../utils/interfaces";
import { Validators } from "../utils/Validators";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { Info } from "../components/Info";

interface Props {
  atributos: IAtributos;
}

export const FormItem: React.FC<Props> = ({ atributos }) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<Array<string | undefined>>([]);
  const [eye, setEye] = React.useState(true);

  function validate() {
    if (atributos.name == "Email") {
      setError(Validators.email(value));
    }
    if (atributos.name == "Password") {
      setError(Validators.password(value));
    }
    if (atributos.name == "Phone") {
      setError(Validators.phone(value));
    }
  }

  return (
    <div className="w-full mb-3 text-xs md:text-sm md:mb-5 relative">
      {atributos.titulo && <p className="block">{atributos.titulo}</p>}

      {/* Solo para el password - Info*/}
      {atributos.info && <Info info={atributos.info} />}

      <div className="relative bg-blue-100 rounded flex justify-between items-center">
        <input
          type={
            atributos.tipo === "password"
              ? eye
                ? "password"
                : "text"
              : atributos.tipo
          }
          className={`w-full rounded outline-none px-2 py-3 bg-blue-100 border border-zinc-100  focus:border-aiesec transition-all duration-300 placeholder-gray-400  ${
            atributos.className
          } ${error.length > 0 && "border-red-600"}`}
          placeholder={atributos.placeholder}
          name={atributos.name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClick={() => {
            setError([]);
          }}
          onBlur={validate}
          formNoValidate
        />
        {/* Solo para el password - Ojo*/}
        {atributos.name == "Password" && (
          <div className="absolute right-3">
            {eye ? (
              <EyeOffIcon
                className="w-4 h-4 md:h-5 md:w-5 text-zinc-800 cursor-pointer"
                onClick={() => setEye(false)}
              />
            ) : (
              <EyeIcon
                className="w-4 h-4 md:h-5 md:w-5 text-zinc-800 cursor-pointer"
                onClick={() => setEye(true)}
              />
            )}
          </div>
        )}
      </div>

      {error.map((err, idx) => (
        <Error key={idx} error={err as string} />
      ))}
    </div>
  );
};
