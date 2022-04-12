import React from "react";

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
BUG:
- Que pasa si alguien no selecciona algo directamente del dropdown. Buscar la manera de validar que solo pueda seleccionar del dropdown

FIX:
- Se hace una validación al final

*/

export const Dropdown: React.FC<Props> = ({ atributos }) => {
  const [filter, setFilter] = React.useState(atributos.data);
  const [searchValue, setSearchValue] = React.useState("");
  const [showOptions, setShowOptions] = React.useState(false);

  React.useEffect(() => {
    setFilter(
      atributos.data.filter((v) =>
        v.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, atributos.data]);

  return (
    <div className="w-full pb-3 text-xs md:text-sm md:pb-5">
      {atributos.titulo && <p>{atributos.titulo}</p>}
      <input
        className="w-full bg-cyan-100 rounded outline-none px-2 py-3 border border-zinc-100 focus:border-aiesec transition-all duration-300"
        placeholder={atributos.placeholder}
        value={searchValue}
        name={atributos.name}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => {
          setShowOptions(true);
          setSearchValue("");
        }}
        onBlur={() => filter.length < 1 && setSearchValue("")}
      />
      {/* Options */}
      {showOptions && (
        <div
          className={`w-full max-h-28 rounded overflow-y-scroll overflow-x-hidden shadow bg-notWhite block`}
        >
          <div className="w-full flex flex-col m-1">
            {filter.map((d: string, idx: number) => (
              <button
                key={idx}
                className="text-left p-1"
                onClick={() => {
                  setSearchValue(d);
                  setShowOptions(false);
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
