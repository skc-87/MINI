import React from 'react';
import CompanyLinks from './CompanyLinks';
import HelpLinks from './HelpLinks';
import PaymentMethods from './PaymentMethods';
import FooterBottom from './FooterBottom';

function Footer1() {
  return (
    <footer className="flex overflow-hidden flex-col py-9 pr-14 w-full max-md:pr-5 max-md:max-w-full  bg-black">
      <div className="flex self-center w-full max-w-[1298px] max-md:max-w-full">
        <div className="flex-auto max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col ">
            <CompanyLinks />
            <HelpLinks />
          </div>  
        </div>
        <PaymentMethods />
      </div>
      <hr className="mt-10 border-t border-white border-opacity-20 w-full max-w-[1376px] mx-auto" />
      <FooterBottom />
    </footer>
  );
}

export default Footer1;