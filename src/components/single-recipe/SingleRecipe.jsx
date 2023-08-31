import { useParams } from "react-router-dom";
import "./single-recipe.scss";
import { useEffect } from "react";
import { useGlobal } from "../../context/GlobalContext";
import Spinner from "../spinner/Spinner";

const SingleRecipe = () => {
  const { id } = useParams();
  const { isLoading, getRecipe, currentRecipe } = useGlobal();

  useEffect(() => {
    getRecipe(id);
  }, [id, getRecipe]);

  const { title, image_url } = currentRecipe;

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <figure className="recipe__fig">
        <img src={image_url} alt="Tomato" className="recipe__img" />
        <h1 className="recipe__title">
          <span>{title}</span>
        </h1>
      </figure>
    </>
  );
};

export default SingleRecipe;
