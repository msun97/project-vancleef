import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button';
import Pagination from '../pagination';
import ReviewItem from './ReviewItem';
import { reviewActions } from '../../store/modules/reviewSlice';
import { openModal } from '../../store/modules/modalSlice';
import { paginationActions } from '../../store/modules/paginationSlice';
import MypostsModal from '../mypage/MypostsModal';

const ReviewList = ({ category, id }) => {
    const dispatch = useDispatch();
    const [localReviews, setLocalReviews] = useState([]);
    const [productName, setProductName] = useState('');
    const productID = id; // id prop을 productID로 사용

    // 모달 상태 가져오기
    const isModalOpen = useSelector((state) => state.modalR?.isOpen);

    // 로그인한 사용자 정보
    const currentUserData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userId = currentUserData?.id || null;

    // 리뷰 상태 가져오기
    const { sortBy } = useSelector((state) => state.reviewR);

    // 페이지네이션 상태 가져오기
    const currPage = useSelector((state) =>
        state.pagination && state.pagination['reviewList'] ? state.pagination['reviewList'].currPage : 1
    );

    const postsPerPage = useSelector((state) =>
        state.pagination && state.pagination['reviewList'] ? state.pagination['reviewList'].postsPerPage : 5
    );

    const totalPage = useSelector((state) =>
        state.pagination && state.pagination['reviewList'] ? state.pagination['reviewList'].totalPage : 1
    );

    // 상품 이름 가져오기
    useEffect(() => {
        const productdata = JSON.parse(localStorage.getItem('productdata')) || [];
        let allProducts = [];

        productdata.forEach((categoryData) => {
            if (categoryData.data && Array.isArray(categoryData.data)) {
                allProducts = [...allProducts, ...categoryData.data];
            }
        });

        const foundProduct = allProducts.find((item) => item.productid === parseInt(productID));
        if (foundProduct) {
            setProductName(foundProduct.title || '상품명');
        }
    }, [productID]);

    // 로컬 스토리지에서 직접 리뷰 데이터 가져오기
    useEffect(() => {
        const loadReviews = () => {
            try {
                // 로컬스토리지에서 reviews 데이터 가져오기
                const storedReviews = JSON.parse(localStorage.getItem('reviews')) || [];

                // 현재 productID와 일치하는 리뷰만 필터링
                const filteredReviews = storedReviews.filter((review) => {
                    return String(review.productId) === String(productID);
                });

                // 정렬 적용
                let sortedReviews = [...filteredReviews];
                if (sortBy === 'latest') {
                    sortedReviews.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));
                } else if (sortBy === 'best') {
                    sortedReviews.sort((a, b) => (b.helpfulCount || 0) - (a.helpfulCount || 0));
                }

                setLocalReviews(sortedReviews);

                // 페이지네이션 데이터 업데이트
                dispatch(
                    paginationActions.addData({
                        pageId: 'reviewList',
                        data: sortedReviews,
                    })
                );

                // Redux 상태 업데이트
                dispatch(reviewActions.setCurrentProduct(productID));
            } catch (error) {
                console.error('로컬 스토리지에서 리뷰 로드 중 오류 발생:', error);
                setLocalReviews([]);
            }
        };

        if (productID) {
            loadReviews();
        }
    }, [dispatch, productID, sortBy]);

    // 컴포넌트 마운트 시 페이지네이션 초기화
    useEffect(() => {
        dispatch(
            paginationActions.registerPage({
                pageId: 'reviewList',
                postsPerPage: 5,
            })
        );
    }, [dispatch]);

    // 현재 페이지에 표시할 리뷰 목록 계산
    const startIndex = (currPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const displayedReviews = localReviews.slice(startIndex, endIndex);
    const totalReviews = localReviews.length;

    // 모달 열기 핸들러
    const handleOpenModal = () => {
        // 로그인 상태 확인
        const isLoggedIn = localStorage.getItem('authed') === 'true';

        if (!isLoggedIn) {
            alert('로그인 후 리뷰를 작성할 수 있습니다.');
            return;
        }

        // 중복 리뷰 체크
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.myreviews && Array.isArray(currentUser.myreviews)) {
            // 내 리뷰에서 현재 상품 ID와 일치하는 리뷰가 있는지 확인
            const hasReview = currentUser.myreviews.some((review) => {
                return String(review.productId) === String(productID);
            });

            if (hasReview) {
                alert('이미 이 상품에 대한 리뷰를 작성하셨습니다. 한 상품에 하나의 리뷰만 작성할 수 있습니다.');
                return;
            }
        }

        // 모달 열기
        dispatch(openModal());
    };

    // 정렬 방식 변경 핸들러
    const handleSortChange = (sortType) => {
        dispatch(reviewActions.setSortBy(sortType));
    };

    return (
        <>
            {/* 모달이 열렸을 때 모달 컴포넌트 렌더링 */}
            {isModalOpen && <MypostsModal productId={productID} productName={productName} />}
            <div className='pt-[200px] px-[330px] w-full'>
                <div className='flex flex-col gap-[30px]'>
                    <div className='w-full flex items-center justify-between'>
                        <h2 className='font-secondary text-[32px] font-bold' id='리뷰'>
                            리뷰({totalReviews})
                        </h2>
                        <div className='relative'>
                            <Button
                                className='w-[290px] h-[55px] font-bold text-xl flex items-center !justify-between p-[30px]'
                                onClick={handleOpenModal}
                            >
                                <span className='whitespace-nowrap'>리뷰 쓰기</span>
                                <svg
                                    width='24'
                                    height='24'
                                    viewBox='0 0 48 49'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M10 24.8784H38'
                                        stroke='white'
                                        strokeWidth='4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M24 10.8784L38 24.8784L24 38.8784'
                                        stroke='white'
                                        strokeWidth='4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </Button>
                        </div>
                    </div>
                    <div className='flex items-center justify-between font-bold text-[17px]'>
                        <div>총 {totalReviews}개</div>
                        <div className='flex items-center gap-[70px]'>
                            <div className='flex items-center gap-[20px] relative'>
                                <button
                                    className={`transition duration-300 ${
                                        sortBy === 'best' ? 'opacity-100' : 'opacity-50'
                                    }`}
                                    onClick={() => handleSortChange('best')}
                                >
                                    베스트순
                                </button>
                                <div className='bg-black h-[8px] w-[1px]'></div>
                                <button
                                    className={`transition duration-300 ${
                                        sortBy === 'latest' ? 'opacity-100' : 'opacity-50'
                                    }`}
                                    onClick={() => handleSortChange('latest')}
                                >
                                    최신순
                                </button>
                            </div>
                            <div className='flex items-center gap-4'>
                                <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 48 49'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='hover:opacity-100 transition duration-300 opacity-50 cursor-pointer'
                                >
                                    <path
                                        d='M46 38.875C46 39.9359 45.5786 40.9533 44.8284 41.7034C44.0783 42.4536 43.0609 42.875 42 42.875H6C4.93913 42.875 3.92172 42.4536 3.17157 41.7034C2.42143 40.9533 2 39.9359 2 38.875V16.875C2 15.8141 2.42143 14.7967 3.17157 14.0466C3.92172 13.2964 4.93913 12.875 6 12.875H14L18 6.875H30L34 12.875H42C43.0609 12.875 44.0783 13.2964 44.8284 14.0466C45.5786 14.7967 46 15.8141 46 16.875V38.875Z'
                                        stroke='black'
                                        strokeWidth='4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                    <path
                                        d='M24 34.875C28.4183 34.875 32 31.2933 32 26.875C32 22.4567 28.4183 18.875 24 18.875C19.5817 18.875 16 22.4567 16 26.875C16 31.2933 19.5817 34.875 24 34.875Z'
                                        stroke='black'
                                        strokeWidth='4'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 리뷰 리스트 - localReviews가 비어있는지 확인 */}
                {displayedReviews.length > 0 ? (
                    displayedReviews.map((review) => (
                        <ReviewItem
                            key={review.id || Math.random()}
                            review={review}
                            productId={productID}
                            userId={userId}
                        />
                    ))
                ) : (
                    <div className='w-full py-10 text-center text-gray-500'>
                        아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
                    </div>
                )}

                {/* 페이지네이션 */}
                {totalReviews > 0 && (
                    <Pagination className='pt-[60px]' pageId='reviewList' currPage={currPage} totalPage={totalPage} />
                )}
            </div>
        </>
    );
};

export default ReviewList;
