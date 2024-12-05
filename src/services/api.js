const BASE_URL = process.env.REACT_APP_BASE_URL;

// Tours
export const tourEndpoints = {
  GET_ALL_TOURS: BASE_URL + "/tour/getTours",
  GET_TOURS_BY_ID: BASE_URL + "/tour/getToursById",
};

// auth
export const authEndpoints = {
  LOGIN_API: BASE_URL + "/auth/login",
  SIGNUP_API: BASE_URL + "/auth/signUp",
  SEND_OTP_API: BASE_URL + "/auth/sendotp",
};

//wallet
export const walletEndpoints = {
  CREATE_WALLET_API: BASE_URL + "/wallet/create-wallet",
  DEPOSITE_API_API: BASE_URL + "/wallet/deposit-money",
  DEDUCT_MONEY_API: BASE_URL + "/wallet/deduct-money",
  DEPOSITE_MONEY_BANK_API: BASE_URL + "/wallet/deposit-money-to-bank",
};

// payment
export const paymentEndpoints = {
  CAPTURE_PAYMENT: BASE_URL + "/payment/capturePayment",
  VERIFY_PAYMENT: BASE_URL + "/payment/verifyPayment",
};
