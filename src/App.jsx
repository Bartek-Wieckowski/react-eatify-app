import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/Header";
import List from "./components/list/List";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <List />
        <RecipeDetails />
      </BrowserRouter>
    </div>
  );
}

export default App;
