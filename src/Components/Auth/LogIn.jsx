import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { setUser } from "../../services/operations/profileSlice";
import { login } from "../../services/operations/authAPI";
import { sendOtp } from "../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    contactNumber: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(login(formData.contactNumber, formData.otp),navigate);
    // navigate("/tours")
  };

  const handleSendOtp = () => {
    if (formData.contactNumber.length < 10) {
      alert("Please enter a contact number.");
      return;
    }
    dispatch(sendOtp(formData.contactNumber));
  };

  return (
    <div className="max-h-[595px] w-[400px] bg-opacity-50 backdrop-blur-md rounded-3xl p-4  border-gray border-2 ">
      <h2 className="font-bold text-white">Login</h2>
      <form onSubmit={handleSubmit} className="mt-10 ">
      <div className="flex flex-col items-start mb-3">
          <label className="text-white text-lg">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="border-2 rounded-xl w-full transition-transform duration-300 text-center text-[1.5rem] transform focus:scale-105 "
          />
        </div>

        {/* Send OTP button */}
        <div className="flex justify-end">
          <button
            type="button"
            className="flex mr-0  w-[30%]  items-center text-center flex-col-reverse bg-[#BD0647] font-medium text-base rounded-xl text-white py-1 mt-5 hover:scale-95 transition-transform duration-300"
            onClick={handleSendOtp}
          >
            Send OTP
          </button>
        </div>

        <div >
          <label className="text-white text-lg">OTP</label>
          <br />
          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            required
            className="border-2 text-center text-[1.5rem] rounded-xl w-full transition-transform duration-300 transform focus:scale-105"
          />
        </div>
        <button
          type="submit"
          className="flex justify-center items-center bg-[#BD0647] font-medium rounded-xl text-white py-2 mt-10 hover:scale-95 transition-all duration-300 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LogIn;
