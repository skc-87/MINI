import React from "react";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import Skeleton from "react-loading-skeleton";

import { getToursById } from "../services/operations/tourAPI";


import Room1 from "../assets/Packages/room-1.jpg"
import Room2 from "../assets/Packages/room-2.jpg"
import Room3 from "../assets/Packages/room-3.jpg"




const States = () => {
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
          {
            <img
              src={tour?.image}
              alt={tour?.name}
              className="object-cover h-[400px] w-full  blur-sm "
            />
          }
        </div>

        <div className="z-1 absolute text-white flex text-start flex-col gap-y-[1rem] items-start justify-center my-auto top-[7rem] left-[5rem]">
          <p className="text-[4rem] font-bold">{tour?.title || <Skeleton />}</p>
          <p className="text-[1rem] mt-4 leading-tight w-[800px]">
            {tour?.conclusion || <Skeleton />}
          </p>
        </div>
      </div>

      {/* Best Places  */}
      <div className="w-11/12 h-auto px-[2rem] py-[2rem] rounded-xl shadow-xl z-2 mt-[450px] mx-auto bg-gray-200  flex flex-col justify-center items-center">
        {/*  title*/}
        <div className=" py-4 mb-5 w-[20%]">
          <p className=" font-bold ">
            Best places in {tour?.title || <Skeleton animation="wave" />}
          </p>
          <div className="bg-slate-600 h-[2px] mt-2"></div>
        </div>

        {/* cards */}
        <div className=" grid grid-cols-3 gap-y-8  mx-auto ">
          {tour?.thingsToDo?.map((element, index) => {
            return (
              <div className="flex flex-col gap-y-3 w-[70%] shadow-xl mx-auto pb-3 bg-white rounded-xl hover:scale-105 transition-all duration-300">
                {/* image */}
                <div className="rounded-xl">
                  <img
                    src={element?.image || <Skeleton animation="wave" />}
                    className="rounded-t-xl"
                  />
                </div>
                <div>
                  <p>{element?.title || <Skeleton animation="wave" />}</p>
                </div>
                <div>
                  <p className="text-sm px-1">
                    {element?.description || <Skeleton animation="wave" />}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <section className="py-20" id="room">
        <div className="text-center px-4">
          <p className="text-sm font-medium text-gray-500 mb-2">ROOMS</p>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Hand Picked Rooms
          </h2>
        </div>

        <div className="grid gap-y-6 sm:grid-cols-2 lg:grid-cols-3 w-[90%] mx-auto mt-12 gap-x-4">
          {/* Room 1 */}
          <div className="shadow-lg rounded-lg overflow-hidden bg-slate-200 hover:scale-105 transition-all duration-200">
            <img src={Room1} alt="room" className="w-full" />
            <div className="bg-white p-4 flex items-center justify-between -translate-y-1/2 mx-4 rounded-lg shadow-lg">
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Deluxe Suite
                </h4>
                <p className="text-gray-500 text-sm">
                  Well-appointed rooms designed for guests who desire more.
                </p>
              </div>
              <h3 className="text-secondary text-lg font-semibold">
                ₹399 <span className="text-sm text-gray-500">/night</span>
              </h3>
            </div>
          </div>

          {/* Room 2 */}
             <div className="shadow-lg rounded-lg overflow-hidden bg-slate-200 hover:scale-105 transition-all duration-200">
            <img src={Room2} alt="room" className="w-full" />
            <div className="bg-white p-4 flex items-center justify-between -translate-y-1/2 mx-4 rounded-lg shadow-lg">
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Family Suite
                </h4>
                <p className="text-gray-500 text-sm">
                  Consist of multiple rooms and a common living area.
                </p>
              </div>
              <h3 className="text-secondary text-lg font-semibold">
                ₹599 <span className="text-sm text-gray-500">/night</span>
              </h3>
            </div>
          </div>

          {/* Room 3 */}
              <div className="shadow-lg rounded-lg overflow-hidden bg-slate-200 hover:scale-105 transition-all duration-200">
            <img src={Room3} alt="room" className="w-full" />
            <div className="bg-white p-4 flex items-center justify-between -translate-y-1/2 mx-4 rounded-lg shadow-lg">
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Luxury Penthouse
                </h4>
                <p className="text-gray-500 text-sm">
                  Top-tier accommodations usually on the highest floors of a
                  hotel.
                </p>
              </div>
              <h3 className="text-secondary text-lg font-semibold">
                ₹799 <span className="text-sm text-gray-500">/night</span>
              </h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default States;
