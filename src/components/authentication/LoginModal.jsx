import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/modules/modalSlice';
import Input from '../input';
import Button from '../button';

function LoginFull() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modalR.isOpen);


  return (
    <div
      className="w-full h-full fixed inset-0 z-[1001] flex items-center justify-center bg-white"
      style={{
        backgroundImage: 'url("public/images/loginpagaeimage.jpg")', // 원하는 이미지 경로로 변경
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-6 relative w-[580px] h-full ml-[600px]">
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          닫기
        </button>
        {/* 추가 기능이 필요하면 여기에 작성 */}
			<div className="container flex flex-col justify-center items-center mt-[127px] space-y-[20px]">
					<h1 className='pb-[86px]'>
	            <img
	              src="/icons/logo.svg"
	              alt="Van Cleef & Arpels"
	              className="w-[346px]"
	            />
	          </h1>

					<Input className='w-[360px] h-[55px] font-bold text-gray text-center' placeholder='아이디/이메일을 입력해 주세요.'/>
					<Input className='w-[360px] h-[55px] text-gray text-center font-bold  mb-[78px]' placeholder='비밀번호를 입력해 주세요.'/>
					<Button variant='primary' className='w-[355px] h-[55px] font-bold mb-[30px]' >로그인</Button>
					<Button variant='secondary' className='w-[355px] h-[55px] font-bold'>카카오 로그인</Button>
				<div className='flex flex-row gap-[50px] p-[33px]'>	<button>아이디 찾기</button>|<button>비밀번호 찾기</button></div>
					<Button variant='secondary'  className='w-[355px] h-[55px]'>회원가입</Button>
			</div>
      </div>
    </div>
  );
}

export default LoginFull