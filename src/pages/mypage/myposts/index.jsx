import React from 'react'
import Myposts from '../../../components/mypage/Myposts'
import Line from '../../../components/mypage/Line'

const MypostsPage = () => {
	return (
<>
		<div className='pt-[120px] absolute top-0 text-[14px]'>
				<div className="text-left">
					<h1 className="text-sm font-bold">나의 게시물</h1>
				</div>
		<Line/>
		<Myposts/>
</div>
</>
	)
}

export default MypostsPage