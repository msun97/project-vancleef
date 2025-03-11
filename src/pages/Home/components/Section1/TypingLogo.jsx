import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const TypingLogo = () => {
  const textRef = useRef(null);
  const cursorRef = useRef(null);
  const brandName = 'Van Cleef & Arpels';
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < brandName.length) {
        setDisplayText(brandName.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  return (
    <h1 className="h-[70px] flex items-center justify-center">
      <div className="w-[560px]">
        <div
          ref={textRef}
          className="text-6xl font-light text-gray-0 font-secondary text-right"
        >
          {displayText}
          <span
            ref={cursorRef}
            className="text-5xl font-light text-gray-0 ml-1"
          >
            |
          </span>
        </div>
      </div>
    </h1>
  );
};

export default TypingLogo;
