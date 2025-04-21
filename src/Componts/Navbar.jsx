import React, {  useState } from "react";
import { Bell, Ghost, LogOut } from "lucide-react";
import LoginSvg from "@/utility/Svg/LoginSvg";
import Notification from "./Notification";
import useLogout from "./useLogout";
import { Button } from "@/components/ui/button";
import NotificationSvg from "@/utility/Svg/NotificationSvg";


const Navbar = () => { 
  const [showNotifications, setShowNotifications] = useState(false);  
 const toggleNotifications = ()=>{
    setShowNotifications(!showNotifications)
  }


  const handleLogout = useLogout()


  return (
<nav className="bg-white shadow-md px-4 py-2 flex items-center justify-between flex-wrap gap-y-2">
  {/* Left: Logo */}
  <div className="flex items-center gap-2">
    <h1 className="text-[24px] md:text-[30px] font-normal text-[#7427C2] font-lustria ">
      EasyDoc
    </h1>
  </div>

  
  <h2 className="text-lg md:text-2xl font-bold text-center leading-none mx-auto">
    Your Reports
  </h2>

  
  <div
  className="relative flex items-center justify-center"
  tabIndex={0}
  onBlur={() => setShowNotifications(false)}
  onFocus={() => {}}
>
  <Button
    variant="ghost"
    size="icon"
    className="p-2 text-[#A855F7] flex items-center justify-center hover:bg-transparent w-auto h-auto cursor-pointer m-0"
    onClick={() => setShowNotifications((prev) => !prev)}
    
  >
    <NotificationSvg size={20} />
  </Button>

  {showNotifications && (
    <div className="absolute top-full right-0 z-50">
      <Notification />
    </div>
  )}
</div>
<Button
    variant="ghost"
    size="icon"
    className="p-2 text-[#A855F7] flex items-center justify-center hover:bg-transparent w-auto h-auto cursor-pointer m-0"
    onClick={handleLogout}
  >
    <LoginSvg size={20}  />
  </Button>



</nav>

  );
}

export default Navbar;
