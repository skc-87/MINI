import React from "react";
import Bali from "../../assets/Aboutus/bali.jpg";
import Dubai from "../../assets/Aboutus/dubai.jpg";
import Paris from "../../assets/Aboutus/paris.jpg";
import Italy from "../../assets/Aboutus/italy.jpg";

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
        <div className="absolute bottom-0 left-0 ml-[1rem] mb-[1rem] text-white font-semibold text-">
          BALI
        </div>

      </div>
          {/* right */}
          <div className="flex flex-col gap-y-5">
            <div
            className="rounded-2xl hover:scale-105 transition-all duration-300 flex relative"
              style={{
                backgroundImage: `url(${Dubai})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "328px", // Set your desired height
                minWidth: "676px",
              }}
            >
              <div className="absolute bottom-0 left-0 ml-[1rem] mb-[1rem] text-white font-semibold">
                DUBAI
              </div>
            </div>
            <div className="flex gap-x-5">
              <div
              className="rounded-2xl hover:scale-105 transition-all duration-300 flex relative"
                style={{
                  backgroundImage: `url(${Paris})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "328px", // Set your desired height
                  minWidth: "328px",
                }}
              >
                <div className="absolute bottom-0 left-0 ml-[1rem] mb-[1rem] text-white font-semibold">
                PARIS
              </div>
              </div>
              <div
              className="rounded-2xl  hover:scale-105 transition-all duration-300 felx relative"
                style={{
                  backgroundImage: `url(${Italy})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "328px", // Set your desired height
                  minWidth: "328px",
                }}
              >
                <div className="absolute bottom-0 left-0 ml-[1rem] mb-[1rem] text-white font-semibold">
                ITALY
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
