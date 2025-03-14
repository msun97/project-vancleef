import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../input';
import Button from '../button';
import CheckBox from '../checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/modules/authSlice';

function SignupFull() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 회원가입 폼 상태 관리
  const [username, setUsername] = useState(''); // 이름
  const [userId, setUserId] = useState(''); // 아이디 (로그인 아이디로 활용)
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState(''); // 추가 정보로 받을 수 있음
  const [birth, setBirth] = useState(''); // 생년월일
  const [phone, setPhone] = useState(''); // 휴대폰 번호

  // 성별 상태 관리
  const [gender, setGender] = useState({
    none: false,
    male: false,
    female: false,
  });
  const handleGenderChange = (e) => {
    const { name, checked } = e.target;
    setGender((prev) => ({
      ...prev,
      // 단일 선택을 위해 모두 false로 초기화 후 선택한 값만 true로 변경
      none: false,
      male: false,
      female: false,
      [name]: checked,
    }));
  };

  // 회원가입 제출 핸들러
  const handleSignup = (e) => {
    e.preventDefault();
    // 비밀번호 일치 여부 확인
    if (password !== passwordConfirm) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    // 필수 입력 값 체크 (예: 이름, 아이디, 비밀번호, 휴대폰 번호)
    if (!username || !userId || !password || !phone) {
      alert('필수 입력 값을 모두 채워주세요.');
      return;
    }

    // 회원가입 payload 구성
    // authSlice의 signup 리듀서는 joinData에 추가하고, 로컬스토리지에 "user_" + id_email 키로 저장합니다.
    // 여기서 아이디 입력값을 로그인 아이디(id_email)로 활용합니다.
    // 휴대폰 번호는 slice에서 telFirst, telSecond, telThird를 이어 붙이도록 했으므로, 간단하게 앞 3자리, 그 다음 4자리, 나머지로 분리합니다.
    const payload = {
      username,
      id_email: userId,
      password,
      // 전화번호가 숫자나 '-' 없이 입력되었다고 가정
      telFirst: phone.slice(0, 3),
      telSecond: phone.slice(3, 7),
      telThird: phone.slice(7),
    };

    dispatch(authActions.signup(payload));
    navigate('/login');
  };

  return (
    <div
      className="w-full h-full fixed inset-0 z-[1001] flex items-center justify-center bg-white overflow-y-scroll"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white p-6 relative w-[580px] h-full">
        <div className="container flex flex-col justify-center items-center pt-[60px] pb-[60px] space-y-[20px]">
          <h1 className="pb-[86px]">
        <Link to='/'>
        	    <img
	              src="/icons/logo.svg"
	              alt="Van Cleef & Arpels"
	              className="w-[346px]"
								
	            />
        </Link>
          </h1>
          <form onSubmit={handleSignup} className="w-full">
            <div className="flex items-center mb-4">
              <span className="w-[230px]">이름 *</span>
              <Input
                className="w-[600px] h-[55px] font-bold text-[#9C9C9C] text-center"
                placeholder="이름을 입력해 주세요."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4">
              <span className="w-[230px]">아이디 *</span>
              <Input
                className="w-[600px] h-[55px] text-[#9C9C9C] text-center font-bold"
                placeholder="아이디를 입력해 주세요."
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4">
              <span className="w-[230px]">비밀번호 *</span>
              <Input
                className="w-[600px] h-[55px] font-bold text-[#9C9C9C] text-center"
                placeholder="비밀번호 입력해 주세요."
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4">
              <span className="w-[230px]">비밀번호 확인 *</span>
              <Input
                className="w-[600px] h-[55px] text-[#9C9C9C] text-center font-bold"
                placeholder="비밀번호 확인"
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4">
              <span className="w-[230px]">이메일 *</span>
              <Input
                className="w-[600px] h-[55px] font-bold text-[#9C9C9C] text-center"
                placeholder="이메일을 입력해 주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center mb-4">
              <span className="w-[230px]">생년월일 *</span>
              <Input
                className="w-[600px] h-[55px] text-[#9C9C9C] text-center font-bold"
                placeholder="생년월일"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
              />
            </div>
            <div className="flex items-center h-[55px] mb-[16px]">
              <span className="w-[230px]">성별 *</span>
              <div className="flex flex-row items-center w-[600px]">
                <div className="flex ml-[10px] pb-[8px] items-center space-x-4">
                  <label className="flex items-center">
                    <CheckBox
                      name="none"
                      checked={gender.none}
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
                className="w-[550px] h-[55px] text-[#9C9C9C] text-center font-bold pl-13"
                placeholder="휴대폰 번호"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <span className="w-[50px] text-[14px] underline">인증하기</span>
            </div>
            <div className="flex items-center h-[55px] mb-[16px]">
              <span className="w-[230px]">SMS인증번호 *</span>
              <Input
                className="w-[550px] h-[55px] text-[#9C9C9C] text-center font-bold pl-13"
                placeholder="SMS인증번호"
              />
              <span className="w-[50px] text-[14px] underline">확인</span>
            </div>

            <p className="w-[550px] text-[14px] flex-nowrap mt-[80px] mb-[20px]">
              만 14세 미만의 아동은 회원가입시 법적대리인의 동의가 있어야 합니다.
              가입을 희망하실 경우 1544-2767로 문의주시길 바랍니다.
            </p>
            <p className="w-[550px] text-[14px] flex-nowrap text-[#A6A6A6] mb-[48px]">
              *회원가입에 필요한 최소한의 정보만 입력 받음으로써 고객님의 개인정보 수집을 최소화하고 편리한 회원가입을 제공합니다.
            </p>
            <Button
              variant="primary"
              className="w-[580px] h-[50px] !font-bold"
              type="submit"
            >
              가입완료
            </Button>
          <Button
            variant="secondary"
            className="w-[580px] h-[50px] !font-bold"
            onClick={() => navigate(-1)}
          >
            돌아가기
          </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupFull;
