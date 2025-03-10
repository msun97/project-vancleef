import React, { useState } from 'react';
import Button from '../button';
import Input from '../input';
import CheckBox from '../checkbox';

function PasswordChange() {
  // 'password' 또는 'info' 값을 가짐
  const [activeTab, setActiveTab] = useState('password');

  // 체크 상태 관리
  const [gender, setGender] = useState({
    male: false,
    female: false,
  });
  const [notification, setNotification] = useState({
    sms: false,
    kakao: false,
  });

  // 체크박스 onChange 핸들러
  const handleGenderChange = (e) => {
    const { name, checked } = e.target;
    setGender((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotification((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // 기본 정보 변경 페이지 (탭 버튼 영역 제거)
  const InfoChange = () => (
    <div className="p-6">
   {/* 이름 */}
<div className="flex items-center mt-[50px] mb-[60px]">
  <label className="w-20 text-left font-regular">이름</label>
  <Input type="text" className="w-[290px] ml-4" />
</div>

{/* 아이디 */}
<div className="flex items-center mb-[60px]">
  <label className="w-20 text-left font-regular">아이디</label>
  <Input type="text" className="w-[290px] ml-4" />
</div>
<div className='flex flex-row justify-between items-center'>
	      {/* 생년월일 */}
	      <div className="flex flex-row mb-[60px]">
	        <label className="mb-2 font-regular">생일/성별</label>
	        <div className="ml-[60px] items-start space-x-5">
					<select className="text-[gray]">
	  <option>년</option>
	  {Array.from({ length: 2011 - 1950 + 1 }, (_, i) => {
	    const year = i + 1950;
	    return (
	      <option key={year} value={year}>
	        {year}
	      </option>
	    );
	  })}
	</select>
	     
	          <select className="text-[gray]">
	            <option>월</option>
	         {Array.from({ length: 12 }, (_, i) => (
	    <option key={i + 1} value={i + 1}>
	      {i + 1}
	    </option>
	  ))}
	</select>
	          <select className="text-[gray]">
	  <option>일</option>
	  {Array.from({ length: 30 }, (_, i) => (
	    <option key={i + 1} value={i + 1}>
	      {i + 1}
	    </option>
	  ))}
	</select>
	        </div>
	      </div>
	
	      {/* 성별	 (체크박스) */}
	      <div className="flex flex-row items-center mb-[60px]">
	        <label className="block mb-2 font-regular">성별</label>
	        <div className="flex ml-[10px] pb-[8px] items-center space-x-4">
	          <label className="flex">
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
      {/* 이메일 */}
      <div className="flex flex-row items-center mb-[60px]">
        <label className="w-20 text-left block mb-2 font-regular">이메일</label>
        <div className="flex ml-[10px] pb-[10px] items-center space-x-2">
          <Input
            type="text"
            className="w-[40%] border-gray-300"
          />
          <span>@</span>
					<Input
            type="text"
            className="w-[40%] 	border-gray-300"
          />
          <select className="underline w-[20%]">
            <option value="">직접입력</option>
            <option value="naver.com">naver.com</option>
            <option value="gmail.com">gmail.com</option>
            {/* ... */}
          </select>
          <button className="w-[20%] flex-nowrap underline py-2">
            이메일중복확인
          </button>
        </div>
      </div>

{/* SMS/카카오 수신 (체크박스) */}
<div className="flex flex-row mb-[60px]">
        <label className="w-20 text-left block mb-2 font-regular">메일 정보</label>
        <div className="flex mb-[20px] items-center space-x-4">
          <label className="flex items-center">
            <CheckBox
              name="sms"
              checked={notification.sms}
              onChange={handleNotificationChange}
              className="w-[18px] h-[18px] items-start"
            />
            <span className="ml-2">받습니다.</span>
          </label>
          <label className="flex items-center">
            <CheckBox
              name="kakao"
              checked={notification.kakao}
              onChange={handleNotificationChange}
              className="w-[18px] h-[18px] items-start"
            />
            <span className="ml-2">받지 않습니다.</span>
          </label>
        </div>
      </div>

      {/* SMS/카카오 수신 (체크박스) */}
      <div className="flex flex-row mb-[60px]">
        <label className="block mb-2 font-regular">SMS/카카오 수신</label>
        <div className="flex mb-[20px] items-center space-x-4">
          <label className="flex items-center">
            <CheckBox
              name="sms"
              checked={notification.sms}
              onChange={handleNotificationChange}
              className="w-[18px] h-[18px] items-start"
            />
            <span className="ml-2">받습니다.</span>
          </label>
          <label className="flex items-center">
            <CheckBox
              name="kakao"
              checked={notification.kakao}
              onChange={handleNotificationChange}
              className="w-[18px] h-[18px] items-start"
            />
            <span className="ml-2">받지 않습니다.</span>
          </label>
        </div>
      </div>

      {/* 연락처 */}
      <div className="flex flex-row mb-[60px]">
        <label className="w-20 text-left block mb-2 font-regular">연락처</label>
        <Input
          type="tel"
          className="w-[10%] underline border-gray-300 rounded"
        />
				-
        <Input
          type="tel"
          className="w-[10%] underline border-gray-300 rounded"
        />
				-
        <Input
          type="tel"
          className="w-[10%] underline border-gray-300 rounded"
        />
      </div>

      {/* 버튼 영역 */}
      <div className="flex-wrap space-y-[18px]">
        <Button
          variant="secondary"
          className="w-full h-[55px] border border-black text-black font-bold"
        >
          수정하기
        </Button>
        <Button
          variant="secondary"
          className="w-full h-[55px] border border-black text-black font-bold"
        >
          탈퇴하기
        </Button>
      </div>
    </div>
  );

  // 비밀번호 변경 페이지 (현재 페이지)
  const PasswordChangeContent = () => (
    <div className="p-6">
      <p className="mt-4 mb-6 text-sm leading-relaxed text-[15px] justify-center text-center">
        비밀번호는 공백 없이 8~15자 이내의<br/> 영문과, 숫자, 특수문자의 조합으로 지정해주세요.
        <br />
        아이디, 동일한 연속 문자와 숫자 사용 불가.
      </p>
      <div className="mb-4">
        <label className="block mb-2 font-regular">기존 비밀번호 입력</label>
        <Input
          type="password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
          placeholder="기존 비밀번호 입력"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-regular">새 비밀번호 입력</label>
        <Input
          type="password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
          placeholder="새 비밀번호 입력"
        />
      </div>
      <div className="mb-8">
        <label className="block mb-2 font-regular">새 비밀번호 확인</label>
        <Input
          type="password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
          placeholder="새 비밀번호 확인"
        />
      </div>
      <div className="flex space-x-4 justify-center">
        <Button variant="secondary" className="w-[113px] h-[55px] px-6 py-2 border border-black text-black font-bold">
          수정
        </Button>
        <Button variant="secondary" className="w-[113px] h-[55px] px-6 py-2 border border-black text-black font-bold">
          취소
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-[708px] mt-[30px] mx-auto mb-[60px]">
      {/* 최상단 탭 버튼 영역 */}
      <div className="flex flex-row">
			<button
  onClick={() => setActiveTab('info')}
  className={`w-1/2 h-[55px] py-3 text-center font-bold border border-black ${
    activeTab === 'info'
      ? 'bg-black text-white border-b-2'
      : 'bg-white text-red font-regular'
  }`}
>
  기본 정보 변경
        </button>
        <button
			
         onClick={() => setActiveTab('password')}
				 className={`w-1/2 h-[55px] py-3 text-center font-bold border border-black ${
					 activeTab === 'password'
						 ? 'bg-black text-white border-b-2'
						 : 'bg-white text-red font-regular'
				 }`}
			 >
				 비밀번호 변경
        </button>
      </div>

      {/* 페이지 전환 내용 */}
      {activeTab === 'info' ? <InfoChange /> : <PasswordChangeContent />}
    </div>
  );
}

export default PasswordChange;
