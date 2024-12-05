import React, { useState } from "react";

const BillingPackage = () => {
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const basePackageCost = 25000;

  const activities = [
    { name: "Camel Riding", desc: "Enjoy a unique desert safari experience.", price: 2000, img: "https://via.placeholder.com/300" },
    { name: "Cultural Dance", desc: "Experience the vibrant traditional dance forms.", price: 1500, img: "https://via.placeholder.com/300" },
    { name: "Folk Songs", desc: "Listen to the soulful music of Rajasthan.", price: 1000, img: "https://via.placeholder.com/300" },
    { name: "Rajasthani Cuisine", desc: "Taste the authentic dishes of Rajasthan.", price: 1200, img: "https://via.placeholder.com/300" },
    { name: "Desert Camping", desc: "Spend a night under the stars in the desert.", price: 3000, img: "https://via.placeholder.com/300" },
    { name: "Village Walk", desc: "Explore the rustic charm of Rajasthani villages.", price: 1000, img: "https://via.placeholder.com/300" },
  ];

  const touristPlaces = [
    { city: "Jaipur", place: "Amber Fort", price: 500 },
    { city: "Jaipur", place: "Hawa Mahal", price: 300 },
    { city: "Jodhpur", place: "Mehrangarh Fort", price: 700 },
    { city: "Udaipur", place: "City Palace", price: 600 },
    { city: "Udaipur", place: "Lake Pichola", price: 400 },
    { city: "Jaisalmer", place: "Sam Sand Dunes", price: 800 },
  ];

  // Manage activity selection
  const toggleActivity = (activity) => {
    const isSelected = selectedActivities.includes(activity);
    setSelectedActivities(isSelected ? selectedActivities.filter((a) => a !== activity) : [...selectedActivities, activity]);
  };

  // Manage ticket selection
  const toggleTicket = (ticket) => {
    const isSelected = selectedTickets.find(t => t.place === ticket.place);
    if (isSelected) {
      setSelectedTickets(selectedTickets.filter((t) => t.place !== ticket.place));
    } else {
      setSelectedTickets([...selectedTickets, { ...ticket, quantity: 1 }]);
    }
  };

  // Increment or decrement ticket quantity
  const updateTicketQuantity = (ticket, operation) => {
    setSelectedTickets(selectedTickets.map((t) =>
      t.place === ticket.place
        ? { ...t, quantity: operation === "+" ? t.quantity + 1 : Math.max(t.quantity - 1, 0) }
        : t
    ));
  };

  const calculateTotal = () =>
    basePackageCost +
    selectedActivities.reduce((total, activity) => total + activity.price, 0) +
    selectedTickets.reduce((total, ticket) => total + ticket.price * ticket.quantity, 0);

  return (
    <div className="max-h-screen bg-blue-100 px-10 py-8 text-gray-200">
      {/* Header */}
  <div className="bg-gray-800 shadow-lg rounded-md overflow-hidden mb-8 relative">
  {/* Image */}
  <img
    src="https://www.tusktravel.com/blog/wp-content/uploads/2022/02/Rajasthan-in-March.jpg"
    alt="Rajasthan"
    className="absolute top-0 left-0 w-full h-80 object-cover"
  />

  <div className="relative z-10 bg-gradient-to-t from-black via-transparent to-transparent p-6">
    <h1 className="text-2xl font-bold text-yellow-400">Rajasthan 7-Day Package</h1>
    <p className="text-gray-400 mt-2">Explore the Land of Kings</p>
  </div>
</div>



       {/* Package Details */}
       <div className="mb-8">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Package Details</h2>
  <div className="grid grid-cols-3 gap-6">
    {[
      {
        day: "Day 1: Arrival in Jaipur",
        desc: "City tour, Visit Amber Fort",
        img: "https://www.worldatlas.com/r/w1200/upload/f0/5f/4b/shutterstock-233174128.jpg",
      },
      {
        day: "Day 2: Jaipur",
        desc: "Hawa Mahal, Jantar Mantar, Shopping at Johari Bazaar",
        img: "https://www.themaharajaexpress.org/blog/wp-content/uploads/2017/05/Jantar-Mantar-1.jpg",
      },
      {
        day: "Day 3: Jaipur to Jodhpur",
        desc: "Mehrangarh Fort, Jaswant Thada",
        img: "https://img.veenaworld.com/wp-content/uploads/2021/10/Mehrangarh.jpg",
      },
      {
        day: "Day 4: Jodhpur to Udaipur",
        desc: "Lake Pichola Boat Ride, City Palace",
        img: "https://thumbs.dreamstime.com/b/lake-pichola-udaipur-view-city-rajasthan-india-203501215.jpg",
      },
      {
        day: "Day 5: Udaipur",
        desc: "Jagdish Temple, Saheliyon-ki-Bari",
        img: "https://imgcld.yatra.com/ytimages/image/upload/v1462527411/Udaipur-Jagdish_Temple1.jpg",
      },
      {
        day: "Day 6: Udaipur to Jaisalmer",
        desc: "Camel Safari, Sam Sand Dunes",
        img: "https://r1imghtlak.mmtcdn.com/7171be54c23411e982800242ac110003.jfif?&output-quality=75&downsize=910:612&crop=910:612;5,0&output-format=jpg",
      },
      {
        day: "Day 7: Departure from Jaisalmer",
        desc: "Free time for shopping or relaxation",
        img: "https://assets.traveltriangle.com/blog/wp-content/uploads/2018/03/413.jpg",
      },
    ].map((item, index) => (
      <div key={index} className="bg-white shadow-md rounded-md overflow-hidden">
        <img src={item.img} alt={item.day} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-gray-800">{item.day}</h3>
          <p className="text-gray-600 mt-2">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Adventure Activities Section */}
    
<div className="mb-8">
  <h2 className="text-xl font-semibold text-yellow-600 mb-4">Adventure Activities</h2>
  <div className="grid grid-cols-2 gap-6">
    {activities.map((activity, index) => (
      <div
        key={index}
        className="relative p-3 bg-gray-100 rounded-lg cursor-pointer border border-gray-300"
        onClick={() => toggleActivity(activity)}
      >
        <div
          className={`p-1 rounded-lg ${
            selectedActivities.includes(activity) ? "border-4 border-blue-400" : "border border-gray-300"
          }`}
        >
          <div className="bg-white p-4 rounded-md flex flex-col items-center">
            <h3 className="font-semibold text-yellow-600">{activity.name}</h3>
            <p className="text-gray-500">{activity.desc}</p>
            <div className="text-yellow-600 font-semibold mt-2">₹{activity.price}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

{/* Ticket Booking Section */}
<div className="mb-8">
  <h2 className="text-xl font-semibold text-yellow-600 mb-4">Ticket Booking</h2>
  <div className="grid grid-cols-3 gap-6">
    {touristPlaces.map((place, index) => (
      <div
        key={index}
        className="relative p-3 bg-gray-100 rounded-lg cursor-pointer border border-gray-300"
        onClick={() => toggleTicket(place)}
      >
        <div
          className={`p-1 rounded-lg ${
            selectedTickets.find((t) => t.place === place.place)
              ? "border-4 border-blue-400"
              : "border border-gray-300"
          }`}
        >
          <div className="bg-white p-4 rounded-md flex flex-col items-center">
            <h3 className="font-semibold text-yellow-600">{place.place}</h3>
            <p className="text-gray-500">{place.city}</p>
            <div className="flex items-center mt-4">
              {/* "-" Button */}
              <button
                className="bg-green-500 text-white py-1 px-2 rounded-l hover:bg-green-600"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent toggling the ticket selection
                  updateTicketQuantity(place, "-");
                }}
              >
                -
              </button>
              {/* Price Button */}
              <button className="bg-green-500 text-white py-1 px-6 rounded-none">
                ₹{place.price}
              </button>
              {/* "+" Button */}
              <button
                className="bg-green-500 text-white py-1 px-2 rounded-r hover:bg-green-600"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent toggling the ticket selection
                  updateTicketQuantity(place, "+");
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
};

export default BillingPackage;