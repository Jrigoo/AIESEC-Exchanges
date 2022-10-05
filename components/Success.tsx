import React from "react";
import Image from "next/image";
import { useData } from "../hooks/useContext";
import { IFormData } from "../utils/interfaces";
import {
  getRandomManager,
  getWhatsappMessage,
  IManager,
} from "../utils/Network";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

/* const user: IFormData = {
  "First Name": "Juan",
  "Last Name": "Riquelme",
  "Podio Id": 222,
  Background: "Ingeniería",
  Edad: 22,
  Email: "pk@gmail.com",
  Estudios: "Bachiller",
  Ingles: "A1 - Principiante",
  Password: "123123",
  Phone: "63784894",
  Program: "Pasantia",
  Referral: "Amig@",
  Universidad: "Universidad Interamericana de Panamá (UIP)",
}; */

export const Success = () => {
  /* 
    Una vez alguien se registra, teniendo su LC la idea es mandarle el contacto del manager que puede contactar:
    [1] Guardamos la info del cliente en un state llamado user
    [2] Con la universidad obtenemos el nombre del LC
    [3] Teniendo el nombre del LC, escogemos de forma aleatoria al encargado de este EP
    [4] Una vez este encargado es escogido, se guarda en mongo db así el proximo SU elige a otro manager
    [5] Una vez todos los managers son escogidos, se borran todos de la base de datos y se escoge uno nuevo aleatoria
  */
  const [manager, setManager] = React.useState<IManager>();
  const { user, setLoading } = useData();

  React.useEffect(() => {
    if (user) {
      getRandomManager(user as IFormData)
        .then((newManager) => {
          setManager(newManager);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [user, setLoading]);

  return (
    <main className="min-h-screen bg-white text-zinc-800 grid place-content-center grid-cols-1 sm:grid-cols-[repeat(2,50%)] lg:grid-rows-[100vh]">
      {/* TODA LA INFORMACIÓN */}
      <div className="h-full self-center px-4 xs:p-10 sm:pt-10 sm:p-5 md:p-14">
        <section className="text-center sm:text-left">
          {/* AIESEC LOGO */}
          <div className="relative mb-10 w-32 xs:w-44 md:w-56 2xl:w-72">
            <Image
              src="/Images/AIESEC.png"
              alt="AIESEC Logo"
              layout="responsive"
              width={640}
              height={131}
              className="object-contain"
              loading="lazy"
            />
          </div>

          {/* Title */}
          <h1 className="mb-2 font-extrabold text-4xl md:text-5xl 2xl:text-6xl">
            ¡Te has registrado de manera exitosa!
          </h1>
          <h2 className="mb-2 font-normal text-base md:text-lg 2xl:text-xl">
            Ingresa a tu cuenta en{" "}
            <a
              href="https://auth.aiesec.org/users/sign_in?country=#login"
              className="text-aiesec font-medium"
            >
              aiesec.org
            </a>
          </h2>
        </section>
        <hr />

        {/* Contact Info. - Si existe un user y un manager*/}
        {user && manager ? (
          <section className="py-5 text-left text-sm md:text-base 2xl:text-lg">
            <p className="mb-5">
              Para <b>más información</b>, puedes contactarte con{" "}
              {manager["genre"] === "female"
                ? "una de nuestras asesoras"
                : "uno de nuestros asesores"}
              :
            </p>

            <h1 className="text-3xl font-bold md:text-4xl 2xl:text-5xl">
              {manager["name"]}
            </h1>
            <h2 className="pt-2 font-semibold">
              {manager["genre"] === "female" ? "Encargada" : "Encargado"} de
              Intercambios en el extranjero
            </h2>

            {/* Icons - Contact Info. */}
            <div className="py-1">
              <div className="flex py-1">
                <FontAwesomeIcon icon={faPhone} className="h-5 mr-3" />
                <p>+507 {manager["phone"]}</p>
              </div>

              <div className="flex py-1">
                <FontAwesomeIcon icon={faWhatsapp} className="h-5 mr-3" />
                <p>
                  Puedes contactar por este{" "}
                  <a
                    href={getWhatsappMessage(user, manager)}
                    className="text-aiesec"
                  >
                    link
                  </a>{" "}
                  de whatsapp
                </p>
              </div>

              <div className="flex py-1">
                <FontAwesomeIcon icon={faEnvelope} className="h-5 mr-3" />
                <p>+507 {manager["phone"]}</p>
              </div>
            </div>
          </section>
        ) : (
          <p className="py-5 text-center text-base sm:text-left md:text-lg 2xl:text-xl">
            Debes ser contactad@ por whatsapp en las próximas 48 horas por uno
            de nuestros asesores
          </p>
        )}
      </div>

      {/* Image */}
      <div className="relative h-full hidden sm:block">
        <Image
          src="/Images/Submit-Photo.jpg"
          layout="fill"
          alt="Professional image"
          className="object-cover"
          loading="lazy"
        />
      </div>
    </main>
  );
};
