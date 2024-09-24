import React from "react";
import { useState, useEffect } from "react";
import { getToursById } from "../services/operations/tourAPI";
import { useParams } from "react-router-dom";
import Template from "../Components/Auth/Template";
import Logout from "../Components/Auth/Logout";
import { useSelector } from "react-redux";
import LogInBg from "../assets/Auth/LogInBg.jpg";
import LogInBanner from "../assets/Auth/LogInBanner.jpg";
import { MdOutlineClose } from "react-icons/md";
import Skeleton from "react-loading-skeleton";

const TourDetails = () => {
  // const user = localStorage.getItem("user")
  //   ? JSON.parse(localStorage.getItem("user"))
  //   : null;
  // console.log("USer -> ", user);
  // const token = user?.token;

  // const [userActive,setUserActive] = useState();

  // useEffect(() => {
  //   setUserActive(user);
  // },[user])

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

  const [tour, setTour] = useState([]);

  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const tourId = id;
  console.log("Tour Id on frontend: ", tourId);

  // const { token } = useSelector((state) => state.auth)

  const clickHandler = () => {
    setModal(true);
  };

  const closeModalHandler = () => {
    setModal(false);
  };

  const fetchTour = async () => {
    try {
      const res = await getToursById(tourId);
      console.log("Tours at tour details page -> ", res);
      setTour(res?.tourDetails[0]);
      console.log("Usestate tours -> ", tour);
    } catch (e) {}
  };

  useEffect(() => {
    fetchTour();
  }, []);

  return (
    <div
      className={`w-full h-auto pb-[5rem] bg-gray-300 
     
      `}

      //  ${modal ? " filter blur-sm" : ""}
    >
      {/* image and title*/}
      <div className="relative flex  z-1 ">
        <div className="absolute w-full z-0 ">
          {(
            <img
              src={tour?.image}
              alt={tour?.name}
              className="object-cover h-[400px] w-full  blur-sm "
            />
          ) }
        </div>

        <div className="z-1 absolute text-white flex text-start flex-col gap-y-[1rem] items-start justify-center my-auto top-[7rem] left-[5rem]">
          <p className="text-[4rem] font-bold">{tour?.title || <Skeleton />}</p>
          <p className="text-[1rem] mt-4 leading-tight w-[800px]">
            {tour?.conclusion || <Skeleton />}
          </p>
        </div>
      </div>

      {/* Things todo */}
      <div className="w-11/12 h-auto px-[2rem] py-[2rem] rounded-xl shadow-xl z-2 mt-[450px] mx-auto bg-gray-200  flex flex-col justify-center items-center">
        {/*  title*/}
        <div className=" py-4 mb-5 w-[20%]">
          <p className=" font-bold ">Things to do in {tour?.title || <Skeleton animation="wave" />}</p>
          <div className="bg-slate-600 h-[2px] mt-2"></div>
        </div>

        {/* cards */}
        <div className=" grid grid-cols-3 gap-y-8  mx-auto ">
          {tour?.thingsToDo?.map((element, index) => {
            return (
              <div className="flex flex-col gap-y-3 w-[70%] shadow-xl mx-auto pb-3 bg-white rounded-xl hover:scale-105 transition-all duration-300">
                {/* image */}
                <div className="rounded-xl">
                  <img src={element?.image || <Skeleton animation="wave" />} className="rounded-t-xl" />
                </div>
                <div>
                  <p>{element?.title ||  <Skeleton animation="wave" />}</p>
                </div>
                <div>
                  <p className="text-sm px-1">{element?.description || <Skeleton animation="wave" />}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Book your trip */}
      <div className="w-11/12 h-auto px-[2rem] py-[2rem] rounded-xl shadow-xl z-2  mx-auto mt-10 text-start bg-white flex flex-col justify-center items-center">
        {/* title */}
        {/* <div>
          <p className="text-start font-bold">
            Book Your Trip to {tour?.title}
          </p>
          <div className="bg-slate-600 h-[2px] mt-2"></div>
        </div> */}

        {/* Hotels */}
        <div>
          <div className="flex flex-col mt-5 gap-y-5 mb-5">
            <p className="text-4xl font-medium">Stays in <span className="capitalize"> {tour?.title}</span></p>
            <p className="text-2xl">Our Partenership</p>
          </div>
          {/* hotels */}
          <div className="flex  gap-x-5 justify-between ">
            {tour?.hotels?.map((hotel, index) => (
              <div
                key={index}
                className=" flex flex-col justify-between items-center bg-slate-300 py-[1rem] px-[1rem] rounded-xl hover:scale-105 transition-all duration-300"
              >
                {/* image */}
                <div className=" rounded-xl">
                  <img src={hotel?.image} className="rounded-xl w-[250px]" />
                </div>
                {/*title and description  */}
                <div>
                  <p className="text-[1.5rem] mt-2 tracking-widest font-semibold">{hotel?.name}</p>
                  <p>{hotel?.description}</p>
                </div>
                {/* Price */}
                <div className="flex flex-col items-center">
                  <p className="text-[1.5rem]">Average Price</p>
                  <p className="text-[3rem]">₹ {hotel?.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="w-11/12 h-auto px-[2rem] py-[2rem] rounded-xl shadow-xl z-2  mx-auto mt-10 text-start bg-zinc-100">
        <div className=" flex flex-col mx-auto justify-center items-center text-5xl">
          <div className="mb-5 font-semibold">
            <p>{tour?.title}</p>
            <div className="bg-slate-600 h-[2px] mt-2"></div>
          </div>

          <div className="mb-5">
            <p className="text-lg font-medium leading-relaxed">
              {tour?.conclusion}
            </p>
          </div>

          <div className="flex flex-col gap-y-5">
            {tour?.about?.map((data, index) => (
              <div key={index}>
                <p className="text-start font-semibold text-3xl mb-2 mt-4">
                  {data?.title}
                </p>
                <p className="text-start font-medium text-sm leading-relaxed ">
                  {data?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* restraunts sugestion */}
      <div className="w-11/12 h-auto px-[2rem] py-[2rem] rounded-xl shadow-xl z-2  mx-auto  mt-10 text-start flex flex-col gap-y-5 bg-white">
        <div className="flex flex-col justify-center items-center ">
          <p>Restraunt Suggestion</p>
          <div className="bg-slate-600 h-[2px] mt-2 w-[21rem] "></div>
        </div>

        <div className="flex gap-x-5">
          {tour?.restruantSuggestions?.map((restraunt, index) => (
            <div
              key={index}
              className="flex flex-col gap-y-2 px-4 py-4 shadow-xl rounded-xl hover:scale-105 transition-all duration-300 "
            >
              <div>
                <img src={restraunt?.image} className="rounded-xl w-[250px]" />
              </div>

              <div className="flex flex-col gap-y-2">
                <p className="text-[1.5rem] mt-2 tracking-widest font-semibold text-center">{restraunt?.name}</p>
                <p className="text-[1rem] leading-tight">
                  {restraunt?.description}
                </p>
              </div>
            </div>
          ))}



        </div>
      </div>

      {/* Auth */}

      <div className="mx-auto mt-[5rem] flex justify-center items-center ">
        {!modal && (
          <div className=" ">
            <button
              className="bg-[#5AB2FF] border px-4 py-3 rounded-[2rem] text-center cursor-pointer hover:scale-95 transition-all duration-300
        "
              onClick={clickHandler}
            >
              Book your trip
            </button>
          </div>
        )}

        <div className="relative bottom-[20%] z-40">
          {modal && (
            <div
              className=" mx-auto w-[800px] h-auto items-center rounded-3xl flex justify-start  "
              style={{
                backgroundImage: `url(${LogInBanner})`,
                backgroundPosition: "top", // Center horizontally
                backgroundSize: "cover", // Cover the entire container
                backgroundRepeat: "no-repeat", // Prevent repeating the background image
              }}
            >
              <div className="absolute -right-[4rem] top-0 z-10 bg-white px-1 py-1 rounded-full h-[3rem] w-[3rem] flex justify-center items-center hover:scale-95 transition-all duration-300 ">
                <button onClick={closeModalHandler}>
                  <MdOutlineClose />
                </button>
              </div>

              <div className="">
                <Template />
              </div>

            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default TourDetails;
