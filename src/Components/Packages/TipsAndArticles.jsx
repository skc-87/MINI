import React from "react";
import TipsAndArticleBanner from "../../assets/Packages/TipsAndArticlesBanner.png";

const TipsAndArticles = () => {
  return (
    <div className="flex justify-evenly  w-11/12 text-black ">
      {/* left */}
      <div className="w-[60%] ">
        <div className=" flex-col ">
          {/* top */}
          <div className="flex flex-col bg-white w-[450px] mx-auto  shadow-lg px-3 py-2 gap-y-[1rem] rounded-xl hover:scale-105 transition-all duration-300">
            {/* text */}
            <div className=" flex flex-col items-start ">

              <p className="text-[2rem] font-semibold">Perfect | Tips</p>
              <p className="text-[1.5rem]  font-semibold tracking-widest text-start">
                9 Popular Travel Destintion on Sale in 2024
              </p>

              {/* dash */}
              <div className="bg-black h-[2px] w-[30px] mt-[2rem] "></div>

              <p className="mt-7 text-sm tarcking-widest text-start">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna
              </p>
            </div>
            {/* button */}
            <div className="flex justify-start">
              <button className=" text-blue-500 rounded-full px-2 font-thin tracking-widest hover:scale-95 transition-all duration-300 text-[1rem] ">
                Read More
              </button>
            </div>
          </div>

          {/* bottom */}
          <div className="flex flex-col mt-[3rem] bg-white w-[450px] mx-auto  shadow-lg px-3 py-2 gap-y-[1rem] rounded-xl hover:scale-105 transition-all duration-300">
            {/* text */}
            <div className=" flex flex-col items-start ">

              <p className="text-[2rem] font-semibold">Perfect | Tips</p>
              <p className="text-[1.5rem]  font-semibold tracking-widest text-start">
                9 Popular Travel Destintion on Sale in 2024
              </p>

              {/* dash */}
              <div className="bg-black h-[2px] w-[30px] mt-[2rem] "></div>

              <p className="mt-7 text-sm tarcking-widest text-start">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna
              </p>
            </div>
            {/* button */}
            <div className="flex justify-start">
              <button className=" text-blue-500 rounded-full px-2 font-thin tracking-widest hover:scale-95 transition-all duration-300 text-[1rem] ">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="w-[35%] ">
        <div className="shadow-xl bg-white rounded-[1rem] pb-5 w-[full] h-[630px]  hover:scale-105 transiton-all duration-300 ">
          {/* top */}
          <div className="w-full">
            <img src={TipsAndArticleBanner} className="rounded-t-[1rem]" />
          </div>

          {/* bottom */}
          <div className="flex flex-col w-[90%] mx-auto gap-y-8 mt-3">
            {/* text */}
            <div className=" flex flex-col items-start">
              <p className="text-[1.5rem] font-semibold">Stories | Tips</p>
              <p className="text-[1rem] tracking-widest">
                Travel Stories For Now and the Future
              </p>
              <p className="text-sm text-start text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna
              </p>
            </div>

            {/* button */}
            <div className="flex justify-start ">
              <button className="text-blue-500 rounded-full px-2 font-thin tracking-widest hover:scale-95 transition-all duration-300 text-[1rem] ">
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipsAndArticles;
