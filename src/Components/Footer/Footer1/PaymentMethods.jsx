import React from "react";
import Visa from "../../../assets/Footer/assets/visa-logo.png";
import Sofort from "../../../assets/Footer/assets/sofort-logo.png";
import Ae from "../../../assets/Footer/assets/AE-logo.png";
import Apple from "../../../assets/Footer/assets/apple-logo.png";
import Bitpay from "../../../assets/Footer/assets/bitpay-logo.webp";
import Discover from "../../../assets/Footer/assets/discover-logo.png";
import Gpay from "../../../assets/Footer/assets/gpay-logo.jpg";
import Maestro from "../../../assets/Footer/assets/maestro-logo.png";
import Mastercard from "../../../assets/Footer/assets/Mastercard-Logo.png";
import Paypal from "../../../assets/Footer/assets/paypal-logo.png";

function PaymentMethods() {
  const paymentMethods = [
    // we have to put all the card in an array of objects to use further

    { src: Visa, alt: "visa card " },
    { src: Sofort, alt: "sofort card " },
    { src: Ae, alt: "ae card " },
    { src: Apple, alt: "apple card " },
    { src: Bitpay, alt: "bitpay card " },
    { src: Discover, alt: "discover card " },
    { src: Gpay, alt: "gpay card " },
    { src: Maestro, alt: "maestro card " },
    { src: Mastercard, alt: "mastercard card " },
    { src: Paypal, alt: "paypal card " },
  ];

  return (
    <div className="flex flex-col items-start self-start">
      <h2 className="text-base font-bold text-white text-opacity-80">
        Payment methods possible
      </h2>
      <div
        className="flex flex-wrap gap-4 self-stretch mt-5 
                      justify-center sm:justify-start
                      sm:grid sm:grid-cols-2
                      md:grid-cols-3
                      lg:grid-cols-4
                      xl:grid-cols-5"
      >
        {paymentMethods.map((method, index) => (
          <img
            key={index}
            loading="lazy"
            src={method.src}
            className="object-fill w-14 h-8 aspect-[1.54] rounded-lg"
            alt={method.alt}
          />
        ))}
      </div>

      <h2 className="mt-7 text-base font-bold text-white text-opacity-80">
        Company
      </h2>
      <a
        href="#become-tour-guide"
        className="mt-2 text-base leading-8 text-white text-opacity-60"
      >
        Become a Tour guide for Us
      </a>
    </div>
  );
}

export default PaymentMethods;
