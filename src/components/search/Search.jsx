import imagePaths from "../../utils/images";
import "./search.scss";

const Search = () => {
  return (
    <form class="search">
      <input type="text" class="search__field" placeholder="Search recipes..." />
      <button class="btn search__btn">
        <img src={imagePaths.searchSvg} alt="" />
      </button>
    </form>
  );
};

export default Search;
