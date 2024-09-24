import React from "react";
import { PiInstagramLogoLight } from "react-icons/pi";
// import { LiaFacebookF } from "react-icons/lia";
// import { FaDiscord } from "react-icons/fa";
import { MdOutlineLocalPhone } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { CiTwitter } from "react-icons/ci";
import { SlSocialFacebook } from "react-icons/sl";
import { NavLink } from "react-router-dom";
import Logout from "../Auth/Logout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const user = localStorage.getItem("user")
  //   ? JSON.parse(localStorage.getItem("user"))
  //   : null;
  // console.log("USer -> ", user);

  const user = useSelector((state) => state.profile.user);
  console.log("User -> ", user);
  const token = user?.token;

  const [userActive, setUserActive] = useState(false);

  useEffect(() => {
    if (user) {
      setUserActive(true);
    } else {
      setUserActive(false);
    }
  }, [user]);

  return (
    <div className="w-full flex flex-col select-none ">
      {/* top div */}
      <div className=" flex justify-between items-center ">
        {/* 1st section */}
        <div className="flex justify-center items-center gap-x-[1rem]">
          {/* icons */}
          <div className="hover:scale-110 transition-all duration:150  cursor-pointer">
            <Link to="/">
              <PiInstagramLogoLight />
            </Link>
          </div>
          <div className="hover:scale-110 transition-all duration:150  cursor-pointer">
            <Link to="/">
              <SlSocialFacebook />
            </Link>
          </div>
          <div className="hover:scale-110 transition-all duration:150  cursor-pointer">
            <Link to="/">
              <CiTwitter />
            </Link>
          </div>
        </div>

        {/* 2nd  section */}
        <div className="flex justify-center items-center gap-x-[1rem]">
          {/* contact details */}
          <div className="hover:scale-110 transition-all duration:150 cursor-pointer">
            <Link to="/contact us" className=" ">
              <MdOutlineLocalPhone />
            </Link>
          </div>
          <div className="hover:scale-110 transition-all duration:150 cursor-pointer ">
            <Link to="/contact us" className=" ">
              <TfiEmail />
            </Link>
          </div>
          {/* LogOut */}
          <div className="">{userActive && <Logout token={token} />}</div>
        </div>
      </div>

      {/* bottom div */}
      <div className="w-[50%] mt-[0.5rem] mx-auto flex justify-between items-center text-[1.5rem]  ">
        <div className="hover:scale-105 transition-all duration:200 cursor-pointer  flex items-center justify-center ">
          <NavLink to="/" className="px-5 ">
            Home
          </NavLink>
        </div>

        {user && (
          <div className="hover:scale-105 transition-all duration:200 cursor-pointer flex items-center justify-center">
            <NavLink to="/tours" className="px-5  ">
              Tours
            </NavLink>
          </div>
        )}

        <div className="hover:scale-105 transition-all duration:200 cursor-pointer flex items-center justify-center">
          <NavLink to="/packages" className="px-5  flex ">
            Packages
          </NavLink>
        </div>
        <div className="hover:scale-105 transition-all duration:200 cursor-pointer  flex items-center justify-center">
          <NavLink to="/Aboutus" className="px-5 ">
            About Us
          </NavLink>
        </div>
        <div className="hover:scale-105 transition-all duration:200 cursor-pointer flex items-center justify-center">
          <NavLink to="/contact us" className="px-5  ">
            Contact Us
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
