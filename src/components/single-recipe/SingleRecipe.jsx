import { useNavigate, useParams } from "react-router-dom";
import "./single-recipe.scss";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import ErrorMsg from "../error-msg/ErrorMsg";
import imagePaths from "../../utils/images";
import { useGlobal } from "../../context/GlobalContext";
import { Fraction } from "fractional";

const SingleRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentRecipe, setCurrentRecipe] = useState({} || null);
  const [isLoadingLocal, setIsLoadingLocal] = useState(false);
  const [errorLocal, setErrorLocal] = useState(false);
  const [ingredientValuesCopy, setIngredientValuesCopy] = useState([]);
  const [servingsPeople, setServingsPeople] = useState(0);
  const [cookingTime, setCookingTime] = useState(0);

  const { error: globalError, dispatch } = useGlobal();

  const { title, image_url, cooking_time, servings } = currentRecipe;

  const existingBookmarks = JSON.parse(localStorage.getItem("favRecipes")) || [];

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
        setIngredientValuesCopy(data.data.recipe.ingredients || []);
        setServingsPeople(data.data.recipe.servings);
        setCookingTime(data.data.recipe.cooking_time);
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

  const handleIncreaseQuantity = () => {
    if (servingsPeople < 10) {
      const newServings = servingsPeople + 1;
      if (newServings === servings * 2) {
        setCookingTime(Math.ceil(cookingTime * 2));
      }
      const copy = [...ingredientValuesCopy];
      copy.forEach((ingredient) => {
        ingredient.quantity = (ingredient.quantity * servings + 1) / servings;
      });
      setIngredientValuesCopy(copy);
      setServingsPeople((prev) => prev + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (servingsPeople > 1) {
      const copy = [...ingredientValuesCopy];
      copy.forEach((ingredient) => {
        if (ingredient.quantity > 0) {
          ingredient.quantity = (ingredient.quantity * servings - 1) / servings;
        }
      });
      console.log(servingsPeople);
      console.log(servings);
      if (servingsPeople - 1 === servings) {
        setCookingTime(cooking_time);
      }
      setIngredientValuesCopy(copy);
      setServingsPeople((prev) => prev - 1);
    }
  };

  const handleAddRecipeToBookmark = () => {
    const isDuplicate = existingBookmarks.some(
      (bookmarkedRecipe) => bookmarkedRecipe.id === currentRecipe.id
    );

    if (isDuplicate) {
      dispatch({ type: "recipe/removedBookmark", payload: currentRecipe.id });
    } else {
      dispatch({ type: "recipe/addedBookmark", payload: currentRecipe });
    }
  };

  const isBookmarked = (recipeID) => {
    return existingBookmarks.some((bookmarkedRecipe) => bookmarkedRecipe.id === recipeID);
  };

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
          <span className="recipe__info-data recipe__info-data--minutes">{cookingTime}</span>
          <span className="recipe__info-text">minutes</span>
        </div>
        <div className="recipe__info">
          <img src={imagePaths.users} alt="" />
          <span className="recipe__info-data recipe__info-data--people">{servingsPeople}</span>
          <span className="recipe__info-text">servings</span>

          <div className="recipe__info-buttons">
            <button className="btn--tiny btn--increase-servings" onClick={() => handleDecreaseQuantity()}>
              <img src={imagePaths.minus} alt="" />
            </button>
            <button className="btn--tiny btn--increase-servings" onClick={() => handleIncreaseQuantity()}>
              <img src={imagePaths.plus} alt="" />
            </button>
          </div>
        </div>
        <div className="recipe__user-generated">
          <svg>
            <use href="src/img/icons.svg#icon-user"></use>
          </svg>
        </div>
        <button className="btn--tiny" onClick={() => handleAddRecipeToBookmark()}>
          {!isBookmarked(id) ? (
            <img src={imagePaths.bookmark} alt="" />
          ) : (
            <img src={imagePaths.bookmarkSave} alt="" />
          )}
        </button>
      </div>

      <div className="recipe__ingredients">
        <h2 className="heading--2">Recipe ingredients</h2>
        <ul className="recipe__ingredient-list">
          {ingredientValuesCopy?.map((ingr) => (
            <li className="recipe__ingredient" key={crypto.randomUUID()}>
              <img src={imagePaths.check} className="recipe__icon" alt="check" />
              <div className="recipe__quantity">
                {ingr?.quantity ? new Fraction(ingr?.quantity).toString() : ""}
              </div>
              <div className="recipe__description">
                <span className="recipe__unit">{ingr?.unit} </span>
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
