import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productInquiryActions } from '../../store/modules/productInquirySlice';
import Button from '../button';

const MyInquiry = () => {
    const dispatch = useDispatch();
    // const userInfo = useSelector((state) => state.authR.user);
    const myInquiries = useSelector((state) => state.productInquiryR?.myInquiries || []);
		const currentUser = JSON.parse(localStorage.getItem('currentUser'));
console.log(currentUser)
		// const {userid} = currentUser

    // 로그인되어 있으면 해당 유저의 문의를 로드
    // useEffect(() => {
    //     if (userInfo?.usernum) {
    //         console.log('유저 문의 로드: usernum =', userInfo.usernum);
    //         dispatch(productInquiryActions.loadMyInquiries(userInfo.usernum));
    //     }
    // }, [userInfo, dispatch]);

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        if (!dateString) return '';

        // YYYY-MM-DD 형식을 YYYY.MM.DD 형식으로 변환
        const parts = dateString.split('-');
        if (parts.length === 3) {
            return `${parts[0]}.${parts[1]}.${parts[2]}`;
        }
        return dateString;
    };

    // 삭제 핸들러
    const handleDelete = (id) => {
        if (window.confirm('정말로 이 문의를 삭제하시겠습니까?')) {
            dispatch(productInquiryActions.deleteInquiry(id));
        }
    };

    return (
        <div>{/* 내가 작성한 문의 탭 안 */}
            <h2 className='text-xl font-bold mb-4'></h2>

            {myInquiries.length > 0 ? (
                <div className='border-t border-gray-200'>
                    {myInquiries.map((inquiry) => (
                        <div key={inquiry.id} className='p-4 border-b border-gray-200'>
                            <div className='flex justify-between mb-2'>
                                <span className='text-sm text-gray-500'>{inquiry.productName || '상품명'}</span>
                                <div className='flex space-x-2'>
                                    <span
                                        className={`text-xs px-2 py-1 rounded ${
                                            inquiry.status === '답변완료'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}
                                    >
                                        {inquiry.status}
                                    </span>
                                    {inquiry.isSecretPost && (
                                        <span className='text-xs px-2 py-1 rounded bg-gray-100 text-gray-700'>
                                            비공개
                                        </span>
                                    )}
                                </div>
                            </div>

                            <h3 className='font-medium mb-2'>{inquiry.title}</h3>
                            <p className='text-sm text-gray-700 mb-2'>{inquiry.content}</p>
                            <p className='text-xs text-gray-500 mb-4'>작성일: {formatDate(inquiry.date)}</p>

                            {inquiry.hasResponse ? (
                                <div className='bg-gray-50 p-3 rounded'>
                                    <div className='flex items-center mb-2'>
                                        <span className='bg-blue-500 text-white text-xs px-2 py-1 rounded mr-2'>
                                            답변
                                        </span>
                                        <span className='text-xs text-gray-500'>
                                            답변일: {formatDate(inquiry.responseDate || inquiry.date)}
                                        </span>
                                    </div>
                                    <p className='text-sm'>{inquiry.response}</p>
                                </div>
                            ) : (
                                <div className='text-sm text-gray-500 italic'>답변을 기다리고 있습니다.</div>
                            )}

                            <div className='mt-3 flex justify-end space-x-2'>
                                <Button
                                    className='px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded'
                                    onClick={() => (window.location.href = `/productinquiry/edit/${inquiry.id}`)}
                                >
                                    수정
                                </Button>
                                <Button
                                    className='px-3 py-1 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded'
                                    onClick={() => handleDelete(inquiry.id)}
                                >
                                    삭제
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='text-center text-gray-500 py-8 border-gray-200'>
                    작성한 문의가 없습니다.
                </div>
            )}
        </div>
    );
};

export default MyInquiry;
