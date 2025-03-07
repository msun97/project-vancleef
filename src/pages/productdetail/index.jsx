import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/button';

function ProductDetailPage() {
    const [selectedOption, setSelectedOption] = useState('');
    const [isSelectOpen, setIsSelectOpen] = useState(false);
    const selectRef = useRef(null);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setIsSelectOpen(false); // 옵션 선택 후 select 닫기
    };

    const handleSelectClick = () => {
        setIsSelectOpen(true);
    };

    const handleBlur = () => {
        // onBlur 이벤트가 바로 발생하여 클릭 이벤트와 충돌하는 것을 방지하기 위해 setTimeout 사용
        setTimeout(() => {
            setIsSelectOpen(false);
        }, 100);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsSelectOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <div id="contents" className="w-full h-full ">
            <div className="w-full h-full pb-[80px]"></div>
            <div id="goods" className="w-full h-full">
                <div id="goods_view" className="w-full h-full flex">
                    <div className="view_lft w-[50%] h-[800px]">
                        {/* 제품 이미지 및 슬라이더 */}
                        <div
                            id="bigimg"
                            className="img w-full h-full"
                            style={{
                                backgroundImage: "url('/images/product1.png')",
                                /*   backgroundSize: 'contain', */
                                backgroundRepeat: 'no-repeat',
                                backgroundPositionY: ' -101px',
                            }}
                        >
                            <div></div>
                        </div>
                        <div id="goodsnav">
                            <ul className="slider_wrap slider_goods_nav">
                                {/*    {images.map((image, index) => (
                                    <li key={index} onClick={() => handleThumbnailClick(index)}>
                                        <div className="thumb">
                                            <img src={image} alt={`제품 썸네일 ${index + 1}`} />
                                        </div>
                                    </li>
                                ))} */}
                            </ul>
                        </div>
                    </div>
                    <div className="view_rgt w-[50%] h-[800px] font-primary text-[12px] leading-8">
                        <div className="px-[114px] h-full pt-[154px]">
                            <div className="title">
                                <h3>제품 이름</h3>
                            </div>
                            <div className="price">
                                <dl className="item_price detail-price">
                                    <dt>판매가</dt>
                                </dl>
                            </div>
                            <div className="option">
                                <select className="w-full border border-solid black">
                                    <option value="" disabled selected>
                                        size
                                    </option>
                                    <option value="option1">옵션 1</option>
                                    <option value="option2">옵션 2</option>
                                    <option value="option3">옵션 3</option>
                                </select>
                                {/* 구매 폼 */}
                                <form name="frmView" id="frmView" method="post">
                                    <input type="hidden" name="goodsno" value="12345" />
                                    <input type="hidden" name="cate" value="67890" />
                                    {/* 다른 필요한 hidden input 필드들 추가 */}
                                    <div className="buy-btn">
                                        <Button className="mt-[12px]" fullWidth>
                                            ADD TO CART
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 탭 메뉴 및 상세 정보 */}
                <div id="tab">
                    <ul className="tab-menu">
                        {/*      <li className={activeTab === 'detail' ? 'active' : ''} onClick={() => handleTabClick('detail')}>
                            상세정보
                        </li>
                        <li className={activeTab === 'info' ? 'active' : ''} onClick={() => handleTabClick('info')}>
                            상품정보
                        </li>
                        <li className={activeTab === 'review' ? 'active' : ''} onClick={() => handleTabClick('review')}>
                            상품후기
                        </li> */}
                    </ul>
                    <div className="tab-content">
                        {/*         {activeTab === 'detail' && <div>상세 정보 내용</div>}
                        {activeTab === 'info' && <div>상품 정보 내용</div>}
                        {activeTab === 'review' && <div>상품 후기 내용</div>} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
