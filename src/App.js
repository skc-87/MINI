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
import States from "./Pages/States.jsx";
// import { Routes,Route } from "react-router-dom";
import CreateWallet from "./Components/Wallet/createWallet.jsx";
import LogIn from "./Components/Auth/LogIn.jsx";
import SignUp from "./Components/Auth/SignUp.jsx";
import BookingPage from "./Pages/BookingPage.jsx";
import PackagesDetails from "./Pages/PackageDetails.jsx";
// import BillingPackage from "./Pages/BillingPackages.jsx";

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
        {/* <Route path="/packages" element={<Packages />} /> */}
        <Route path="/Aboutus" element={<AboutUs />} />
        <Route path="/contact us" element={<ContactUs />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/tour/states/:id" element={<States />} />
        <Route path="/packages/booking/:price" element={<BookingPage />} />
        <Route path="/packages" element={<PackagesDetails />} />
      </Routes>
      {/* <CreateWallet /> */}
      
      <Footer />
    </div>
  );
}

export default App;
