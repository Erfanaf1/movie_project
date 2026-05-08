import React from "react";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import Profile from "./Profile";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex bg-surface-950 mt-10 ">
      {/* logo */}
      <span className="text-primary-300 font-bold text-4xl">لوگو فیلم</span>
      {/* nav links and search bar */}
      <div>
        <SearchBar />
        <NavLinks />
      </div>
      {/* profile dropdown */}
      <Profile />
    </header>
  );
};

export default Header;
