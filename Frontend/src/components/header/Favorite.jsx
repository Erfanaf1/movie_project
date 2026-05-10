import React from "react";
import favoriteIcon from "../../assets/icons/favorite.svg";

const Favorite = () => {
  return (
    <div className="">
      {/* Desktop - icon button */}
      <div className=" max-md:hidden bg-[#234230] w-10 px-2 h-10 rounded-md border border-transparent transition cursor-pointer hover:shadow-[0_0_15px_rgba(74,222,128,0.3),0_0_30px_rgba(74,222,128,0.1)] hover:border-primary-300">
        <img src={favoriteIcon} alt="" className="w-10 h-10" />
      </div>
      {/* Mobile - icon text */}
      <div className="md:hidden flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#234230] transition cursor-pointer border border-primary-300">
        <img src={favoriteIcon} alt="" className="w-6 h-6" />
        <span className="text-primary-300 font-medium">مورد علاقه‌ها</span>
      </div>
    </div>
  );
};

export default Favorite;
