import React, { useEffect, useRef } from 'react';
import TypingLogo from './Section1/TypingLogo';
import gsap from 'gsap';

const Section1 = () => {
  const lineRef = useRef(null);
  const textRef = useRef(null);
  const arrowRef = useRef(null);
  const titleRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      lineRef.current,
      { width: '0', opacity: '0' },
      {
        width: '120px',
        opacity: 1,
        duration: 2,
        ease: 'power2.out',
        onComplete: () => {
          console.log('Line animation complete!');
          gsap.fromTo(
            textRef.current.children,
            { opacity: 0, x: 50 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              stagger: 0.3,
              ease: 'power2.out',
            },
          );
        },
      },
    );
  }, []);
  useEffect(() => {
    gsap.fromTo(
      arrowRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.out' },
    );
  });
  useEffect(() => {
    gsap.to(arrowRef.current, {
      y: -10,
      duration: 0.8,
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      gsap.to(titleRef.current, {
        y: -scrollY * 0.3, // 위로 이동
        opacity: Math.max(1 - scrollY / 300, 0), // 서서히 사라지게
        duration: 0.3,
        ease: 'power1.out',
      });

      gsap.to(lineRef.current, {
        y: scrollY * 0.5, // 아래로 이동
        opacity: Math.max(1 - scrollY / 300, 0), // 서서히 사라지게
        duration: 0.3,
        ease: 'power1.out',
      });

      gsap.to(textRef.current, {
        y: scrollY * 0.5, // 아래로 이동
        opacity: Math.max(1 - scrollY / 300, 0), // 서서히 사라지게
        duration: 0.3,
        ease: 'power1.out',
      });

      gsap.to(arrowRef.current, {
        opacity: Math.max(1 - scrollY / 100, 0), // 빠르게 사라짐
        duration: 0.3,
        ease: 'power1.out',
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="h-screen flex justify-center relative">
      <div
        className="title h-full flex items-center justify-center gap-8"
        ref={titleRef}
      >
        <h1>
          <TypingLogo />
        </h1>
        <div className="line h-[1px] bg-gray-0" ref={lineRef} />
        <div ref={textRef} className="text-content-s text-right text-gray-0">
          <p className=" opacity-0">The Best As Ever,</p>
          <p className=" opacity-0">최고는 여전히 변함 없습니다.</p>
        </div>
      </div>
      <div
        className="scroll absolute bottom-[30px] flex flex-col justify-center items-center gap-5"
        ref={arrowRef}
      >
        <img src="/icons/arrow-bottom-line.svg" alt="scroll down" />
        <p className="text-gray-0">Scroll Down</p>
      </div>
    </div>
  );
};

export default Section1;
