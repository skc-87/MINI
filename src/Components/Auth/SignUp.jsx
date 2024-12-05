import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../services/operations/authAPI";
import { sendOtp } from "../../services/operations/authAPI";

const SignUp = () => {
  const dispatch = useDispatch();

  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    otp: "",
  };

  const [formData, setFormData] = useState(initialFormData);

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
    dispatch(
      signUp(
        formData.firstName,
        formData.lastName,
        formData.contactNumber,
        formData.email,
        formData.otp
      )
    ).then(() => {
      // Reset form inputs after successful sign-up
      setFormData(initialFormData);
    });
  };

  const handleSendOtp = () => {
    if (formData.contactNumber.length < 10) {
      alert("Please enter a contact number.");
      return;
    }
    dispatch(sendOtp(formData.contactNumber));
  };

  return (
    <div className=" max-h-[595px] w-[500px] bg-opacity-50 backdrop-blur-md rounded-3xl p-4 border-gray border-2">
      <h2 className="font-bold text-white">Sign Up</h2>
      <form onSubmit={handleSubmit} className="mt-10 ">
        {/* first and last name */}
        <div className="flex gap-x-5">
          <div className="flex flex-col items-start mb-3">
            <label className="text-white text-lg">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="border-2 rounded-xl w-full text-[1.5rem] text-center transition-transform duration-300 transform focus:scale-105 text-md"
            />
          </div>

          <div className="flex flex-col items-start mb-3">
            <label className="text-white text-lg">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="border-2 rounded-xl w-full text-[1.5rem] text-center  transition-transform duration-300 transform focus:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-col items-start mb-3">  
          <label className="text-white  text-lg">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border-2 rounded-xl w-full text-[1.75rem] text-center  transition-transform duration-300 transform focus:scale-105"
          />
        </div>

        {/* Other input fields */}
        <div className="flex flex-col items-start mb-3">  
          <label className="text-white text-lg">Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="border-2 rounded-xl w-full text-[1.5rem] text-center tracking-widest transition-transform duration-300 transform focus:scale-105 "
          />
        </div>

        {/* OTP input field */}
        <div className="flex items-end gap-x-5" >
          <div className="w-full">
            <label className="text-white text-lg">OTP</label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              required
              className="border-2 rounded-xl w-full transition-transform text-[1.5rem] text-center  duration-300 transform focus:scale-105"
            />
          </div>

          {/* Send OTP button */}
          <div className="flex w-full justify-center items-center  ">
            <button
              type="button"
              className="flex w-full h-[45px] text-center items-center text-[1.5rem] flex-col-reverse bg-[#BD0647] font-medium  rounded-xl text-white  hover:scale-95 transition-transform duration-300"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="flex justify-center items-center bg-[#BD0647] font-medium rounded-xl text-white py-2 mt-5  hover:scale-95 transition-transform duration-300 w-full"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
