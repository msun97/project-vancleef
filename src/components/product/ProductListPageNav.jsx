import { useState } from 'react';

const ProductListPageNav = () => {
    // 서브메뉴의 visibility 상태를 관리
    const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);

    // "All" 클릭 시 서브메뉴 보이기/숨기기
    const toggleSubmenu = () => {
        setIsSubmenuVisible(!isSubmenuVisible);
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
                            <li className="font-bold">
                                <a href="#" onClick={toggleSubmenu}>
                                    All
                                </a>
                            </li>
                            {isSubmenuVisible && (
                                <ul className="submenu font-bold text-content-l leading-8 font-primary pl-3 text-shadow-lg">
                                    <li>
                                        <a href="../goods/goods_list.php?cateCd=001001001">Necklaces and pendants</a>
                                    </li>
                                    <li>
                                        <a href="../goods/goods_list.php?cateCd=001001002">Bracelets</a>
                                    </li>
                                    <li>
                                        <a href="../goods/goods_list.php?cateCd=001001003">Rings</a>
                                    </li>
                                    <li>
                                        <a href="../goods/goods_list.php?cateCd=001001004">Earrings</a>
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
