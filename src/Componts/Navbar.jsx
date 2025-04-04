import React from "react";
import { Bell, LogOut } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-[30px] font-normal text-[#7427C2] font-lustria">
        EasyDoc
      </h1>
      <h2 className="text-2xl font-bold text-center mt-4">Your Reports</h2>

      <div className="flex items-center gap-4">
        <button className="text-[#A855F7] cursor-pointer">
          <Bell size={20} />
        </button>
        <button className="text-[#A855F7]  cursor-pointer">
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
