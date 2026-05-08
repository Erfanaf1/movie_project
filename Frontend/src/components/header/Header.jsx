import React from "react";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import Profile from "./Profile";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-[80vw] mx-auto mt-20 px-12 py-4 rounded-2xl bg-surface-950 shadow-[0_0_30px_rgba(74,222,128,0.3),0_0_60px_rgba(74,222,128,0.1)]">
      {/* logo & navlinks */}
      <div className="flex justify-between items-center gap-20">
        {/* logo */}
        <span className="text-primary-300 font-bold text-4xl">لوگو فیلم</span>
        <NavLinks />
      </div>
      {/* logo and profile */}
      <div className="flex justify-between items-center">
        {/* profile dropdown */}
        <Profile />
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
