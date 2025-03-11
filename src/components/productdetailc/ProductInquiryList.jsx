import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../button';
import Pagination from '../pagination';
import ProductInquiryItem from './ProductInquiryItem';
import { useEffect } from 'react';
import { paginationActions } from '../../store/modules/paginationSlice';

// 이 컴포넌트의 페이지네이션 ID
const PAGINATION_ID = 'productInquiry';

const ProductInquiryList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 리덕스 스토어에서 모든 문의 가져오기
    const { inquiries } = useSelector((state) => state.productInquiryR);
    // 페이지네이션 상태 가져오기
    const paginationState = useSelector(
        (state) =>
            state.paginationR[PAGINATION_ID] || {
                currPage: 1,
                postsPerPage: 3,
                totalPage: 1,
            }
    );
    const { currPage, postsPerPage } = paginationState;

    // 문의 데이터가 변경될 때 Redux 페이지네이션 스토어에 데이터 추가
    useEffect(() => {
        // 날짜 기준으로 최신순 정렬 (내림차순)
        const sortedInquiries = [...inquiries].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });

        dispatch(
            paginationActions.addData({
                pageId: PAGINATION_ID,
                data: sortedInquiries,
            })
        );
    }, [inquiries, dispatch]);

    // 현재 페이지에 표시할 문의 목록 계산
    const indexOfLastItem = currPage * postsPerPage;
    const indexOfFirstItem = indexOfLastItem - postsPerPage;

    // 날짜 기준으로 최신순 정렬 (내림차순)
    const sortedInquiries = [...inquiries].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });

    const currentInquiries = sortedInquiries.slice(indexOfFirstItem, indexOfLastItem);

    const toInquiry = () => {
        navigate('/productinquiry');
    };

    return (
        <div className='pt-[200px] px-[330px] flex flex-col gap-[22px]'>
            <div className='w-full flex items-center justify-between'>
                <h2 className='font-secondary text-[32px] font-bold'>상품문의</h2>
                <div className='relative'>
                    <Button
                        className='w-[290px] h-[55px] font-bold text-xl flex items-center !justify-between p-[30px]'
                        onClick={toInquiry}
                    >
                        <span className='whitespace-nowrap'>문의하기</span>
                        <svg width='24' height='24' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
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
            <ul className='w-full border-t-2'>
                {currentInquiries.length > 0 ? (
                    currentInquiries.map((inquiry) => <ProductInquiryItem key={inquiry.id} inquiry={inquiry} />)
                ) : (
                    <li className='text-center py-10 border-b'>등록된 문의가 없습니다.</li>
                )}
            </ul>
            {inquiries.length > 0 && <Pagination className='pt-[60px]' postsPerPage={3} pageId={PAGINATION_ID} />}
        </div>
    );
};

export default ProductInquiryList;
