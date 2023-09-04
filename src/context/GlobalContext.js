import { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

const initialState = {
  isLoading: false,
  error: "",
  recipes: [],
  bookmarksRecipe: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "recipes/loaded":
      return { ...state, isLoading: false, recipes: action.payload, error: "" };
    case "recipe/addedBookmark":
      const existingBookmarks = JSON.parse(localStorage.getItem("favRecipes")) || [];
      const isDuplicate = existingBookmarks.some((bookmark) => bookmark.id === action.payload.id);
      if (!isDuplicate) {
        const updatedBookmarks = [...existingBookmarks, action.payload];
        localStorage.setItem("favRecipes", JSON.stringify(updatedBookmarks));
        return { ...state, bookmarksRecipe: updatedBookmarks };
      }
      return state;

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function GlobalProvider({ children }) {
  const [{ isLoading, recipes, error, bookmarksRecipe }, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ isLoading, recipes, error, bookmarksRecipe, dispatch }}>
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
