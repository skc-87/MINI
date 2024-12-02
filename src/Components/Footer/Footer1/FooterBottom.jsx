// src/components/footer/FooterBottom.jsx
import React from 'react';

const FooterBottom = () => {
  const links = [
    'Privacy Policy',
    'Terms of Use',
    'Sales and Refunds',
    'Legal',
    'Site Map'
  ];

  return (
    <footer className="flex justify-between items-center p-4  text-white w-full">
      <div className="text-sm">
        &copy; {new Date().getFullYear()} Let's Travel. All rights reserved.
      </div>
      <nav>
        <ul className="flex space-x-6 text-sm">
          {links.map((link, index) => (
            <li key={index}>
              <a href="#" className="hover:underline">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default FooterBottom;
