import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredCategory, setFilteredProducts } from '../../store/modules/productSlice';

const ProductListPageNav = () => {
    const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);

    const dispatch = useDispatch();
    const productdata = useSelector((state) => state.productR.productdata);

    const handleCategoryChange = (categoryId, categoryName, event) => {
        event.preventDefault(); // 기본 동작 막기
        console.log('Category ID:', categoryId);
        console.log('Category Name:', categoryName);

        const category = { id: categoryId, name: categoryName };
        console.log('Dispatching payload:', category);
        dispatch(setFilteredCategory(category));

        const filteredProducts = productdata.filter((product) => product.category === categoryName);
        dispatch(setFilteredProducts(filteredProducts));
    };

    const handleAllClick = (event) => {
        event.preventDefault();
        setIsSubmenuVisible(!isSubmenuVisible);

        dispatch(setFilteredCategory({ id: null, name: 'All' })); // 'All' 카테고리 설정
        dispatch(setFilteredProducts(productdata)); // 전체 상품 표시
    };

    return (
        <div className="min-w-[200px] pt-0 pb-12 mt-1 mb-0 ml-0 mr-0 relative w-[26%]">
            <div className="fixed top-[240px]">
                <ul className="font-secondary font-bold">
                    <li>
                        <a href="#" className="text-content-xxxl">
                            SHOP
                        </a>
                        <ul className="text-content-l leading-18 cursor-pointer">
                            <li className="font-bold" id="All" onClick={handleAllClick}>
                                All
                            </li>
                            {isSubmenuVisible && (
                                <ul className="submenu font-bold text-content-l leading-8 font-primary pl-3 text-shadow-lg">
                                    {/* 수정: 각 카테고리 항목에 이벤트 객체 전달 */}
                                    <li id="Necklaces" onClick={(event) => handleCategoryChange(1, '목걸이', event)}>
                                        Necklaces
                                    </li>
                                    <li id="Bracelets" onClick={(event) => handleCategoryChange(2, '팔찌', event)}>
                                        Bracelets
                                    </li>
                                    <li id="Rings" onClick={(event) => handleCategoryChange(3, '반지', event)}>
                                        Rings
                                    </li>
                                    <li id="Earrings" onClick={(event) => handleCategoryChange(4, '귀걸이', event)}>
                                        Earrings
                                    </li>
                                </ul>
                            )}
                            <li>New</li>
                            <li>Best</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductListPageNav;
