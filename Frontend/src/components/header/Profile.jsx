import React from "react";
import userIcon from "../../assets/icons/user.svg";
import homeIcon from "../../assets/icons/home.svg";

const Profile = () => {
  return (
    <div className="flex items-center justify-center rounded-md w-full px-2 h-10 gap-2 cursor-pointer text-surface-900 bg-primary-400 transition hover:shadow-[0_0_15px_rgba(74,222,128,0.3),0_0_30px_rgba(74,222,128,0.1)]">
        <span className="whitespace-nowrap">اسم کاربر</span>
      <img src={userIcon} alt="" className="w-8 h-8" />
    </div>
  );
};

export default Profile;
