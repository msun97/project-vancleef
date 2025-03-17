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
            year: '1971',
            title: 'Eeste paal',
            description:
                'Op 21 september 1971 haalt Koningin Juliana de hendel over tijdens de eerste paal viering van het toenmalige Slotervaartziekenhuis.',
            image: 'https://cdn.prod.website-files.com/6569e5664a1acbcdcad5ab67/6583dcfb621c1ed99b726276_1971_img.webp',
        },
        {
            year: '1975',
            title: 'In gebruik',
            description:
                'Het Slotervaartziekenhuis is officieel in gebruik genomen met extra aandacht voor bejaarden, chronisch zieken en armlastigen.',
            image: 'https://cdn.prod.website-files.com/6569e5664a1acbcdcad5ab67/6583da5241a163a020ebed7f_1975.webp',
        },
        {
            year: '1976',
            title: 'Officiële opening',
            description: 'De officiële opening van Het Slotervaartziekenhuis door Koningin Juliana.',
            image: 'https://cdn.prod.website-files.com/6569e5664a1acbcdcad5ab67/6583dcb2873c33990129914e_1976-img.webp',
        },
        {
            year: '2006',
            title: 'Het Slotervaartziekenhuis gered',
            description:
                'Het Slotervaartziekenhuis is gered van faillissement en wordt het eerste geprivatiseerde ziekenhuis van Nederland.',
            image: 'https://cdn.prod.website-files.com/6569e5664a1acbcdcad5ab67/6583dbccffa1efff528de2bd_2006.webp',
        },
        {
            year: '2013',
            title: 'Het Slotervaartziekenhuis overgenomen',
            description: 'De MC Groep heeft het Amsterdamse ziekenhuis overgenomen.',
            image: 'https://cdn.prod.website-files.com/6569e5664a1acbcdcad5ab67/6583dc085e1ccb9abd37cda8_2013.webp',
        },
        {
            year: '2018',
            title: 'MC Slotervaart is failliet',
            description:
                'MC Slotervaart is officieel failliet verklaard. Een ingrijpende gebeurtenis die veel invloed had op de patiënten en het personeel.',
            image: 'https://cdn.prod.website-files.com/6569e5664a1acbcdcad5ab67/6583dc339ef3e1838f4f6654_2018.webp',
        },
        {
            year: '2020',
            title: 'Een nieuwe eigenaar',
            description: 'Zadelhoff is definitief eigenaar van het voormalige Slotervaartziekenhuis.',
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
        <header className='w-full bg-white overflow-hidden'>
            <div className='relative'>
                <div ref={timelineRef} className='w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    {/* 고정된 높이의 슬라이드 컨테이너 */}
                    <div className='w-full relative' style={{ height: '500px' }}>
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
                                <div className='text-left overflow-y-auto max-h-full'>
                                    <h2 className='text-xl text-gray-600 mb-2'>{event.title}</h2>
                                    <h1 className='text-6xl font-bold text-gray-900 mb-4'>{event.year}</h1>
                                    <p className='text-lg text-gray-600'>{event.description}</p>
                                </div>
                                <div className='text-center'>
                                    <img
                                        src={event.image}
                                        alt={`${event.year} - ${event.title}`}
                                        className='max-w-full h-auto mx-auto max-h-96 object-contain'
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 타임라인 탭 - 슬라이드 아래에 고정 위치 */}
                    <div
                        className='flex justify-center items-center space-x-4 md:space-x-8 my-6 pt-4 overflow-x-auto'
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
        </header>
    );
};

export default TimelineSec;
