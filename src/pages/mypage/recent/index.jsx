import React from 'react';
import Line from '../../../components/mypage/Line';
import RecentItem from '@/components/mypage/RecentItem';

const Recent = () => {
    return (
        <div className="pt-[120px] absolute top-0 text-[14px]">
            <div className="text-left">
                <h1 className="text-sm font-bold">최근 본 상품</h1>
            </div>
            <Line />
            {/* 	<MypageItemList/> */}
            <RecentItem />
        </div>
    );
};

export default Recent;
