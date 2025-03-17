import React, { useEffect, useRef, useState } from 'react';
import Loading from './components/Loading';
import Section1 from './components/Section1';
import Section3 from './components/Section3';
import Section5 from './components/Section5';
import Section6 from './components/Section6';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HomeFooter from './HomeFooter';
import Section4 from './components/Section4';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const section1Ref = useRef(null);
  const mainContentRef = useRef(null);
  const section4Ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 9000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && section1Ref.current) {
      gsap.fromTo(
        section1Ref.current,
        {
          scale: 1.2,
        },
        {
          scale: 1,
          duration: 3,
          ease: 'power4.out',
        }
      );

      const productdata = window.productdata || []; 
      const totalSlidesInSection4 = productdata.length || 3; 
      const section4Height = `${totalSlidesInSection4 * 100}vh`;
      
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: mainContentRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        }
      });

      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div className="z-[1000] bg-gray-0">
          <Loading />
        </div>
      ) : (
        <div className="overflow-x-hidden relative w-full" ref={mainContentRef}>
          <div
            className="p-330 bg-[url(/images/homebg1.png)] h-[100vh] fixed top-0 text-gray-0 bg-cover w-full -z-0"
            ref={section1Ref}
          ></div>

          <div className="relative z-10">
            <Section1 />
          </div>

          <div className="w-dvw relative">
            <Section3 isLoading={isLoading} />
          </div>
          
          <div ref={section4Ref}>
            <Section4 />
          </div>
          
          <Section5 isLoading={isLoading} />
          <Section6 />

          <div className="relative bg-white">
            <HomeFooter />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;