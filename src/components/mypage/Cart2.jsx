import React from 'react'
import Line from './Line'

const MypageCartSelect = () => {
	return (
	<>
			<Line marginTop=''/>
			<div className="flex items-center text-[12px] h-[40px] pl-[42px] pr-[20px]">
									<span>총 상품 금액</span>
									<span className="flex-1 text-center">배송정보</span>
									<span>총 결제 예정금액</span>
		</div>
		<Line color="#C6C6C6" marginTop=''/>
		<div className="flex items-center text-[12px] h-[40px] pt-[55px] pb-[55px] pl-[30px] pr-[10px]">
									<span>KRW 11,800,000</span>
									<span className="flex-1 text-center">무료배송</span>
									<span>KRW 11,800,000</span>
		</div>
	</>
	)
}

export default MypageCartSelect