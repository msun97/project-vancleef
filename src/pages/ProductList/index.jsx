import React, { useEffect, useRef, useState } from 'react';
import ProductListItem from '../../components/product/ProductListItem';
import ProductListPageNav from '../../components/product/ProductListPageNav';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const ProductListPage = () => {
    const dispatch = useDispatch();
    const location = useLocation(); // 현재 라우트 위치 가져오기

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

    // 이전 카테고리를 저장하는 ref
    const prevCategoryRef = useRef(null);
    const timeoutRef = useRef(null);

    // 카테고리가 변경될 때 필터 초기화
    useEffect(() => {
        // 이전 카테고리 값이 있고, 현재 카테고리와 다른 경우에만 실행
        if (prevCategoryRef.current !== null && prevCategoryRef.current?.name !== filteredCategory?.name) {
            console.log('카테고리 변경 감지: 필터 초기화');
            setSelectedFilter(null); // 필터 상태 초기화
        }

        // 현재 카테고리를 이전 카테고리로 업데이트
        prevCategoryRef.current = filteredCategory;
    }, [filteredCategory]);

    // 필터링되지 않은 원본 제품 목록을 2개 컬럼으로 나누는 함수
    const distributeProductsToColumns = (products) => {
        // 모든 제품 데이터를 펼쳐서 하나의 배열로 만들기
        const allProducts = [];

        products.forEach((categoryItem) => {
            if (categoryItem.data && Array.isArray(categoryItem.data)) {
                // 제품 데이터를 카테고리 정보와 함께 저장
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

    // 상품 정렬 및 컬럼 분배 함수
    const sortAndDistributeProducts = (products, sortType) => {
        // 모든 제품 데이터를 펼쳐서 하나의 배열로 만들기
        const allProducts = [];

        products.forEach((categoryItem) => {
            if (categoryItem.data && Array.isArray(categoryItem.data)) {
                // 제품 데이터를 카테고리 정보와 함께 저장
                const productsWithCategory = categoryItem.data.map((product) => ({
                    ...product,
                    categoryId: categoryItem.id,
                    category: categoryItem.category,
                }));

                allProducts.push(...productsWithCategory);
            }
        });

        // 정렬된 제품 목록
        let sortedProducts = [...allProducts];

        // 선택된 필터가 있을 경우에만 정렬 적용
        if (sortType === 'sort3') {
            // 낮은 가격순
            sortedProducts.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        } else if (sortType === 'sort4') {
            // 높은 가격순
            sortedProducts.sort((a, b) => parseInt(b.price) - parseInt(a.price));
        }

        const leftColumn = [];
        const rightColumn = [];

        sortedProducts.forEach((product, index) => {
            if (index % 2 === 0) {
                leftColumn.push(product);
            } else {
                rightColumn.push(product);
            }
        });

        setLeftColumnProducts(leftColumn);
        setRightColumnProducts(rightColumn);
    };

    // 제품 목록이나 카테고리가 변경될 때 제품 목록 업데이트
    useEffect(() => {
        const productsToProcess = filteredProducts.length > 0 ? filteredProducts : product;

        if (productsToProcess && productsToProcess.length > 0) {
            if (selectedFilter) {
                // 필터가 선택된 경우 정렬 적용
                sortAndDistributeProducts(productsToProcess, selectedFilter);
            } else {
                // 필터가 선택되지 않은 경우 원본 순서 유지
                distributeProductsToColumns(productsToProcess);
            }
        }
    }, [product, filteredProducts, selectedFilter]);

    // Intersection Observer 설정
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
        // 같은 필터를 다시 선택하면 필터 해제
        if (selectedFilter === filterValue) {
            setSelectedFilter(null);
        } else {
            setSelectedFilter(filterValue);
        }

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
            case 'Necklaces and pendants':
                return 'Necklaces and pendants';
            case 'Bracelets':
                return 'Bracelets';
            case 'Rings':
                return 'Rings';
            case 'Earrings':
                return 'Earrings';
            default:
                return 'All';
        }
    };

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
