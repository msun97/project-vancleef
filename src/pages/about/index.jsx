import React from 'react';
import ImgMotionSec from './components/ImgMotionSec';
import ValueSec from './components/ValueSec';
import ValueSecTwo from './components/ValueSecTwo';
import TimelineSec from './components/TimelineSec';
import Headline from './components/Headline';
import ToTopBtn from '@/components/layout/totopbtn/ToTopBtn';

const AboutPage = () => {
    return (
        <div>
            <Headline />
            <ImgMotionSec />
            <ValueSec />
            <ValueSecTwo />
            <TimelineSec />
            <ToTopBtn />
        </div>
    );
};

export default AboutPage;
