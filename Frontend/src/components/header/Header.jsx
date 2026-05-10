import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import Favorite from "./Favorite";
import menuIcon from "../../assets/icons/menu.svg";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-[80vw] max-xl:w-[90vw] max-lg:w-[96vw] mx-auto mt-20 px-12 max-xl:px-10 max-lg:px-6 py-4 rounded-2xl bg-surface-950 shadow-[0_0_30px_rgba(74,222,128,0.3),0_0_60px_rgba(74,222,128,0.1)]">
      {/*navlinks */}
      <div className="hidden md:block">
        <NavLinks />
      </div>

      {/* logo */}
      <div className="hidden md:block">
        <Link to="/">
          <span className="text-primary-300 font-bold text-4xl ...">
            لوگو فیلم
          </span>
        </Link>
      </div>

      {/* mobile menu */}
      <div className="md:hidden">
        <img src={menuIcon} alt="" className="w-10 h-10" />
      </div>

      {/* mobile search box */}
      <div className="md:hidden">
        
        <SearchBar />
      </div>
      {/* search & favorites & profile */}
      <div className="flex gap-3 justify-between items-center shrink-0 ">
        <div className="flex gap-3 shrink-0 max-md:hidden">
          <SearchBar />
          <Favorite />
        </div>
        {/* profile dropdown */}
        <Profile />
      </div>
    </header>
  );
};

export default Header;
