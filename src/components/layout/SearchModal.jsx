import React from 'react'
import Input from '../input'

const SearchModal = ({onSearch}) => {
  return (
    <div className='fixed w-full h-full bg-[rgba(0,0,0,0.7)] flex justify-center z-[1000] left-0 top-0'>
      <div className='wrap bg-gray-0 p-[50px] w-full h-fit z-[1000]'>
      <div className='header relative mb-5'>
        <h2 className='text-[25px] font-secondary font-bold'>검색</h2>
        <button className='close absolute right-0 top-0' onClick={onSearch}>
          <img src="/icons/close.svg" alt="close" />
        </button>
      </div>
        <Input placeholder="검색어를 입력한 후 엔터를 누르세요." className='w-[calc(100%_-_180px)] h-[55px] mb-12'/>
        <div className='popural flex flex-col gap-5'>
          <h3 className='font-bold font-secondary text-[16px]'>인기 키워드</h3>
          <ul className='flex gap-[9px] mb-22'>
            <li className='w-20 h-10 flex items-center justify-center bg-primary-40 rounded-[10px]'>키워드</li>
            <li className='w-20 h-10 flex items-center justify-center bg-primary-40 rounded-[10px]'>키워드</li>
            <li className='w-20 h-10 flex items-center justify-center bg-primary-40 rounded-[10px]'>키워드</li>
          </ul>
        </div>
        <div className='concept flex flex-col gap-[18px]'>
          <h3 className='font-bold font-secondary text-[16px]'>티파니 컬렉션</h3>
          <ul className='flex gap-[18px]'>
            <li className='flex-1 flex flex-col items-center gap-4 '><img src="/images/search-article1.png" className='object-cover w-full'/><p className='text-4'>아티클</p></li>
            <li className='flex-1 flex flex-col items-center gap-4 '><img src="/images/search-article2.png" className='object-cover w-full'/><p className='text-4'>아티클</p></li>
            <li className='flex-1 flex flex-col items-center gap-4 '><img src="/images/search-article3.png" className='object-cover w-full'/><p className='text-4'>아티클</p></li>
            <li className='flex-1 flex flex-col items-center gap-4 '><img src="/images/search-article4.png" className='object-cover w-full'/><p className='text-4'>아티클</p></li>
            </ul>
        </div>
        </div>
    </div>
  )
}

export default SearchModal