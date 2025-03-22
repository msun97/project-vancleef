import { useState, useEffect } from 'react';

function ToTopBtn() {
    const [isVisible, setIsVisible] = useState(false);

    // 스크롤 이벤트를 감지하여 버튼 표시 여부 결정
    useEffect(() => {
        const toggleVisibility = () => {
            // 페이지를 100px 이상 스크롤했을 때만 버튼 표시
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // 스크롤 이벤트 리스너 등록
        window.addEventListener('scroll', toggleVisibility);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // 최상단으로 이동하는 함수
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // 부드러운 스크롤 효과
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className='fixed bottom-8 right-8 bg-black text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-all z-50'
                    aria-label='맨 위로 이동'
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    >
                        <path d='M12 19V5M5 12l7-7 7 7' />
                    </svg>
                </button>
            )}
        </>
    );
}

export default ToTopBtn;
