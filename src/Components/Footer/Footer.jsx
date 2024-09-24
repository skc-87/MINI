import React from "react";
import FooterImg from "../../assets/Footer/Footer.jpg";
import { PiInstagramLogoLight } from "react-icons/pi";
import { SlSocialFacebook } from "react-icons/sl";
import { CiTwitter } from "react-icons/ci";
import { AiOutlineYoutube } from "react-icons/ai";
import { Link } from "react-router-dom";

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

      <div className="flex justify-between w-11/12 mt-[2rem]">
        {/* Contact Information */}
        <div className="flex flex-col">
          <p className="text-[2rem] font-bold tracking-widest">
            Contact Information
          </p>
          <p className="text-[1rem] font-thin tracking-widest">
            Email: TourAndTravel@gmail.com
          </p>
          <p className="text-[1rem] font-thin tracking-widest">
            Address: Rungta R1, BHILAI
          </p>

          <p className="text-[1rem] font-thin tracking-widest">
            Phone: 81xxxxxx65{" "}
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <p className="text-[2rem] font-bold tracking-widest">Quick Links</p>
          <div className="flex flex-col gap-y-4 ">
            <ul>
              <li className="hover:scale-95 transition-all duration-300">
                <a href="/" className="text-[1rem] font-thin tracking-widest">
                  Home
                </a>
              </li>
              <li className="hover:scale-95 transition-all duration-300">
                <a
                  href="/aboutus"
                  className="text-[1rem] font-thin tracking-widest"
                >
                  About Us
                </a>
              </li>
              <li className="hover:scale-95 transition-all duration-300">
                <a
                  href="/packages"
                  className="text-[1rem] font-thin tracking-widest"
                >
                  Package
                </a>
              </li>
              <li className="hover:scale-95 transition-all duration-300">
                <a
                  href="/contact us"
                  className="text-[1rem] font-thin tracking-widest "
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Follow Us */}
        <div>
          <h4 className="text-lg font-bold mb-2">Follow Us</h4>
          <div className="flex items-center justify-center mx-auto gap-x-2">
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
            <div className="hover:scale-110 transition-all duration:150  cursor-pointer">
              <Link to="/">
                <AiOutlineYoutube />
              </Link>
            </div>
            <div className="hover:scale-110 transition-all duration:150  cursor-pointer">
              <Link to="/">
                <PiInstagramLogoLight />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center h-[70px] mt-2 bg-black">
        <p className="text-gray-200 tracking-widest text-[1rem] text-center">
          Copyright © All rights reserved (Website Developed & Managed by
          creativechroma)
        </p>
      </div>
    </div>
  );
};

export default Footer;
