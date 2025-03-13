import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/modules/modalSlice';
import Input from '../input';
import Button from '../button';
import { useNavigate } from 'react-router-dom';
import { KAKAO_REDIRECT_URI } from '../../config';



function LoginFull() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modalR.isOpen);
  const navigate = useNavigate();
	const kakaoRestApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
	// 카카오 인증 URL 생성
	const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
	// 인증 페이지로 리다이렉트
  const handleKakaoLogin = () => {
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div
      className="w-full h-full fixed inset-0 z-[1001] flex items-center justify-center bg-white"
      style={{
        backgroundImage: 'url("/images/loginpagaeimage.jpg")', // 원하는 이미지 경로로 변경
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-6 relative w-[580px] h-full ml-[600px]">
        {/* <button
          onClick={() => Navigate(-1)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          닫기
        </button> */}
        {/* 추가 기능이 필요하면 여기에 작성 */}
			<div className="container flex flex-col justify-center items-center mt-[127px] space-y-[20px]">
					<h1 className='pb-[86px]'>
	            <img
	              src="/icons/logo.svg"
	              alt="Van Cleef & Arpels"
	              className="w-[346px]"
	            />
	          </h1>

					<Input className='w-[360px] h-[55px] font-bold text-[#9C9C9C] text-center' placeholder='아이디/이메일을 입력해 주세요.'/>
					<Input className='w-[360px] h-[55px] text-center text-[#9C9C9C] font-bold  mb-[78px]' placeholder='비밀번호를 입력해 주세요.'/>
					<Button variant='primary' className='w-[355px] h-[55px] !font-bold mb-[30px]'>로그인</Button>
					<Button variant='secondary' className='w-[355px] h-[55px] !font-bold' onClick={handleKakaoLogin}>카카오 로그인</Button>
				<div className='flex flex-row gap-[50px] p-[33px] !font-bold'>	<button>아이디 찾기</button>|<button>비밀번호 찾기</button></div>
					<Button variant='secondary'  className='w-[355px] h-[55px] !font-bold' onClick={() => navigate('/signup')}>회원가입</Button>
			</div>
      </div>
    </div>
  );
}

export default LoginFull