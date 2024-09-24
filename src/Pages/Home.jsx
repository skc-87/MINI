import React, { useEffect, useState } from "react";
import HeroBg from "../assets/Home/HeroBg.jpg";
import WhyChooseUsBg from "../assets/Home/Whychooseusbg.png";
// import Backgrd from "../assets/Aboutus/Banner.png"
import Navbar from "../Components/Navbar/Navbar1";
import { getAllTours } from "../services/operations/tourAPI";
import TourCard from "../Components/Home/TourCard";
import BookingModal from "../Components/Booking/BookingModal";
import Slider from "../Components/Slider/CardSlider";
import Skeleton from "react-loading-skeleton";

import { FcCustomerSupport } from "react-icons/fc";
import Bestquality from "../assets/Home/bestquality.png";
import Bestprice from "../assets/Home/bestprice.png";
import Review from "../assets/Home/review.png";
import Airplane from "../assets/Home/airplane.png";
import { Swiper, SwiperSlide } from "swiper/react";

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

const Home = () => {
  const [tours, setTours] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState();

  const getTours = async () => {
    try {
      const res = await getAllTours();
      console.log("Tours at home page -> ", res);
      setTours(res?.response);
      console.log("Usestate tours -> ", tours);
    } catch (e) {}
  };

  useEffect(() => {
    getTours();
  }, []);

  const clickHandler = async () => {
    setModal(!modal);
    console.log();
    setModalData();
  };

  return (
    <div className="flex flex-col w-full h-auto gap-y-[4rem] mb-10 pb-5 ">
      {/* Hero section */}
      <div
        className="flex items-center bg-local h-[500px] "
        style={{
          backgroundImage: `url(${HeroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // minHeight: "860px", // Set your desired height
        }}
      >
        {/* left */}
        <div className="flex flex-col items-start ml-[5rem] gap-y-[1rem] text-white">
          <div className="text-start">
            <p className="text-[4rem] font-bold  mb-3">Make in</p>
            <p className="text-[4rem] font-bold  mb-3">your journey</p>
          </div>
          <div className="text-start ">
            <p className="text-[1rem]">
              Explore the world with what you love beautiful
            </p>
            <p className="text-[1rem] -mt-4">natural beauty</p>
          </div>
          {/* <div><img src={HeroBg}/></div> */}
          <div className="text-start mt-[2rem]">
            <p className="text-[1rem]">
              Popular Place : Bali, Istanbul, Rome, Paris.
            </p>
          </div>
        </div>
      </div>

      {/* Explorer section */}
      <div className=" h-[500px] w-11/12 mx-auto flex flex-col items-center justify-center relative">
        {/* Written */}
        <div className="flex flex-col gap-y-3">
          <div className="">
            <p className="text-[2rem] font-bold">Explore new worlds with</p>
            <p className="text-[2rem] font-bold">exotic natural scenery</p>
          </div>

          <div>
            <p className="text-[1.5rem] font-light">
              Explore the world with what you love beautiful natural beauty.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="flex gap-x-[1rem] mt-[1rem] w-[90%] h-auto">
          {tours?.length ? (
            <Swiper
              spaceBetween={20}
              slidesPerView={3}
              cssMode={true}
              navigation={true}
              pagination={true}
              // mousewheel={true}
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

                  <SwiperSlide className=" ">
                    <TourCard tour={tour} />
                  </SwiperSlide>
                  
                </div>
              ))}
            </Swiper>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {/* why choose us */}
      <div
        className=" h-[633px] image-fit flex flex-col justify-start items-center gap-y-[5rem]  "
        style={{
          backgroundImage: `url(${WhyChooseUsBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // minHeight: "860px", // Set your desired height
        }}
      >
        {/* text */}
        <div className="text-white mt-[3rem] flex flex-col gap-y-[1.5rem] ">
          <p className="font-bold text-[4rem]">Why choose Us?</p>
          <p className="text-[1.5rem] font-bold tracking-widest text-[#3b3b3be7] ">
            Our services have been trusted by world travelers
          </p>
        </div>

        {/* cards */}
        <div className="flex justify-between w-[80%] mx-auto">
          {/* card 1 */}
          <div className="bg-white w-[300px] h-[350px] flex flex-col justify-center items-start gap-y-7 px-5 rounded-xl shadow-lg hover:scale-105 duration-300 transition-all">
            <div className="bg-black w-[100px] h-[100px] flex justify-center items-center rounded-xl py-2px-1 ">
              {/* <img src={ServiceIcon}  alt="Service Icon"/> */}
              {/* <ServiceIcon/> */}
              <img src={Bestquality} />
            </div>
            <div>
              <p className="text-start font-semibold text-[1.5rem]">
                Best Service
              </p>
              <p className="text-start  text-[1rem] text-gray-400 mt-4 leading-tight font-semibold ">
                our service is reliable and convenient, our service is quality.
              </p>
            </div>

            <div className="flex justify-start ">
              <button className="text-start text-[1rem] font-thin text-blue-500 ">
                Learn More
              </button>
            </div>
          </div>

          {/* card 2 */}
          <div className="bg-white w-[300px] h-[350px] flex flex-col justify-center items-start gap-y-7 px-5 rounded-xl shadow-lg hover:scale-105 duration-300 transition-all">
            <div className="bg-black w-[100px] h-[100px] flex justify-center items-center rounded-xl py-2px-1 ">
              {/* <img src={ServiceIcon}  alt="Service Icon"/> */}
              {/* <ServiceIcon/> */}
              <img src={Bestprice} />
            </div>
            <div>
              <p className="text-start font-semibold text-[1.5rem]">
                Price Guarantee
              </p>
              <p className="text-start  text-[1rem] text-gray-400 mt-4 leading-tight font-semibold ">
                our service is reliable and convenient, our service is quality.
              </p>
            </div>

            <div className="flex justify-start ">
              <button className="text-start text-[1rem] font-thin text-blue-500">
                Learn More
              </button>
            </div>
          </div>

          {/* card 3 */}
          <div className="bg-white w-[300px] h-[350px] flex flex-col justify-center items-start gap-y-7 px-5 rounded-xl shadow-lg hover:scale-105 duration-300 transition-all">
            <div className="bg-black w-[100px] h-[100px] flex justify-center items-center rounded-xl py-2px-1 ">
              {/* <img src={ServiceIcon}  alt="Service Icon"/> */}
              {/* <ServiceIcon/> */}
              <img src={Review} />
            </div>
            <div>
              <p className="text-start font-semibold text-[1.5rem]">
                Handpicked Hotels
              </p>
              <p className="text-start  text-[1rem] text-gray-400 mt-4 leading-tight font-semibold ">
                our service is reliable and convenient, our service is quality.
              </p>
            </div>

            <div className="flex justify-start ">
              <button className="text-start text-[1rem] font-thin text-blue-500">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* our parteners */}
      <div className="w-11/12 flex flex-col gap-y-[4rem] mx-auto ">
        {/* text */}
        <div className="flex flex-col gap-y-3">
          <p className="text-[2rem] font-semibold tracking-widest">
            Our Tour Partners
          </p>
          <p className="text-[1rem] font-semibold text-gray-400 leading-tight">
            There are many variation of passage of lorem ipsum available but{" "}
            <br /> the majority have suffered alteration{" "}
          </p>
        </div>
        {/* parteners */}
        <div className="flex mx-auto gap-x-[4rem]">
          <div>
            {/* <img src={Airplane} /> */}
            <p>Katana</p>
          </div>
          <p>travava</p>
          <p>bigwi</p>
          <p>Booking.com</p>
          <p>Jakmean</p>
        </div>
      </div>
    </div>
  );
};
export default Home;
