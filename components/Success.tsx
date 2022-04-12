import React from "react";

export const Success = () => {
  return (
    <main className="p-5 min-h-screen bg-white text-zinc-800 grid place-content-center grid-cols-1 xs:grid-cols-[300px]">
      <h1 className="mb-2 text-3xl text-center font-extrabold tracking-wide">
        ¡Te has <b>registrado de manera exitosa!</b>
      </h1>
      <h2 className="text-center mb-2 text-base font-medium">
        Puedes ingresar a tu cuenta en <br />
        <a
          href="https://auth.aiesec.org/users/sign_in?country=#login"
          className="text-aiesec underline font-medium"
        >
          aiesec.org
        </a>
      </h2>
      <p className="text-center text-sm font-light">
        Debes ser contactad@ en las proximas 48h
      </p>
    </main>
  );
};
