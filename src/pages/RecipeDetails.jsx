import {  Route, Routes } from "react-router-dom";
import SingleRecipe from "../components/single-recipe/SingleRecipe";


const RecipeDetails = () => {
  return (
    <div className="recipe">
      <Routes>
        <Route path="recipe/:id" element={<SingleRecipe  />} />
      </Routes>
    </div>
  );
};

export default RecipeDetails;
