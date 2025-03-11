import React, { useEffect, useRef, useState } from 'react';
import Loading from './components/Loading';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Section4 from './components/Section4';
import Section5 from './components/Section5';
import Section6 from './components/Section6';
import gsap from 'gsap';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const section1Ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      section1Ref.current,
      {
        scale: 1.2,
      },
      {
        scale: 1,
        duration: 3,
        ease: 'power4.out',
      },
    );
  });
  return (
    <>
      {isLoading ? (
        <div className="z-[1000] bg-gray-0">
          <Loading />
        </div>
      ) : (
        <div className="overflow-hidden relative">
          <div
            className="p-330 bg-[url(/images/homebg1.png)] h-dvh fixed text-gray-0 bg-cover w-full -z-0"
            ref={section1Ref}
          ></div>
          <div className="relative z-10">
            <Section1 />
            <Section2 />
          </div>
          <div className="p-330 h-auto text-gray-0 bg-[url(/images/homebg2.png)] bg-cover">
            <Section3 />
            <Section4 />
          </div>
          <Section5 />
          <Section6 />
        </div>
      )}{' '}
    </>
  );
};

export default Home;
