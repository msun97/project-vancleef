import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';

const Section2 = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(videoRef.current, {
      scale: 1,
      scrollTrigger: {
        trigger: videoRef.current,
        start: 'top center',
        end: 'top top',
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="h-screen relative">
      <video
        ref={videoRef}
        muted
        autoPlay
        className="absolute left-1/2 -translate-x-2/4 bottom-0 h-full"
      >
        <source src="/video/home1.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Section2;
