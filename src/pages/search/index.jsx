import React, { useState } from 'react';
import DropDown from '../../components/dropdown';
import SearchResultModal from './componetns/SearchResultModal';
import { Link, useParams } from 'react-router-dom';
import { productdata } from '../../assets/api/productdata';

const Search = () => {
  const { keyword } = useParams();
  const alldata = productdata;
  const searchData = alldata.flatMap(item => {
    if (item.category === keyword) {
      return item.data;
    }

    if (item.data && Array.isArray(item.data)) {
      return item.data.filter(
        data =>
          (data.title && data.title.includes(keyword)) ||
          (data.subtitle && data.subtitle.includes(keyword)) ||
          (data.detail && data.detail.includes(keyword)) ||
          (data.stone && data.stone.includes(keyword)),
      );
    }

    return [];
  });
  const [isFillter, setIsFillter] = useState(false);
  const onFilter = () => {
    setIsFillter(!isFillter);
  };
  const [sortData, setSortData] = useState(searchData);
  const handleClick = sort => {
    if (sort === '인기순') {
      setSortData(searchData);
    } else if (sort === '가격순') {
      setSortData(searchData.sort((a, b) => b.price - a.price));
    }
  };

  return (
    <div className="py-40">
      <div className="wrap p-330">
        <div className="relation flex flex-col gap-5">
          <h3 className="font-bold text-[16px]">연관 검색어</h3>
          <ul className="flex gap-[9px] mb-20">
            <li className="py-2 px-7 flex items-center justify-center bg-primary-30 rounded-[10px]">
              <Link to="/search/팔찌">팔찌</Link>
            </li>
            <li className="py-2 px-7 flex items-center justify-center bg-primary-30 rounded-[10px]">
              <Link to="/search/골드">골드</Link>
            </li>
            <li className="py-2 px-7 flex items-center justify-center bg-primary-30 rounded-[10px]">
              <Link to="/search/다이아몬드">다이아몬드</Link>
            </li>
          </ul>
        </div>
        <div className="popural flex flex-col gap-5">
          <h3 className="font-bold font-secondary text-[16px]">인기 검색어</h3>
          <ul className="flex gap-[9px] mb-22">
            <li className="py-2 px-7 flex items-center justify-center bg-primary-40 rounded-[10px]">
              <Link to="/search/알함브라">알함브라</Link>
            </li>
            <li className="py-2 px-7 flex items-center justify-center bg-primary-40 rounded-[10px]">
              <Link to="/search/다이아몬드">다이아몬드</Link>
            </li>
            <li className="py-2 px-7 flex items-center justify-center bg-primary-40 rounded-[10px]">
              <Link to="/search/반지">반지</Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <div className="w-full flex justify-end gap-[45px] ">
            <DropDown
              item={['인기순', '가격순']}
              className="!border-b-0 !z-[20] !relative"
              handleClick={handleClick}
            />
            <button className="filter" onClick={onFilter}>
              필터
            </button>
          </div>
          <div className="results">
            <ul className="flex flex-wrap gap-10">
              {sortData.length === 0 ? (
                <div className="text-center text-[14px] font-bold">
                  검색결과가 없습니다.
                </div>
              ) : (
                sortData.map((product, idx) => (
                  <li
                    key={idx}
                    className="flex flex-col gap-[10px] relative w-[calc(25%-30px)]"
                  >
                    <img
                      src={product.objectimage[0]}
                      className="w-[245px] h-[280px]"
                    />
                    <div className="flex flex-col gap-4">
                      <div className="title flex flex-col gap-[7px]">
                        <div className="tag text-[12px] w-[240px] overflow-hidden whitespace-nowrap text-ellipsis break-all">
                          {product.stone}
                        </div>
                        <div className="title text-[16px] font-bold w-[240px] overflow-hidden whitespace-nowrap text-ellipsis break-all">
                          {product.title}
                        </div>
                      </div>
                      <div className="price text-[13px] font-bold">
                        ₩{product.price.toLocaleString()}
                      </div>
                    </div>
                    <div className="like absolute top-[10px] right-4">
                      <img src="/icons/like-unfilled.svg" className="w-4" />
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
      {isFillter ? (
        <SearchResultModal onClick={onFilter} data={searchData} />
      ) : (
        ''
      )}
    </div>
  );
};

export default Search;
