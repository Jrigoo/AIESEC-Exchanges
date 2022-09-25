import React, { SetStateAction, Dispatch } from "react";

interface IContext {
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  Program: string;
  setProgram: Dispatch<SetStateAction<string>>;
}

const defContext = {
  success: false,
  setSuccess: () => {},
  Program: "",
  setProgram: () => {},
};

export const Context = React.createContext<IContext>(defContext);
export const Provider: React.FC = ({ children }) => {
  const [success, setSuccess] = React.useState(false);
  const [Program, setProgram] = React.useState<string>("");
  return (
    <Context.Provider
      value={{
        success,
        setSuccess,
        Program,
        setProgram,
      }}
    >
      {children}
    </Context.Provider>
  );
};
