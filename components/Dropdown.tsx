import React from "react";
import { useData } from "../hooks/useContext";

interface Props {
  atributos: {
    className?: string;
    titulo: string;
    placeholder: string;
    name: string;
    data: Array<string>;
  };
}

/* 
To DOs
- Cambiar de Programas a Program (string)
- Revisar el código y mejorar estructura

*/

export const Dropdown: React.FC<Props> = ({ atributos }) => {
  const [filter, setFilter] = React.useState(atributos.data);
  const [searchValue, setSearchValue] = React.useState("");
  const [showOptions, setShowOptions] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  //Si es el dropdown de programas
  const { setProgram } = useData();

  React.useEffect(() => {
    setFilter(
      atributos.data.filter((v) =>
        v.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, atributos.data]);

  return (
    <div className="w-full pb-3 md:pb-5">
      {atributos.titulo && <p>{atributos.titulo}</p>}
      <input
        className="w-full bg-blue-100 rounded outline-none px-2 py-3 border border-zinc-100 focus:border-aiesec transition-all duration-300 peer"
        placeholder={atributos.placeholder}
        value={searchValue}
        name={atributos.name}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => {
          setShowOptions(true);
          setSearchValue("");
          setFocused(true);

          //Si es un drop down de programas
          if (atributos.name === "Program") {
            setProgram("");
          }
        }}
        onBlur={() => {
          setFocused(false);
          return filter.length < 1 && setSearchValue("");
        }}
      />
      {/* Options */}
      <div className="relative">
        {showOptions && (
          <div
            className={`w-full absolute top-0 left-0 p-1 max-h-32 md:max-h-44 rounded overflow-y-scroll overflow-x-hidden shadow-md bg-notWhite block ${
              focused && "z-50"
            }`}
          >
            <div className="w-full flex flex-col ">
              {filter.map((value: string, idx: number) => (
                <button
                  key={idx}
                  className="text-left p-1 hover:bg-blue-100"
                  onClick={() => {
                    setSearchValue(value);
                    setShowOptions(false);

                    //Si es un drop down de programas
                    if (atributos.name === "Program") {
                      setProgram(value);
                    }
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
