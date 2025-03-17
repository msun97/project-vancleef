import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../input';
import Button from '../button';
import { Link, useNavigate } from 'react-router-dom';
import { KAKAO_REDIRECT_URI } from '../../config';
import { authActions } from '../../store/modules/authSlice';

function LoginFull() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const kakaoRestApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const { authed } = useSelector((state) => state.authR);

  // 로그인 핸들러
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(authActions.login({ id_email: email, password }));
  };

  // 로그인 성공 시 페이지 이동 및 메시지 표시
  useEffect(() => {
    if (authed) {
      setLoginMessage('로그인 성공');
      navigate('/mypage');
    } else if (email && password) {
      setLoginMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  }, [authed]);

  // 카카오 로그인 핸들러
  const handleKakaoLogin = () => {
    window.location.href = kakaoAuthUrl;
  };

  return (
    <div
      className="w-full h-full fixed inset-0 z-[1001] flex items-center justify-center bg-white"
      style={{
        backgroundImage: 'url("/images/loginpagaeimage.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-6 relative w-[580px] h-full ml-[600px]">
        <div className="container flex flex-col justify-center items-center mt-[127px] space-y-[20px]">
          <h1 className="pb-[86px]">
           <Link to='/'>
           	 <img
	              src="/icons/logo.svg"
	              alt="Van Cleef & Arpels"
	              className="w-[346px]"
	            />
           </Link>
          </h1>
          <form onSubmit={handleLogin} className='flex flex-col justify-center'>
            <Input
              className="w-[360px] h-[55px] font-bold text-[#9C9C9C] text-center"
              placeholder="아이디를 입력해 주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="w-[360px] h-[55px] text-center text-[#9C9C9C] font-bold mb-[78px]"
              placeholder="비밀번호를 입력해 주세요."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="primary"
              className="w-[355px] h-[55px] !font-bold mb-[30px]"
              type="submit"
            >
              로그인
            </Button>
          </form>
          <Button
            variant="secondary"
            className="w-[355px] h-[55px] !font-bold"
            onClick={handleKakaoLogin}
          >
            카카오 로그인
          </Button>
          <div className="flex flex-row gap-[50px] p-[33px] !font-bold">
            <button onClick={() => navigate('/mypage/profile')}>아이디 찾기</button>
            |
            <button onClick={() => navigate('/mypage/profile')}>비밀번호 찾기</button>
          </div>
          <Button
            variant="secondary"
            className="w-[355px] h-[55px] !font-bold"
            onClick={() => navigate('/signup')}	
          >
            회원가입
          </Button>
          {loginMessage && (
            <div className="mt-4 text-center">
              {loginMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginFull;
