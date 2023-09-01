import { useNavigate, useParams } from "react-router-dom";
import "./single-recipe.scss";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMsg from "../error-msg/ErrorMsg";
import imagePaths from "../../utils/images";
import { useGlobal } from "../../context/GlobalContext";

const SingleRecipe = () => {
  const { id } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState({} || null);
  const [isLoadingLocal, setIsLoadingLocal] = useState(false);
  const [errorLocal, setErrorLocal] = useState(false);
  const { error: globalError } = useGlobal();
  const navigate = useNavigate();

  useEffect(() => {
    async function getRecipe(id) {
      if (currentRecipe.id !== undefined && Number(id) === currentRecipe.id) return;
      setIsLoadingLocal(true);

      try {
        const res = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key` + process.env.REACT_APP_KEY_API
        );
        const data = await res.json();
        setCurrentRecipe(data.data.recipe);
      } catch (error) {
        setErrorLocal(true);
      } finally {
        setIsLoadingLocal(false);
      }
    }
    getRecipe(id);
  }, [currentRecipe.id, id]);

  useEffect(() => {
    if (globalError) {
      navigate("/");
    }
  }, [globalError, navigate]);

  const { title, image_url, cooking_time, servings, ingredients } = currentRecipe;
  const ingredientValues =ingredients ? Object.values(ingredients) : [];

  if (isLoadingLocal) {
    return <Spinner />;
  }
  if (errorLocal) {
    return <ErrorMsg>{"Something went wrong..."}</ErrorMsg>;
  }
  

  return (
    <>
      <figure className="recipe__fig">
        <img src={image_url} alt="Tomato" className="recipe__img" />
        <h1 className="recipe__title">
          <span>{title}</span>
        </h1>
      </figure>
      <div className="recipe__details">
        <div className="recipe__info">
          <img src={imagePaths.clock} alt="" />
          <span className="recipe__info-data recipe__info-data--minutes">{cooking_time}</span>
          <span className="recipe__info-text">minutes</span>
        </div>
        <div className="recipe__info">
          <img src={imagePaths.users} alt="" />
          <span className="recipe__info-data recipe__info-data--people">{servings}</span>
          <span className="recipe__info-text">servings</span>

          <div className="recipe__info-buttons">
            <button className="btn--tiny btn--increase-servings">
              <img src={imagePaths.minus} alt="" />
            </button>
            <button className="btn--tiny btn--increase-servings">
              <img src={imagePaths.plus} alt="" />
            </button>
          </div>
        </div>
        <div class="recipe__user-generated">
          <svg>
            <use href="src/img/icons.svg#icon-user"></use>
          </svg>
        </div>
        <button className="btn--tiny">
          <img src={imagePaths.bookmark} alt="" />
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          {ingredientValues?.map((ingr) => (
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">{ingr?.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">{ingr?.unit}</span>
                {ingr?.description}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SingleRecipe;
