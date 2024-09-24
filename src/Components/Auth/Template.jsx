import React, { useState } from "react";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

const Template = () => {
  const [logInModal, setLogInModal] = useState(true);
  const [signUpModal, setSignUpModal] = useState(false);

  const clickLogInHandler = () => {
    setSignUpModal(false);
    setLogInModal(true);
  };

  const clickSignUpHandler = () => {
    setLogInModal(false);
    setSignUpModal(true);
  };

  return (
    <div className="max-h-[595px] max-w-[700px] flex  items-end  ">
      <div className="">
        <div>{logInModal && <LogIn />}</div>

        <div>{signUpModal && <SignUp />}</div>
      </div>

      <div className="  flex justify-center   h-full mb-5">
        {signUpModal && (
          <div className="w-[350px] -ml-[1rem]">
            <div>
              <p className="text-[1rem] tracking-widest text-white">
                {" "}
                Already have an account ?
              </p>
              <button
                onClick={clickLogInHandler}
                className="text-white hover:scale-95 transition-all duration-200"
              >
                Log In
              </button>
            </div>
          </div>
        )}

        {logInModal && (
          <div className=" w-[250px] flex flex-col ml-[5rem]">
            <div>
              <p className="text-[1rem] tracking-widest text-white">
                {" "}
                Don't have an account ?
              </p>
              <button
                onClick={clickSignUpHandler}
                className="text-white text-[2rem]  hover:scale-95 transition-all duration-200"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template;
