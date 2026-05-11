import React from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SearchBar from "./search/SearchBar";
import Profile from "./Profile";
import Favorite from "./Favorite";
import menuIcon from "../../assets/icons/menu.svg";
import { useState } from "react";
import closeIcon from "../../assets/icons/close.svg";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-[80vw] max-xl:w-[90vw] max-lg:w-[96vw] mx-auto mt-20 px-12 max-xl:px-10 max-lg:px-6 py-4 rounded-2xl bg-surface-950 shadow-[0_0_30px_rgba(74,222,128,0.3),0_0_60px_rgba(74,222,128,0.1)]">
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

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
      <div
        className="md:hidden"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img src={menuIcon} alt="" className="w-10 h-10" />
      </div>

      {/* mobile search box */}
      <div className="md:hidden">
        <SearchBar />
      </div>

      {/* mobile side menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[70vw] max-w-xs bg-surface-950 border-l border-primary-300 z-50 transition-transform duration-300 md:hidden ${
          isOpen
            ? "translate-x-0 shadow-[0_0_30px_rgba(74,222,128,0.3),0_0_60px_rgba(74,222,128,0.1)]"
            : "translate-x-full "
        }`}
      >
        <img
          src={closeIcon}
          alt=""
          className="w-12 h-12 bg-[#234230] rounded-bl-md"
          onClick={() => {
            setIsOpen(false);
          }}
        />
        {/* logo */}
        <div className="w-full flex justify-center items-center mt-10 mb-16">
          <span className="text-4xl font-bold text-primary-300 mx-auto text-shadow-[0_0_30px_rgba(74,222,128,0.3),0_0_60px_rgba(74,222,128,0.1)]">
            لوگو فیلم
          </span>
        </div>
        {/* nav links */}
        <NavLinks/>
        {/* favorites */}
        <div className="flex justify-center items-center mt-12">
          <Favorite />
        </div>
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
