import { useParams } from "react-router-dom";
import "./single-recipe.scss";

const SingleRecipe = () => {
  const { id } = useParams();
  return <div style={{fontSize: "48px"}}>SingleRecipe = {id}</div>;
};

export default SingleRecipe;
