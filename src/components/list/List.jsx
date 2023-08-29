import { useGlobal } from "../../context/GlobalContext";
import imagePaths from "../../utils/images";
import Spinner from "../spinner/Spinner";
import "./list.scss";

const List = () => {
  const { recipes, isLoading } = useGlobal();

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="search-results">
      <ul className="results">
        {recipes?.map((recipe) => (
          <li className="preview" key={recipe.id}>
            <a className="preview__link preview__link--active" href="#23456">
              <figure className="preview__fig">
                <img src={recipe.image_url} alt={recipe.title} />
              </figure>
              <div className="preview__data">
                <h4 className="preview__title">{recipe.title}</h4>
                <p className="preview__publisher">{recipe.publisher}</p>
                <div className="preview__user-generated">
                  <img src={imagePaths.user} />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
