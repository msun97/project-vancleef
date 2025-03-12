import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button';
import Pagination from '../pagination';
import ReviewItem from './ReviewItem';
import Myposts from '../mypage/MypostsModal';
import { reviewActions } from '../../store/modules/reviewSlice';
import { openModal } from '../../store/modules/modalSlice';
import { paginationActions } from '../../store/modules/paginationSlice';

const ReviewList = () => {
    const dispatch = useDispatch();
    // 모달 상태 가져오기
    const isModalOpen = useSelector((state) => state.modalR?.isOpen);

    // 리뷰 상태 가져오기 - 개별 속성으로 접근하여 참조 문제 해결
    const { sortBy, reviews, totalReviews } = useSelector((state) => state.reviewR);

    // 페이지네이션 상태 가져오기 - 개별 프로퍼티로 접근
    const currPage = useSelector((state) =>
        state.pagination && state.pagination['reviewList'] ? state.pagination['reviewList'].currPage : 1
    );

    const postsPerPage = useSelector((state) =>
        state.pagination && state.pagination['reviewList'] ? state.pagination['reviewList'].postsPerPage : 5
    );

    const totalPage = useSelector((state) =>
        state.pagination && state.pagination['reviewList'] ? state.pagination['reviewList'].totalPage : 1
    );

    // 현재 페이지에 표시할 리뷰 목록 계산
    const startIndex = (currPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    // reviews가 배열인지 확인 후 slice 적용
    const currentReviews = Array.isArray(reviews) ? reviews.slice(startIndex, endIndex) : [];

    // 컴포넌트 마운트 시 페이지네이션 초기화 및 리뷰 데이터 설정
    useEffect(() => {
        // 페이지네이션 등록 - 컴포넌트 마운트 시 한 번만 실행
        dispatch(
            paginationActions.registerPage({
                pageId: 'reviewList',
                postsPerPage: 5,
            })
        );
    }, [dispatch]); // 의존성 배열에서 reviews 제거

    // reviews가 변경될 때마다 데이터 업데이트
    useEffect(() => {
        // 페이지네이션에 리뷰 데이터 추가
        if (reviews && reviews.length >= 0) {
            dispatch(
                paginationActions.addData({
                    pageId: 'reviewList',
                    data: reviews,
                })
            );
        }
    }, [dispatch, reviews]);

    // 모달 열기 핸들러
    const handleOpenModal = () => {
        dispatch(openModal());
    };

    // 정렬 방식 변경 핸들러
    const handleSortChange = (sortType) => {
        dispatch(reviewActions.setSortBy(sortType));
    };

    return (
        <>
            {/* 모달이 열렸을 때 모달 컴포넌트 렌더링 */}
            {isModalOpen && (
                <div className="fixed bg-gray-20 bg-opacity-40 w-full h-full top-0 left-0" style={{ zIndex: 9999 }}>
                    <div className="w-[710px] relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Myposts />
                    </div>
                </div>
            )}
            <div className="pt-[200px] px-[330px] w-full">
                <div className="flex flex-col gap-[30px]">
                    <div className="w-full flex items-center justify-between">
                        <h2 className="font-secondary text-[32px] font-bold" id="리뷰">
                            리뷰({totalReviews})
                        </h2>
                        <div className="relative">
                            <Button
                                className="w-[290px] h-[55px] font-bold text-xl flex items-center !justify-between p-[30px]"
                                onClick={handleOpenModal}
                            >
                                <span className="whitespace-nowrap">리뷰 쓰기</span>
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 48 49"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10 24.8784H38"
                                        stroke="white"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M24 10.8784L38 24.8784L24 38.8784"
                                        stroke="white"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between font-bold text-[17px]">
                        <div>총 {totalReviews}개</div>
                        <div className="flex items-center gap-[70px]">
                            <div className="flex items-center gap-[20px] relative">
                                <button
                                    className={`transition duration-300 ${
                                        sortBy === 'best' ? 'opacity-100' : 'opacity-50'
                                    }`}
                                    onClick={() => handleSortChange('best')}
                                >
                                    베스트순
                                </button>
                                <div className="bg-black h-[8px] w-[1px]"></div>
                                <button
                                    className={`transition duration-300 ${
                                        sortBy === 'latest' ? 'opacity-100' : 'opacity-50'
                                    }`}
                                    onClick={() => handleSortChange('latest')}
                                >
                                    최신순
                                </button>
                            </div>
                            <div className="flex items-center gap-4">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 48 49"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="hover:opacity-100 transition duration-300 opacity-50 cursor-pointer"
                                >
                                    <path
                                        d="M46 38.875C46 39.9359 45.5786 40.9533 44.8284 41.7034C44.0783 42.4536 43.0609 42.875 42 42.875H6C4.93913 42.875 3.92172 42.4536 3.17157 41.7034C2.42143 40.9533 2 39.9359 2 38.875V16.875C2 15.8141 2.42143 14.7967 3.17157 14.0466C3.92172 13.2964 4.93913 12.875 6 12.875H14L18 6.875H30L34 12.875H42C43.0609 12.875 44.0783 13.2964 44.8284 14.0466C45.5786 14.7967 46 15.8141 46 16.875V38.875Z"
                                        stroke="black"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M24 34.875C28.4183 34.875 32 31.2933 32 26.875C32 22.4567 28.4183 18.875 24 18.875C19.5817 18.875 16 22.4567 16 26.875C16 31.2933 19.5817 34.875 24 34.875Z"
                                        stroke="black"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 리뷰 리스트 */}
                {currentReviews.length > 0 ? (
                    currentReviews.map((review) => <ReviewItem key={review.id} review={review} />)
                ) : (
                    <div className="w-full py-10 text-center text-gray-500">
                        아직 작성된 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
                    </div>
                )}

                {/* 페이지네이션 */}
                {totalReviews > 0 && (
                    <Pagination
                        className="pt-[60px]"
                        pageId="reviewList"
                        // 명시적으로 필요한 props 전달
                        currPage={currPage}
                        totalPage={totalPage}
                    />
                )}
            </div>
        </>
    );
};

export default ReviewList;
