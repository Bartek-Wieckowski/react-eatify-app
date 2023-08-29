import { useState } from "react";
import imagePaths from "../../utils/images";
import "./search.scss";
import { useGlobal } from "../../context/GlobalContext";

const Search = () => {
  const [query, setQuery] = useState("");
  const { dispatch } = useGlobal();

  function handleSubmit(e) {
    e.preventDefault();
    if (query.length === 0) {
      dispatch({ type: "rejected", payload: "Recipes don't exist" });
      return;
    }
    dispatch({ type: "loading" });
    const fetchRecipes = async () => {
      try {

        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=` +
            process.env.REACT_APP_KEY_API
        );
        const data = await res.json();

        if (data.data.recipes.length === 0) {
          dispatch({ type: "rejected", payload: "No recipes found" });
        } else {
          dispatch({ type: "recipes/loaded", payload: data.data.recipes });
        }
      } catch (err) {
        dispatch({ type: "rejected", payload: "There was an error loading recipes..." });
      }
    };
    fetchRecipes();
  }

  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search__field"
        placeholder="Search recipes..."
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      <button className="btn search__btn" type="submit">
        <img src={imagePaths.searchSvg} alt="" />
      </button>
    </form>
  );
};

export default Search;
