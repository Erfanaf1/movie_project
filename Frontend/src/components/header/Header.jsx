import React from "react";
import { Link } from 'react-router-dom'
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import Favorite from "./Favorite";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-[80vw] mx-auto mt-20 px-12 py-4 rounded-2xl bg-surface-950 shadow-[0_0_30px_rgba(74,222,128,0.3),0_0_60px_rgba(74,222,128,0.1)]">
      {/* logo & navlinks */}
      <div className="flex justify-between items-center gap-20">
        <NavLinks />
      </div>
        {/* logo */}
        <Link to="/">
  <span className="text-primary-300 font-bold text-4xl cursor-pointer transition hover:text-primary-200 hover:[text-shadow:0_0_10px_rgba(74,222,128,0.6)]">لوگو فیلم</span>
</Link>
      {/* logo and profile */}
      <div className="flex gap-3 justify-between items-center shrink-0">
        {/* profile dropdown */}
        <SearchBar />
        <Favorite />
        <Profile />
      </div>
    </header>
  );
};

export default Header;
