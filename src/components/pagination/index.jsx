import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions } from '../../store/modules/paginationSlice';

// pageId: 페이지네이션 컴포넌트 식별자 (예: 'productInquiry', 'productList' 등)
const Pagination = ({ className, postsPerPage, pageId = 'default' }) => {
    const dispatch = useDispatch();

    // 전체 Redux 상태에서 페이지 ID에 해당하는 상태만 선택
    const paginationState = useSelector((state) => state.paginationR);

    // 현재 페이지 ID에 해당하는 상태, 없으면 기본값 사용
    const currPage = paginationState[pageId]?.currPage || 1;
    const totalPage = paginationState[pageId]?.totalPage || 1;

    // 컴포넌트 마운트 시 현재 페이지 ID 등록
    useEffect(() => {
        dispatch(
            paginationActions.registerPage({
                pageId,
                postsPerPage: postsPerPage || 10,
            })
        );
    }, [pageId, postsPerPage, dispatch]);

    // postsPerPage가 변경될 때마다 업데이트
    useEffect(() => {
        if (postsPerPage) {
            dispatch(
                paginationActions.updatePostsPerPage({
                    pageId,
                    postsPerPage,
                })
            );
        }
    }, [postsPerPage, pageId, dispatch]);

    // 페이지 번호 배열 생성
    const pageNumbers = [...Array(totalPage)].map((_, idx) => idx + 1);

    // 페이지 선택 함수
    const selectPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPage && pageNumber !== currPage) {
            dispatch(
                paginationActions.currentPage({
                    pageId,
                    page: pageNumber,
                })
            );
        }
    };

    return (
        <div className={`flex gap-[47px] text-[14px] justify-center font-medium ${className}`}>
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={`relative ${currPage === pageNumber ? 'on' : ''}`}
                    onClick={() => selectPage(pageNumber)}
                >
                    {pageNumber}
                    {currPage === pageNumber && (
                        <div className='p-5 border-4 rounded-full border-primary-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
                    )}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
