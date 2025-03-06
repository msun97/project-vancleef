import React from 'react'
import Line from '../../../components/mypage/Line'

const Wishlist = () => {
	return (		
	<div className='pt-[120px] absolute top-0 text-[14px]'>
		<div className="text-left">
			<h1 className="text-sm font-bold">위시리스트</h1>
		</div>
<Line/>
  <div className="flex justify-between items-center w-full p-4 border-b">
      <div className="flex items-start space-x-4">
        <img
          src="https://via.placeholder.com/80"
          alt="상품 이미지"
          className="w-[100px] h-[100px] object-cover"
        />
        <div>
          <div className="font-bold">빈티지 알함브라 이어링</div>
          <div className="text-sm text-gray-500">18K 옐로우 골드, 마더오브펄</div>
        </div>
      </div>

      <div className="text-right">
        <div className="font-bold">KRW 6,300,000</div>
        <button className="underline text-sm text-gray-500 ml-2">삭제</button>
      </div>
    </div>
</div>
	)
}

export default Wishlist