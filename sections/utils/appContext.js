import { useState, createContext, useContext } from "react";

export const AppContext = createContext({});
export const AppProvider = (props) => {
  const [appState, setAppState] = useState({
    blockchains: [
      { title: "Polygon", logo: "/icons/polygon.png", chainId: "", active: true },
      { title: "Fantom", logo: "/icons/fantom.png", chainId: "", active: false },
      { title: "BinanceChain", logo: "/icons/binance.png", chainId: "", active: false },
    ],
    currency: [
      { title: "USDC", logo: "/icons/usdc.png", chainId: "", active: true },
      { title: "USDT", logo: "/icons/usdt.png", chainId: "", active: false },
    ],
  });

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
