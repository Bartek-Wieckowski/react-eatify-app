import imagePaths from "../../utils/images";
import "./bookmarks.scss";

function Bookmarks() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <button className="nav__btn nav__btn--bookmarks">
            <img src={imagePaths.bookmark} alt="" /> Bookmarks
          </button>
          <div class="bookmarks">
            <ul class="bookmarks__list">
              <div class="message">
                <div></div>
                <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
              </div>

              <li class="preview">
                <a class="preview__link" href="#23456">
                  <figure class="preview__fig">
                    <img src="src/img/test-1.jpg" alt="Test" />
                  </figure>
                  <div class="preview__data">
                    <h4 class="preview__name">Pasta with Tomato Cream ...</h4>
                    <p class="preview__author">The Pioneer Woman</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Bookmarks;
