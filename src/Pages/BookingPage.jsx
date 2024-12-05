import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import tajMahalImage from "../assets/BookingPage/tajmahal.png";
import { bookTrip } from "../services/operations/paymentAPI";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const BookingPage = () => {
  const [today, setToday] = useState("");
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [seniorCount, setSeniorCount] = useState(0);
  const [guidedTour, setGuidedTour] = useState(false);
  const [audioGuide, setAudioGuide] = useState(false);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const { price } = useParams();
  const basePrice = parseFloat(price);
  console.log("Price -> " + price);

  // Pricing Constants
  const ticketPrices = {
    adult: 499,
    child: 249,
    senior: 299,
    guidedTour: 99,
    audioGuide: 49,
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const currentDate = new Date();

    // Extract day, month, and year
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    // Format the date as yyyy-mm-dd
    const today = `${year}-${month}-${day}`;
    setToday(today);
  }, []);

  useEffect(() => {
    const ticketTotal =
      basePrice +
      adultCount * ticketPrices.adult +
      childCount * ticketPrices.child +
      seniorCount * ticketPrices.senior;
    const extrasTotal =
      (guidedTour ? ticketPrices.guidedTour : 0) +
      (audioGuide ? ticketPrices.audioGuide : 0);
    setTotal(ticketTotal + extrasTotal);
  }, [adultCount, childCount, seniorCount, guidedTour, audioGuide]);

  // book trip
  const handleBookTrip = () => {
    if (total <= basePrice) {
      toast.error("Select some options to book your trip");
      return;
    }

    console.log("Going to book trip");
    bookTrip(total, dispatch);
    console.log("Booked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-700">Tourism Booking</h1>
        <p className="text-lg text-gray-600 mt-2">
          Book your trip effortlessly!
        </p>
      </header>
      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="flex flex-col">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 duration-500 transition-all">
            <img
              src="https://images.pexels.com/photos/774282/pexels-photo-774282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Taj Mahal"
              className="w-full"
            />
          </div>

          {/* Animated Cards */}
          <div className="flex flex-col gap-y-6 pt-5 items-center">
            <div className="flex w-[100%] gap-x-5">
              {/* Animated Card 1 */}
              <motion.div
                className="rounded-lg shadow-lg flex items-center justify-center text-white text-2xl font-semibold cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0 }}
              >
                <img
                  src="https://images.pexels.com/photos/190589/pexels-photo-190589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="rounded-lg"
                />
              </motion.div>
              {/* Animated Card 2 */}
              <motion.div
                className="rounded-lg shadow-lg flex items-center justify-center text-white text-2xl font-semibold cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src="https://images.pexels.com/photos/2528414/pexels-photo-2528414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="rounded-lg"
                />
              </motion.div>
            </div>

            {/* Animated Card 3 */}
            <motion.div
              className="rounded-lg shadow-lg flex items-center justify-center text-white text-2xl font-semibold cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <img
                src="https://images.pexels.com/photos/2259636/pexels-photo-2259636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="rounded-lg"
              />
            </motion.div>
          </div>
        </div>

        {/* Right Section - Booking Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Visit Date */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Visit Date
            </label>
            <input
              type="date"
              min={today} // Ensures the date cannot be in the past
              className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Ticket Details Card */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 shadow-md mb-6">
            <h2 className="text-xl font-bold text-gray-700">Ticket Details</h2>
            <div className="space-y-4 mt-4">
              {[{
                label: "Adult",
                price: ticketPrices.adult,
                count: adultCount,
                setCount: setAdultCount,
              },
              {
                label: "Child",
                price: ticketPrices.child,
                count: childCount,
                setCount: setChildCount,
              },
              {
                label: "Senior Citizen",
                price: ticketPrices.senior,
                count: seniorCount,
                setCount: setSeniorCount,
              }].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm lg:text-base"
                >
                  <span>
                    {item.label} (₹{item.price})
                  </span>
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        if (item.count > 0) item.setCount(item.count - 1);
                      }}
                      className="px-3 py-1 bg-indigo-100 hover:bg-indigo-200 rounded-l"
                    >
                      -
                    </button>
                    <span className="px-4">{item.count}</span>
                    <button
                      onClick={() => {
                        item.setCount(item.count + 1);
                      }}
                      className="px-3 py-1 bg-indigo-100 hover:bg-indigo-200 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Table */}
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-4 shadow-md mb-6">
            <h2 className="text-xl font-bold text-gray-700">Pricing Table</h2>
            <div className="text-gray-600 mt-4 space-y-2 mx-auto">
              <div className="flex justify-between">
                <p> Base Price:</p>
                <p> ₹{basePrice}</p>
              </div>
              <div className="flex justify-between">
                <p> Adult Tickets:</p>
                <p> ₹{adultCount * ticketPrices.adult}</p>
              </div>
              <div className="flex justify-between">
                <p> Child Tickets:</p>
                <p> ₹{childCount * ticketPrices.child}</p>
              </div>
              <div className="flex justify-between">
                <p> Senior Tickets:</p>
                <p> ₹{seniorCount * ticketPrices.senior}</p>
              </div>
              {guidedTour && (
                <div className="flex justify-between">
                  <p> Guided Tour:</p>
                  <p> ₹{ticketPrices.guidedTour}</p>
                </div>
              )}
              {audioGuide && (
                <div className="flex justify-between">
                  <p> Audio Guide:</p>
                  <p> ₹{ticketPrices.audioGuide}</p>
                </div>
              )}
              <div className="flex justify-between font-bold">
                <p>Total:</p>
                <p> ₹{total}</p>
              </div>
            </div>
          </div>

          {/* Extras Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-sm lg:text-base">
              <label className="block text-gray-700 font-semibold">Extras</label>
            </div>
            <div className="flex items-center gap-x-3">
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  checked={guidedTour}
                  onChange={() => setGuidedTour(!guidedTour)}
                />
                <span>Guided Tour (₹99)</span>
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  checked={audioGuide}
                  onChange={() => setAudioGuide(!audioGuide)}
                />
                <span>Audio Guide (₹49)</span>
              </div>
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBookTrip}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-indigo-700"
          >
            Book Your Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
