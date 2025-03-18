import React, { useEffect } from 'react';
import CheckBox from '../../../components/checkbox';
import Button from '../../../components/button';

const SearchResultModal = ({ onClick, data }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  const groupPricesByMillionWon = priceArray => {
    const minPrice = Math.min(...priceArray);
    const maxPrice = Math.max(...priceArray);
    const millionWonGroups = [];
    const millionWon = 200000000;

    const startGroup = Math.floor(minPrice / millionWon) * millionWon;
    const endGroup = Math.ceil(maxPrice / millionWon) * millionWon;

    for (let i = startGroup; i < endGroup; i += millionWon) {
      millionWonGroups.push({
        range: `~ ${(i + millionWon).toLocaleString()}원`,
        min: i,
        max: i + millionWon,
      });
    }

    return millionWonGroups;
  };

  const price = data.map(item => item.price);
  const priceRanges = groupPricesByMillionWon(price);

  return (
    <div
      className="fixed w-full h-[100vh] bg-[rgba(0,0,0,0.5)] flex justify-center left-0 top-0"
      style={{ zIndex: 9999 }}
      onClick={onClick}
    >
      <div
        className="wrap bg-gray-0 p-[50px] w-full h-fit z-[1000] fixed"
        onClick={e => e.stopPropagation()}
      >
        <div className="title w-full flex justify-between mb-20">
          <h3 className="font-bold text-[20px]">필터</h3>
          <p>초기화</p>
        </div>
        <div className="fliters flex gap-10">
          <div className="price flex flex-col gap-10">
            <h4 className="text-[20px]">가격대</h4>
            <ul className="border border-gray-50 w-[220px] p-6 h-[240px] overflow-auto flex flex-col gap-5 ">
              {priceRanges.map(range => (
                <li key={range.range} className="flex gap-1 items-center">
                  <CheckBox className="w-4 h-4 mr-2" /> {range.range}
                </li>
              ))}
            </ul>
          </div>
          <div className="subject flex flex-col gap-10">
            <h4 className="text-[20px]">소재</h4>
            <ul className="border border-gray-50 w-[220px] p-6 pr-20 h-[240px] overflow-auto flex flex-col gap-4">
              <li>
                <CheckBox className="w-4 h-4 mr-2" /> 실버
              </li>
              <li>
                <CheckBox className="w-4 h-4 mr-2" /> 실버
              </li>
              <li>
                <CheckBox className="w-4 h-4 mr-2" /> 실버
              </li>
            </ul>
          </div>
          <div className="jewraly flex flex-col gap-10">
            <h4 className="text-[20px]">스톤</h4>
            <ul className="border border-gray-50 w-[220px] p-6 pr-20 h-[240px] overflow-auto flex flex-col gap-4">
              <li>
                <CheckBox className="w-4 h-4 mr-2" /> 다이아몬드
              </li>
              <li>
                <CheckBox className="w-4 h-4 mr-2" /> 토파즈
              </li>
            </ul>
          </div>
          <div className="item flex flex-col gap-10">
            <h4 className="text-[20px]">아이템</h4>
            <ul className="border border-gray-50 w-[220px] p-6 pr-20 h-[240px] overflow-auto flex flex-col gap-4">
              <li>
                <CheckBox className="w-4 h-4 mr-2" /> 귀걸이
              </li>
              <li>
                <CheckBox className="w-4 h-4 mr-2" /> 목걸이
              </li>
            </ul>
          </div>
        </div>
        <div className="buttonWrap mt-10 w-full flex justify-end">
          <Button className="w-[250px] h-[55px]">필터 적용</Button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultModal;
