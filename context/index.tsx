import React, { SetStateAction, Dispatch } from "react";

interface IContext {
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
}

const defContext = {
  success: false,
  setSuccess: () => {},
};

export const Context = React.createContext<IContext>(defContext);
export const Provider: React.FC = ({ children }) => {
  const [success, setSuccess] = React.useState(false);
  return (
    <Context.Provider
      value={{
        success,
        setSuccess,
      }}
    >
      {children}
    </Context.Provider>
  );
};
