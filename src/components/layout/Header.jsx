import React from 'react';

const Header = () => {
  return (
    <header className="w-full p-330 h-20 flex items-center justify-between absolute bg-gray-0">
      <div className="left flex items-center gap-[55px]">
        <a href="/home">
          <h1>
            <img
              src="/icons/logo.svg"
              alt="Van Cleef & Arpels"
              className="w-[340px]"
            />
          </h1>
        </a>
        <nav>
          <ul>
            <a href="#">
              <li className="font-secondary text-heading-m font-bold">SHOP</li>
            </a>
          </ul>
        </nav>
      </div>
      <div className="util">
        <a href="#">
          <span className="font-secondary text-heading-m font-bold">LOGIN</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
