import { useState } from "react";
import imagePaths from "../../utils/images";
import "./search.scss";
import { useGlobal } from "../../context/GlobalContext";

const Search = () => {
  const [query, setQuery] = useState("");
  const { dispatch } = useGlobal();

  function handleSubmit(e) {
    e.preventDefault();
    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=` +
            process.env.REACT_APP_KEY_API
        );
        const data = await res.json();
        dispatch({ type: "recipes/loaded", payload: data.data.recipes });
        console.log(data.data.recipes);
      } catch (error) {}
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
