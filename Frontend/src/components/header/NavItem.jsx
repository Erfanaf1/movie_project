import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ to, label, icon }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-2 py-1 rounded-md transition hover:bg-[#234230] hover:shadow-[0_0_15px_rgba(74,222,128,0.3),0_0_30px_rgba(74,222,128,0.1)]"
    >
      <img src={icon} alt="" className="w-8" />
      <span className="whitespace-nowrap font-medium text-l">{label}</span>
    </Link>
  );
};

export default NavItem;
