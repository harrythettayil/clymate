import { Link } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";
import { CitySearch } from "./city-search";
import logo from "../../public/clymate.svg"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to={"/"}>
          <img src={logo} alt="clymate logo" className="h-14" />
        </Link>
        <div className="flex gap-4">
          <CitySearch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
