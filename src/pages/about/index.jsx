import React from 'react';
import ImgMotionSec from './components/ImgMotionSec';
import ValueSec from './components/ValueSec';
import ValueSecTwo from './components/ValueSecTwo';
import TimelineSec from './components/TimelineSec';
import Headline from './components/Headline';

const AboutPage = () => {
  return (
    <div>
      <Headline />
      <ImgMotionSec />
      <ValueSec />
      <ValueSecTwo />
      <TimelineSec />
    </div>
  );
};

export default AboutPage;
