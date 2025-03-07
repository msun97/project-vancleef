import React from 'react'
import CheckBox from '../checkbox'
import { Link } from 'react-router-dom'
import Button from '../button'

const MypageCartlist = () => {
  return (
    <div className="flex flex-wrap items-start space-x-4 pt-[25px] pb-[25px] justify-between">
     <CheckBox className="w-[18px] h-[18px] items-start" />
      <div>
        <img
          src="https://via.placeholder.com/80"
          alt="상품 이미지"
          className="w-[100px] h-[100px] object-cover bg-gray-10"
        />
      </div>
      <div className="font-regular">스위트 알함브라 워치</div>
      <div className="font-regular">1</div>
      <div className="font-regular">KRW11,800,000</div>
      <div className="font-regular items-center ">무료배송</div>
     <div className='flex-col items-center space-y-[6px]'>		 
			<Button
  variant="secondary"
 className="w-[89px] h-[29px] border border-[#D9D9D9] flex items-center justify-center"
>
  바로주문
</Button>
<Button
  variant="secondary"
className="w-[89px] h-[29px] border border-[#D9D9D9] flex items-center justify-center"
>
  찜
</Button>
     </div>
    </div>
  )
}


export default MypageCartlist