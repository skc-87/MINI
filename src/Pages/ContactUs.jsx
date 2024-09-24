import React from "react";
import BgImg from "../assets/ContactUs/ContactUsBanner.png";

const ContactUs = () => {
  return (
    <div className="bg-gray-100 h-auto pb-[10rem]">
      {/*First Part */}
      <div
        className="mx-auto flex items-center justify-center h-[450px] "
        style={{
          backgroundImage: `url(${BgImg})`,
          backgroundPosition: "top", // Center horizontally
          backgroundSize: "cover", // Cover the entire container
          backgroundRepeat: "no-repeat", // Prevent repeating the background image
        }}
      >
        {/* <div className="flex flex-col items-center  text-white">
          <div>
            <p className="text-5xl ">Contact Us</p>
          </div>
        </div> */}
        {/* Content of the first part goes here */}
        
      </div>

      {/* Second Part */}
      <div className="mx-auto flex justify-evenly w-11/12 mt-[3rem] bg-gray-50 px-5 py-7 rounded-xl">
        {/* Left Box */}
        <div className="w-[40%]  shadow-lg py-3 px-3 rounded-xl bg-white ">
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" className="border-2 p-2 rounded-xl " />
            <input type="email" placeholder="Mail" className="border p-2 rounded-xl " />
            <input type="text" placeholder="Subject" className="border p-2 rounded-xl" />
            <textarea
              placeholder="Your Message"
              className="border p-2 rounded-xl h-[200px]"
            ></textarea>
            <button type="send message" className="bg-[#5AB2FF] text-black rounded-[2rem] h-[60px] text-center hover:scale-95 duration-300 transition-all">
              Send Message
            </button>
          </form>
        </div>

        {/* Right Box */}
        <div className="w-1/2 bg-white p-8 rounded-xl shadow-lg">
          <p className="font-bold tracking-widest text-[3rem]">Get in touch</p>



        </div>
      </div>
    </div>
  );
};

export default ContactUs;
