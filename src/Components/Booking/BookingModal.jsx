import React from "react";

const BookingModal = ({ modalData }) => {
  console.log("Data inside modal -> ", modalData);

  return (
    <div className="bg-white shadow-xl w-[1400px] h-[600px] z-10 rounded-xl flex justify-center  ">
      {/* Left  */}
      <div className="flex flex-col w-[50%] items-center border-r-2">
        {/* image */}
        <div className="w-[70%]"><img src={modalData?.image}/></div>
      </div>
      {/* right */}
      <div className="w-[50%]">Right</div>
    </div>
  );
};

export default BookingModal;
