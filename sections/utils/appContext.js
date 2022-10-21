import { useState, createContext, useContext } from "react";

export const AppContext = createContext({});
export const AppProvider = (props) => {
  const [appState, setAppState] = useState({});

  return (
    <AppContext.Provider
      value={{
        appState,
        setAppState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("You need to useApp inside a function");
  }

  return context;
};
