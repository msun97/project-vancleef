import React, { useEffect, useRef, useState } from 'react';
import Loading from './components/Loading';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Section5 from './components/Section5';
import Section6 from './components/Section6';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HomeFooter from './HomeFooter';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoCompleted, setVideoCompleted] = useState(false);

  const section1Ref = useRef(null);
  const mainContentRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

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

      ScrollTrigger.refresh();
    }
  }, [isLoading]);

  useEffect(() => {
    if (videoCompleted) {
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
      
      return () => clearTimeout(refreshTimer);
    }
  }, [videoCompleted]);

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
  <Section2 onVideoComplete={() => setVideoCompleted(true)} />
</div>

<div className="w-dvw relative">
  <Section3 isLoading={isLoading} videoCompleted={videoCompleted} />
</div>  

<Section5 />
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