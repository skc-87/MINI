import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import { authEndpoints } from "../api";
import { setUser } from "../../slices/profileSlice";
import { setToken } from "../../slices/authSlice";
import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

const { LOGIN_API, SIGNUP_API, SEND_OTP_API } = authEndpoints;

export function sendOtp(contactNumber) {
  return async (dispatch) => {
    const toastId = toast.loading("Sending OTP...");
    // dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", SEND_OTP_API, {
        contactNumber,
        checkUserPresent: true,
      });
      console.log("SENDOTP_API response -> ", response);
      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("OTP sent successfully");
      // dispatch(setLoading(false));
      //   navigate("/verify-email");
    } catch (e) {
      console.log("SENDOTP API ERROR......", e);
      toast.error("OTP can't be sent");
    }
    // dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(firstName, lastName, contactNumber, email, otp) {
  console.log("First name in api call -> ", firstName);
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    // dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        contactNumber,
        otp,
      });
      console.log("SIGNUP API RESPONSE...", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successfull");
      // navigate("/login");
    } catch (e) {
      console.log("SIGNUP ERROR...", e);
      toast.error("SignUp Failed");
      // navigate("/signup");
    }
    // dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(contactNumber, otp) {
  return async (dispatch, navigate) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        contactNumber,
        otp,
      });

      console.log("LOGIN API RESPONSE -> ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      const accessToken = response?.data?.accessToken;

      console.log("Access Token -> ", accessToken);

      // toast.success("Login Successfully");
      // dispatch(setToken(response?.data?.token));

      localStorage.setItem("token", JSON.stringify(accessToken));

      dispatch(setUser(response?.data?.data?.loggedInUser));

      console.log("User loggded in successfully");
      toast.success("Login successfully");
      // navigate("/tours")
    } catch (e) {
      console.log("LOGIn API Error ->", e);
      toast.error("Login failed...");
    }

    toast.dismiss(toastId);
    // window.location.reload();
  };
}

export function logout(token) {
  // const { token } = useSelector((state) => state.auth);

  return (dispatch) => {
    if (token != null) {
      dispatch(setToken(null));
      dispatch(setUser(null));
      // dispatch(resetCart())
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged Out");
      // navigate("/");
    } else {
      toast.error("You are not logged in");
    }
  };
}
