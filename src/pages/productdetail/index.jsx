import React, { useState } from 'react';
import Button from '../../components/button';
import { Keyboard, Navigation } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import ProductNotice from '../../components/productdetailc/ProductNotice';
import ReviewList from '../../components/productdetailc/ReviewList';
import ProductInquiryList from '../../components/productdetailc/ProductInquiryList';
import MotiveGuide from '../../components/size/MotiveGuide';
import SizeGuide from '../../components/size/SizeGuide';
import { Link, useNavigate } from 'react-router-dom';
import InquiryModal from '../../components/productdetailc/InquiryModal';
import DelieveryModal from '../../components/productdetailc/DelieveryModal';
import CareModal from '../../components/productdetailc/CareModal';
import ShoppingcartModal from '../../components/purchase/ShoppingcartModal';
import RingSizeGuide from '../../components/size/RingSizeGuide';

// import required modules

function ProductDetailPage() {
    const [addcartmodalopen, Setaddcartmodalopen] = useState(false);
    const navigate = useNavigate();
    const handleAddToCart = () => {
        Setaddcartmodalopen(!addcartmodalopen);
    };
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

    const goReservation = () => {
        navigate('/reservation');
    };

    return (
        <div id='contents' className='w-full h-full '>
            <div className='w-full pb-[80px]'></div>
            <div id='goods' className='w-full h-full'>
                <div id='goods_view' className='w-full h-full flex flex-col md:flex-row'>
                    <div className='view_lft w-[50%]  h-[800px]'>
                        <Swiper className='mySwiper'>
                            <SwiperSlide>
                                {' '}
                                <img
                                    src='https://www.vancleefarpels.com/content/dam/rcq/vca/F1/9s/OE/xL/mk/2f/kM/Pw/-V/AN/SQ/F19sOExLmk2fkMPw-VANSQ.jpeg'
                                    alt=''
                                    style={{ objectFit: 'contain' }}
                                    /*       style={{ objectFit: 'cover', objectPosition: ' 50% 102%' }} */
                                />
                            </SwiperSlide>

                            <SwiperSlide>
                                {' '}
                                <img
                                    src='https://www.vancleefarpels.com/content/dam/rcq/vca/18/16/50/3/1816503.png'
                                    alt=''
                                    style={{ objectFit: 'contain' }}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                {' '}
                                <img
                                    src='https://www.vancleefarpels.com/content/dam/rcq/vca/17/08/14/5/1708145.png.transform.vca-w820-1x.png'
                                    alt=''
                                    style={{ objectFit: 'contain' }}
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src='https://www.vancleefarpels.com/content/dam/rcq/vca/17/08/14/6/1708146.png.transform.vca-w820-1x.png'
                                    alt=''
                                    style={{ objectFit: 'contain' }}
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className='view_rgt w-[50%] h-[800px] font-primary text-[14px] leading-8'>
                        <div className='px-[114px] h-full pt-[154px]'>
                            <div className='title'>
                                <h3>제품 이름</h3>
                            </div>
                            <div className='price'>
                                <dl className='item_price detail-price'>
                                    <dt>판매가</dt>
                                </dl>
                            </div>
                            <div className='option'>
                                <select className='w-full border border-solid black pl-[10px] '>
                                    <option value='' disabled selected>
                                        size
                                    </option>
                                    <option value='option1'>옵션 1</option>
                                    <option value='option2'>옵션 2</option>
                                    <option value='option3'>옵션 3</option>
                                </select>
                                {/* 구매 폼 */}
                                <form name='frmView' id='frmView' method='post' onSubmit={(e) => e.preventDefault()}>
                                    <input type='hidden' name='goodsno' value='12345' />
                                    <input type='hidden' name='cate' value='67890' />
                                    {/* 다른 필요한 hidden input 필드들 추가 */}
                                    <div className='buy-btn'>
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent form submission
                                                toggleModal('addcart');
                                            }}
                                            className='mt-[12px]'
                                            fullWidth
                                        >
                                            ADD TO CART
                                        </Button>
                                    </div>
                                </form>
                            </div>
                            <div className='leading-4.5 text-center  mt-4.5 flex justify-center'>
                                <div className='w-4xs border border-solid black py-[10px] px-[19px] leading-5'>
                                    <ul>
                                        <li>전화 주문을 통해 서울 일부 지역 당일 배송 가능합니다</li>
                                        <li>(강남,서초,송파 한정)</li>
                                        <li>30일이내 무료 반품</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='title tracking-wide'>
                                <h3>
                                    <button onClick={() => toggleModal('inquiry')}>CALL</button>
                                </h3>
                            </div>
                            <div className='title tracking-wide'>
                                <h3>
                                    <button onClick={goReservation}>RESERVATION</button>
                                </h3>
                            </div>
                            <div className='title tracking-wide'>
                                <h3>
                                    <button onClick={() => toggleModal('care')}>CARE SERVICE</button>
                                </h3>
                            </div>
                            <div className='title leading-4 tracking-wide'>
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
            <div className='w-full h-full mt-60'>
                <div className='w-full h-full flex flex-col'>
                    <ul className='w-full h-full font-bold flex justify-center text-center text-xl'>
                        <li className='w-2xs'>
                            <Link to='/details'>상세정보</Link>
                        </li>
                        <li className='w-2xs'>
                            <Link to='/ReviewList'>리뷰(n)</Link>
                        </li>
                        <li className='w-2xs'>
                            <Link to='/ProductNotice'>상품고시(n)</Link>
                        </li>
                        <li className='w-2xs'>
                            <Link to='/ProductInquiryList'>상품문의(n)</Link>
                        </li>
                    </ul>
                    <div className=' p-330 flex flex-col items-center'>
                        <img
                            src='https://www.vancleefarpels.com/content/dam/rcq/vca/F1/9s/OE/xL/mk/2f/kM/Pw/-V/AN/SQ/F19sOExLmk2fkMPw-VANSQ.jpeg.transform.vca-w820-1x.jpeg'
                            className='w-[37%] object-contain mt-22'
                        />
                        <img
                            src='https://www.vancleefarpels.com/content/dam/rcq/vca/18/16/50/3/1816503.png'
                            className='w-[37%] object-contain mt-20'
                        />
                        <img
                            src='https://www.vancleefarpels.com/content/dam/rcq/vca/17/08/14/5/1708145.png.transform.vca-w820-1x.png'
                            className='w-[37%] object-contain '
                        />
                    </div>
                </div>
            </div>
            <MotiveGuide />
            <SizeGuide />
            <RingSizeGuide />
            {/* 사이즈가이드 */}
            <div className='w-full h-full mt-60'>
                <ul className='w-full h-full font-bold flex-col justify-center  text-xl p-330 leading-20'>
                    <div className='text-[26px]'>상품필수정보</div>
                    <li className='border-y border-black flex gap-10  items-center'>
                        <div className='w-30'>종류</div>
                        <span className='font-light text-xs text-[#757575]'>프리볼 펜던트, 스몰 모델</span>
                    </li>
                    <li className=' border-b border-black flex gap-10  items-center'>
                        <div className='w-30'>제품번호</div>
                        <span className='font-light text-xs text-[#757575]'>VCARPFBM00</span>
                    </li>
                    <li className=' border-b border-black flex gap-10  items-center'>
                        <div className='w-30'>스톤</div>
                        <span className='font-light text-xs text-[#757575]'>다이아몬드: 스톤 1개, 0.08캐럿</span>
                    </li>
                    <li className=' border-b border-black flex gap-10  items-center'>
                        <div className='w-30'>클래스프</div>
                        <span className='font-light text-xs text-[#757575]'>18K 로즈 골드 클래스프</span>
                    </li>
                    <li className=' border-b border-black flex gap-10  items-center'>
                        <div className='w-30'>사이즈</div>
                        <span className='font-light text-xs text-[#757575]'>체인 길이: 42 cm</span>
                    </li>
                    <li className=' border-b border-black flex gap-10  items-center'>
                        <div className='w-30'>순중량</div>
                        <span className='font-light text-xs text-[#757575]'>6g</span>
                    </li>
                    <li className=' border-b border-black flex gap-10  items-center'>
                        <div className='w-30'>제조자</div>
                        <span className='font-light text-xs text-[#757575]'>반클리프 아펠</span>
                    </li>

                    <li className=' border-b border-black flex gap-10  items-center'>
                        <div className='w-30'>수입업체</div>
                        <span className='font-light text-xs text-[#757575]'> ㈜ 리치몬트 코리아</span>{' '}
                    </li>
                    <li className=' border-b border-black flex gap-10  items-center'>
                        <div className='w-30'>원산지</div>
                        <span className='font-light text-xs text-[#757575]'>프랑스</span>{' '}
                    </li>
                    <li className=' border-b border-black flex gap-10  items-center'>
                        <div className='w-30'>품질보증기준</div>
                        <span className='font-light text-xs text-[#757575]'>관련법 및 소비자 분쟁해결 규정에 따름</span>
                    </li>
                </ul>
            </div>
            <div className='w-full h-full mt-60 p-330'>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    keyboard={{
                        enabled: true,
                    }}
                    navigation={true}
                    modules={[Keyboard, Navigation]}
                    className='mySwiper'
                >
                    <SwiperSlide>
                        <div>
                            <img
                                src='https://www.vancleefarpels.com/content/dam/vancleefarpels/collections/jewelry/frivole/frivole-2024/Frivole_corporate_2024_Carrousel_02_2_4_1x1.jpg.transform.vca-h460-1x.jpg'
                                alt='이어링'
                            />
                            <div>
                                {/* text */}
                                <div>
                                    <a href=''>
                                        <strong className='pt-3.5 font-secondary text-[22px]  text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2 text-center inline-block w-full'>
                                            스위트 버터플라이 펜던트
                                        </strong>
                                    </a>
                                </div>

                                <div className='flex gap-2 pt-2.5 justify-center'>
                                    <strong>₩2,380,000 </strong>

                                    <strong>
                                        <span className='line-through text-[#6D6D6D]'>
                                            <strong className='text-[#6D6D6D]'>₩2,000,000</strong>
                                        </span>
                                    </strong>
                                    <strong className='text-[#e4a690]'>20%</strong>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src='https://www.vancleefarpels.com/content/dam/vancleefarpels/collections/jewelry/frivole/frivole-2024/Frivole_corporate_2024_Carrousel_01_3_5_1x1.jpg.transform.vca-h460-1x.jpg'
                            alt='반지'
                        />
                        <div>
                            {/* text */}
                            <div>
                                <a href=''>
                                    <strong className='pt-3.5 font-secondary text-[22px]  text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2 text-center inline-block w-full'>
                                        스위트 버터플라이 펜던트
                                    </strong>
                                </a>
                            </div>

                            <div className='flex gap-2 pt-2.5 justify-center'>
                                <strong>₩2,380,000 </strong>

                                <strong>
                                    <span className='line-through text-[#6D6D6D]'>
                                        <strong className='text-[#6D6D6D]'>₩2,000,000</strong>
                                    </span>
                                </strong>
                                <strong className='text-[#e4a690]'>20%</strong>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <img
                            src='https://www.vancleefarpels.com/content/dam/vancleefarpels/collections/jewelry/frivole/frivole-2024/Advertising_Content_Frivole_Corporate_2023_Worn%20View%205_1X1_300dpi%20(1).jpg.transform.vca-h460-1x.jpg'
                            alt='이어링'
                        />
                        <div>
                            {/* text */}
                            <div>
                                <a href=''>
                                    <strong className='pt-3.5 font-secondary text-[22px]  text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2 text-center inline-block w-full'>
                                        스위트 버터플라이 펜던트
                                    </strong>
                                </a>
                            </div>

                            <div className='flex gap-2 pt-2.5 justify-center'>
                                <strong>₩2,380,000 </strong>

                                <strong>
                                    <span className='line-through text-[#6D6D6D]'>
                                        <strong className='text-[#6D6D6D]'>₩2,000,000</strong>
                                    </span>
                                </strong>
                                <strong className='text-[#e4a690]'>20%</strong>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src='https://www.vancleefarpels.com/content/dam/vancleefarpels/collections/jewelry/frivole/frivole-2024/Frivole_corporate_2024_Carrousel_05_4_5_1x1.jpg.transform.vca-h460-1x.jpg'
                            alt='이어링'
                        />
                        <div>
                            {/* text */}
                            <div>
                                <a href=''>
                                    <strong className='pt-3.5 font-secondary text-[22px]  text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2 text-center inline-block w-full'>
                                        스위트 버터플라이 펜던트
                                    </strong>
                                </a>
                            </div>

                            <div className='flex gap-2 pt-2.5 justify-center'>
                                <strong>₩2,380,000 </strong>

                                <strong>
                                    <span className='line-through text-[#6D6D6D]'>
                                        <strong className='text-[#6D6D6D]'>₩2,000,000</strong>
                                    </span>
                                </strong>
                                <strong className='text-[#e4a690]'>20%</strong>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <ReviewList />
            <ProductNotice />
            <ProductInquiryList />
            {modalState.inquiry && <InquiryModal handleModal={() => toggleModal('inquiry')} modalType='inquiry' />}
            {modalState.care && <CareModal handleModal={() => toggleModal('care')} modalType='care' />}
            {modalState.delivery && <DelieveryModal handleModal={() => toggleModal('delivery')} modalType='delivery' />}
            {modalState.addcart && <ShoppingcartModal handleModal={() => toggleModal('addcart')} modalType='addcart' />}
            {/* 장바구니 모달 */}
        </div>
    );
}

export default ProductDetailPage;
