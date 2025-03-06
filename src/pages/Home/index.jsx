import React from 'react';
import Loading from './components/Loading';
import Section1 from './components/Section1';
import Section2 from './components/Section2';
import Section3 from './components/Section3';
import Section4 from './components/Section4';
import Section5 from './components/Section5';
import Section6 from './components/Section6';

const Home = () => {
  return (
    <>
      {' '}
      <div className="p-330 bg-[url(/images/homebg1.png)] h-auto  text-gray-0 bg-cover ">
        {/* <Loading /> */}
        {/* <Section1 /> */}
        <Section2 />
      </div>
      <div className="p-330 h-auto text-gray-0 bg-[url(/images/homebg2.png)] bg-cover">
        {/* <Section3 /> */}
        <Section4 />
      </div>
      <Section5 />
      <Section6 />
    </>
  );
};

export default Home;
