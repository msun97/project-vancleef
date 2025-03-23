import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredCategory, setFilteredProducts } from '../../store/modules/productSlice';
import { Link } from 'react-router-dom';

const ProductListPageNav = () => {
    const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);

    const dispatch = useDispatch();
    const productdata = useSelector((state) => state.productR.productdata);

    const handleCategoryChange = (categoryId, categoryName, event) => {
        event.preventDefault(); // 기본 동작 막기


        const category = { id: categoryId, name: categoryName };
        dispatch(setFilteredCategory(category));

        const filteredProducts = productdata.filter((product) => product.category === categoryName);
        dispatch(setFilteredProducts(filteredProducts));
    };
    const handleCategoryChange2 = (categoryId, categoryName, event) => {
        event.preventDefault();


        const category = { id: categoryId, name: categoryName };
        dispatch(setFilteredCategory(category));

        const filteredProducts = productdata
            .map((product) => {
                const newItems = product.data.filter((item) => item.isNew === true);
                if (newItems.length > 0) {
                    return { ...product, data: newItems };
                }
                return null;
            })
            .filter(Boolean);

        dispatch(setFilteredProducts(filteredProducts));
    };
    const handleCategoryChange3 = (categoryId, categoryName, event) => {
        event.preventDefault();

        const category = { id: categoryId, name: categoryName };
        dispatch(setFilteredCategory(category));

        const filteredProducts = productdata
            .map((product) => {
                const newItems = product.data.filter((item) => {
                    return item.isBest === true;
                });
                if (newItems.length > 0) {
                    return { ...product, data: newItems };
                }
                return null;
            })
            .filter(Boolean);

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
                        <Link to="#" className="text-content-xxxl">
                            SHOP
                        </Link>
                        <ul className="text-content-l leading-18 cursor-pointer">
                            <li className="font-bold" id="All" onClick={handleAllClick}>
                                All
                            </li>
                            {isSubmenuVisible && (
                                <ul className="submenu font-bold text-content-l leading-8 font-primary pl-3 text-shadow-lg">
                                    {/* 수정: 각 카테고리 항목에 이벤트 객체 전달 */}
                                    <li id="Necklaces" onClick={(event) => handleCategoryChange(1, 'necklaces', event)}>
                                        Necklaces
                                    </li>
                                    <li id="Bracelets" onClick={(event) => handleCategoryChange(2, 'bracelets', event)}>
                                        Bracelets
                                    </li>
                                    <li id="Rings" onClick={(event) => handleCategoryChange(3, 'rings', event)}>
                                        Rings
                                    </li>
                                    <li id="Earrings" onClick={(event) => handleCategoryChange(4, 'earrings', event)}>
                                        Earrings
                                    </li>
                                </ul>
                            )}
                            <li onClick={(event) => handleCategoryChange2(5, 'isNew', event)}>New</li>
                            <li onClick={(event) => handleCategoryChange3(6, 'isBest', event)}>Best</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductListPageNav;
