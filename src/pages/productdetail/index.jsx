import { useEffect, useState } from 'react';
import Button from '../../components/button';
import ProductNotice from '../../components/productdetailc/ProductNotice';
import ReviewList from '../../components/productdetailc/ReviewList';
import ProductInquiryList from '../../components/productdetailc/ProductInquiryList';
import MotiveGuide from '../../components/size/MotiveGuide';
import SizeGuide from '../../components/size/SizeGuide';
import InquiryModal from '../../components/productdetailc/InquiryModal';
import DelieveryModal from '../../components/productdetailc/DelieveryModal';
import CareModal from '../../components/productdetailc/CareModal';
import ShoppingcartModal from '../../components/purchase/ShoppingcartModal';
import ProductSlide from '../../components/product/ProductSlide';
import ProductDetailNav from '../../components/product/ProductDetailNav';
import ProductDetailImg from '../../components/product/ProductDetailImg';
import ProductInformation from '../../components/product/ProductInformation';
import RecommendProductSlide from '../../components/product/RecommendProductSlide';

function ProductDetailPage() {
    const [modalState, setModalState] = useState({
        inquiry: false,
        delivery: false,
        care: false,
        addcart: false,
    });

    const toggleModal = (modalType) => {
        setModalState({
            inquiry: false,
            delivery: false,
            care: false,
            addcart: false,
            [modalType]: !modalState[modalType],
        });
    };

    return (
        <div id="contents" className="w-full h-full ">
            <div className="w-full pb-[80px]"></div>
            <div id="goods" className="w-full h-full">
                <div id="goods_view" className="w-full h-full flex flex-col md:flex-row">
                    <div className="view_lft w-[50%]  h-[800px]">
                        <ProductSlide />
                        {/* 왼쪽--제품 슬라이드 */}
                    </div>
                    <div className="view_rgt w-[50%] h-[800px] font-primary text-[14px] leading-8">
                        <div className="px-[114px] h-full pt-[154px]">
                            <div className="title">
                                <h3>제품명</h3>
                            </div>
                            <div className="subtitle text-[#706F6F] text-label-s">
                                <h3>서브타이틀</h3>
                            </div>
                            <div className="price">
                                <dl className="item_price detail-price">
                                    <dt>판매가</dt>
                                </dl>
                            </div>

                            <div className="option">
                                <select className="w-full border border-solid black pl-[10px] ">
                                    <option value="" disabled selected>
                                        size
                                    </option>
                                    <option value="option1">옵션 1</option>
                                    <option value="option2">옵션 2</option>
                                    <option value="option3">옵션 3</option>
                                </select>
                                {/* 구매 폼 */}
                                <form name="frmView" id="frmView" method="post" onSubmit={(e) => e.preventDefault()}>
                                    <input type="hidden" name="goodsno" value="12345" />
                                    <input type="hidden" name="cate" value="67890" />
                                    {/* 다른 필요한 hidden input 필드들 추가 */}
                                    <div className="buy-btn">
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent form submission
                                                toggleModal('addcart');
                                            }}
                                            className="mt-[12px]"
                                            fullWidth
                                        >
                                            ADD TO CART
                                        </Button>
                                    </div>
                                </form>
                            </div>
                            <div className="leading-4.5 text-center  mt-4.5 flex justify-center">
                                <div className="w-4xs border border-solid black py-[10px] px-[19px] leading-5">
                                    <ul>
                                        <li>전화 주문을 통해 서울 일부 지역 당일 배송 가능합니다</li>
                                        <li>(강남,서초,송파 한정)</li>
                                        <li>30일이내 무료 반품</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="title tracking-wide">
                                <h3>
                                    <button onClick={() => toggleModal('inquiry')}>CALL</button>
                                </h3>
                            </div>
                            <div className="title tracking-wide">
                                <h3>
                                    <button>RESERVATION</button>
                                </h3>
                            </div>
                            <div className="title tracking-wide">
                                <h3>
                                    <button onClick={() => toggleModal('care')}>CARE SERVICE</button>
                                </h3>
                            </div>
                            <div className="title leading-4 tracking-wide">
                                <h3>
                                    <button onClick={() => toggleModal('delivery')}>DELIVERY & </button>
                                    <br />
                                    <button onClick={() => toggleModal('delivery')}> PAYMENT</button>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-full mt-60">
                <div className="w-full h-full flex flex-col">
                    <ProductDetailNav />
                    <ProductDetailImg />
                </div>
            </div>
            <MotiveGuide />
            <SizeGuide />
            {/* 사이즈가이드 */}
            <ProductInformation />
            {/* 상품필수정보 */}
            <RecommendProductSlide />
            {/* 추천상품 Slide */}
            <ProductNotice />
            <ReviewList />
            <ProductInquiryList />
            {modalState.inquiry && <InquiryModal handleModal={() => toggleModal('inquiry')} modalType="inquiry" />}
            {modalState.care && <CareModal handleModal={() => toggleModal('care')} modalType="care" />}
            {modalState.delivery && <DelieveryModal handleModal={() => toggleModal('delivery')} modalType="delivery" />}
            {modalState.addcart && <ShoppingcartModal handleModal={() => toggleModal('addcart')} modalType="addcart" />}
            {/* 장바구니 모달 */}
        </div>
    );
}

export default ProductDetailPage;
