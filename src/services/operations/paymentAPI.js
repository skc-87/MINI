// import { paymentEndpoints } from "../api";
// import { apiConnector } from "../apiconnector";
// import toast from "react-hot-toast";

// const { CAPTURE_PAYMENT, VERIFY_PAYMENT } = paymentEndpoints;

// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;

//     script.onload = () => {
//       resolve(true);
//     };
//     script.onerror = () => {
//       resolve(false);
//     };

//     document.body.appendChild(script);
//   });
// }

// export async function bookTrip(total, dispatch) {
//   const toastId = toast.loading("Loading...");

//   try {
//     //load the script
//     console.log("Loading the script");
//     const res = await loadScript(
//       "https://checkout.razorpay.com/v1/checkout.js"
//     );

//     console.log("res from razorpay -> ", res);

//     if (!res) {
//       toast.error("RazorPay sdk failed to load");
//       return;
//     }

//     // initialize the order

//     const orderResponse = await apiConnector("POST", CAPTURE_PAYMENT, {
//       total,
//     });
//     console.log("order response -> ", orderResponse);

//     if (!orderResponse.data.success) {
//       throw new Error(orderResponse.data.message);
//     }

//     // options
//     console.log("working with options ->", orderResponse.data);

//     // const options = {
//     //   key: process.env.RAZORPAY_KEY, // Replace with your Razorpay key
//     //   currency: orderResponse.data.message.currency,
//     //   amount: orderResponse.data.message.amount, // Correct usage (no template literals)
//     //   order_id: orderResponse.data.message.id,
//     //   name: "PathFinders",
//     //   description: "Thank You for booking the trip",

//     //   handler: function (response) {
//     //     // Verify Payment
//     //     console.log("Going to verify the payment ");
//     //     verifyPayment({ ...response }, dispatch);

//     //     // Optionally, send payment success email
//     //     // sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token);
//     //   },
//     // };

//     const options = {
//       key: process.env.REACT_APP_RAZORPAY_KEY, // Use a client-safe environment variable
//       currency: orderResponse.data.message.currency,
//       amount: orderResponse.data.message.amount,
//       order_id: orderResponse.data.message.id,
//       name: "PathFinders",
//       description: "Thank You for booking the trip",
//       handler: function (response) {
//         console.log("Going to verify the payment ");
//         verifyPayment({ ...response }, dispatch);
//       },
//     };

//     console.log("Done with options");

//     // const paymentObject = new window.Razorpay(options);
//     // paymentObject.open();
//     // paymentObject.on("payment.failed", function (response) {
//     //   toast.error("Oops, payment failed");
//     //   console.log(response.error);
//     // });

//     if (!window.Razorpay) {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => {
//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//       };
//       document.body.appendChild(script);
//     } else {
//       const paymentObject = new window.Razorpay(options);
//       paymentObject.open();
//     }
//   } catch (e) {
//     console.log("Payment api error -> ", e);
//     toast.error("Could not make payment");
//   }

//   toast.dismiss(toastId);
// }

// // Verify Payment
// async function verifyPayment(bodyData, dispatch) {
//   const toastId = toast.loading("Verifying payments...");
//   //   dispatch(setPaymentLoading(true));
//   try {
//     // console.log("Token in verify payment -> ", token);
//     console.log("Going to verify payment");
//     const response = await apiConnector("POST", VERIFY_PAYMENT, bodyData);

//     console.log("Verify payment response -> ", response);

//     if (!response.data.success) {
//       throw new Error(response.data.message);
//     }

//     toast.success("Payment successfully, you are added to the course");

//     // dispatch(resetCart());
//   } catch (e) {
//     console.log("Payment verify-error -> ", e);
//     toast.error("Could not verify payment");
//   }

//   toast.dismiss(toastId);
//   //   dispatch(setPaymentLoading(false));
// }






import { paymentEndpoints } from "../api";
import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";

const { CAPTURE_PAYMENT, VERIFY_PAYMENT } = paymentEndpoints;

// Helper function to dynamically load the Razorpay script
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export async function bookTrip(total, dispatch) {
  const toastId = toast.loading("Loading...");

  try {
    // Load the Razorpay script
    console.log("Loading the Razorpay script...");
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK failed to load. Please check your connection.");
      return;
    }

    // Create an order via the backend
    const orderResponse = await apiConnector("POST", CAPTURE_PAYMENT, {
      total,
    });

    console.log("Order Response:", orderResponse);

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    // Options for Razorpay payment
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, // Use environment variable
      currency: orderResponse.data.message.currency,
      amount: orderResponse.data.message.amount,
      order_id: orderResponse.data.message.id,
      name: "PathFinders",
      description: "Thank you for booking the trip!",
      handler: function (response) {
        console.log("Payment handler called. Verifying payment...");
        verifyPayment({ ...response }, dispatch);
      },
      prefill: {
        name: "Your Name", // Optionally add prefill data
        email: "your.email@example.com",
        contact: "1234567890",
      },
      theme: {
        color: "#3399cc", // Customize the payment page
      },
    };

    console.log("Initialized Razorpay options");

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops, payment failed");
      console.error("Payment Failed:", response.error);
    });
  } catch (e) {
    console.error("Payment API error ->", e);
    toast.error("Payment process failed. Please try again.");
  } finally {
    toast.dismiss(toastId);
  }
}

// Function to verify payment
async function verifyPayment(bodyData, dispatch) {
  const toastId = toast.loading("Verifying payment...");
  try {
    console.log("Verifying payment with backend...");
    const response = await apiConnector("POST", VERIFY_PAYMENT, bodyData);

    console.log("Verify Payment Response:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment verified successfully! Booking confirmed.");
    // You can dispatch additional actions if needed
    // dispatch(resetCart());
  } catch (e) {
    console.error("Payment Verification Error ->", e);
    toast.error("Payment verification failed. Please contact support.");
  } finally {
    toast.dismiss(toastId);
  }
}
