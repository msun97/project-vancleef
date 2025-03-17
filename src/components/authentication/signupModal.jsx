import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../input';
import Button from '../button';
import CheckBox from '../checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/modules/authSlice';
import { openModal } from '../../store/modules/modalSlice';
import AgreementModal from '../mypage/agreementModal';

function SignupFull() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 회원가입 폼 상태 관리
  const [username, setUsername] = useState(''); // 이름
  const [userId, setUserId] = useState(''); // 아이디
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState('');
  // 전화번호 초기값을 "010-"으로 지정
  const [phone, setPhone] = useState('010-');
  // SMS 인증번호 상태
  const [smsCode, setSmsCode] = useState('');
  // 동의 여부 상태 (boolean)
  const [isAgreed, setIsAgreed] = useState(false);
  // 성별 상태 관리 (단일 선택): 'none', 'male', 'female' 중 하나
  const [gender, setGender] = useState('');
	
	const handleBirthChange = (e) => {
		let value = e.target.value;
		const digits = value.replace(/\D/g, '');
		let formatted = '';
		if (digits.length <= 4) {
			formatted = digits;
		} else if (digits.length <= 6) {
			formatted = digits.slice(0, 4) + '.' + digits.slice(4);
		} else {
			formatted = digits.slice(0, 4) + '.' + digits.slice(4, 6) + '.' + digits.slice(6, 8);
		}
		setBirth(formatted);
	};

  // 전화번호 자동 하이픈 추가 함수 (010- 접두사 유지)
  const handlePhoneChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("010-")) {
      value = "010-";
    }
    const digits = value.slice(4).replace(/\D/g, '');
    let formatted = "010-";
    if (digits.length === 0) {
      formatted = "010-";
    } else if (digits.length <= 4) {
      formatted += digits;
    } else {
      formatted += digits.slice(0, 4);
      if (digits.length > 4) {
        formatted += '-' + digits.slice(4, 8);
      }
    }
    setPhone(formatted);
  };

  // 인증하기 버튼 클릭 시 4자리 랜덤 SMS 인증번호 생성
  const generateSmsCode = () => {
    const digits = phone.replace(/-/g, '');
    if (digits.length !== 11) {
      alert('전화번호를 정확하게 입력해주세요.');
      return;
    }
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setSmsCode(randomCode);
  };

  // SMS 인증번호 확인 버튼 클릭 시
  const handleSmsConfirm = () => {
    alert('인증 확인되었습니다.');
  };

  // 회원가입 제출 핸들러
  const handleSignup = (e) => {
    e.preventDefault();
		if (!isAgreed) {
			alert('개인정보이용 및 처리 약관에 동의해 주세요.');
			return;
		}
    if (password !== passwordConfirm) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    if (!username || !userId || !password || !phone || phone === "010-") {
      alert('필수 입력 값을 모두 채워주세요.');
      return;
    }

    const payload = {
      username,
      id_email: userId,
      email,
      password,
      telFirst: phone.slice(0, 3),
      telSecond: phone.slice(4, 8),
      telThird: phone.slice(9, 13),
      gender, // 'none', 'male', 'female'
    };

    dispatch(authActions.signup(payload));
    navigate('/login');
  };

  return (
    <div
      className="w-full h-full fixed inset-0 z-[1001] flex items-center justify-center bg-white overflow-y-scroll"
      style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="bg-white p-6 relative w-[580px] h-full">
        <div className="container flex flex-col justify-center items-center pt-[60px] pb-[60px] space-y-[20px]">
          <h1 className="pb-[86px]">
            <Link to="/">
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
                placeholder="비밀번호를 입력해 주세요."
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
                placeholder="YYYYMMDD(예:'20250315')"
                value={birth}
								onChange={handleBirthChange}
              />
            </div>
            <div className="flex items-center h-[55px] mb-[16px]">
              <span className="w-[230px]">성별 *</span>
              <div className="flex flex-row items-center w-[600px]">
                <div className="flex ml-[10px] pb-[8px] items-center space-x-4">
                  <label className="flex items-center">
                    <CheckBox
                      id="gender-none"
                      checked={gender === 'none'}
                      onChange={(checked) => setGender('none')}
                      className="w-[18px] h-[18px] items-start"
                    />
                    <span className="ml-2">선택안함</span>
                  </label>
                  <label className="flex items-center">
                    <CheckBox
                      id="gender-male"
                      checked={gender === 'male'}
                      onChange={(checked) => setGender('male')}
                      className="w-[18px] h-[18px] items-start"
                    />
                    <span className="ml-2">남</span>
                  </label>
                  <label className="flex items-center">
                    <CheckBox
                      id="gender-female"
                      checked={gender === 'female'}
                      onChange={(checked) => setGender('female')}
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
                onChange={handlePhoneChange}
              />
              <button
                type="button"
                className="w-[50px] h-[55px] text-[14px] underline"
                onClick={generateSmsCode}
              >
                인증
              </button>
            </div>
            <div className="flex items-center h-[55px] mb-[16px]">
              <span className="w-[230px]">SMS인증번호 *</span>
              <Input
                className="w-[550px] h-[55px] text-[#9C9C9C] text-center font-bold pl-13"
                placeholder="SMS인증번호"
                value={smsCode}
                onChange={(e) => setSmsCode(e.target.value)}
              />
              <button
                type="button"
                className="w-[50px] h-[55px] text-[14px] underline"
                onClick={handleSmsConfirm}
              >
                확인
              </button>
            </div>
            <p className="w-[550px] text-[14px] flex-nowrap mt-[80px] mb-[20px]">
              만 14세 미만의 아동은 회원가입시 법적대리인의 동의가 있어야 합니다.
              가입을 희망하실 경우 1544-2767로 문의주시길 바랍니다.
            </p>
            <p className="w-[550px] text-[14px] flex-nowrap text-[#A6A6A6] mb-[48px]">
              *회원가입에 필요한 최소한의 정보만 입력 받음으로써 고객님의 개인정보 수집을 최소화하고 편리한 회원가입을 제공합니다.
            </p>
            <div className="flex items-center justify-end mb-[48px]">
              <CheckBox
                id="agreement"
                checked={isAgreed}
                onChange={setIsAgreed}
                className="w-5 h-5"
              />
              <span className="ml-2 text-[14px]">개인정보이용 및 처리 약관 동의</span>
              <button
                type="button"
                onClick={() => dispatch(openModal())}
                className="ml-2 underline text-[14px]"
              >
                약관보기
              </button>
            </div>
            <AgreementModal />
            <Button
              variant="primary"
              className="w-[580px] h-[50px] !font-bold mb-[20px]"
              type="submit"
            >
              가입완료
            </Button>
            <Button
						type="button" 
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
