import React, { useEffect, useState } from "react";
import ProductListItem from "../../components/product/ProductListItem";
import ProductListPageNav from "../../components/product/ProductListPageNav";
import { useSelector } from "react-redux";

const ProductListPage = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null); // 필터 선택 상태
  const selectedCategory = useSelector(
    (state) => state.productR.filteredCategory
  );
  console.log(selectedCategory.name); //선택한 카테고리 이름

  const product = useSelector((state) => state.productR.productdata); // 상품 데이터
  console.log(product);
  const filteredProducts = useSelector(
    (state) => state.productR.filteredProducts
  );
  // Intersection Observer 초기화
  useEffect(() => {
    const items = document.querySelectorAll(".product-item"); // product-item 클래스 선택

    const observerOptions = {
      root: null, // viewport를 기준으로
      rootMargin: "0px",
      threshold: 0.5, // 요소가 50% 이상 보일 때 작동
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // 화면에 보이면 visible 클래스 추가
        } else {
          entry.target.classList.remove("visible"); // 화면에서 벗어나면 visible 클래스 제거
        }
      });
    }, observerOptions);

    items.forEach((item) => observer.observe(item)); // 각 아이템을 관찰

    return () => {
      observer.disconnect(); // 컴포넌트 언마운트 시 옵저버 해제
    };
  }, []);

  // 카테고리 선택 시 상태 업데이트
  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName); // 선택된 카테고리 상태 변경
  };

  const handleFilterSelect = (filterValue) => {
    setSelectedFilter(filterValue); // 필터 값 업데이트
    setFilterOpen(false); // 선택 후 필터 닫기
  };

  // 카테고리 필터링

  // 선택된 필터에 따른 정렬
  useEffect(() => {
    if (selectedFilter) {
      switch (selectedFilter) {
        case "sort1": // 추천순
          filteredProducts.sort((a, b) => a.recommended - b.recommended);
          break;
        case "sort2": // 판매인기순
          filteredProducts.sort((a, b) => b.sales - a.sales);
          break;
        case "sort3": // 낮은가격순
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case "sort4": // 높은가격순
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }
    }
  }, [selectedFilter, selectedCategory]); // 필터나 카테고리 변경 시마다 업데이트

  return (
    <div className='w-full h-auto relative bg-fixed bg-[url("/images/productListPageBg.png")] bg-no-repeat bg-top bg-cover'>
      <div className="w-full h-full pb-[100px]">
        <div className="w-full h-full p-330 pb-[180px] flex text-white pt-[219px]">
          <ProductListPageNav />
          <div className="pb-12 w-[74%] font-primary">
            <p className="pb-5 text-[45px] min-h-[85px] font-secondary">All</p>
            <div>
              {/* 필터 버튼 */}
              <div className="mb-[25px] relative">
                <div onClick={() => setFilterOpen(!filterOpen)}>
                  <span className="w-[128px] font-bold inline-block relative font-primary tracking-wider">
                    FILTER
                    <img
                      src="https://pbcommerce.cdn-nhncommerce.com/data/skin/front/m2021_VnA/img/icon/goods_icon/filter.png"
                      className="absolute top-0 right-[50px]"
                    />
                  </span>
                  {filterOpen && (
                    <ul className="w-[128px] bg-white py-2.5 text-black leading-[2]">
                      <li className="h-[33px] radio-label">
                        <input
                          type="radio"
                          id="sort1"
                          name="sort"
                          value="sort1"
                          className="radio-custom"
                          checked={selectedFilter === "sort1"}
                          onChange={() => handleFilterSelect("sort1")}
                        />
                        <label
                          htmlFor="sort1"
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
                          value="sort2"
                          className="radio-custom"
                          checked={selectedFilter === "sort2"}
                          onChange={() => handleFilterSelect("sort2")}
                        />
                        <label
                          htmlFor="sort2"
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
                          value="sort3"
                          className="radio-custom"
                          checked={selectedFilter === "sort3"}
                          onChange={() => handleFilterSelect("sort3")}
                        />
                        <label
                          htmlFor="sort3"
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
                          value="sort4"
                          className="radio-custom"
                          checked={selectedFilter === "sort4"}
                          onChange={() => handleFilterSelect("sort4")}
                        />
                        <label
                          htmlFor="sort4"
                          className="px-2.5 radio-custom-indicator"
                        >
                          높은가격순
                        </label>
                      </li>
                    </ul>
                  )}
                </div>
              </div>

              {/* 상품 리스트 */}
              <div>
                <div className="productList pb-[30px]">
                  <div className="relative w-full">
                    <div className="flex">
                      <ul
                        className="rellax relative w-full pt-[20px] pb-[28px]"
                        data-rellax-speed="-3"
                      >
                        {/* 필터링된 상품들 */}
                        {product.map((product) => {
                          return (
                            <li key={product.id} className="product-item">
                              <ProductListItem
                                className="transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] mt-[35px] min-h-[360px] mr-[7%]"
                                product={product}
                              />
                            </li>
                          );
                        })}
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
