import "./App.css";
import Navbar from "./Components/Navbar/Navbar1";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home";
import Tours from "./Pages/Tours";
import Packages from "./Pages/Pakages";
import ContactUs from "./Pages/ContactUs";
import AboutUs from "./Pages/AboutUs";
import { Routes, Route } from "react-router-dom";
import TourDetails from "./Pages/TourDetails";
import SearchDestination from "./Components/Search/SearchDestination";
import States from "./Pages/States.jsx"
// import { Routes,Route } from "react-router-dom";


function App() {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  return (
    <div className="text-center text-4xl w-full h-full ">
      <div className="flex flex-col items-center mx-auto w-11/12 mt-[1rem] mb-5">
        {/* Navbar */}
        <Navbar />
      </div>

      {/* <SearchDestination /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/Aboutus" element={<AboutUs />} />
        <Route path="/contact us" element={<ContactUs />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/tour/states/:id" element={<States />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
