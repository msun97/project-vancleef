<<<<<<< HEAD
import React from 'react'
import DropDown from '../../../components/dropdown'
import Input from '../../../components/input'
import Button from '../../../components/button'

const CCInquiryFormModal = () => {
  return (
    <div>
        <div className='modalHeader'>
        <h1>주문내역</h1>
        <div className="filter mt-[5px] border-t border-b border-b-gray-20 py-5 mb-10 flex justify-between items-center">
        <div className="specificDay flex gap-7 items-center">
          <h4>조회기간</h4>
          <ul className="flex gap-[10px]">
            <li className="w-[78px] h-10 border border-gray-20 flex justify-center items-center rounded">
              <button>오늘</button>
            </li>
            <li className="w-[78px] h-10 border border-gray-20 flex justify-center items-center rounded">
              <button>7일</button>
            </li>
            <li className="w-[78px] h-10 border border-gray-20 flex justify-center items-center rounded">
              <button>15일</button>
            </li>
            <li className="w-[78px] h-10 border border-gray-20 flex justify-center items-center rounded">
              <button>1개월</button>
            </li>
            <li className="w-[78px] h-10 border border-gray-20 flex justify-center items-center rounded">
              <button>3개월</button>
            </li>
            <li className="w-[78px] h-10 border border-gray-20 flex justify-center items-center rounded">
              <button>1년</button>
            </li>
          </ul>
        </div>
        <div className="calendar flex gap-[10px] items-center">
          <input
            type="date"
            value={formattedDate}
            className="w-[188px] h-10 bg-gray-10 p-4 rounded-[5px]"
          />
          -
          <input
            type="date"
            value={formattedDate}
            className="w-[188px] h-10 bg-gray-10 p-4 rounded-[5px]"
          />
        </div>
      </div>
      <div>
        <h4>검색어</h4>
        <DropDown item={['주문번호', '날짜', '상품명']} />
        <Input />
        <Button>조회</Button>
      </div>
      </div>
      <div className='content'>
        <h3>주문목록 / 배송조회 내역 총 number 건</h3>
        <table className="table">
            <thead>
              <tr>
                <th>날짜/주문번호</th>
                <th>상품명/옵션</th>
                <th>상품금액/수량</th>
                <th>주문상태</th>
                <th>선택</th>
              </tr>
            </thead>
            <tbody>
                <tr></tr>
            </tbody>
        </table>
      </div>
      <div className='button'>
        <Button variant='secondary'>취소</Button>
        <Button variant='primary'>확인</Button>
      </div>
    </div>
  )
}

export default CCInquiryFormModal
