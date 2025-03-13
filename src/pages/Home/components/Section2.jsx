import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';

const Section2 = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(videoRef.current, {
      height: '60%',
      bottom: '60px'
    });

    gsap.to(videoRef.current, {
      height: '100%',
      bottom: '0',
      ease: "linear",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'bottom bottom', 
        end: '+=100%', 
        scrub: 1, 
        pin: true,
        id: "section2-trigger",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="h-screen relative" ref={sectionRef}>
      <video
        ref={videoRef}
        muted
        autoPlay
        loop
        playsInline
        className="absolute left-1/2 -translate-x-2/4 bottom-0 w-auto object-cover transition-all duration-1"
      >
        <source src="/video/home1.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default Section2;