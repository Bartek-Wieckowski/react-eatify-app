import { createContext, useCallback, useContext, useReducer } from "react";

const GlobalContext = createContext();

const initialState = {
  isLoading: false,
  error: "",
  recipes: [],
  currentRecipe: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "recipes/loaded":
      return { ...state, isLoading: false, recipes: action.payload, error: "" };
    case "recipe/loaded":
      return { ...state, isLoading: false, currentRecipe: action.payload, error: "" };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function GlobalProvider({ children }) {
  const [{ isLoading, recipes, error, currentRecipe }, dispatch] = useReducer(reducer, initialState);

  const getRecipe = useCallback(
    async function getRecipe(id) {
      if (Number(id) === currentRecipe.id) return;
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
        const data = await res.json();
        dispatch({ type: "recipe/loaded", payload: data.data.recipe });
      } catch (error) {
        dispatch({
          type: "reject",
          payload: "There was an error loading the recipe...",
        });
      }
    },
    [currentRecipe.id]
  );

  return (
    <GlobalContext.Provider value={{ isLoading, recipes, error, currentRecipe, getRecipe, dispatch }}>
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
