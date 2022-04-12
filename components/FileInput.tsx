import React from "react";
import { DocumentAddIcon, CheckIcon } from "@heroicons/react/solid";
import { Error } from "./Error";

export const FileInput = () => {
  const [upload, setUpload] = React.useState(false);
  const [error, setError] = React.useState("");
  return (
    <div className="w-full flex-col text-xs mb-3 flex justify-center md:text-sm md:mb-4">
      <input
        className="hidden"
        type="file"
        id="file"
        name="CV"
        onClick={() => setError("")}
        onChange={(e) => {
          setUpload(false);
          if (
            e.target.files &&
            e.target.files[0] &&
            e.target.files[0].type !== "application/pdf"
          ) {
            setError("- La hoja de vida o CV debe estar en formato .pdf");
            return;
          }
          setUpload(true);
        }}
        accept=".pdf"
      />
      <h2 className="pb-3 md:pb-4">Ingresa tu hoja de vida (pdf)</h2>
      <label
        htmlFor="file"
        className={`w-[80px] flex justify-between items-center border p-3 rounded border-zinc-300 transition-all duration-300 hover:scale-105 cursor-pointer group ${
          upload
            ? "text-notWhite bg-aiesec"
            : "hover:text-notWhite hover:bg-aiesec focus:text-notWhite focus:bg-aiesec"
        }`}
      >
        CV
        {upload ? (
          <CheckIcon className="w-5 text-notWhite transition-all duration-300" />
        ) : (
          <DocumentAddIcon className="w-5 text-zinc-300 group-hover:text-notWhite transition-all duration-300" />
        )}
      </label>
      <Error error={error} />
    </div>
  );
};
