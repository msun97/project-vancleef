import React from 'react';
import Loading from './components/Loading';
import Section1 from './components/Section1';
import Section2 from './components/Section2';

const Home = () => {
  return (
    <div className="p-330 bg-[url(/images/homebg1.png)] h-auto  text-gray-0 ">
      {/* <Loading /> */}
      {/* <Section1 /> */}
      <Section2 />
    </div>
  );
};

export default Home;
