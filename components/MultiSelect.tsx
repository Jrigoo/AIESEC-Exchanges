import React from "react";
import { Info } from "./Info";
import { XIcon } from "@heroicons/react/outline";
import { useData } from "../hooks/useContext";

interface Props {
  atributos: {
    className?: string;
    titulo: string;
    placeholder: string;
    data: Array<string>;
    info?: string;
  };
}

export const MultiSelect: React.FC<Props> = ({ atributos }) => {
  const [options, setOptions] = React.useState(atributos.data);
  const { Programs, setPrograms } = useData();

  function addSelected(val: string) {
    setPrograms([...Programs, val]);
    setOptions(options.filter((o) => o !== val));
  }

  function removeSelected(val: string) {
    setOptions([...options, val]);
    setPrograms(Programs.filter((s) => s !== val));
  }

  return (
    <div className="w-full pb-3 text-xs md:text-sm md:pb-5 relative">
      {atributos.info && <Info info={atributos.info} />}
      {atributos.titulo && <p>{atributos.titulo}</p>}
      <button
        className="w-full min-h-12 flex items-center bg-blue-100 rounded outline-none py-3 border border-zinc-100 focus:border-aiesec transition-all duration-300 group cursor-default relative"
        type={"reset"}
      >
        {/* Placeholder */}
        {Programs.length === 0 && (
          <p className="w-full px-2 text-left block text-gray-400">
            {atributos.placeholder}
          </p>
        )}

        {/* Selected options */}
        {Programs.length > 0 && (
          <div className="w-full bg-blue-100 flex items-center flex-wrap gap-1">
            {Programs.map((val, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center bg-aiesec rounded px-2 py-1 ml-2 text-zinc-100"
              >
                <p className="">{val}</p>
                <XIcon
                  className="ml-2 w-4 h-4 cursor-pointer"
                  onClick={() => removeSelected(val)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Options */}
        {options.length > 0 && (
          <div className="w-full bg-white top-12 absolute z-50 h-0 p-1 invisible opacity-0 group-focus:h-fit group-focus:visible group-focus:opacity-100 flex-col items-start border rounded-lg">
            {options.map((option: string, idx: number) => (
              <p
                key={idx}
                className="w-full text-left p-1 hover:bg-blue-100"
                onClick={() => addSelected(option)}
              >
                {option}
              </p>
            ))}
          </div>
        )}
      </button>
    </div>
  );
};
