import React from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const TourCard = ({ tour }) => {
  console.log("Hello from tour card");
  console.log("Tour in tour card -> ", tour);

  return (
    <div className="flex flex-col gap-y-[1rem] ">
      <Link to={`/tour/${tour?._id}`}>
        <div>
          {/* image */}
          <div>
            {tour?.image &&
              ((
                <img src={tour.image} alt={tour.name} className="rounded-xl" />
              ) || <Skeleton />)}
          </div>
          {/* title */}
          <div>
            {tour?.title && (
              <h1 className=" font-bold text-gray-800">{tour.title}</h1>
            )}
          </div>
          {/* overview */}
          <div>
            {tour?.overview && (
              <p className="text-gray-500 text-sm  tracking-widest">
                {tour?.overview}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TourCard;
