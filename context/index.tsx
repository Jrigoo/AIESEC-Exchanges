import React, { SetStateAction, Dispatch } from "react";
import { IFormData } from "../utils/interfaces";

interface IContext {
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  Program: string;
  setProgram: Dispatch<SetStateAction<string>>;
  user: undefined | IFormData;
  setUser: Dispatch<SetStateAction<undefined | IFormData>>;
}

const defContext = {
  success: false,
  setSuccess: () => {},
  loading: false,
  setLoading: () => {},
  Program: "",
  setProgram: () => {},
  user: undefined,
  setUser: () => {},
};

export const Context = React.createContext<IContext>(defContext);
export const Provider: React.FC = ({ children }) => {
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [Program, setProgram] = React.useState<string>("");
  const [user, setUser] = React.useState<IFormData | undefined>();

  return (
    <Context.Provider
      value={{
        success,
        setSuccess,
        loading,
        setLoading,
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
