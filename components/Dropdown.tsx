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

export const Dropdown: React.FC<Props> = ({ atributos }) => {
  const [filter, setFilter] = React.useState(atributos.data);
  const [searchValue, setSearchValue] = React.useState("");
  const [showOptions, setShowOptions] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

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
        className="w-full bg-blue-100 rounded outline-none px-2 py-3 border border-zinc-100 focus:border-aiesec transition-all duration-300 peer"
        placeholder={atributos.placeholder}
        value={searchValue}
        name={atributos.name}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => {
          setShowOptions(true);
          setSearchValue("");
          setFocused(true);
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
              {filter.map((d: string, idx: number) => (
                <button
                  key={idx}
                  className="text-left p-1 hover:bg-blue-100"
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
    </div>
  );
};
