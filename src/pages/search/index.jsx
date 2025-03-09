import React from 'react'

const Search = () => {
  return (
    <div className='py-40'>
        <div className='wrap p-330'>
            <div className='relation flex flex-col gap-5'>
          <h3 className='font-bold text-[16px]'>연관 검색어</h3>
          <ul className='flex gap-[9px] mb-20'>
            <li className='w-20 h-10 flex items-center justify-center bg-primary-30 rounded-[10px]'>키워드</li>
            <li className='w-20 h-10 flex items-center justify-center bg-primary-30 rounded-[10px]'>키워드</li>
            <li className='w-20 h-10 flex items-center justify-center bg-primary-30 rounded-[10px]'>키워드</li>
          </ul>
            </div>
                <div className='popural flex flex-col gap-5'>
          <h3 className='font-bold font-secondary text-[16px]'>인기 검색어</h3>
          <ul className='flex gap-[9px] mb-22'>
            <li className='w-20 h-10 flex items-center justify-center bg-primary-40 rounded-[10px]'>키워드</li>
            <li className='w-20 h-10 flex items-center justify-center bg-primary-40 rounded-[10px]'>키워드</li>
            <li className='w-20 h-10 flex items-center justify-center bg-primary-40 rounded-[10px]'>키워드</li>
          </ul>
        </div>
        <div className='content'>
            <div className='filter'>
                <button className='sort'>정렬</button>
                <button className='filter'>필터</button>
            </div>
            <div className='results'>
                <ul>
                    <li>
                        <img src="/images/search.png"/>
                        <div>
                            <div className='tag'>La D.D</div>
                            <div className='title'>라 디디 골드 목걸이</div>
                            <div className='price'>798,000원</div>
                        </div>
                        <div className='like'>
                            <img src="/images/like.png"/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Search