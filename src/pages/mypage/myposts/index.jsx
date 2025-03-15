import React from 'react';
import Line from '../../../components/mypage/Line';
import MypostsTap from '../../../components/mypage/MypostsTap';

const MypostsPage = () => {
    return (
        <>
            <div className='pt-[120px] absolute top-0 text-[14px]'>
                <div className='text-left'>
                    <h1 className='text-sm font-bold'>나의 게시물</h1>
                </div>
                <Line />

                {/* MypostsTap에서 모든 리뷰 관련 컴포넌트를 관리합니다 */}
                <MypostsTap />
            </div>
        </>
    );
};

export default MypostsPage;
