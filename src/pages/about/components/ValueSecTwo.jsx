import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ValueSecTwo = () => {
    // Refs for the container and column elements
    const sectionRef = useRef(null);
    const col1Ref = useRef(null);
    const col2Ref = useRef(null);
    const col3Ref = useRef(null);
    const col4Ref = useRef(null);
    const col5Ref = useRef(null);
    const textRefs = useRef([]);

    // Add refs to text elements
    const addToTextRefs = (el) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    // Images for each column
    const col1Images = [
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1900/van-cleef-arpels-1906-model-varuna-yacht-image2-560-458-3x.jpg.transform.vca-w2560-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1900/van-cleef-arpels-1916-carousel1-image2-1368-900@3x.jpg.transform.vca-w1024-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1920/van-cleef-arpels-japanese-inspired-vanity-case-1923-carousel1-image2-616-900-3x.jpg.transform.vca-h500-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1920/van-cleef-arpels-1925-carousel1-image1-838-900@3x.jpg.transform.vca-h500-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1920/van-cleef-arpels-portrait-rene-sim-lacaze-1926-carousel1-image3-601-900-3x.jpg.transform.vca-w1024-1x.jpg',
    ];

    const col2Images = [
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/2010/van-cleef-arpels-high-jewelry-les-voyages-extraordinaires-sneffel-necklace-2010-carousel1-image4-950-900-3x.jpg.transform.vca-h500-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/2010/van-cleef-arpels-high-jewelry-les-voyages-extraordinaires-baleine-bleue-clip-2010-carousel1-image1-700-900-3x.jpg.transform.vca-h500-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/2010/van-cleef-arpels-high-jewelry-les-voyages-extraordinaires-maximus-necklace-2010-carousel1-image2-950-900-3x.jpg.transform.vca-h500-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/2010/van-cleef-arpels-high-jewelry-les-voyages-extraordinaires-constellation-monoceros-clip-2010-carousel1-image3-800-900-3x',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/2010/van-cleef-arpels-pont-des-amoureux-love-stories-watch-2010-image1-560-720-3x.jpg.transform.vca-w2560-1x.jpg',
    ];

    const col3Images = [
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1980/van-cleef-arpels-1986-valenciennes-set-catalogue-inline1-image1-560-872-3x.jpg.transform.vca-w2560-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1980/van-cleef-arpels-1986-drawing-valenciennes-earring-inspiration-snowflake-collection-inline1-image2-560-820-3x.jpg.transform.vca-w2560-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1980/van-cleef-arpels-1981-drawing-cosmos-clip-image1-560-551-3x.jpg.transform.vca-w2560-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1970/van-cleef-arpels-1970-rose-de-noel-clip-inline1-image2-560-600-3x.jpg.transform.vca-w2560-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1970/van-cleef-arpels-1971-bird-clip-and-walska-pendant-inline1-image1-560-458-3x.jpg.transform.vca-w2560-1x.jpg',
    ];

    const col4Images = [
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1960/van-cleef-arpels-1967-replica-of-h-i-h-farah-pahlavi-tiara-inline2-image1-560-470-3x.jpg.transform.vca-w2560-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1960/van-cleef-arpels-1967-drawing-h-i-h-farah-pahlavi-tiara-inline2-image2-560-606-3x.jpg.transform.vca-w2560-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1960/van-cleef-arpels-1967-five-leaves-clip-inline3-image1-560-692-3x.jpg.transform.vca-w2560-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1960/van-cleef-arpels-1968-alhambra-long-necklace-carousel1-image2-1205-900-3x.jpg.transform.vca-w2560-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1960/van-cleef-arpels-1968-catalogue-carousel1-image3-592-900-3x.jpg.transform.vca-w2560-1x.jpg',
    ];

    const col5Images = [
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1900/van-cleef-arpels-1906-model-varuna-yacht-image2-560-458-3x.jpg.transform.vca-w2560-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1900/van-cleef-arpels-1916-carousel1-image2-1368-900@3x.jpg.transform.vca-w1024-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1920/van-cleef-arpels-japanese-inspired-vanity-case-1923-carousel1-image2-616-900-3x.jpg.transform.vca-h500-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1920/van-cleef-arpels-1925-carousel1-image1-838-900@3x.jpg.transform.vca-h500-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/timeline/decade-details/1920/van-cleef-arpels-portrait-rene-sim-lacaze-1926-carousel1-image3-601-900-3x.jpg.transform.vca-w1024-1x.jpg',
    ];

    // Setup GSAP animations
    useEffect(() => {
        // Check if we're in the browser environment
        if (typeof window === 'undefined') return;

        // Make section visible immediately - important fix!
        gsap.set(sectionRef.current, { autoAlpha: 1 });

        console.log('Setting up GSAP animation for ValueSecTwo');

        // Create a timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=800%',
                scrub: true,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                markers: true, // Add markers for debugging
            },
        });

        // Media query for responsive animation
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const marginValue = isMobile ? '15px' : '30px';
        const yValue = isMobile ? '-10%' : '-20%';

        // Animation sequence - removed initial autoAlpha animation since we set it visible immediately
        // We start with columns already visible

        // Animate columns with images
        tl.fromTo(col1Ref.current, { y: '50%' }, { y: yValue, duration: 3.5 }, '<');

        // Animate margin for images in column 1
        gsap.utils.toArray(col1Ref.current.querySelectorAll('figure:not(:first-child)')).forEach((figure) => {
            tl.to(
                figure,
                {
                    marginTop: marginValue,
                    duration: 3.5,
                    ease: 'power1.inOut',
                },
                '<'
            );
        });

        // Column 2 animation (moving up)
        tl.fromTo(col2Ref.current, { y: '-200%' }, { y: '0', duration: 3.5 }, '<');

        // Animate margin for images in column 2
        gsap.utils.toArray(col2Ref.current.querySelectorAll('figure:not(:last-child)')).forEach((figure) => {
            tl.to(
                figure,
                {
                    marginBottom: marginValue,
                    duration: 3.5,
                    ease: 'power1.inOut',
                },
                '<'
            );
        });

        // Column 3 animation (moving down)
        tl.fromTo(col3Ref.current, { y: '50%' }, { y: yValue, duration: 3.5 }, '<');

        // Animate margin for images in column 3
        gsap.utils.toArray(col3Ref.current.querySelectorAll('figure:not(:first-child)')).forEach((figure) => {
            tl.to(
                figure,
                {
                    marginTop: marginValue,
                    duration: 3.5,
                    ease: 'power1.inOut',
                },
                '<'
            );
        });

        // Column 4 animation (moving up)
        tl.fromTo(col4Ref.current, { y: '-200%' }, { y: '0', duration: 3.5 }, '<');

        // Animate margin for images in column 4
        gsap.utils.toArray(col4Ref.current.querySelectorAll('figure:not(:last-child)')).forEach((figure) => {
            tl.to(
                figure,
                {
                    marginBottom: marginValue,
                    duration: 3.5,
                    ease: 'power1.inOut',
                },
                '<'
            );
        });

        // Column 5 animation (moving down)
        tl.fromTo(col5Ref.current, { y: '50%' }, { y: yValue, duration: 3.5 }, '<');

        // Animate margin for images in column 5
        gsap.utils.toArray(col5Ref.current.querySelectorAll('figure:not(:first-child)')).forEach((figure) => {
            tl.to(
                figure,
                {
                    marginTop: marginValue,
                    duration: 3.5,
                    ease: 'power1.inOut',
                },
                '<'
            );
        });

        // Text animation sequence - show texts that are initially invisible
        tl.to(textRefs.current[0], { autoAlpha: 1 }, '<+=0.1');
        tl.to(textRefs.current[0], { autoAlpha: 0 }, '>');
        tl.to(textRefs.current[1], { autoAlpha: 1 }, '>');
        tl.to(textRefs.current[1], { autoAlpha: 0 }, '>');
        tl.to(textRefs.current[2], { autoAlpha: 1 }, '>');
        tl.to(textRefs.current[2], { autoAlpha: 0 }, '>');
        tl.to(textRefs.current[3], { autoAlpha: 1 }, '>');

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    // Helper function to create image columns
    const renderImageColumn = (images, ref, isUpward = false) => {
        return (
            <div
                ref={ref}
                className='flex flex-col w-full'
                style={{ transform: isUpward ? 'translateY(-200%)' : 'translateY(50%)' }}
            >
                {images.map((src, index) => (
                    <figure
                        key={index}
                        className={`mb-4 ${isUpward && index !== images.length - 1 ? 'mb-32' : ''} ${
                            !isUpward && index !== 0 ? 'mt-32' : ''
                        }`}
                        style={{
                            marginBottom: isUpward && index !== images.length - 1 ? '320px' : '',
                            marginTop: !isUpward && index !== 0 ? '320px' : '',
                        }}
                    >
                        <div className='image-wrapper relative w-32 h-48 md:w-48 md:h-64 overflow-hidden bg-gray-100 z-20'>
                            <img
                                src={src}
                                alt={`Value image ${index + 1}`}
                                className='absolute inset-0 w-full h-full object-cover'
                            />
                        </div>
                    </figure>
                ))}
            </div>
        );
    };

    return (
        <section ref={sectionRef} className='w-full min-h-screen sticky top-0 overflow-hidden'>
            <div className='content-page step2 w-full h-full overflow-hidden relative'>
                {/* Image columns */}
                <div className='flex-group flex justify-between gap-2 md:gap-4 mx-auto px-4 lg:px-8 max-w-7xl relative z-10 w-full'>
                    {renderImageColumn(col1Images, col1Ref)}
                    {renderImageColumn(col2Images, col2Ref, true)}
                    {renderImageColumn(col3Images, col3Ref)}
                    {renderImageColumn(col4Images, col4Ref, true)}
                    {renderImageColumn(col5Images, col5Ref)}
                </div>

                <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10'></div>

                {/* Text overlay */}
                <div className='text-wrap absolute top-1/6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-3xl px-4 z-20 '>
                    <p
                        ref={addToTextRefs}
                        className='desc opacity-0 invisible text-lg md:text-xl lg:text-[32px] text-white mb-8 leading-relaxed font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap'
                    >
                        단순한 소파의 정의, 그 이상의 가치를 선사해 <br className='hidden md:block' />
                        일상 속 쉼을 넘어 매 순간의 소중함이 배가되는, <br className='hidden md:block' />
                        니즈는 거실이라는 공간 속 최선의 선택지가 될 수 있는 <br className='hidden md:block' />
                        소파 브랜드가 되기 위해 끊임없는 노력을 기울이고 있습니다.
                    </p>
                    <p
                        ref={addToTextRefs}
                        className='desc opacity-0 invisible text-lg md:text-xl lg:text-[32px] text-white mb-8 leading-relaxed font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap'
                    >
                        니즈는 온 가족이 안심하고 편안한 일상을 보낼 수 있게 <br className='hidden md:block' />
                        환경친화적 자재만을 사용해 소파를 제작하며, <br className='hidden md:block' />
                        차별화된 디자인과 30년 이상 소파만을 제작해온 <br className='hidden md:block' />
                        장인의 디테일한 마감으로 공간에 활력을 더해줍니다.
                    </p>
                    <p
                        ref={addToTextRefs}
                        className='desc opacity-0 invisible text-lg md:text-xl lg:text-[32px] text-white mb-8 leading-relaxed font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap'
                    >
                        오늘의 행복한 마무리는 보다 더 나은 내일의 시작이 됩니다.
                    </p>
                    <p
                        ref={addToTextRefs}
                        className='desc opacity-0 invisible text-lg md:text-xl lg:text-[32px] text-white mb-8 leading-relaxed font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap'
                    >
                        공간 속 새로운 기준, <br />
                        니즈는 일상 속 거실 공간의 소중함을 아는 분들을 위한 <br className='hidden md:block' />
                        프리미엄 소파 브랜드입니다.
                    </p>
                </div>

                {/* Background overlay - reduced opacity */}
                <div className='bg absolute inset-0 bg-black bg-opacity-20 z-0' style={{ pointerEvents: 'none' }}></div>
            </div>
        </section>
    );
};

export default ValueSecTwo;
