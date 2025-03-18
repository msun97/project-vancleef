import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../button';
import Pagination from '../pagination';
import ProductInquiryItem from './ProductInquiryItem';
import { useEffect, useMemo } from 'react';
import { paginationActions } from '../../store/modules/paginationSlice';

// 이 컴포넌트의 페이지네이션 ID
const PAGINATION_ID = 'productInquiry';

const ProductInquiryList = ({ category, id }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 로그인 상태 확인
    const isLoggedIn = useSelector((state) => state.authR?.authed);
    const userInfo = useSelector((state) => state.authR?.user);
    const userId = userInfo?.id;

    // 리덕스 스토어에서 개별 상태로 가져오기
    const allInquiries = useSelector((state) => state.productInquiryR.inquiries);

    // 페이지네이션 상태를 개별적으로 가져오기
    const currPage = useSelector((state) =>
        state.paginationR && state.paginationR[PAGINATION_ID] ? state.paginationR[PAGINATION_ID].currPage : 1
    );

    const postsPerPage = useSelector((state) =>
        state.paginationR && state.paginationR[PAGINATION_ID] ? state.paginationR[PAGINATION_ID].postsPerPage : 3
    );

    // 현재 제품에 해당하는 문의만 필터링 및 날짜 기준으로 정렬
    const productInquiries = useMemo(() => {
        if (!Array.isArray(allInquiries)) return [];

        // 현재 제품에 해당하는 문의만 필터링 (category와 id 모두 확인)
        const filteredInquiries =
            category && id
                ? allInquiries.filter((inquiry) => inquiry.category === category && inquiry.productId === id)
                : allInquiries;

        // 날짜 기준으로 정렬
        return [...filteredInquiries].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA;
        });
    }, [allInquiries, category, id]);

    // 문의 데이터가 변경될 때 Redux 페이지네이션 스토어에 데이터 추가
    useEffect(() => {
        if (!Array.isArray(productInquiries)) return;

        dispatch(
            paginationActions.addData({
                pageId: PAGINATION_ID,
                data: productInquiries,
            })
        );
    }, [productInquiries, dispatch]);

    // 현재 페이지에 표시할 문의 목록 계산 - useMemo로 메모이제이션
    const currentInquiries = useMemo(() => {
        const indexOfLastItem = currPage * postsPerPage;
        const indexOfFirstItem = indexOfLastItem - postsPerPage;
        return productInquiries.slice(indexOfFirstItem, indexOfLastItem);
    }, [productInquiries, currPage, postsPerPage]);

    // 총 문의 개수를 메모이제이션
    const totalInquiries = useMemo(() => productInquiries.length, [productInquiries]);

    // 현재 사용자가 이미 현재 상품에 대해 문의를 작성했는지 확인
    const hasUserWrittenInquiry = useMemo(() => {
        if (!isLoggedIn || !userId || !category || !id || !Array.isArray(allInquiries)) return false;

        return allInquiries.some(
            (inquiry) => inquiry.id === userId && inquiry.category === category && inquiry.productId === id
        );
    }, [isLoggedIn, userId, category, id, allInquiries]);

    // 문의하기 버튼 클릭 이벤트
    const toInquiry = () => {
        if (!isLoggedIn) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login', { state: { from: window.location.pathname } });
            return;
        }

        if (hasUserWrittenInquiry) {
            alert('이미 이 상품에 대한 문의를 작성하셨습니다. 한 상품에 하나의 문의만 작성 가능합니다.');
            return;
        }

        // 쿼리 파라미터로 category와 id 전달
        navigate(`/productinquiry?category=${category}&id=${id}`);
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
                    currentInquiries.map((inquiry) => (
                        <ProductInquiryItem key={inquiry.inquiryId || inquiry.id} inquiry={inquiry} />
                    ))
                ) : (
                    <li className='text-center py-10 border-b'>등록된 문의가 없습니다.</li>
                )}
            </ul>
            {totalInquiries > 0 && (
                <Pagination
                    className='pt-[60px]'
                    postsPerPage={postsPerPage}
                    pageId={PAGINATION_ID}
                    currPage={currPage}
                />
            )}
        </div>
    );
};

export default ProductInquiryList;
