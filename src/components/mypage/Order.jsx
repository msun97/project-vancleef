import React from 'react'
import Line from './Line'

const OrderList = () => {
	return (
		<><div className="flex justify-between text-[12px]">
			<span>주문번호</span>
			<span>주문상품</span>
			<span>주문가격</span>
			<span className='underline'>취소신청</span>
			<span className='underline'>거래완료</span>
		</div><Line marginTop='30px' /></>
	)
}

export default OrderList