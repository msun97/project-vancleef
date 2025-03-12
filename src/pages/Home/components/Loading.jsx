import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const Loading = () => {
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      lineRef.current,
      { x: '0', transformOrigin: 'left' },
      { x: '100%', duration: 2, ease: 'power2.out' },
    );
  }, []);
  return (
    <div className="absolute z-[1000] w-full bg-gray-0 top-0 h-full overflow-hidden">
      <div className="line mt-10 overflow-hidden w-full">
        <div
          className="absolute bg-gray-0 w-full h-[250px] z-[1000]"
          ref={lineRef}
        ></div>
        <img src="/images/loadingLine.png" />
      </div>
      <h1 className="flex justify-center mt-40">
        <img src="/icons/logo.svg" alt="Van Cleef & Arpels" />
      </h1>
    </div>
  );
};

export default Loading;
