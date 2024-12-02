import React from "react";
import FooterImg from "../../assets/Footer/Footer.jpg";
import { PiInstagramLogoLight } from "react-icons/pi";
import { SlSocialFacebook } from "react-icons/sl";
import { CiTwitter } from "react-icons/ci";
import { AiOutlineYoutube } from "react-icons/ai";
import { Link } from "react-router-dom";
import Footer1 from "./Footer1/Footer1";

const Footer = () => {
  return (
    <div className=" mx-auto w-full  flex flex-col justify-between items-center ">
      {/* Footer Banner */}
      <div
        className="w-full h-[542px] flex flex-col gap-y-[10rem] justify-center items-center"
        style={{
          backgroundImage: `url(${FooterImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          //   minHeight: "860px", // Set your desired height
        }}
      >
        <div className="flex flex-col gap-y-[4rem] justify-center items-center">
          <p className=" text-white text-[4rem] font-semibold tracking-widest">
            Subscribe to get special price
          </p>
          <p className="w-auto mx-auto text-[1.5rem] text-gray-600 filter tracking-widest">
            Dont wanna miss something? Subscribe right now and get special{" "}
            <br />
            promotion and monthly newsletter
          </p>
        </div>

        <form className="flex gap-x-3 items-center justify-center bg-white py-2 px-3 rounded-full">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-3 py-3 rounded-full border-0 h-[4rem]"
          />
          <button
            type="submit"
            className="bg-black px-4 py-2 h-[4rem] text-white rounded-full hover:scale-95 transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>

     

      <div className="flex justify-between w-full h-full">
        <Footer1 />
        {/* <div className="flex justify-between w-11/12 mt-[2rem]"> */}
        {/* <div className="flex gap-x-4"> */}
        {/* <img src={Logo} alt="Logo" className="w-[100px]" /> */}
      </div>

      
    </div>
  );
};

export default Footer;
