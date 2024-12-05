// import { apiConnector } from "../apiconnector";
// import { walletEndpoints } from "../api";
// import toast from "react-hot-toast";

// const { CREATE_WALLET_API } = walletEndpoints;

// export async function createWallet(
//   identificationType,
//   identificationNumber,
//   bankAccount
// ) {
//   const toastId = toast.loading("Loading...");

//   console.log(
//     `IdentificationType: ${identificationType} , IdentityNumber: ${identificationNumber} , BankAccount: ${bankAccount}`
//   );

//   const token = localStorage.getItem("token");
//   console.log("Token -> ", token);

//   try {
//     if (!identificationType || !identificationNumber || !bankAccount) {
//       toast.error("Enter your credentials");
//       return; // Return early if required fields are missing
//     }

//     //  Fetch the token from localStorage

//     if (!token) {
//       toast.error("No token found. Please log in again.");
//       return; // Early return if token is not available
//     }

   

//     // Making the API call asynchronously and waiting for the result
//     const response = await apiConnector("POST", CREATE_WALLET_API, {
//       identificationType,
//       identificationNumber,
//       bankAccount,
//     });

//     console.log("Response -> ", response);

//     // If the API call is successful, handle success
//     if (response?.data?.success) {
//       toast.success("Wallet created successfully!");
//     } else {
//       toast.error(response?.data?.message || "Something went wrong");
//     }
//   } catch (error) {
//     console.error("Error creating wallet:", error);
//     toast.error("Failed to create wallet. Please try again.");
//   } finally {
//     // Always dismiss the loading toast
//     toast.dismiss(toastId);
//   }
// }




import { apiConnector } from "../apiconnector";
import { walletEndpoints } from "../api";
import toast from "react-hot-toast";

const { CREATE_WALLET_API } = walletEndpoints;

export async function createWallet(
  identificationType,
  identificationNumber,
  bankAccount
) {
  const toastId = toast.loading("Loading...");

  console.log(`IdentificationType: ${identificationType} , IdentityNumber: ${identificationNumber} , BankAccount: ${bankAccount}`);

  try {
    if (!identificationType || !identificationNumber || !bankAccount) {
      toast.error("Enter your credentials");
      return; // Return early if required fields are missing
    }

    // Fetch the token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No token found. Please log in again.");
      return; // Early return if token is not available
    }

    console.log("Token -> ", token);

    // Setting the token in the request header
    const headers = {
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    };

    // Making the API call asynchronously and passing the token in headers
    const response = await apiConnector("POST", CREATE_WALLET_API, {
      identificationType,
      identificationNumber,
      bankAccount,
    }, headers);

    console.log("Response -> ", response);

    // If the API call is successful, handle success
    if (response?.data?.success) {
      toast.success("Wallet created successfully!");
    } else {
      toast.error(response?.data?.message || "Something went wrong");
    }

  } catch (error) {
    console.error("Error creating wallet:", error);
    toast.error("Failed to create wallet. Please try again.");
  } finally {
    // Always dismiss the loading toast
    toast.dismiss(toastId);
  }
}
