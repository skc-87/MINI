import React, { useEffect, useState } from "react";
import { PiInstagramLogoLight } from "react-icons/pi";
import { SlSocialFacebook } from "react-icons/sl";
import { CiTwitter } from "react-icons/ci";
import { NavLink, Link } from "react-router-dom";
import Logout from "../Auth/Logout";
import Login from "../Auth/LogIn";
import Signup from "../Auth/SignUp"; // Import the Signup component
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.profile.user);
  const token = user?.token;

  const [userActive, setUserActive] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignup, setShowSignup] = useState(false); // State to toggle between login and signup

  useEffect(() => {
    if (user) {
      setUserActive(true);
    } else {
      setUserActive(false);
    }
  }, [user]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showLoginModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoginModal]);

  return (
    <div className="w-full flex flex-col select-none">
      {/* Top Navigation Bar */}
      <div className="flex justify-between items-center">
        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-x-[1rem]">
          <div className="hover:scale-110 transition-all duration-150 cursor-pointer">
            <Link to="/">
              <PiInstagramLogoLight />
            </Link>
          </div>
          <div className="hover:scale-110 transition-all duration-150 cursor-pointer">
            <Link to="/">
              <SlSocialFacebook />
            </Link>
          </div>
          <div className="hover:scale-110 transition-all duration-150 cursor-pointer">
            <Link to="/">
              <CiTwitter />
            </Link>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex justify-center items-center gap-x-[1rem]">
          {userActive && <Logout token={token} />}
          {!userActive && (
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-cyan-500 text-white text-3xl px-7 p-[5px] rounded-full hover:bg-cyan-600"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Bottom Navigation Links */}
      <div className="w-[50%] mt-[0.5rem] mx-auto flex justify-between items-center text-[1.5rem]">
        <NavLink to="/" className="px-5 hover:scale-105 transition-all duration-200">
          Home
        </NavLink>
        {user && (
          <NavLink to="/tours" className="px-5 hover:scale-105 transition-all duration-200">
            Tours
          </NavLink>
        )}
        <NavLink to="/packages" className="px-5 hover:scale-105 transition-all duration-200">
          Packages
        </NavLink>
        <NavLink to="/Aboutus" className="px-5 hover:scale-105 transition-all duration-200">
          About Us
        </NavLink>
        <NavLink to="/contact us" className="px-5 hover:scale-105 transition-all duration-200">
          Contact Us
        </NavLink>
      </div>

      {/* Modal for Login and Signup */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-500 ${
          showLoginModal ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        role="dialog"
        aria-hidden={!showLoginModal}
        aria-labelledby="login-modal"
        onClick={(e) => e.target === e.currentTarget && setShowLoginModal(false)} // Close on outside click
      >
        <div
          className={`p-6 rounded-lg bg-black bg-opacity-50 backdrop-blur-md w-[90%] md:w-[60%] transform transition-transform duration-500 ${
            showLoginModal ? "scale-100" : "scale-95"
          }`}
          id="login-modal"
        >
          <button
            onClick={() => setShowLoginModal(false)}
            className="text-red-500 float-right text-2xl font-bold"
            aria-label="Close login modal"
          >
            &times;
          </button>

          <div className="flex flex-col md:flex-row items-center">
            {/* Left Section: Form */}
            <div className="flex-1 p-4">
              {showSignup ? <Signup /> : <Login />}
            </div>

            {/* Right Section: Text */}
            <div className="flex-1 p-4 text-white text-center md:text-left">
              {showSignup ? (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Welcome to Signup!</h2>
                  <p className="mb-4">
                    Join us to explore a wide range of features and exclusive content.
                  </p>
                  <p className="text font-semibold text-lg">
                  Already have an account? 
                  </p>
                  <button
                    onClick={() => setShowSignup(false)}
                    className="text-xl align-top bg-slate-500 rounded-full w-[50%] h-11"
                  >
                  <p>
                  Login Now
                  </p>
                   
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
                  <p className="mb-4">
                    Login to access your account and enjoy all the features we offer.
                  </p>
                  <p className="text font-semibold text-lg">
                  Don't have an account? 
                  </p>
                  <button
                    onClick={() => setShowSignup(true)}
                    className="text-xl align-top bg-slate-500 rounded-full w-[50%] h-11"
                  >
                    <p>
                    Sign up
                    </p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
