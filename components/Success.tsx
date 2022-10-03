import React from "react";
import { useData } from "../hooks/useContext";
import Image from "next/image";
import { IFormData } from "../utils/interfaces";
import { getRandomManager, IManager } from "../utils/Network";

export const Success = () => {
  /* 
    Una vez alguien se registra, teniendo su LC la idea es mandarle al EP manager que debe contactar
    [1] Guardamos la info del cliente en un state llamado user
    [2] Accedemos a su segmentación y obtenemos el nombre del LC
    [3] Teniendo el nombre del LC, escogemos de forma aleatoria al encargado de este EP
  */
  const [manager, setManager] = React.useState<IManager>();
  const { user } = useData();

  React.useEffect(() => {
    if (user) {
      const randomManager = getRandomManager(user as IFormData);
      setManager(randomManager);
    }
  }, [user]);

  return (
    <main className="p-5 min-h-screen bg-white text-zinc-800 grid place-content-center grid-cols-1 xs:grid-cols-[400px]">
      <h1 className="mb-2 text-3xl text-center font-extrabold tracking-wide">
        ¡Te has <b>registrado de manera exitosa!</b>
      </h1>
      <h2 className="text-center mb-2 text-base font-normal">
        Ingresa a tu cuenta en{" "}
        <a
          href="https://auth.aiesec.org/users/sign_in?country=#login"
          className="text-aiesec underline font-medium"
        >
          aiesec.org
        </a>
      </h2>

      {user && manager ? (
        /* Esto es para obtener el siguiente mensaje: Para más información 
        puedes contactarte con xxxx (uno de nuestros asesores) al 507 6xxx xxx 
        o mediante el siguiente link: wa.me/ */
        <p className="text-center text-sm font-light">
          Para más información puedes contactarte con{" "}
          <b className="font-bold">{manager["name"]}</b> (
          {manager["genre"] === "male"
            ? "uno de nuestros asesores"
            : "una de nuestras asesoras"}
          ) al <b className="font-bold">+507 {manager["phone"]}</b> o mediante
          el siguiente{" "}
          <a
            href={`https://wa.me/507${manager["phone"]}?text=Hola ${
              manager["name"]
            }, me llamo ${user["First Name"]} y me acabo de registrar para ${
              user["Program"] === "Pasantia"
                ? "tomar una pasantía"
                : user["Program"] === "Profesor"
                ? "ser profesor"
                : "tomar un voluntariado"
            } con AIESEC. Me gustaría saber más información`}
            className="text-aiesec font bold underline"
          >
            link
          </a>{" "}
          de whatsapp
        </p>
      ) : (
        <p className="text-center text-sm font-light">
          Debes ser contactad@ en las próximas 48h
        </p>
      )}
    </main>
  );
};
