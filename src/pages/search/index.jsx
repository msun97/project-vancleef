import React, { useEffect, useState } from 'react';
import DropDown from '../../components/dropdown';
import SearchResultModal from './componetns/SearchResultModal';
import { Link, useParams } from 'react-router-dom';
import { productdata } from '../../assets/api/productdata';
import { useDispatch, useSelector } from 'react-redux';
import { searchActions } from '@/store/modules/searchSlice';
import { addFavorite, removeFavorite } from '@/store/modules/favoritesSlice';
import { authActions } from '@/store/modules/authSlice';

const Search = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const alldata = productdata;
  const { user } = useSelector(state => state.authR);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const categories = alldata.map(item => item.category);

    const updatedSearchData = alldata.flatMap(item => {
      const categoryIndex = categories.indexOf(item.category);

      if (item.searchCategory.includes(keyword)) {
        return item.data.map(data => ({ ...data, category: categoryIndex }));
      }

      if (item.data && Array.isArray(item.data)) {
        return item.data
          .filter(
            data =>
              (data.title && data.title.includes(keyword)) ||
              (data.subtitle && data.subtitle.includes(keyword)) ||
              (data.detail && data.detail.includes(keyword)) ||
              (data.stone && data.stone.includes(keyword)),
          )
          .map(data => ({ ...data, category: categoryIndex }));
      }

      return []; // 빈 배열 반환 (flatMap이므로 영향 없음)
    });

    setSearchData(updatedSearchData);
    dispatch(searchActions.setOriginal(updatedSearchData)); // 리덕스 업데이트
  }, [keyword]); // 🔥 keyword 바뀔 때마다 실행

  const filterData = useSelector(state => state.searchR.filterData);
  useEffect(() => {
    dispatch(searchActions.setOriginal(searchData));
  }, []);
  const [isFillter, setIsFillter] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  useEffect(() => {
    setIsFiltering(false);
  }, [keyword]);
  const onFiltering = () => {
    setIsFiltering(true);
  };
  const onFilter = () => {
    setIsFillter(!isFillter);
  };
  const [sortData, setSortData] = useState(searchData);
  useEffect(() => {
    if (isFiltering) {
      setSortData(filterData);
    } else {
      setSortData(searchData);
    }
  }, [keyword, isFiltering, searchData, filterData]);

  const handleClick = sort => {
    if (sort === '인기순') {
      setSortData(prev => prev);
    } else if (sort === '가격순') {
      setSortData(prev => prev.sort((a, b) => b.price - a.price));
    }
  };

  const onFavorite = data => {
    if (user) {
      dispatch(authActions.addfavorites(data));
    } else {
      alert('로그인이 필요합니다.');
    }
  };
  const offFavorite = data => {
    dispatch(authActions.removeFavorite(data));
  };

  console.log(sortData);

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
                sortData.map((product, idx) => {
                  const isFavorite = user.favorites.some(
                    item => item.productnumber === product.productnumber,
                  );

                  return (
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
                        <button
                          onClick={() =>
                            isFavorite
                              ? offFavorite(product)
                              : onFavorite(product)
                          }
                        >
                          <img
                            src={
                              isFavorite
                                ? '/icons/like-filled.svg'
                                : '/icons/like-unfilled.svg'
                            }
                            className="w-4"
                          />
                        </button>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      </div>
      {isFillter ? (
        <SearchResultModal
          onClick={onFilter}
          data={sortData}
          originalData={searchData}
          onFiltering={onFiltering}
          isFiltering={isFiltering}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Search;
