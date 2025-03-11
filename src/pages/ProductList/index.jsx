import React, { useEffect } from "react";
import Rellax from "rellax"; // Rellax.js 임포트
import { IoIosHeartEmpty } from "react-icons/io";
import ProductDescription from "../../components/product/ProductDescription";
import ProductImg from "../../components/product/ProductImg";
import ProductListItem from "../../components/product/ProductListItem";

const ProductListPage = () => {
  useEffect(() => {
    // Rellax 초기화
    const rellax = new Rellax(".rellax");

    // 컴포넌트 언마운트 시 리소스 정리
    return () => {
      rellax.destroy();
    };
  }, []);

  return (
    <div className='w-full h-auto relative bg-fixed bg-[url("/images/productListPageBg.png")] bg-no-repeat bg-top bg-cover'>
      <div className="w-full h-full pb-[100px]">
        <div className="w-full h-full p-330 pb-[180px] flex text-white  pt-[219px] ">
          {/* */}
          <div className="min-w-[250px] pt-0 pb-12 mt-1 mb-0 ml-0 mr-0 relative w-[26%]  ">
            <div className="fixed top-[240px] ">
              <ul className="font-secondary font-bold">
                <li>
                  <a href="" className="text-content-xxxl  ">
                    SHOP
                  </a>

                  <li>
                    <ul className="text-content-l leading-18 ">
                      <li className="font-bold">
                        <a href="">All</a>
                      </li>
                      <ul className="submenu font-bold text-content-l hidden">
                        <li>
                          <a href="../goods/goods_list.php?cateCd=001001001">
                            Category-1
                          </a>
                        </li>
                        <li>
                          <a href="../goods/goods_list.php?cateCd=001001002">
                            Category-2
                          </a>
                        </li>
                        <li>
                          <a href="../goods/goods_list.php?cateCd=001001003">
                            Category-3
                          </a>
                        </li>
                        <li>
                          <a href="../goods/goods_list.php?cateCd=001001004">
                            Category-4
                          </a>
                        </li>
                      </ul>
                      <li>
                        <a href="../goods/goods_list.php?cateCd=001007">New</a>
                      </li>
                      <li>
                        <a href="../goods/goods_list.php?cateCd=001003">Best</a>
                      </li>
                      <li>
                        <a href="../goods/goods_list.php?cateCd=001004">
                          선물하기
                        </a>
                      </li>
                    </ul>
                  </li>
                </li>
              </ul>
            </div>
          </div>
          <div className="pb-12 w-[74%] font-primary">
            <p className="pb-5 text-[45px] min-h-[85px] font-secondary">All</p>
            <div>
              <div className="mb-[25px] relative">
                <div>
                  <span className="w-[128px] font-bold inline-block relative font-primary tracking-wider">
                    FILTER
                    <img
                      src="https://pbcommerce.cdn-nhncommerce.com/data/skin/front/m2021_VnA/img/icon/goods_icon/filter.png"
                      className="absolute top-0 right-[50px] "
                    />
                  </span>
                  <ul className="hidden w-[128px] bg-white py-2.5 text-black leading-[2]">
                    <li className="h-[33px] radio-label">
                      <input
                        type="radio"
                        id="sort1"
                        name="sort"
                        value=""
                        className="radio-custom"
                      />
                      <label
                        for="sort1"
                        className="px-2.5 radio-custom-indicator"
                      >
                        추천순
                      </label>
                    </li>
                    <li className="h-[33px] radio-label">
                      <input
                        type="radio"
                        id="sort2"
                        name="sort"
                        value="sellcnt"
                        className="radio-custom"
                      />
                      <label
                        for="sort2"
                        className="px-2.5 radio-custom-indicator"
                      >
                        판매인기순
                      </label>
                    </li>
                    <li className="h-[33px] radio-label">
                      <input
                        type="radio"
                        id="sort3"
                        name="sort"
                        value="price_asc"
                        className="radio-custom"
                      />
                      <label
                        for="sort3"
                        className="px-2.5 radio-custom-indicator"
                      >
                        낮은가격순
                      </label>
                    </li>
                    <li className="h-[33px] radio-label">
                      <input
                        type="radio"
                        id="sort4"
                        name="sort"
                        value="price_dsc"
                        className="radio-custom"
                      />
                      <label
                        for="sort4"
                        className="px-2.5 radio-custom-indicator"
                      >
                        높은가격순
                      </label>
                    </li>
                  </ul>
                  {/* detail nav */}
                </div>
              </div>
              <div>
                <div className="productList pb-[30px]">
                  <div className="relative w-full">
                    <div className="flex">
                      <ul
                        className="rellax relative w-full pt-[20px] pb-[28px]"
                        data-rellax-speed="-3"
                      >
                        {/* 왼쪽 */}

                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] min-h-[360px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] mt-[55px] min-h-[360px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] mt-[55px] min-h-[360px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] mt-[55px] min-h-[360px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] mt-[55px] min-h-[360px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] mt-[55px] min-h-[360px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] mt-[55px] min-h-[360px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] mt-[55px] min-h-[360px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] mt-[55px] min-h-[360px] mr-[7%]" />
                      </ul>
                      <ul
                        className="rellax relative w-full pt-[100px] pb-[28px]"
                        data-rellax-speed="-3"
                      >
                        {/* 오른쪽 */}
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]   min-h-[360px] mt-[70px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]" />
                        <ProductListItem className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]" />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
