import React from "react";
import Bcgg from "../../assets/Aboutus/Banner2.jpg";
import { GrGroup } from "react-icons/gr";
import { MdOutlinePersonOutline } from "react-icons/md";
import { LiaMountainSolid } from "react-icons/lia";
import { PiMedal } from "react-icons/pi";
import CountUp from 'react-countup';

const Content2 = () => {
  return (
    <div>
      <div
        className=" flex relative overflow-hidden text-white min-h-[860px] justify-center items-center mb-8"
        style={{
          backgroundImage: `url(${Bcgg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "520px", // Set your desired height
        }}
      >
        {/* banner 2 div */}
        <div className="flex justify-evenly w-full">
          <div className="flex">
            <GrGroup size={90} />
            <div className="pl-8">
              <p className="font-bold font-2xl mb-5"><CountUp delay={3} end={126} />+</p>
              <p className="font-normal	text-lg ">Satisfied Client</p>
            </div>
          </div>
          <div className="flex">
            <MdOutlinePersonOutline size={90} />
            <div className="pl-8">
              <p className="font-bold font-2xl mb-5"><CountUp delay={3} end={230} />+</p>
              <p className="font-normal	text-lg ">New Traveller</p>
            </div>
          </div>
          <div className="flex">
            <LiaMountainSolid size={90} />
            <div className="pl-8">
              <p className="font-bold font-2xl mb-5"><CountUp delay={3} end={450} />+</p>
              <p className="font-normal	text-lg ">Destinations</p>
            </div>
          </div>
          <div className="flex">
            <PiMedal size={90} />
            <div className="pl-8">
              <p className="font-bold font-2xl mb-5"><CountUp delay={3} end={65} />+</p>
              <p className="font-normal	text-lg ">Awards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content2;
