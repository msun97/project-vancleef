import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const ImgMotionSec = () => {
    const sectionRef = useRef(null);
    const stickyWrapRef = useRef(null);
    const containerRef = useRef(null);
    const imagesRef = useRef([]);

    useEffect(() => {
        const section = sectionRef.current;
        const stickyWrap = stickyWrapRef.current;
        const container = containerRef.current;
        const images = imagesRef.current.filter(Boolean);

        if (!section || !stickyWrap || !container || images.length === 0) return;

        // 초기화 설정 (가로로 긴 직사각형)
        gsap.set(container, {
            width: '70%',
            height: '45%',
            top: '50%',
            left: '50%',
            xPercent: -50,
            yPercent: -50,
            // border: '1px solid rgba(255,255,255,0.3)',
        });

        // 미디어 쿼리 체크 함수
        const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;
        const isTablet = () => window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches;
        const isMobile = () => window.matchMedia('(max-width: 767px)').matches;

        // 화면 크기에 따른 설정 조정
        let scrubValue = 3;
        let durationMultiplier = 1;
        let sectionHeight = '500vh';

        if (isTablet()) {
            scrubValue = 2.5;
            durationMultiplier = 0.85;
            sectionHeight = '450vh';
        } else if (isMobile()) {
            scrubValue = 2;
            durationMultiplier = 0.7;
            sectionHeight = '400vh';
        }

        // 섹션 높이 설정
        section.querySelector('div').style.height = sectionHeight;

        // 각 형태 변화에 대한 타임라인 생성
        const shapeTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                scrub: scrubValue,
                // markers: true,
            },
        });

        // 이미지 페이드 인/아웃 지속 시간
        const fadeInDuration = 1.5 * durationMultiplier;
        const fadeOutDuration = 1.5 * durationMultiplier;
        const baseDuration = 3 * durationMultiplier;
        const pauseDuration = 3 * durationMultiplier;
        const delayDuration = 3 * durationMultiplier;

        // 형태 변화 시퀀스
        // 2. 세로로 긴 직사각형으로 변화 (이미지 2, 3)
        shapeTl
            .to(
                container,
                {
                    width: isDesktop() ? '40%' : isTablet() ? '45%' : '55%',
                    height: isDesktop() ? '70%' : isTablet() ? '65%' : '60%',
                    duration: baseDuration,
                    ease: 'power2.inOut',
                },
                `+=${delayDuration}`
            )
            .to(images[0], { opacity: 0, duration: fadeOutDuration }, '<')
            .to(images[1], { opacity: 1, duration: fadeInDuration }, '>')
            .to({}, { duration: pauseDuration })
            .to(images[2], { opacity: 1, duration: fadeInDuration }, `+=${delayDuration}`);

        // 3. 정사각형으로 변화 (이미지 4, 5)
        shapeTl
            .to(
                container,
                {
                    width: isDesktop() ? '55%' : isTablet() ? '60%' : '65%',
                    height: isDesktop() ? '55%' : isTablet() ? '60%' : '65%',
                    duration: baseDuration,
                    ease: 'power2.inOut',
                },
                `+=${delayDuration}`
            )
            .to(images[1], { opacity: 0, duration: fadeOutDuration }, '<')
            .to(images[2], { opacity: 0, duration: fadeOutDuration }, '<')
            .to(images[3], { opacity: 1, duration: fadeInDuration }, '>')
            .to({}, { duration: pauseDuration })
            .to(images[4], { opacity: 1, duration: fadeInDuration }, `+=${delayDuration}`);

        // 4. 왼쪽으로 치우친 작은 직사각형 (이미지 6)
        shapeTl
            .to(
                container,
                {
                    width: isDesktop() ? '35%' : isTablet() ? '40%' : '50%',
                    height: isDesktop() ? '50%' : isTablet() ? '55%' : '60%',
                    left: isDesktop() ? '30%' : isTablet() ? '35%' : '40%',
                    duration: baseDuration,
                    ease: 'power2.inOut',
                },
                `+=${delayDuration}`
            )
            .to(images[3], { opacity: 0, duration: fadeOutDuration }, '<')
            .to(images[4], { opacity: 0, duration: fadeOutDuration }, '<')
            .to(images[5], { opacity: 1, duration: fadeInDuration }, '>');

        // 5. 오른쪽으로 치우친 작은 직사각형 (이미지 7)
        shapeTl
            .to(
                container,
                {
                    left: isDesktop() ? '70%' : isTablet() ? '65%' : '60%',
                    duration: baseDuration,
                    ease: 'power2.inOut',
                },
                `+=${delayDuration}`
            )
            .to(images[5], { opacity: 0, duration: fadeOutDuration }, '<')
            .to(images[6], { opacity: 1, duration: fadeInDuration }, '>');

        // 6. 다시 가운데로 큰 직사각형 (이미지 8, 9, 10)
        shapeTl
            .to(
                container,
                {
                    width: isDesktop() ? '75%' : isTablet() ? '80%' : '85%',
                    height: isDesktop() ? '75%' : isTablet() ? '70%' : '65%',
                    left: '50%',
                    duration: baseDuration,
                    ease: 'power2.inOut',
                },
                `+=${delayDuration}`
            )
            .to(images[6], { opacity: 0, duration: fadeOutDuration }, '<')
            .to(images[7], { opacity: 1, duration: fadeInDuration }, '>')
            .to({}, { duration: pauseDuration })
            .to(images[8], { opacity: 1, duration: fadeInDuration }, `+=${delayDuration}`)
            .to({}, { duration: pauseDuration })
            .to(images[9], { opacity: 1, duration: fadeInDuration }, `+=${delayDuration}`);

        // 화면 크기 변경 감지 및 처리
        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            // 클린업
            window.removeEventListener('resize', handleResize);
            if (shapeTl.scrollTrigger) {
                shapeTl.scrollTrigger.kill();
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className='relative'>
            {/* 스크롤 공간 */}
            <div className='h-[500vh] md:h-[450vh] lg:h-[500vh]'>
                {/* Sticky 컨테이너 */}
                <div
                    ref={stickyWrapRef}
                    className='sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden'
                    style={{
                        background:
                            'linear-gradient(to bottom, rgba(180,180,180,0) 0%, rgba(180,180,180,1) 50%, rgba(180,180,180,0) 100%)',
                    }}
                >
                    <div className='w-full max-w-full px-4 md:max-w-4xl lg:max-w-7xl mx-auto'>
                        <div className='text-center mb-4 md:mb-8 lg:mb-12'>
                            <p className='text-xl md:text-2xl lg:text-6xl font-secondary mt-[50px]'>
                                시간을 초월한 아름다움
                            </p>
                        </div>
                        <div className='relative h-[50vh] md:h-[60vh] lg:h-[70vh]'>
                            {/* 이미지 컨테이너 */}
                            <div
                                ref={containerRef}
                                className='absolute bg-white overflow-hidden shadow-lg'
                                style={{
                                    position: 'absolute',
                                    transition: 'box-shadow 0.3s ease',
                                }}
                            >
                                <img
                                    ref={(el) => (imagesRef.current[0] = el)}
                                    src='https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1900/van-cleef-arpels-1918-carousel1-image1-646-900@3x.jpg.transform.vca-h500-1x.jpg'
                                    alt='모션 이미지 1'
                                    className='absolute top-0 left-0 w-full h-full object-cover'
                                    style={{ opacity: 1 }}
                                />
                                <img
                                    ref={(el) => (imagesRef.current[1] = el)}
                                    src='https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1920/van-cleef-arpels-1923-carousel1-image4-1797-900@3x.jpg.transform.vca-h500-1x.jpg'
                                    alt='모션 이미지 2'
                                    className='absolute top-0 left-0 w-full h-full object-cover'
                                    style={{ opacity: 0 }}
                                />
                                <img
                                    ref={(el) => (imagesRef.current[2] = el)}
                                    src='https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1920/van-cleef-arpels-roses-bracelet-1925-carousel1-image3-1785-900-3x.jpg.transform.vca-h500-1x.jpg'
                                    alt='모션 이미지 3'
                                    className='absolute top-0 left-0 w-full h-full object-cover'
                                    style={{ opacity: 0 }}
                                />
                                <img
                                    ref={(el) => (imagesRef.current[3] = el)}
                                    src='https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1920/van-cleef-arpels-van-cleef-arpels-photography-renee-puissant-1926-carousel1-image1-630-900-3x.jpg.transform.vca-w1024-1x.jpg'
                                    alt='모션 이미지 4'
                                    className='absolute top-0 left-0 w-full h-full object-cover'
                                    style={{ opacity: 0 }}
                                />
                                <img
                                    ref={(el) => (imagesRef.current[4] = el)}
                                    src='https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1930/van-cleef-arpels-1933-minaudiere-carousel1-image4-1021-900-3x.jpg.transform.vca-h500-1x.jpg'
                                    alt='모션 이미지 5'
                                    className='absolute top-0 left-0 w-full h-full object-cover'
                                    style={{ opacity: 0 }}
                                />
                                <img
                                    ref={(el) => (imagesRef.current[5] = el)}
                                    src='https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1930/van-cleef-arpels-1933-drawing-mystery-set-rubies-bracelet-carousel2-image1-2030-900-3x.jpg.transform.vca-h500-1x.jpg'
                                    alt='모션 이미지 6'
                                    className='absolute top-0 left-0 w-full h-full object-cover'
                                    style={{ opacity: 0 }}
                                />
                                <img
                                    ref={(el) => (imagesRef.current[6] = el)}
                                    src='https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1930/van-cleef-arpels-hummingbird-box-1933-carousel2-image2-1172-900-3x.jpg.transform.vca-h500-1x.jpg'
                                    alt='모션 이미지 7'
                                    className='absolute top-0 left-0 w-full h-full object-cover'
                                    style={{ opacity: 0 }}
                                />
                                <img
                                    ref={(el) => (imagesRef.current[7] = el)}
                                    src='https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1930/van-cleef-arpels-1939-drawing-the-wedding-tiara-h-r-h-princess-fawzia-of-egypt-carousel1-image1-900-900-3x.jpg.transform.vca-h500-1x.jpg'
                                    alt='모션 이미지 8'
                                    className='absolute top-0 left-0 w-full h-full object-cover'
                                    style={{ opacity: 0 }}
                                />
                                <img
                                    ref={(el) => (imagesRef.current[8] = el)}
                                    src='https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1940/van-cleef-arpels-1941-drawing-ballerina-clips-carousel1-image4-2880-900-3x.jpg.transform.vca-h500-1x.jpg'
                                    alt='모션 이미지 9'
                                    className='absolute top-0 left-0 w-full h-full object-cover'
                                    style={{ opacity: 0 }}
                                />
                                <img
                                    ref={(el) => (imagesRef.current[9] = el)}
                                    src='https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1940/van-cleef-arpels-1944-lovebirds-brooch-carousel1-image1-978-900-3x.jpg.transform.vca-h500-1x.jpg'
                                    alt='모션 이미지 10'
                                    className='absolute top-0 left-0 w-full h-full object-cover'
                                    style={{ opacity: 0 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 하단 텍스트 섹션 */}
        </section>
    );
};

export default ImgMotionSec;
