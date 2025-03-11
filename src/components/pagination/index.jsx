import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions } from '../../store/modules/paginationSlice';

const Pagination = ({ className, postsPerPage }) => {
    const { totalPage, currPage } = useSelector((state) => state.paginationR);
    const dispatch = useDispatch();

    // postsPerPage가 변경될 때마다 업데이트
    useEffect(() => {
        if (postsPerPage) {
            dispatch(paginationActions.updatePostsPerPage(postsPerPage));
            // 페이지당 포스트 수가 변경되면 전체 페이지 수를 다시 계산
            dispatch(paginationActions.totalData());
        }
    }, [postsPerPage, dispatch]);

    // 페이지 번호 배열 생성
    const pageNumbers = [...Array(totalPage)].map((_, idx) => idx + 1);

    // 페이지 선택 함수
    const selectPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPage && pageNumber !== currPage) {
            dispatch(paginationActions.currentPage(pageNumber));
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
