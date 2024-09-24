import { apiConnector } from "../apiconnector";
import { tourEndpoints } from "../api";
import  toast  from "react-hot-toast";

const { GET_ALL_TOURS, GET_TOURS_BY_ID } = tourEndpoints;

export const getAllTours = async () => {
  const toastId = toast.loading("Fetching Tours");
  let result = [];

  try {
    const response = await apiConnector("GET", GET_ALL_TOURS);

    console.log("All tours at front-end -> ", response?.data);

    if (!response?.data?.success) {
      throw new Error("Couldn't fetch course category");
    }

    result = response?.data;
    toast.success("Tours Fetched successfully");
  } catch (e) {
    console.log("GET ALL Tours API Error -> ", e);
    toast.error(e.message);
    return result;
  }

   toast.dismiss(toastId);
  return result;
};

export const getToursById = async (tourId) => {
  const toastId = toast.loading("Fetching Tours");
  let result = [];
  console.log("Tour id -> ", tourId);

  try {
    const response = await apiConnector("POST", GET_TOURS_BY_ID, { tourId });

    console.log("All tours at front-end -> ", response?.data);

    if (!response?.data?.success) {
      throw new Error("Couldn't fetch course category");
    }

    result = response?.data;
    toast.success("Tour Fetched successfully");
  } catch (e) {
    console.log("GET ALL Tours API Error -> ", e);
    toast.error(e.message);
    return result;
  }

  toast.dismiss(toastId);
  return result;
};
