import React from 'react'
import Line from '../../../components/mypage/Line'
import MypageItemList from '../../../components/mypage/Wishlist'

const Wishlist = () => {
	return (		
		<div className='pt-[120px] absolute top-0 text-[14px]'>
			<div className="text-left">
				<h1 className="text-sm font-bold">위시리스트</h1>
			</div>
			<Line/>
	<MypageItemList/>

	</div>
	)
}

export default Wishlist