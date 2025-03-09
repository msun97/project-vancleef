import React from 'react'
import DropDown from '../../../components/dropdown'
import Input from '../../../components/input'
import Button from '../../../components/button'

const CCInquiryFormModal = ({handleOpenModal}) => {
  const nowDate = new Date();
  const formattedDate = nowDate.toISOString().split('T')[0];
  return (
    <div className='fixed w-full h-full bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-[1000] left-0 top-0'>
      <div className="modalWraaper bg-gray-0 p-[50px]">
        <div className='modalHeader flex flex-col gap-10 pb-10 border-b border-b-gray-30'>
          <div className='title relative'>
          <h1 className='text-[28px] font-extrabold text-center w-full'>주문내역</h1>
          <img src="/icons/close.svg" className='absolute top-0 right-0 cursor-pointer' onClick={handleOpenModal}/>
          </div>
          <div className="filter flex flex-col gap-5">
        <div className="mt-[5px] flex justify-between items-center gap-2">
        <div className="specificDay flex gap-7 items-center">
          <h4 className='w-40'>조회기간</h4>
          <ul className="flex gap-[10px]">
            <li className="w-[70px] h-[50px] border border-gray-20 flex justify-center items-center rounded ">
              <button>오늘</button>
            </li>
            <li className="w-[70px] h-[50px] border border-gray-20 flex justify-center items-center rounded">
              <button>7일</button>
            </li>
            <li className="w-[70px] h-[50px] border border-gray-20 flex justify-center items-center rounded">
              <button>15일</button>
            </li>
            <li className="w-[70px] h-[50px] border border-gray-20 flex justify-center items-center rounded">
              <button>1개월</button>
            </li>
            <li className="w-[70px] h-[50px] border border-gray-20 flex justify-center items-center rounded">
              <button>3개월</button>
            </li>
            <li className="w-[70px] h-[50px] border border-gray-20 flex justify-center items-center rounded">
              <button>1년</button>
            </li>
          </ul>
        </div>
        <div className="calendar flex gap-[10px] items-center">
          <input
            type="date"
            value={formattedDate}
            className="w-40 h-[50px] bg-gray-10 p-4 rounded-[5px]"
          />
          -
          <input
            type="date"
            value={formattedDate}
            className="w-40 h-[50px] bg-gray-10 p-4 rounded-[5px]"
          />
        </div>
      </div>
      <div className='flex gap-7 items-center'> 
        <h4 className='w-40'>검색어</h4>
        <form className='gap-3 flex w-full flex-1'>
        <DropDown item={['주문번호', '날짜', '상품명']} className='w-[150px] h-[50px] border border-gray-20 flex justify-between items-center rounded'/>
        <Input className='h-[50px] border !border-gray-20 flex justify-between items-center rounded w-full' />
        <Button className='w-80 rounded'>조회</Button>
        </form>
      </div>
      </div>
      </div>
      <div className='content '>
        <h3 className='py-4 text-[20px] font-bold'>주문목록 / 배송조회 내역 총 <span className='text-primary-70'>number</span> 건</h3>
        <table className="table border-t border-b border-b-gray-30 ">
            <thead>
              <tr className='text-[15 px]'>
                <th className='py-4 font-regular'>날짜/주문번호</th>
                <th className='py-4 font-regular'>상품명/옵션</th>
                <th className='py-4 font-regular'>상품금액/수량</th>
                <th className='py-4 font-regular'>주문상태</th>
                <th className='py-4 font-regular'>선택</th>
              </tr>
            </thead>
            <tbody>
                <tr></tr>
            </tbody>
        </table>
      </div>
      <div className='button mt-20 w-full flex justify-center gap-[10px]'>
        <Button variant='secondary' className='h-[55px] w-40' onClick={handleOpenModal}>취소</Button>
        <Button variant='primary' className='w-40'>확인</Button>
      </div>
    </div>
    </div>
  )
}

export default CCInquiryFormModal
