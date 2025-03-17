import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Section6 = () => {
  const wrapperRef = useRef(null);
  const logoRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: false,
          pin: true,
          pinSpacing: true,
          markers: false,
        },
      });

      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'none' },
      );

      tl.fromTo(
        buttonRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'none' },
      );
    }
  }, []);

  return (
    <div className="wrapper h-[100vh] relative" ref={wrapperRef}>
      <div className="absolute inset-0 bg-[url(/images/loginpagaeimage.jpg)] bg-cover brightness-50"></div>

      <div className="relative z-10 h-screen flex items-center justify-center flex-col gap-[15px]">
        <h1 ref={logoRef} className="opacity-0">
          <img src="/icons/logo-w.svg" alt="로고" />
        </h1>
        <Link to="/productlist">
          <button
            ref={buttonRef}
            className="opacity-0 bg-[rgba(255,255,255,0.7)] w-[350px] h-[55px] text-content-l font-extrabold transition-all duration-300 hover:bg-gray-0"
          >
            제품 보러가기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Section6;
