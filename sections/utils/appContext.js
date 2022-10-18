import { useState, createContext } from "react"

export const AppContext = createContext({})
export const AppProvider = (props) => {
  const [appState, setAppState] = useState({})

  return (
    <AppContext.Provider
      value={{
        appState,
        setAppState,
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
