const BASE_URL = process.env.REACT_APP_BASE_URL

// Tours
export const tourEndpoints={
    GET_ALL_TOURS : BASE_URL + "/tour/getTours",
    GET_TOURS_BY_ID : BASE_URL + "/tour/getToursById",
}

// auth
export const authEndpoints={
    LOGIN_API : BASE_URL + "/auth/login",
    SIGNUP_API : BASE_URL + "/auth/signUp",
    SEND_OTP_API : BASE_URL + "/auth/sendotp",
}