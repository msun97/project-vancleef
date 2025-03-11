import React, { useState } from 'react';
import DropDown from '../../components/dropdown';
import SearchResultModal from './componetns/SearchResultModal';

const Search = () => {
  const [isFillter, setIsFillter] = useState(false);
  const onFilter = () => {
    setIsFillter(!isFillter);
    console.log('click');
    console.log(isFillter);
  };
  return (
    <div className="py-40">
      <div className="wrap p-330">
        <div className="relation flex flex-col gap-5">
          <h3 className="font-bold text-[16px]">연관 검색어</h3>
          <ul className="flex gap-[9px] mb-20">
            <li className="w-20 h-10 flex items-center justify-center bg-primary-30 rounded-[10px]">
              키워드
            </li>
            <li className="w-20 h-10 flex items-center justify-center bg-primary-30 rounded-[10px]">
              키워드
            </li>
            <li className="w-20 h-10 flex items-center justify-center bg-primary-30 rounded-[10px]">
              키워드
            </li>
          </ul>
        </div>
        <div className="popural flex flex-col gap-5">
          <h3 className="font-bold font-secondary text-[16px]">인기 검색어</h3>
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
        <div className="content">
          <div className="w-full flex justify-end gap-[45px] ">
            <DropDown item={['인기순', '가격순']} className="!border-b-0" />
            <button className="filter" onClick={onFilter}>
              필터
            </button>
          </div>
          {isFillter ? <SearchResultModal onClick={onFilter} /> : ''}
          <div className="results">
            <ul className="flex flex-wrap gap-2">
              <li className="flex flex-col gap-[10px] relative">
                <img src="/images/search-exam1.png" />
                <div className="flex flex-col gap-4">
                  <div className="title flex flex-col gap-[7px]">
                    <div className="tag text-[12px]">La D.D</div>
                    <div className="title text-[16px] font-bold">
                      라 디디 골드 목걸이
                    </div>
                  </div>
                  <div className="price text-[13px] font-bold">798,000원</div>
                </div>
                <div className="like absolute top-[10px] right-4">
                  <img src="/icons/like-unfilled.svg" className="w-4" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
