import React from "react";
import Bali from "../../assets/Aboutus/bali.jpg";
import Kedarnath from "../../assets/Aboutus/Kedarnath.jpeg"
import Valley from "../../assets/Aboutus/Valley.jpeg"
import Temple from "../../assets/Aboutus/Temple.jpeg"

const Content3 = () => {
  return (
    <div className="mx-auto">
      {/* main div */}
      <div className="h-[888px]  max-w-11/12 text-[2rem] font-sm">
        <div className="mb-5 text-[2rem] font-medium text-gray-500">
          <p>Gallery</p>
        </div>
        <div className="mb-[2rem] text-[3rem] font-bold">
          <p>Unforgettable moments</p>
        </div>

        {/* pictures div */}
        <div className="flex h-[676px] gap-x-5">
          {/* left */}
          <div
            className="rounded-2xl hover:scale-105 transition-all duration-300 flex relative"
            style={{
              backgroundImage: `url(${Bali})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "676px",
              minWidth: "676px",
            }}
          >
            <div className="absolute bottom-0 left-0 ml-[1rem] mb-[1rem] text-white font-semibold text-"></div>
          </div>
          {/* right */}
          <div className="flex flex-col gap-y-5">
            <div
              className="rounded-2xl hover:scale-105 transition-all duration-300 flex relative"
              style={{
                backgroundImage: `url(${Kedarnath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "328px", // Set your desired height
                minWidth: "676px",
              }}
            >
              <div className="absolute bottom-0 left-0 ml-[1rem] mb-[1rem] text-white font-semibold">
                Kedarnath
              </div>
            </div>
            <div className="flex gap-x-5">
              <div
                className="rounded-2xl hover:scale-105 transition-all duration-300 flex relative"
                style={{
                  backgroundImage: `url(${Valley})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "328px", // Set your desired height
                  minWidth: "328px",
                }}
              >
                <div className="absolute bottom-0 left-0 ml-[1rem] mb-[1rem] text-white font-semibold">
                  Shimla
                </div>
              </div>
              <div
                className="rounded-2xl  hover:scale-105 transition-all duration-300 felx relative"
                style={{
                  backgroundImage: `url(${Temple})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "328px", // Set your desired height
                  minWidth: "328px",
                }}
              >
                <div className="absolute bottom-0 left-0 ml-[1rem] mb-[1rem] text-white font-semibold">
                  Tirupati
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content3;
