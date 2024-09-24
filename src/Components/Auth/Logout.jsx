import React from "react";
import { useHistory } from "react-router-dom"; // Assuming you're using React Router for navigation
import { logout } from "../../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { IoIosLogOut } from "react-icons/io";

const Logout = ({ token }) => {
  const dispatch = useDispatch();
  console.log("Token in request -> ", token);

  const handleLogout = () => {
    dispatch(logout(token));
  };

  return (
    <div className="flex justify-between items-center ">
      <button onClick={handleLogout} className="text-[1.5rem] hover:scale-110 transition-all duration:150 cursor-pointer ">
        <IoIosLogOut size={40} />
      </button>
    </div>
  );
};

export default Logout;
