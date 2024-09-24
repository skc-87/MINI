import React from "react";
import PackageBanner from "../assets/Packages/PackagesBanner.png";
import PlaneBg from "../assets/Packages/PlaneBg.png";
import TipsAndArticles from "../Components/Packages/TipsAndArticles";
import { useState, useEffect } from "react";
import { getAllTours } from "../services/operations/tourAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import TourCard from "../Components/Home/TourCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
// import "./styles.css";

// import required modules
import {
  Pagination,
  Navigation,
  Autoplay,
  Mousewheel,
  Keyboard,
} from "swiper/modules"; // Correct import for Autoplay

const Package = () => {
  const [tours, setTours] = useState([]);

  const getTours = async () => {
    try {
      const res = await getAllTours();
      console.log("Tours at packages page -> ", res);
      setTours(res?.response);
      console.log("Usestate tours -> ", tours);
    } catch (e) {}
  };

  useEffect(() => {
    getTours();
  }, []);

  return (
    <div className="overflow-x-hidden h-auto overflow-y-hidden ">
      {/* Banner */}
      <div
        className="mx-auto h-[500px] w-full bg-cover bg-center flex items-center justify-center "
        style={{
          backgroundImage: `url(${PackageBanner})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          // height:"500px"
          width: "100vw",
          // filter:"blur(5px)"
        }}
      >
        <div className="flex   text-white">
          <div>
            <p className="text-[3rem]  font-semibold tracking-widest text-center text-gray-100 ">
              HAND PICKED PACKAGES FOR YOU
            </p>
          </div>
        </div>
      </div>

      {/* Tours */}
      <div className="flex flex-col gap-y-[2rem] mt-[5rem] w-[90%] h-auto mx-auto ">
        {/* WORLD TOUR */}
        <div className="flex flex-col gap-y-[2rem]">
          <p className="text-start font-thin text-[3rem]">International Tour</p>

          <div>
            {tours?.length ? (
              <Swiper
                spaceBetween={20}
                slidesPerView={3}
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: true,
                }}
                loop={true}
                className="h-[400px] "
              >
                {tours?.map((tour, index) => (
                  <div
                    key={index}
                    className="  shadow-2xl hover:scale-105 transition-all duration-300  py-[1rem] rounded-xl"
                  >
                    {tour.category == "World Tour" && (
                      <SwiperSlide className=" ">
                        <TourCard tour={tour} />
                      </SwiperSlide>
                    )}
                  </div>
                ))}
              </Swiper>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/* National TOUR */}
        <div className="flex flex-col gap-y-[2rem]">
          <p className="text-start font-thin text-[3rem]">National Tour</p>

          <div>
            {tours?.length ? (
              <Swiper
                spaceBetween={20}
                slidesPerView={3}
                cssMode={true}
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: true,
                }}
                loop={true}
                className="h-[400px] "
              >
                {tours?.map((tour, index) => (
                  <div
                    key={index}
                    className="  shadow-2xl hover:scale-105 transition-all duration-300  py-[1rem] rounded-xl"
                  >
                    {tour.category == "National" && (
                      <SwiperSlide className=" ">
                        <TourCard tour={tour} />
                      </SwiperSlide>
                    )}
                  </div>
                ))}
              </Swiper>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>

      {/* plane Img */}
      <div className="mt-[5rem]">
        <img
          src={PlaneBg}
          alt=""
          style={{ width: "100%", height: "50%", objectFit: "cover" }}
        />
      </div>

      {/* TIPS & ARICLE*/}
      <div className="mx-auto bg-gray-200">
        <div className="w-11/12 flex justify-between  items-center mx-auto pt-[3rem]">
          {/* Left side */}
          <div className="flex flex-col items-start w-[595px] gap-y-7">
            <p className="font-bold text-4xl text-center">Tips & Article</p>
            <p className="text-start text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta,
              suscipit laborum autem fugiat ipsam et mollitia nesciunt
              accusamus! Ex asperiores quam amet consequuntur assumenda
              recusandae voluptatibus. Itaque labore deleniti beatae?
            </p>
          </div>

          {/* Right side */}
          <div className="flex items-center">
            <button className="bg-black text-white px-4 py-2 rounded-full hover:scale-95 transition-all duration-300 cursor-pointer">
              <p>Veiw More</p>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-[5rem] bg-gray-200 pb-[5rem]">
        <TipsAndArticles />
      </div>
    </div>
  );
};

export default Package;
