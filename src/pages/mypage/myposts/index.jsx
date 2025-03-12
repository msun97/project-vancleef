import React from 'react'
import Myposts from '../../../components/mypage/Myposts'
import Line from '../../../components/mypage/Line'
import MypostsTap from '../../../components/mypage/MypostsTap'

const MypostsPage = () => {
	return (
<>
		<div className='pt-[120px] absolute top-0 text-[14px]'>
				<div className="text-left">
					<h1 className="text-sm font-bold">나의 게시물</h1>
				</div>
		<Line />
		<div className='min-h-[280px] flex justify-center p-[55px]'>작성된 게시글이 없습니다.</div>
<MypostsTap/>
		<Myposts/>
		<Myposts/>
		<Myposts/>
		<Myposts/>
		<Myposts/>
		<Myposts/>
		<Myposts/>
</div>
</>
	)
}

export default MypostsPage