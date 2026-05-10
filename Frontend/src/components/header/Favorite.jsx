import React from "react";
import favoriteIcon from "../../assets/icons/favorite.svg";

const Favorite = () => {
  return (
    <div className="">
      {/* Desktop - icon button */}
      <div className="max-md:hidden bg-[#234230] w-10 px-2 h-10 rounded-md border border-transparent transition cursor-pointer hover:shadow-[0_0_15px_rgba(74,222,128,0.3),0_0_30px_rgba(74,222,128,0.1)] hover:border-primary-300">
        <img src={favoriteIcon} alt="" className="w-10 h-10" />
      </div>
      {/* Mobile - icon text button */}
      <div></div>
    </div>
  );
};

export default Favorite;
