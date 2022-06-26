import React, { SetStateAction, Dispatch } from "react";

interface IContext {
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  Programs: Array<string>;
  setPrograms: Dispatch<SetStateAction<Array<string>>>;
}

const defContext = {
  success: false,
  setSuccess: () => {},
  Programs: [],
  setPrograms: () => {},
};

export const Context = React.createContext<IContext>(defContext);
export const Provider: React.FC = ({ children }) => {
  const [success, setSuccess] = React.useState(false);
  const [Programs, setPrograms] = React.useState<Array<string>>([]);
  return (
    <Context.Provider
      value={{
        success,
        setSuccess,
        Programs,
        setPrograms,
      }}
    >
      {children}
    </Context.Provider>
  );
};
