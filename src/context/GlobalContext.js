import { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

const initialState = {
  isLoading: false,
  recipes: [],
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "recipes/loaded":
      return { ...state, isLoading: false, recipes: action.payload, error: "" };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function GlobalProvider({ children }) {
  const [{ isLoading, recipes, error }, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ isLoading, recipes, error, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobal() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("GlobalContext was used outside the GlobalProvider");
  }
  return context;
}

export { useGlobal, GlobalProvider };
