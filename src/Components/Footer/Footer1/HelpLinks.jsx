import React from 'react';

function HelpLinks() {
  const links = ['Contact us', 'FAQs', 'Terms and conditions', 'Privacy policy', 'Sitemap'];

  return (
    <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
      <nav className="flex flex-col grow mt-5 text-base max-md:mt-10">
        <h2 className="font-bold text-white text-opacity-80">Help</h2>
        <ul className="mt-2 leading-8 text-white text-opacity-60">
          {links.map((link, index) => (
            <li key={index}>
              <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>{link}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default HelpLinks; 