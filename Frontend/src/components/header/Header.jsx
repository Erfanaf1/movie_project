import React from "react";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import Profile from "./Profile";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full px-20 py-4 bg-surface-950">
      {/* profile dropdown */}
      <Profile />
      {/* nav links and search bar */}
      <div>
        <SearchBar />
        <NavLinks />
      </div>
      {/* logo */}
      <span className="text-primary-300 font-bold text-4xl">لوگو فیلم</span>
    </header>
  );
};

export default Header;
