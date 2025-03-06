import React from 'react';
import OrderList from '../../../components/mypage/Order';
import Line from '../../../components/mypage/Line';

const Order = () => {
	return (
		<div className='pt-[120px] absolute top-0 text-[14px]'>
			<div className="text-left">
				<h1 className="text-sm font-bold">주문 내역</h1>
			</div>

<Line/>
			<div className="py-[30px]">
			<OrderList/>
			</div>
		</div>
	);
};

export default Order;