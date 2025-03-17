import { useState } from 'react';
import Button from '../button';

const ProductInquiryItem = ({ inquiry }) => {
    // 활성화된 섹션을 추적하는 상태 추가 (null이면 모두 닫힘)
    const [isOpen, setIsOpen] = useState(false);
    // 비밀글 패스워드 검증을 위한 상태
    const [passwordInput, setPasswordInput] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // 비밀글 여부
    const isSecret = inquiry?.isSecretPost;

    // 섹션 열기/닫기 핸들러
    const handleToggle = () => {
        // 비밀글이고 아직 인증되지 않은 경우
        if (isSecret && !isAuthenticated) {
            setShowPasswordModal(true);
            return;
        }
        setIsOpen(!isOpen);
    };

    // 비밀번호 입력 변경 핸들러
    const handlePasswordChange = (e) => {
        setPasswordInput(e.target.value);
    };

    // 비밀번호 확인 핸들러
    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        // 입력한 비밀번호와 저장된 비밀번호 비교
        if (passwordInput === inquiry.password) {
            setIsAuthenticated(true);
            setShowPasswordModal(false);
            setIsOpen(true); // 인증 성공 시 내용 표시
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    };

    // 날짜 포맷팅
    const formatDate = (dateString) => {
        if (!dateString) return '';

        // YYYY-MM-DD 형식을 YYYY.MM.DD 형식으로 변환
        const parts = dateString.split('-');
        if (parts.length === 3) {
            return `${parts[0]}.${parts[1]}.${parts[2]}`;
        }
        return dateString;
    };

    return (
        <li>
            <div className='flex justify-between items-center border-b border-[#d2d2d2] py-[20px]'>
                <div className='flex items-center gap-6'>
                    <div className='px-[28px] py-1 border'>{inquiry?.status || '접수완료'}</div>
                    <div className='flex items-center gap-2'>
                        {isSecret && (
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 48 49'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M38 22.8784H10C7.79086 22.8784 6 24.6693 6 26.8784V40.8784C6 43.0876 7.79086 44.8784 10 44.8784H38C40.2091 44.8784 42 43.0876 42 40.8784V26.8784C42 24.6693 40.2091 22.8784 38 22.8784Z'
                                    stroke='black'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                                <path
                                    d='M14 22.8784V14.8784C14 12.2263 15.0536 9.68271 16.9289 7.80735C18.8043 5.93199 21.3478 4.87842 24 4.87842C26.6522 4.87842 29.1957 5.93199 31.0711 7.80735C32.9464 9.68271 34 12.2263 34 14.8784V22.8784'
                                    stroke='black'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                        )}
                        <h3 onClick={handleToggle} className='text-xl font-extrabold cursor-pointer'>
                            {inquiry?.title || '상품문의'}
                        </h3>
                    </div>
                </div>
                <div className='flex items-center gap-[20px]'>
                    <span>{formatDate(inquiry?.date)}</span>
                    <svg
                        width='30'
                        height='30'
                        viewBox='0 0 48 49'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className={`${isOpen ? 'transform rotate-180' : ''}`}
                        onClick={handleToggle}
                    >
                        <path
                            d='M12 18.875L24 30.875L36 18.875'
                            stroke='black'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                </div>
            </div>

            {/* 문의 내용 및 답변 섹션 */}
            <ul
                className={`w-full bg-gray-10 px-[35px] transition-all duration-300 ${
                    isOpen ? 'py-[30px] max-h-[1000px] opacity-100' : 'py-0 max-h-0 opacity-0 overflow-hidden'
                }`}
            >
                <li className='pb-[55px] pl-[20px]'>
                    <div className='flex items-center gap-1'>
                        <span className='font-secondary text-[22px]'>Q</span>
                        <p>{inquiry?.inquiryType || '상품문의'}</p>
                    </div>
                    <p>{inquiry?.content || '문의 내용이 표시됩니다.'}</p>
                </li>

                {/* 답변이 있을 경우에만 표시 */}
                {inquiry?.hasResponse && (
                    <li className='border-t-1 pb-[55px] pl-[20px] pt-[10px]'>
                        <div className='gap-1'>
                            <span className='font-secondary text-[22px]'>A</span>
                            <p>{inquiry?.response || '답변 내용이 표시됩니다.'}</p>
                        </div>
                    </li>
                )}
            </ul>

            {/* 비밀번호 확인 모달 */}
            {showPasswordModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white p-6 rounded-lg w-[400px]'>
                        <h3 className='text-xl font-bold mb-4'>비밀글 확인</h3>
                        <p className='mb-4'>이 글은 비밀글입니다. 비밀번호를 입력해주세요.</p>
                        <form onSubmit={handlePasswordSubmit}>
                            <input
                                type='password'
                                value={passwordInput}
                                onChange={handlePasswordChange}
                                className='w-full border p-2 mb-4'
                                placeholder='비밀번호 입력'
                            />
                            <div className='flex justify-end gap-2'>
                                <Button onClick={() => setShowPasswordModal(false)} variant='secondary' className='p-3'>
                                    취소
                                </Button>
                                <Button type='submit' className='p-3'>
                                    확인
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </li>
    );
};

export default ProductInquiryItem;
