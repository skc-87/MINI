import * as React from "react";
import Backgrd from "../assets/Aboutus/Banner.png"
import Content1 from "../Components/AboutUs/Content1"
import Content2 from "../Components/AboutUs/Content2";
import Content3 from "../Components/AboutUs/Content3";


function AboutUs() {
  return (
    <div className="flex flex-col gap-y-[4rem] mb-[5rem]">
    <div className="flex relative overflow-hidden text-white min-h-[500px] justify-center items-center " 
                    style={{
        backgroundImage: `url(${Backgrd})`,
        backgroundSize: "cover",
        backgroundPosition: "bottom",
        backgroundRepeat: "no-repeat",
        minHeight: "500px" // Set your desired height
      }}>
      

    </div>
    
  
    <Content1/>
    <Content2/>
    <Content3/>
   
 

    </div>


  );
}

export default AboutUs;
