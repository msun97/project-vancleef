import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/modules/modalSlice';
import Input from '../input';
import Button from '../button';
import CheckBox from '../checkbox';


function SignupFull() {
  const dispatch = useDispatch();
	const [gender, setGender] = useState({
		male: false,
		female: false,
	});
	const handleGenderChange = (e) => {
		const { name, checked } = e.target;
		setGender((prev) => ({
			...prev,
			[name]: checked,
		}));
	};
	
  return (
    <div
      className="w-full h-full fixed inset-0 z-[1001] flex items-center justify-center bg-white overflow-y-scroll"
      style={{
        // 배경 이미지 제거 – 단순 배경색만 사용
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-6 relative w-[580px] h-full">
    
        {/* 추가 기능이 필요하면 여기에 작성 */}
        <div className="container flex flex-col justify-center items-center mt-[60px] space-y-[20px]">
          <h1 className="pb-[86px]">
            <img
              src="/icons/logo.svg"
              alt="Van Cleef & Arpels"
              className="w-[346px]"
            />
          </h1>
					<div className="flex items-center mb-4">
						<span className="w-[230px]">이름 *</span>
	          <Input
	            className="w-[600px] h-[55px] font-bold text-gray text-center"
	            placeholder="이름을 입력해 주세요."
	          />
					</div>
					<div className="flex items-center mb-4">
					<span className="w-[230px]">아이디 *</span>
          <Input
            className="w-[600px] h-[55px] text-gray text-center font-bold"
            placeholder="아이디를 입력해 주세요."
          />
					</div>
					<div className="flex items-center mb-4">
					<span className="w-[230px]">비밀번호 *</span>
          <Input
            className="w-[600px] h-[55px] font-bold text-gray text-center"
            placeholder="비밀번호 입력해 주세요."
          />
					</div>
					<div className="flex items-center mb-4">
					<span className="w-[230px]">비밀번호 확인 *</span>
          <Input
            className="w-[600px] h-[55px] text-gray text-center font-bold"
            placeholder="비밀번호 확인"
          />
					</div>
					<div className="flex items-center mb-4">
					<span className="w-[230px]">이메일 *</span>
          <Input
            className="w-[600px] h-[55px] font-bold text-gray text-center"
            placeholder="이메일을 입력해 주세요."
          />
					</div>

					<div className="flex items-center mb-4">
					<span className="w-[230px]">생년월일 *</span>
          <Input
            className="w-[600px] h-[55px] text-gray text-center font-bold"
            placeholder="생년월일"
          />
					</div>

					<div className="flex items-center h-[55px] mb-[16px]">
					<span className="w-[230px]">성별 *</span>
  <div className="flex flex-row items-center w-[600px]">
	        <div className="flex ml-[10px] pb-[8px] items-center space-x-4">
	          <label className="flex items-center">
	            <CheckBox
	              name="none"
	              checked={gender.null}
	              onChange={handleGenderChange}
	              className="w-[18px] h-[18px] items-start"
	            />
	            <span className="ml-2">선택안함</span>
	          </label>
	          <label className="flex items-center">
	            <CheckBox
	              name="male"
	              checked={gender.male}
	              onChange={handleGenderChange}
	              className="w-[18px] h-[18px] items-start"
	            />
	            <span className="ml-2">남</span>
	          </label>
	          <label className="flex items-center">
	            <CheckBox
	              name="female"
	              checked={gender.female}
	              onChange={handleGenderChange}
	              className="w-[18px] h-[18px] items-start"
	            />
	            <span className="ml-2">여</span>
	          </label>
	        </div>
	      </div>
</div>
<div className="flex items-center h-[55px] mb-[16px]">
<span className="w-[230px]">휴대폰 번호 *</span>
<Input
            className="w-[550px] h-[55px] text-gray text-center font-bold"
            placeholder="휴대폰 번호"
          />
					<span className='w-[50px] text-[14px] underline'>인증하기</span>
			</div>
			<div className="flex items-center h-[55px] mb-[16px]">
			<span className="w-[230px]">SMS인증번호 *</span>
				<Input
            className="w-[550px] h-[55px] text-gray text-center font-bold"
            placeholder="SMS인증번호"
          /><span className='w-[50px]  text-[14px] underline'>확인</span>
					</div>

					<p className='w-[830px] text-[14px] flex-nowrap mt-[80px]'>만 14세 미만의 아동은 회원가입시 법적대리인의 동의가 있어야 합니다.
					가입을 희망하실 경우 1544-2767로 문의주시길 바랍니다.</p>

					<p className='w-[830px] text-[14px] flex-nowrap text-[#A6A6A6] mb-[48px]'>*회원가입에 필요한 최소한의 정보만 입력 받음으로써 고객님의 개인정보 수집을 최소화하고 편리한 회원가입을 제공합니다.</p>

				<Button variant='primary'  className='w-[1260px] h-[50px]'>가입완료</Button>
				<Button variant='secondary'  className='w-[1260px] h-[50px]'>돌아가기</Button>





</div>


				
      </div>
    </div>
  )
}

export default SignupFull;
