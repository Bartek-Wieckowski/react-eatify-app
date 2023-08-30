import { useState } from "react";
import { useGlobal } from "../../context/GlobalContext";
import imagePaths from "../../utils/images";
import ErrorMsg from "../error-msg/ErrorMsg";
import Spinner from "../spinner/Spinner";
import "./list.scss";

const List = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { recipes, isLoading, error } = useGlobal();

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = recipes?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(recipes?.length / itemsPerPage);

  const renderItems = currentItems.map((recipe) => (
    <li className="preview" key={recipe.id}>
      <a className="preview__link preview__link--active" href="#23456">
        <figure className="preview__fig">
          <img src={recipe.image_url} alt={recipe.title} />
        </figure>
        <div className="preview__data">
          <h4 className="preview__title">{recipe.title}</h4>
          <p className="preview__publisher">{recipe.publisher}</p>
          <div className="preview__user-generated">
            <img src={imagePaths.user} alt="user" />
          </div>
        </div>
      </a>
    </li>
  ));

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (currentPage > 1) {
      pageNumbers.push(<button className="btn--inline pagination-wrapper__btn pagination-wrapper__btn--prev" onClick={() => setCurrentPage(currentPage - 1)}><img src={imagePaths.arrowLeft} alt="" style={{width:"20px"}} />
        {currentPage - 1}
      </button>);
    }
    if (currentPage < totalPages) {
      pageNumbers.push(<button className="btn--inline pagination-wrapper__btn pagination-wrapper__btn--next" onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}
      <img src={imagePaths.arrowRight} alt="" style={{width:"20px"}} /></button>);
    }
    return pageNumbers;
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorMsg>{error}</ErrorMsg>;
  }
  return (
    <div className="search-results">
      <ul className="results">{renderItems}</ul>
      <div className="pagination-wrapper">{renderPageNumbers()}</div>
    </div>
  );
};

export default List;
