import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredCategory, setFilteredProducts } from '../../store/modules/productSlice';

const ProductListPageNav = () => {
    // 서브메뉴의 visibility 상태를 관리
    const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);

    // "All" 클릭 시 서브메뉴 보이기/숨기기
    const toggleSubmenu = () => {
        setIsSubmenuVisible(!isSubmenuVisible);
    };
    /////////////////////
    const dispatch = useDispatch();
    const productdata = useSelector((state) => state.productR.productdata);

    // 카테고리 변경 처리 함수
    const handleCategoryChange = (categoryId, categoryName) => {
        console.log('Category ID:', categoryId);
        console.log('Category Name:', categoryName);

        // 카테고리 ID를 상태에 저장
        dispatch(setFilteredCategory({ id: categoryId, name: categoryName }));
        //리듀서로 () 인수-- 괄호 안 내용 보냄

        // 해당 카테고리에 맞는 상품 필터링
        const filteredProducts = productdata.filter((product) => product.category === categoryName);

        // 필터링된 상품 목록을 상태에 저장
        dispatch(setFilteredProducts(filteredProducts));
    };
    return (
        <div className="min-w-[250px] pt-0 pb-12 mt-1 mb-0 ml-0 mr-0 relative w-[26%]">
            <div className="fixed top-[240px]">
                <ul className="font-secondary font-bold">
                    <li>
                        <a href="#" className="text-content-xxxl">
                            SHOP
                        </a>
                        <ul className="text-content-l leading-18">
                            <li className="font-bold" id="All">
                                <a href="#" onClick={toggleSubmenu}>
                                    All
                                </a>
                            </li>
                            {isSubmenuVisible && (
                                <ul className="submenu font-bold text-content-l leading-8 font-primary pl-3 text-shadow-lg">
                                    <li id="Necklaces" onClick={() => handleCategoryChange(1, '목걸이')}>
                                        Necklaces and pendants
                                    </li>
                                    <li id="Bracelets" onClick={() => handleCategoryChange(2, '팔찌')}>
                                        Bracelets
                                    </li>
                                    <li id="Rings" onClick={() => handleCategoryChange(3, '반지')}>
                                        Rings
                                    </li>
                                    <li id="Earrings" onClick={() => handleCategoryChange(4, '귀걸이')}>
                                        Earrings
                                    </li>
                                </ul>
                            )}
                            <li>
                                <a href="../goods/goods_list.php?cateCd=001007">New</a>
                            </li>
                            <li>
                                <a href="../goods/goods_list.php?cateCd=001003">Best</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductListPageNav;
