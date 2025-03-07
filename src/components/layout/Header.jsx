import React, { useState } from 'react';

const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const onSearch = () => {
    setIsSearch(!isSearch);
  };
  return (
    <header className="w-full p-330 h-20 flex items-center justify-between fixed bg-gray-0 z-10">
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
      <div className="util flex gap-[30px] items-center">
        <button onClick={onSearch} className=" cursor-pointer">
          <img src="/icons/search.svg" alt="검색" className="w-8 h-8" />
        </button>
        <a href="#">
          <span className="font-secondary text-heading-m font-bold">LOGIN</span>
        </a>
      </div>
      {isSearch && (
        <div className="search-bar">
          <input type="text" placeholder="검색어를 입력하세요" />
          <button className="bg-[rgba(255,255,255,0.7)] w-[100px] h-[40px] text-content-l font-extrabold transition-all duration-300 hover:bg-gray-0">
            검색
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
