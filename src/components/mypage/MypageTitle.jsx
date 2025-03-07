import React from 'react';

const MypageTitle = ({ title }) => {
  return (
		<div className='mt-[130px] relative top-0 text-[14px]'>
      <p className="text-sm text-left font-bold">{title}</p>
    </div>
  );
};

export default MypageTitle;

{/* <MypageTitle title="주문내역" /> */}