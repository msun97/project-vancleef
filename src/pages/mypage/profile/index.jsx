import React from 'react'
import Line from '../../../components/mypage/Line'
import ProfileEdit from '../../../components/mypage/ProfileEdit'

const Profile = () => {
	return (
		<div className='pt-[120px] absolute top-0 text-[14px]'>
			<div className="text-left">
				<h1 className="text-sm font-bold">회원정보변경</h1>
			</div>
	<Line/>
	<ProfileEdit/>
	</div>
	)
}

export default Profile