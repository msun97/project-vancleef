import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const Loading = () => {
  const lineRef = useRef(null);
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.muted = true;
    }

    const tl = gsap.timeline();
    tl.fromTo(
      overlayRef.current,
      { opacity: 1 },
      { opacity: 0.7, duration: 1.5, ease: 'power2.out' }
    );
    tl.fromTo(
      lineRef.current,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration: 2, ease: 'power2.inOut', delay: 2, },
      '-=0.5'
    );

    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 2,},
      '-=1.5'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="absolute z-[1000] w-full h-full top-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video/home1.mp4" type="video/mp4" />
      </video>
      <div 
        ref={overlayRef}
        className="absolute w-full h-full bg-black opacity-70 z-[1001]"
      ></div>
      <div className="absolute w-full mt-10 z-[1002]">
        <img 
          ref={lineRef}
          src="/images/loadingLine.png" 
          alt="Loading Line" 
          className="w-full"
          style={{ 
            clipPath: 'inset(0 100% 0 0)' 
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1003]" ref={logoRef}>
        <img 
          src="/icons/logo-w.svg" 
          alt="Van Cleef & Arpels"
          className="w-[600px] h-auto"
        />
      </div>
    </div>
  );
};

export default Loading;