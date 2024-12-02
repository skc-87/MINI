import React from 'react';

function CompanyLinks() {
  const links = ['About Us', 'Blog', 'Press Room', 'Careers'];

  return (
    <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
      <nav className="flex flex-col self-stretch my-auto text-base max-md:mt-10">
        <h2 className=" font-bold text-white text-opacity-80 mb-5">Company</h2>
        <ul className="leading-8 text-white text-opacity-60">
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

export default CompanyLinks;