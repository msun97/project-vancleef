import React, { useEffect, useState } from 'react';
import Input from '../input';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ onSearch }) => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${search}`);
    }
    onSearch();
  };

  
  return (
    <div className="fixed w-full h-[100vh] bg-[rgba(0,0,0,0.5)] flex justify-center left-0 top-0" style={{zIndex:9999}}>
      <div className="wrap bg-gray-0 p-[50px] w-full h-fit z-[1000] fixed" >
        <div className="header relative mb-5">
          <h2 className="text-[25px] font-secondary font-bold">검색</h2>
          <button className="close absolute right-0 top-0" onClick={onSearch}>
            <img src="/icons/close.svg" alt="close" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
        <Input
          placeholder="검색어를 입력한 후 엔터를 누르세요."
          className="w-[calc(100%_-_180px)] h-[55px] mb-12"
          value={search}
          onChange={handleSearch}
        />
        </form>
        <div className="popural flex flex-col gap-5">
          <h3 className="font-bold font-secondary text-[16px]">인기 키워드</h3>
          <ul className="flex gap-[9px] mb-22">
            <li className="w-20 h-10 flex items-center justify-center bg-primary-40 rounded-[10px]">
              키워드
            </li>
            <li className="w-20 h-10 flex items-center justify-center bg-primary-40 rounded-[10px]">
              키워드
            </li>
            <li className="w-20 h-10 flex items-center justify-center bg-primary-40 rounded-[10px]">
              키워드
            </li>
          </ul>
        </div>
        <div className="concept flex flex-col gap-[18px]">
          <h3 className="font-bold font-secondary text-[16px]">
            티파니 컬렉션
          </h3>
          <ul className="flex gap-[18px]">
            <li className="flex-1 flex flex-col items-center gap-4 ">
              <img
                src="/images/search-article1.png"
                className="object-cover w-full"
              />
              <p className="text-4">아티클</p>
            </li>
            <li className="flex-1 flex flex-col items-center gap-4 ">
              <img
                src="/images/search-article2.png"
                className="object-cover w-full"
              />
              <p className="text-4">아티클</p>
            </li>
            <li className="flex-1 flex flex-col items-center gap-4 ">
              <img
                src="/images/search-article3.png"
                className="object-cover w-full"
              />
              <p className="text-4">아티클</p>
            </li>
            <li className="flex-1 flex flex-col items-center gap-4 ">
              <img
                src="/images/search-article4.png"
                className="object-cover w-full"
              />
              <p className="text-4">아티클</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
