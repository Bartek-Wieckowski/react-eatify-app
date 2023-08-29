import Logo from "../logo/Logo";
import Search from "../search/Search";
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <Search/>
    </header>
  );
};

export default Header;
