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
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../store/modules/cartSlice';
import { reservationActions } from '@/store/modules/reservationSlice';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';




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
    const [isLiked, setIsLiked] = useState(false);
    const toggleLike = () => {
        setIsLiked(!isLiked);

        if (!isLiked) {
            if (user) {
                dispatch(authActions.addfavorites(productdata));
            } else {
                console.log('로그인이 필요합니다.');
            }
        } else {
            dispatch(authActions.removeFavorite(productdata));
        }
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { category, id } = useParams();
    const productdata = useSelector((state) => state.productR.productdata);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
		const cart = useSelector((state) => state.cartR.cart);

    const foundCategory = productdata.find(
        (categoryData) => categoryData.category === category && categoryData.data && Array.isArray(categoryData.data)
    );
    console.log(foundCategory, 'foundCategory');

    useEffect(() => {
        setIsLoading(true);
        if (productdata && Array.isArray(productdata)) {
            const foundCategory = productdata.find(
                (categoryData) =>
                    categoryData.category === category && categoryData.data && Array.isArray(categoryData.data)
            ); /* find() 메서드는 JavaScript 배열에서 특정 조건을 만족하는 첫 번째 요소를 찾는 데 사용 */

            if (foundCategory) {
                const foundProduct = foundCategory.data.find((item) => item.productid === parseInt(id));
                setProduct(foundProduct);
            } else {
                console.error('해당 카테고리를 찾을 수 없습니다.');
            }
        } else {
            console.error('데이터 구조가 예상과 다릅니다:', productdata);
        }
        setIsLoading(false);
    }, [category, id, productdata]);

		useEffect(() => {
			localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (!product) {
        return <div>상품을 찾을 수 없습니다.</div>;
    }

    const goRes = () => {
        navigate('/reservation');
        dispatch(reservationActions.handleReservation({ category, id }));
    };

    //1.detail product --- colorpn 있으면 찾기
    const targetColorpns = product.colorpn?.map((product) => product);

    // 2. colorpn productnumber 필터링 된 내역을 전체 배열에서 필터링 해서 배열 처리
    const colorfilteredItems = productdata.flatMap((category) => {
        if (category.data && Array.isArray(category.data)) {
            return category.data.filter(
                (item) => item.productnumber && targetColorpns.includes(item.productnumber.trim())
            );
        }
        return [];
    });

    return (
        <div id="contents" className="w-full h-full ">
            <div className="w-full pb-[80px]"></div>
            <div id="goods" className="w-full h-full">
                <div id="goods_view" className="w-full h-full flex flex-col md:flex-row">
                    <div className="view_lft w-[50%]  h-[800px]">
                        <ProductSlide productImages={product.objectimage} />
                    </div>
                    <div className="view_rgt w-[50%] h-[800px] font-primary text-[14px] leading-8">
                        <div className="px-[114px] h-full pt-[154px]">
                            <div className="title flex gap-3 items-center">
                                <h3>{product.title}</h3>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleLike();
                                    }}
                                >
                                    {' '}
                                    {isLiked ? (
                                        <IoIosHeart className="text-red-500" />
                                    ) : (
                                        <IoIosHeartEmpty className="text-black" />
                                    )}
                                </button>
                            </div>
                            <div className="subtitle text-[#706F6F] text-label-s">
                                <h3>{product.subtitle || '상품 부제목'}</h3>
                            </div>
                            <div className="price">
                                <dl className="item_price detail-price">
                                    <dt>{product.price ? `${product.price.toLocaleString()}원` : '가격 정보 없음'}</dt>
                                </dl>
                            </div>
                            <div className="option ">
                                <div className="flex gap-5 mt-3">
                                    {colorfilteredItems.map((product, index) => {
                                        return (
                                            <div key={index}>
                                                <img
                                                    src={product.objectimage[0]}
                                                    alt={product.title}
                                                    style={{ width: '100px', height: '100px' }}
                                                    className="border border-gray-200"
                                                />
                                                <span className="text-[10px] text-[#706F6F]">{product.subtitle}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <form name='frmView' id='frmView' method='post' onSubmit={(e) => e.preventDefault()}>
                                    <input type='hidden' name='goodsno' value='12345' />
                                    <input type='hidden' name='cate' value='67890' />
                                    <div className='buy-btn'>
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent form submission
                                                dispatch(addCart(product));
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
                                    <button onClick={goRes}>RESERVATION</button>
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
                    <ProductDetailImg productImages={product.objectimage} />
                </div>
            </div>
            {foundCategory && foundCategory.category === 'Necklaces and pendants' && <MotiveGuide />}
            {/* 조건부 렌더링 */}
            {foundCategory && foundCategory.category === 'Bracelets' && <SizeGuide />}
            <ProductInformation />
            <ProductNotice />
            <RecommendProductSlide />
            <ReviewList category={category} id={id} />
            <ProductInquiryList category={category} id={id} />
            {modalState.inquiry && <InquiryModal handleModal={() => toggleModal('inquiry')} modalType="inquiry" />}
            {modalState.care && <CareModal handleModal={() => toggleModal('care')} modalType="care" />}
            {modalState.delivery && <DelieveryModal handleModal={() => toggleModal('delivery')} modalType="delivery" />}
            {modalState.addcart && <ShoppingcartModal handleModal={() => toggleModal('addcart')} modalType="addcart" />}
        </div>
    );
}

export default ProductDetailPage;
