import React, { SetStateAction, Dispatch } from "react";
import { IFormData } from "../utils/interfaces";

interface IContext {
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  Program: string;
  setProgram: Dispatch<SetStateAction<string>>;
  user: {} | IFormData;
  setUser: Dispatch<SetStateAction<IFormData | {}>>;
}

const defContext = {
  success: false,
  setSuccess: () => {},
  Program: "",
  setProgram: () => {},
  user: {},
  setUser: () => {},
};

export const Context = React.createContext<IContext>(defContext);
export const Provider: React.FC = ({ children }) => {
  const [success, setSuccess] = React.useState(false);
  const [Program, setProgram] = React.useState<string>("");
  const [user, setUser] = React.useState({});
  return (
    <Context.Provider
      value={{
        success,
        setSuccess,
        Program,
        setProgram,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};
