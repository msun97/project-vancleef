import React from 'react'
import Line from './Line'
import { useDispatch } from 'react-redux'
import { openModal } from '../../store/modules/modalSlice'
import CancelOrderModal from './CancelOrderModal'




const OrderList = () => {
	const dispatch = useDispatch();
	
	return (
	<div className="flex justify-between text-[12px] p-[20px]">
			<span>주문번호</span>
			<span>주문상품</span>
			<span>주문가격</span>
			<span className='underline'  onClick={() => dispatch(openModal())}>취소신청</span>
			<CancelOrderModal/>
			<span className='underline'>거래완료</span>
		</div>
	)
}

export default OrderList