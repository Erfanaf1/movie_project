import React from "react";
import NavItem from "./NavItem";
import homeIcon from "../../assets/icons/home.svg";
import moviesIcon from "../../assets/icons/movies.svg";

const links = [
  { to: "/", label: "صفحه اصلی", icon: homeIcon },
  { to: "/movies", label: "فیلم ها", icon: moviesIcon },
];

const NavLinks = () => {
  return (
    <div>
      {/* Desktop - icon text */}
      <nav className="max-md:hidden flex gap-10 max-xl:gap-4">
        {links.map((link) => (
          <NavItem
            key={link.to}
            to={link.to}
            label={link.label}
            icon={link.icon}
          />
        ))}
      </nav>
      {/* Mobile - icon text */}
      <div className="md:hidden">
        <div>
          {links.map((link) => (
            <NavItem key={link.to} to={link.to} label={link.label} icon={link.icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavLinks;
