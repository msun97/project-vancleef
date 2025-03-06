import React from 'react'

const MypageItemList = () => {
	return (
	  <div className="flex justify-between items-center w-full pt-[19px] pb-[19px]">
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

			<div className="text-right flex flex-col justify-between h-[100px]">
  <div className="font-bold">KRW 6,300,000</div>
  <button className="text-right underline text-sm text-gray-500 ml-2">삭제</button>
</div>
    </div>
	)
}

export default MypageItemList