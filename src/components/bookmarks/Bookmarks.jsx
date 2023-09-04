import { useEffect, useState } from "react";
import imagePaths from "../../utils/images";
import "./bookmarks.scss";
import { Link } from "react-router-dom";

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("favRecipes")) || [];
    setBookmarks(storedBookmarks);
  }, []);

  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <button className="nav__btn nav__btn--bookmarks">
            <img src={imagePaths.bookmark} alt="" /> Bookmarks
          </button>
          <div className="bookmarks">
            <ul className="bookmarks__list">
              {bookmarks.length === 0 && (
                <div className="message">
                  <div></div>
                  <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
                </div>
              )}

              {bookmarks.map((b) => (
                <li className="preview" key={b.id}>
                  <Link className="preview__link" to={"recipe/" + b.id}>
                    <figure className="preview__fig">
                      <img src={b.image_url} alt="Test" />
                    </figure>
                    <div className="preview__data">
                      <h4 className="preview__name">{b.title}</h4>
                      <p className="preview__author">{b.publisher}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Bookmarks;
