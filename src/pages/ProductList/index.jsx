import React, { useEffect, useState } from 'react';
import ProductListItem from '../../components/product/ProductListItem';
import ProductListPageNav from '../../components/product/ProductListPageNav';
import { useSelector } from 'react-redux';

const ProductListPage = () => {
    useEffect(() => {
        // Intersection Observer 초기화
        const items = document.querySelectorAll('.product-item'); // product-item 클래스 선택

        const observerOptions = {
            root: null, // viewport를 기준으로
            rootMargin: '0px',
            threshold: 0.5, // 요소가 50% 이상 보일 때 작동
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible'); // 화면에 보이면 visible 클래스 추가
                } else {
                    entry.target.classList.remove('visible'); // 화면에서 벗어나면 visible 클래스 제거
                }
            });
        }, observerOptions);

        items.forEach((item) => {
            observer.observe(item); // 각 아이템을 관찰
        });

        return () => {
            observer.disconnect(); // 컴포넌트 언마운트 시 옵저버 해제
        };
    }, []);

    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null); // 필터 선택 상태 관리
    const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리 상태
    const handleOpenClick = () => {
        setFilterOpen(!filterOpen);
    };
    // 카테고리 메뉴에서 클릭한 카테고리 설정
    const handleCategorySelect = (categoryName) => {
        setSelectedCategory(categoryName); // 선택된 카테고리 상태 변경
    };

    const handleFilterSelect = (filterValue) => {
        setSelectedFilter(filterValue); // 필터 값 업데이트
        setFilterOpen(false); // 선택 후 필터 닫기
    };
    ////////////////////////////////////
    const product = useSelector((state) => state.productR.productdata);
    const filteredCategory = useSelector((state) => state.productR.filteredCategory);
    //useSelector 훅으로 원본데이터의 초기값 가져온다
    const filteredProducts = selectedCategory
        ? product.filter((item) => item.category === selectedCategory) // 선택된 카테고리에 맞는 상품만 필터링
        : product; // 카테고리가 선택되지 않으면 전체 상품을 보여줌
    useEffect(() => {
        if (selectedFilter) {
            // 선택된 필터에 따라 제품을 정렬
            switch (selectedFilter) {
                case 'sort1': // 추천순
                    filteredProducts.sort((a, b) => a.recommended - b.recommended); // 예시
                    break;
                case 'sort2': // 판매인기순
                    filteredProducts.sort((a, b) => b.sales - a.sales); // 예시
                    break;
                case 'sort3': // 낮은가격순
                    filteredProducts.sort((a, b) => a.price - b.price); // 예시
                    break;
                case 'sort4': // 높은가격순
                    filteredProducts.sort((a, b) => b.price - a.price); // 예시
                    break;
                default:
                    break;
            }
        }
    }, [selectedFilter, filteredCategory]); // 필터나 카테고리 변경 시마다 업데이트
    console.log();
    return (
        <div className='w-full h-auto relative bg-fixed bg-[url("/images/productListPageBg.png")] bg-no-repeat bg-top bg-cover'>
            <div className="w-full h-full pb-[100px]">
                <div className="w-full h-full p-330 pb-[180px] flex text-white  pt-[219px] ">
                    {/* */}
                    <ProductListPageNav />
                    <div className="pb-12 w-[74%] font-primary">
                        <p className="pb-5 text-[45px] min-h-[85px] font-secondary">All</p>
                        <div>
                            <div className="mb-[25px] relative">
                                <div onClick={handleOpenClick}>
                                    <span className="w-[128px] font-bold inline-block relative font-primary tracking-wider">
                                        FILTER
                                        <img
                                            src="https://pbcommerce.cdn-nhncommerce.com/data/skin/front/m2021_VnA/img/icon/goods_icon/filter.png"
                                            className="absolute top-0 right-[50px] "
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
                                                    checked={selectedFilter === 'sort1'}
                                                    onChange={() => handleFilterSelect('sort1')}
                                                />
                                                <label htmlFor="sort1" className="px-2.5 radio-custom-indicator">
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
                                                    checked={selectedFilter === 'sort2'}
                                                    onChange={() => handleFilterSelect('sort2')}
                                                />
                                                <label htmlFor="sort2" className="px-2.5 radio-custom-indicator">
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
                                                    checked={selectedFilter === 'sort3'}
                                                    onChange={() => handleFilterSelect('sort3')}
                                                />
                                                <label htmlFor="sort3" className="px-2.5 radio-custom-indicator">
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
                                                    checked={selectedFilter === 'sort4'}
                                                    onChange={() => handleFilterSelect('sort4')}
                                                />
                                                <label htmlFor="sort4" className="px-2.5 radio-custom-indicator">
                                                    높은가격순
                                                </label>
                                            </li>
                                        </ul>
                                    )}
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
                                                {/* 선택된 카테고리에 맞는 상품만 필터링하여 보여줌 */}
                                                {product.slice(0, 2).map((category, index) => {
                                                    return (
                                                        <div key={category.id}>
                                                            {category.data.map((product) => (
                                                                <ProductListItem
                                                                    className="transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] mt-[35px] min-h-[360px] mr-[7%]"
                                                                    key={product.productid}
                                                                    productdata={product}
                                                                />
                                                            ))}
                                                        </div>
                                                    );
                                                })}
                                                {/* 왼쪽 */}
                                            </ul>
                                            <ul
                                                className="rellax relative w-full pt-[100px] pb-[28px]"
                                                data-rellax-speed="-3"
                                            >
                                                {
                                                    /* filteredCategory.name === product.category ? (
                                                    // 카테고리가 필터링된 경우
                                                    filteredProducts
                                                        .slice(Math.floor(product.length / 2))
                                                        .map((category) => (
                                                            <div key={category.id}>
                                                                {category.data.map((product) => (
                                                                    <ProductListItem
                                                                        className="transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] mt-[35px] min-h-[360px] mr-[7%]"
                                                                        key={product.productid}
                                                                        productdata={product}
                                                                    />
                                                                ))}
                                                            </div>
                                                        ))
                                                ) */
                                                    <>
                                                        {product
                                                            .slice(Math.floor(product.length / 2))
                                                            .map((category, index) => {
                                                                return (
                                                                    <div key={category.id}>
                                                                        {category.data.map((product) => (
                                                                            <ProductListItem
                                                                                className="transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] mt-[35px] min-h-[360px] mr-[7%]"
                                                                                key={product.productid}
                                                                                productdata={product}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                );
                                                            })}
                                                    </>
                                                }

                                                {/* 오른쪽 */}
                                                {/*    {product
                                                    .slice(Math.floor(product.length / 2))
                                                    .map((category, index) => {
                                                        return (
                                                            <div key={category.id}>
                                                                {category.data.map((product) => (
                                                                    <ProductListItem
                                                                        className="transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] mt-[35px] min-h-[360px] mr-[7%]"
                                                                        key={product.productid}
                                                                        productdata={product}
                                                                    />
                                                                ))}
                                                            </div>
                                                        );
                                                    })} */}
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
