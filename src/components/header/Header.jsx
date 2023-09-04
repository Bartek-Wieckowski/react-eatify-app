import Bookmarks from "../bookmarks/Bookmarks";
import Logo from "../logo/Logo";
import Search from "../search/Search";
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Search/>
      <Bookmarks/>
    </header>
  );
};

export default Header;
