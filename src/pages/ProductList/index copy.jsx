import React, { useEffect, useRef, useState } from 'react';
import ProductListItem from '../../components/product/ProductListItem';
import ProductListPageNav from '../../components/product/ProductListPageNav';
import { useSelector } from 'react-redux';

const ProductListPage = () => {
    // Redux store에서 상품 데이터와 필터링된 카테고리 가져오기
    const product = useSelector((state) => state.productR.productdata);
    const { filteredCategory } = useSelector((state) => state.productR);
    const { filteredProducts } = useSelector((state) => state.productR);

    // 각 열에 표시할 상품 상태
    const [leftColumnProducts, setLeftColumnProducts] = useState([]);
    const [rightColumnProducts, setRightColumnProducts] = useState([]);

    // 필터 상태
    const [filterOpen, setFilterOpen] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [filterClosing, setFilterClosing] = useState(false); // 필터가 닫히는 중인지 상태 추가

    const timeoutRef = useRef(null);

    // 상품 배열 업데이트 함수 (초기 렌더링 및 필터링 시 사용)
    const updateProductColumns = (products) => {
        // 모든 제품 데이터를 펼쳐서 하나의 배열로 만들기
        const allProducts = [];

        products.forEach((categoryItem) => {
            if (categoryItem.data && Array.isArray(categoryItem.data)) {
                // 제품 데이터를 카테고리 정보와 함께 저장--- Array.isArray() 괄혼 안 내용이 배열인 지 여부 true,false 확인
                const productsWithCategory = categoryItem.data.map((product) => ({
                    ...product,
                    categoryId: categoryItem.id,
                    category: categoryItem.category,
                }));

                allProducts.push(...productsWithCategory);
            }
        });
        const leftColumn = [];
        const rightColumn = [];

        allProducts.forEach((product, index) => {
            if (index % 2 === 0) {
                leftColumn.push(product);
            } else {
                rightColumn.push(product);
            }
        });

        setLeftColumnProducts(leftColumn);
        setRightColumnProducts(rightColumn);
    };

    // 초기 렌더링 시 전체 제품 표시
    useEffect(() => {
        updateProductColumns(product);
    }, [product]);

    // 카테고리나 필터링된 상품 데이터가 변경될 때마다 제품 배열 업데이트
    useEffect(() => {
        if (filteredProducts.length > 0) {
            updateProductColumns(filteredProducts);
        }
    }, [filteredProducts]);

    // Intersection Observer 설정 - DOM 요소가 변경될 때마다 실행
    useEffect(() => {
        // 잠시 지연을 주어 DOM이 업데이트될 시간을 확보
        const timer = setTimeout(() => {
            const items = document.querySelectorAll('.product-item');

            if (items.length === 0) return; // 아이템이 없으면 observer 설정 안함

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.5,
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            }, observerOptions);

            items.forEach((item) => {
                observer.observe(item);
            });

            return () => {
                observer.disconnect();
            };
        }, 200); // 200ms 지연

        return () => clearTimeout(timer);
    }, [leftColumnProducts, rightColumnProducts]);

    const handleOpenClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지

        if (filterClosing) {
            // 닫히는 중이면 타이머 취소하고 다시 열기
            clearTimeout(timeoutRef.current);
            setFilterClosing(false);
            setFilterOpen(true);
        } else {
            setFilterOpen(!filterOpen);
        }
    };

    const handleFilterSelect = (filterValue) => {
        setSelectedFilter(filterValue); // 필터 선택

        // 이미 타이머가 있다면 제거
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // 2초 후에 필터 닫기 애니메이션 시작
        timeoutRef.current = setTimeout(() => {
            setFilterClosing(true); // 닫히는 중으로 상태 변경

            // 애니메이션 완료 후 실제로 닫기
            setTimeout(() => {
                setFilterOpen(false);
                setFilterClosing(false);
            }, 500); // 0.5초 후에 실제로 닫힘 (애니메이션 시간)
        }, 2000); // 2초 후에 닫기 시작
    };

    // 카테고리 이름을 표시하는 함수
    const getCategoryDisplayName = () => {
        if (!filteredCategory || filteredCategory.name === 'All') return 'All';

        // 카테고리 ID에 따라 영어 이름 반환
        switch (filteredCategory.name) {
            case '목걸이':
                return 'Necklaces and pendants';
            case '팔찌':
                return 'Bracelets';
            case '반지':
                return 'Rings';
            case '귀걸이':
                return 'Earrings';
            default:
                return 'All';
        }
    };

    // 디버깅 코드 - 콘솔에 현재 상태 출력
    console.log('현재 카테고리:', filteredCategory?.name);

    return (
        <div className='w-full h-auto relative bg-fixed bg-[url("/images/productListPageBg.png")] bg-no-repeat bg-top bg-cover'>
            <div className="w-full h-full pb-[100px]">
                <div className="w-full h-full p-330 pb-[180px] flex text-white pt-[219px]">
                    <ProductListPageNav />
                    <div className="pb-12 w-[80%] font-primary">
                        <p className="pb-5 text-[45px] min-h-[85px] font-secondary">{getCategoryDisplayName()}</p>
                        <div>
                            <div className="mb-[25px] relative">
                                <div onClick={handleOpenClick}>
                                    <span className="w-[128px] font-bold inline-block relative font-primary tracking-wider">
                                        FILTER
                                        <img
                                            src="https://pbcommerce.cdn-nhncommerce.com/data/skin/front/m2021_VnA/img/icon/goods_icon/filter.png"
                                            className="absolute top-0 right-[50px]"
                                        />
                                    </span>
                                    {filterOpen && (
                                        <ul
                                            className={`w-[128px] p-3 bg-white py-2.5 text-black leading-[2] transition-opacity duration-500 ${
                                                filterClosing ? 'opacity-0' : 'opacity-100'
                                            }`}
                                        >
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
                                                <label
                                                    htmlFor="sort1"
                                                    className={`px-2.5 radio-custom-indicator cursor-pointer ${
                                                        selectedFilter === 'sort1' ? 'font-bold' : ''
                                                    }`}
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
                                                    className="radio-custom "
                                                    checked={selectedFilter === 'sort2'}
                                                    onChange={() => handleFilterSelect('sort2')}
                                                />
                                                <label
                                                    htmlFor="sort2"
                                                    className={`px-2.5 radio-custom-indicator cursor-pointer ${
                                                        selectedFilter === 'sort2' ? 'font-bold' : ''
                                                    }`}
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
                                                    className="radio-custom "
                                                    checked={selectedFilter === 'sort3'}
                                                    onChange={() => handleFilterSelect('sort3')}
                                                />
                                                <label
                                                    htmlFor="sort3"
                                                    className={`px-2.5 radio-custom-indicator cursor-pointer ${
                                                        selectedFilter === 'sort3' ? 'font-bold' : ''
                                                    }`}
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
                                                    className="radio-custom "
                                                    checked={selectedFilter === 'sort4'}
                                                    onChange={() => handleFilterSelect('sort4')}
                                                />
                                                <label
                                                    htmlFor="sort4"
                                                    className={`px-2.5 radio-custom-indicator cursor-pointer ${
                                                        selectedFilter === 'sort4' ? 'font-bold' : ''
                                                    }`}
                                                >
                                                    높은가격순
                                                </label>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="productList pb-[30px]">
                                    <div className="relative w-full">
                                        <div className="flex" style={{ gap: '3%' }}>
                                            {/* 왼쪽 열 */}
                                            <ul
                                                className="rellax relative w-full pt-[20px] pb-[28px]"
                                                data-rellax-speed="-3"
                                            >
                                                {leftColumnProducts.length > 0 ? (
                                                    leftColumnProducts.map((product, index) => (
                                                        <ProductListItem
                                                            className="product-item transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] mt-[35px] min-h-[360px]"
                                                            key={`${product.productid}-${index}`}
                                                            productdata={product}
                                                        />
                                                    ))
                                                ) : (
                                                    <div className="text-center text-white text-xl mt-10">
                                                        해당 카테고리에 제품이 없습니다.
                                                    </div>
                                                )}
                                            </ul>

                                            {/* 오른쪽 열 */}
                                            <ul
                                                className="rellax relative w-full pt-[100px] pb-[28px]"
                                                data-rellax-speed="-3"
                                            >
                                                {rightColumnProducts.length > 0 ? (
                                                    rightColumnProducts.map((product, index) => (
                                                        <ProductListItem
                                                            className="product-item transition-all duration-1000 ease-in-out top-0 bg-white p-[25px_30px_33px] mt-[35px] min-h-[360px] "
                                                            key={`${product.productid}-${index}`}
                                                            productdata={product}
                                                        />
                                                    ))
                                                ) : (
                                                    <div></div> // 오른쪽 열에는 빈 메시지 표시 안 함
                                                )}
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
