import React, { useEffect, useState } from 'react';
import SearchModal from './SearchModal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const onSearch = () => {
    setIsSearch(!isSearch);
  };
  const [lastY, setLastY] = useState(0);
  const { authed } = useSelector(state => state.authR);
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > 80 && currentY > lastY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastY(currentY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);
  return (
    <header
      className={`w-full p-330 h-20 flex items-center justify-between fixed bg-gray-0 z-[999] ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } transition-all`}
    >
      <div className="left flex items-center gap-[55px] z-[999]">
        <Link to="/home">
          <h1>
            <img
              src="/icons/logo.svg"
              alt="Van Cleef & Arpels"
              className="w-[340px]"
            />
          </h1>
        </Link>
        <nav>
          <ul className="flex gap-8">
            <Link to="/productlist">
              <li className="font-secondary text-heading-m font-bold">SHOP</li>
            </Link>
            <Link to="/about">
              <li className="font-secondary text-heading-m font-bold">ABOUT</li>
            </Link>
            <Link to="/kbrand">
              <li className="font-secondary text-heading-m font-bold">
                EXHIBITION
              </li>
            </Link>
            <Link to="/customers/notice">
              <li className="font-secondary text-heading-m font-bold">
                고객센터
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      {authed ? (
        <div className="util flex gap-[30px] items-center">
          <button onClick={onSearch} className=" cursor-pointer">
            <img src="/icons/search.svg" alt="검색" className="w-8 h-8" />
          </button>
          <button>
            <img src="/icons/alarm-off.svg" className="w-8 h-8" />
          </button>
          <Link to="/mypage">
            <img src="/icons/user.svg" alt="MYPAGE" className="w-8 h-8" />
          </Link>
        </div>
      ) : (
        <div className="util flex gap-[30px] items-center">
          <button onClick={onSearch} className="cursor-pointer">
            <img src="/icons/search.svg" alt="검색" className="w-8 h-8" />
          </button>
          <Link to="/login">
            <span className="font-secondary text-heading-m font-bold">
              LOGIN
            </span>
          </Link>
        </div>
      )}
      {isSearch && <SearchModal onSearch={onSearch} />}
    </header>
  );
};

export default Header;
