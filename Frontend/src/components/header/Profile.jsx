import React from "react";
import userIcon from "../../assets/icons/user.svg";
import homeIcon from "../../assets/icons/home.svg";

const Profile = () => {
  return (
    <div className="flex items-center justify-center rounded-xl w-full px-2 py-1 gap-2 cursor-pointer text-surface-900 bg-primary-400">
        <span className="whitespace-nowrap">اسم کاربر</span>
      <img src={userIcon} alt="" className="w-8 h-8" />
    </div>
  );
};

export default Profile;
