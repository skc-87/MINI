
import { RiTeamLine } from "react-icons/ri";
import { GoRocket } from "react-icons/go";
import { BsGraphUp } from "react-icons/bs";




const Content1 = () =>{
  return (
    <div >

      {/* div for whole section */}
      <div className="flex justify-evenly w-11/12 mx-auto items-baseline">
        {/* 1st sections */}
        <div className="flex flex-col justify-center items-center w-[33.33%]">
          <RiTeamLine size={80}/>
          <p className="font-semibold mt-2 mb-4 ">Great team work</p>
          <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor nunc non neque euismod porttitor.
           Nullam lacus est, tincidunt eget sapien eget, maximus convallis massa.
            Curabitur quis tellus a tortor egestas viverra. </p>
        </div>
        {/* 2nd sections */}
        <div className="flex flex-col justify-center items-center  w-[33.33%]">
          <GoRocket size={80}/>
          <p className="font-semibold mt-2 mb-4 ">Our vision</p>
          <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
           Ut enim ad minim veniam..</p>
        </div>
        {/* 3rd section */}
        <div className="flex flex-col justify-center items-center w-[33.33%]">
          <BsGraphUp size={80}/>
          <p className="font-semibold mt-2 mb-4 ">Our mision</p>
          <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam.. </p>
        </div>

      </div>


    </div>
  );
}

export default Content1;