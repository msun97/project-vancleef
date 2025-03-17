import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TimelineSec = () => {
    const [activeTab, setActiveTab] = useState(4); // Start with 2013 tab (index 4)
    const timelineRef = useRef(null);
    const contentRefs = useRef([]);
    const animationRef = useRef(null); // To keep track of the active animation
    const isManualChange = useRef(false);

    const timelineEvents = [
        {
            year: '1895',
            title: 'In Paris',
            description:
                '1895년 파리에서 일명 에스텔 아펠로 불렸던 에스더(Esther)와 알프레드 반 클리프가 부부의 연을 맺었습니다. 두 사람은 모두 주얼리 가문 출신이었으며 가족을 중시하는 마음, 혁신을 추구하는 정신, 진귀한 젬스톤을 향한 열정이라는 공통점을 지니고 있었습니다.',
            image: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1900/van-cleef-arpels-1895-estelle-arpels-alfred-van-cleef-image1-560-794-3x.jpg.transform.vca-w550-1x.jpg',
        },
        {
            year: '1923',
            title: 'In Egypt',
            description:
                '1922년, 투탕카멘의 무덤이 발견되었고 이를 계기로 유럽에는 오리엔탈리즘의 바람이 불었습니다. 메종은 이집트 문화는 물론 일본, 중국, 인도의 스타일에 대한 동시대의 열정에서 영감을 얻었습니다. 그렇게 비유럽권의 예술에서 영감을 받은 모티브와 새로운 소재가 반클리프 아펠의 주얼리 작품과 진귀한 오브제를 장식하게 되었습니다.',
            image: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1920/van-cleef-arpels-1923-carousel1-image4-1797-900@3x.jpg.transform.vca-h400-1x.jpg',
        },
        {
            year: '1933',
            title: '미노디에르 제작',
            description:
                '샤를 아펠은 플로렌스 제이 굴드로부터 영감을 받아 아름다운 미노디에르 케이스를 탄생시켰습니다.',
            image: 'https://cdn.prod.website-files.com/6569e5664a1acbcdcad5ab67/6583dcb2873c33990129914e_1976-img.webp',
        },
        {
            year: '1940',
            title: 'In Newyork',
            description:
                '첫 번째 시즌 부티크는 1929년 문을 열었으며 1940년에는 지금의 주소인 744 피프스 애비뉴에 자리를 잡았습니다.',
            image: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1940/van-cleef-arpels-1942-image1-560-722@3x.jpg.transform.vca-w550-1x.jpg',
        },
        {
            year: '1950',
            title: '바로다 마하라니의 특별 주문',
            description:
                '바로다의 마하라니는 반클리프 아펠에 독특한 제품을 다수 주문 했습니다. 마하라니 소장 컬렉션 중 220캐럿 이상의 에메랄드로 세팅된 네크리스도 그녀의 특별 주문 중 하나입니다.',
            image: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1950/van-cleef-arpels-1950-drawing-indian-style-necklace-image1-560-700-3x.jpg.transform.vca-w550-1x.jpg',
        },
        {
            year: '1967',
            title: '조지 발란쉰의 발레 주얼리 뉴욕 초연',
            description:
                '클로드 아펠은 뉴욕 발레단의 공동 창업자인 조지 발란쉰과 친분을 맺게 됩니다. 두 사람의 만남은 주얼에 대한 아이디어로 이어졌고, 프레셔스 스톤에서 영감을 받은 발레 공연이 1967년 4월 첫선을 보였습니다. 루비, 에메랄드, 다이아몬드로 구성된 발레 3막은 각각 포레, 스트라빈스키, 차이코프스키에게 헌정 되었습니다.',
            image: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1960/van-cleef-arpels-1967-poster-jewels-ballet-the-new-york-city-ballet-inline1-image1-560-760-3x.jpg.transform.vca-w550-1x.jpg',
        },
        {
            year: '2019',
            title: '이탈리아 팔라초 레알레에서 "반클리프 아펠:시간, 자연, 사랑" 전시회 개최',
            description:
                '이번 전시는 반클리프 아펠의 설립부터 제작된 주얼리, 타임피스, 그리고 탁월한 오브제를 선보입니다. 이 여정에는 메종이 사랑하는 세 가지 테마인 시간, 자연, 사랑이 바탕으로 존재합니다.',
            image: 'https://cdn.prod.website-files.com/6569e5664a1acbcdcad5ab67/6583dc5ce1bcb4808762b2f9_2020.webp',
        },
    ];

    // Initialize animations for content
    useEffect(() => {
        // Animate the content of each slide
        contentRefs.current.forEach((ref, index) => {
            if (ref) {
                gsap.set(ref, {
                    opacity: index === activeTab ? 1 : 0,
                    y: index === activeTab ? 0 : 20,
                });
            }
        });
    }, [activeTab]);

    // Handle tab animations
    useEffect(() => {
        // Clear any existing animation
        if (animationRef.current) {
            animationRef.current.kill();
        }

        // Reset all tab indicators
        if (timelineRef.current) {
            const tabs = timelineRef.current.querySelectorAll('.timeline-tab');
            tabs.forEach((tab) => {
                const indicator = tab.querySelector('.timeline-tab-load');
                gsap.set(indicator, { width: '0%' });
            });
        }

        // Animate only the active tab indicator
        if (timelineRef.current) {
            const tabs = timelineRef.current.querySelectorAll('.timeline-tab');
            const activeIndicator = tabs[activeTab]?.querySelector('.timeline-tab-load');

            if (activeIndicator) {
                animationRef.current = gsap.to(activeIndicator, {
                    width: '100%',
                    duration: 6,
                    ease: 'linear',
                    onComplete: () => {
                        // Only proceed to next tab if this wasn't triggered by a manual change
                        if (!isManualChange.current) {
                            nextTab();
                        }
                        isManualChange.current = false;
                    },
                });
            }
        }
    }, [activeTab]);

    const nextTab = () => {
        setActiveTab((prev) => (prev + 1) % timelineEvents.length);
    };

    const handleTabChange = (index) => {
        // Set the flag to indicate this is a manual change
        isManualChange.current = true;

        // Kill the current animation
        if (animationRef.current) {
            animationRef.current.kill();
        }

        setActiveTab(index);
    };

    const pauseAnimation = () => {
        if (animationRef.current) {
            animationRef.current.pause();
        }
    };

    const resumeAnimation = () => {
        if (animationRef.current) {
            animationRef.current.play();
        }
    };

    return (
        <section className='w-full h-screen bg-white overflow-hidden flex flex-col'>
            <div className='relative flex-grow flex flex-col'>
                <div ref={timelineRef} className='w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col h-full'>
                    {/* 슬라이드 컨테이너 - 전체 높이에서 탭 영역 제외한 공간 사용 */}
                    <div className='w-full flex-grow relative'>
                        {timelineEvents.map((event, index) => (
                            <div
                                key={index}
                                ref={(el) => (contentRefs.current[index] = el)}
                                className={`absolute top-0 left-0 w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12 transition-all duration-500 ease-out ${
                                    activeTab === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                                }`}
                                style={{
                                    pointerEvents: activeTab === index ? 'auto' : 'none',
                                }}
                            >
                                <div className='text-left overflow-y-auto max-h-full pr-4'>
                                    <h2 className='text-xl text-gray-600 mb-2'>{event.title}</h2>
                                    <h1 className='text-6xl font-bold text-gray-900 mb-4'>{event.year}</h1>
                                    <p className='text-lg text-gray-600'>{event.description}</p>
                                </div>
                                <div className='text-center flex items-center justify-center h-full'>
                                    <img
                                        src={event.image}
                                        alt={`${event.year} - ${event.title}`}
                                        className='max-w-full max-h-full object-contain'
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 타임라인 탭 - 하단에 고정 */}
                    <div
                        className='flex justify-center items-center space-x-4 md:space-x-8 py-6 overflow-x-auto'
                        onMouseEnter={pauseAnimation}
                        onMouseLeave={resumeAnimation}
                    >
                        {timelineEvents.map((event, index) => (
                            <button
                                key={index}
                                className={`timeline-tab relative pb-2 px-2 text-lg font-medium focus:outline-none ${
                                    activeTab === index ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'
                                }`}
                                onClick={() => handleTabChange(index)}
                            >
                                <span>{event.year}</span>
                                <div className='timeline-tab-load-base absolute bottom-0 left-0 w-full h-1 bg-gray-200'>
                                    <div
                                        className='timeline-tab-load absolute top-0 left-0 h-full bg-[#CCD3B5]'
                                        style={{ width: '0%' }}
                                    ></div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineSec;
