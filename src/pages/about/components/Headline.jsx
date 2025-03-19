import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Headline = () => {
    const logoRef = useRef(null);
    const titleRef = useRef(null);
    const containerRef = useRef(null);
    const lineRef = useRef(null); // 타이틀 밑에 라인 추가

    useEffect(() => {
        // 로고 초기 애니메이션
        gsap.fromTo(
            logoRef.current,
            { opacity: 0, y: -30 },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'power3.out',
            }
        );

        // 타이틀과 라인 애니메이션
        const titleTl = gsap.timeline({ delay: 0.7 });

        // 타이틀 애니메이션
        titleTl.fromTo(
            titleRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1.2,
                ease: 'power3.out',
            }
        );

        // 라인 애니메이션 (가로선이 늘어나는 효과)
        titleTl.fromTo(
            lineRef.current,
            { width: 0 },
            {
                width: '100%',
                duration: 1,
                ease: 'power2.out',
            },
            '-=0.5'
        );

        // 스크롤시 페이드아웃
        gsap.to(containerRef.current, {
            opacity: 0,
            y: -50,
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=300',
                scrub: 1,
            },
        });

        // 페이지 로드 시 스크롤 위치를 최상단으로 설정
        window.scrollTo(0, 0);
    }, []);

    return (
        <div ref={containerRef} className='flex flex-col gap-20 h-screen items-center justify-center relative'>
            {/* 배경 그라데이션 효과 (선택 사항) */}
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 opacity-10'></div>

            <div ref={logoRef} className=''>
                <img src='/icons/logo.svg' alt='Van Cleef & Arpels' className='w-[640px] mx-auto' />
            </div>

            <div className='mx-auto text-center'>
                <h1 ref={titleRef} className='text-[35px] font-secondary'>
                    새로운 날의 여명
                </h1>
                {/* 타이틀 아래 장식 라인 */}
                <div
                    ref={lineRef}
                    className='h-px bg-black opacity-70 mx-auto mt-4'
                    style={{ width: 0 }} // 초기에는 보이지 않음
                ></div>
            </div>
        </div>
    );
};

export default Headline;
