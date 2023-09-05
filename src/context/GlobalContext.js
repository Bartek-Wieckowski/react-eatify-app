import { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

const initialState = {
  isLoading: false,
  error: "",
  recipes: [],
  bookmarksRecipe: JSON.parse(localStorage.getItem("favRecipes")) || [],
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "recipes/loaded":
      return { ...state, isLoading: false, recipes: action.payload, error: "" };
    case "recipe/addedBookmark":
      const isDuplicate = state.bookmarksRecipe.some((bookmark) => bookmark.id === action.payload.id);
      if (!isDuplicate) {
        const updatedBookmarks = [...state.bookmarksRecipe, action.payload];
        const newState = { ...state, bookmarksRecipe: updatedBookmarks };
        localStorage.setItem("favRecipes", JSON.stringify(updatedBookmarks));
        return newState;
      }
      return state;
    case "recipe/removedBookmark":
      const updatedBookmarks = state.bookmarksRecipe.filter((bookmark) => bookmark.id !== action.payload);
      localStorage.setItem("favRecipes", JSON.stringify(updatedBookmarks));
      return { ...state, bookmarksRecipe: updatedBookmarks };
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
