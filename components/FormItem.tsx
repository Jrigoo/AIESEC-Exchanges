import React from "react";
import { Error } from "./Error";
import { IAtributos } from "../utils/interfaces";
import { Validators } from "../utils/Validators";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

interface Props {
  atributos: IAtributos;
}

export const FormItem: React.FC<Props> = ({ atributos }) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<Array<string | undefined>>([]);
  const [eye, setEye] = React.useState(true);

  function validate() {
    if (atributos.name == "Email") {
      setError([Validators.email(value)]);
    }
    if (atributos.name == "Password") {
      setError(Validators.password(value));
    }
    if (atributos.name == "Phone") {
      setError([Validators.phone(value)]);
    }
  }

  return (
    <div className="w-full mb-3 text-xs md:text-sm md:mb-5 relative">
      {atributos.titulo && <p>{atributos.titulo}</p>}
      <div className="relative bg-cyan-100 rounded flex justify-between items-center">
        <input
          type={
            atributos.tipo === "password"
              ? eye
                ? "password"
                : "text"
              : atributos.tipo
          }
          className={`w-full rounded outline-none px-2 py-3 bg-cyan-100 border border-zinc-100  focus:border-aiesec transition-all duration-300  ${
            atributos.className
          } ${error.length > 1 && "border-red-600"}`}
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
        {/* Solo para el password */}
        {atributos.name == "Password" && (
          <div className="absolute right-3">
            {eye ? (
              <EyeOffIcon
                className="w-3 h-3 md:h-5 md:w-5 text-zinc-800 cursor-pointer"
                onClick={() => setEye(false)}
              />
            ) : (
              <EyeIcon
                className="w-3 h-3 md:h-5 md:w-5 text-zinc-800 cursor-pointer"
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
