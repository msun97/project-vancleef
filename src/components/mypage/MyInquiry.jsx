import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { productInquiryActions } from '../../store/modules/productInquirySlice';
import Button from '../button';
import { useNavigate } from 'react-router-dom';

const MyInquiry = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.authR.user);
    const { myInquiries } = useSelector((state) => state.productInquiryR);

    // 초기 로드 여부 추적
    const [hasLoaded, setHasLoaded] = useState(false);

    // 로그인되어 있으면 해당 유저의 문의를 로드
    useEffect(() => {
        if (userInfo) {
            // usernum이나 id 둘 중 하나로 문의 로드
            const userId = userInfo.usernum || userInfo.id;

            if (userId) {
                console.log('Loading inquiries for user ID:', userId);
                dispatch(productInquiryActions.loadMyInquiries(userId));
                setHasLoaded(true);
            }
        } else {
            // 로컬 스토리지에서 currentUser 확인
            try {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser && (currentUser.usernum || currentUser.id)) {
                    const userId = currentUser.usernum || currentUser.id;
                    console.log('Loading inquiries from localStorage for user ID:', userId);
                    dispatch(productInquiryActions.loadMyInquiries(userId));
                    setHasLoaded(true);
                }
            } catch (error) {
                console.error('Error loading user from localStorage:', error);
            }
        }
    }, [userInfo, dispatch]);

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const parts = dateString.split('-');
        if (parts.length === 3) {
            return `${parts[0]}.${parts[1]}.${parts[2]}`;
        }
        return dateString;
    };

    // 삭제 핸들러 - inquiryId 우선 사용
    const handleDelete = (inquiry) => {
        if (window.confirm('정말로 이 문의를 삭제하시겠습니까?')) {
            // inquiryId가 존재하면 그것을 사용, 없으면 id 사용
            const deleteId = inquiry.inquiryId || inquiry.id;
            dispatch(productInquiryActions.deleteInquiry(deleteId));
        }
    };

    // 수정 핸들러 - 새 경로 구조로 이동
    const handleEdit = (inquiry) => {
        // 카테고리와 productId가 없는 경우 기본값 설정
        const category = inquiry.category || 'default';
        const productId = inquiry.productId || '0';

        // 수정 모드를 활성화하는 액션을 디스패치
        dispatch(
            productInquiryActions.setEditMode({
                isEditing: true,
                inquiryData: inquiry,
            })
        );

        // 새 URL 구조에 맞게 경로 설정
        navigate(`/productinquiry/${category}/${productId}`);
    };

    // 콘솔에 현재 상태 기록 (디버깅용)
    useEffect(() => {
        console.log('Current myInquiries:', myInquiries);
    }, [myInquiries]);

    return (
        <div>
            <h2 className='text-xl font-bold mb-4'>내 문의 내역</h2>
            {Array.isArray(myInquiries) && myInquiries.length > 0 ? (
                <div className='border-t border-gray-200'>
                    {myInquiries.map((inquiry, index) => (
                        <div key={inquiry.inquiryId || inquiry.id || index} className='p-4 border-b border-gray-200'>
                            <div className='flex justify-between mb-2'>
                                <span className='text-sm text-gray-500'>{inquiry.productName || '상품명'}</span>
                                <div className='flex space-x-2'>
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

                            <div className='mt-3 flex justify-end space-x-2'>
                                <Button
                                    className='px-3 py-1 text-sm bg-gray-100 hover:bg-gray-100 hover:text-white'
                                    onClick={() => handleEdit(inquiry)}
                                >
                                    수정
                                </Button>
                                <Button
                                    className='px-3 py-1 text-sm bg-white-50 text-red-600 hover:bg-red-100'
                                    onClick={() => handleDelete(inquiry)}
                                >
                                    삭제
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='text-center text-gray-500 py-8 border-gray-200'>
                    {hasLoaded ? '작성한 문의가 없습니다.' : '문의 내역을 불러오는 중...'}

                </div>
            )}
        </div>
    );
};

export default MyInquiry;
