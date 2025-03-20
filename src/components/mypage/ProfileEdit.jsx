import React, { useState, useEffect } from 'react';
import Button from '../button';
import Input from '../input';
import CheckBox from '../checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/modules/authSlice';
import { useNavigate } from 'react-router-dom';

function ProfileEdit() {
  const [activeTab, setActiveTab] = useState('info');
  const navigate = useNavigate();

  // 기본 정보 상태 관리
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [birth, setBirth] = useState('');
  const [emailLocal, setEmailLocal] = useState('');
  const [emailDomain, setEmailDomain] = useState('');
  const [phone, setPhone] = useState('010-');
  const [gender, setGender] = useState('');
  const [notification, setNotification] = useState({
    sms: false,
    kakao: false,
  });

  const dispatch = useDispatch();
  const { user, authed } = useSelector(state => state.authR);

  // 생년월일 입력 핸들러
  const handleBirthChange = e => {
    let value = e.target.value;
    const digits = value.replace(/\D/g, '');
    let formatted = '';
    if (digits.length <= 4) {
      formatted = digits;
    } else if (digits.length <= 6) {
      formatted = digits.slice(0, 4) + '.' + digits.slice(4);
    } else {
      formatted =
        digits.slice(0, 4) +
        '.' +
        digits.slice(4, 6) +
        '.' +
        digits.slice(6, 8);
    }
    setBirth(formatted);
  };

  // 전화번호 자동 하이픈 추가 함수
  const handlePhoneChange = e => {
    let value = e.target.value;
    if (!value.startsWith('010-')) {
      value = '010-';
    }
    const digits = value.slice(4).replace(/\D/g, '');
    let formatted = '010-';
    if (digits.length === 0) {
      formatted = '010-';
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

  // 로컬스토리지에서 계정정보 불러오기
  useEffect(() => {
    if (authed && user) {
      // 사용자 정보 초기화
      setUsername(user.username || '');
      setUserId(user.userid || '');

      // 이메일 분리
      if (user.email) {
        const [localPart, domainPart] = user.email.split('@');
        setEmailLocal(localPart || '');
        setEmailDomain(domainPart || '');
      }

      // 생년월일 포맷팅
      if (user.birth) {
        const [year, month, day] = user.birth.split('.');
        setBirth(`${year}.${month}.${day}`);
      }

      // 전화번호 포맷팅
      if (user.tel) {
        const formattedPhone = user.tel.replace(
          /(\d{3})(\d{4})(\d{4})/,
          '$1-$2-$3',
        );
        setPhone(formattedPhone);
      }

      // 성별 설정
      setGender(user.gender || 'none');

      // 알림 설정
      setNotification({
        sms: user.smsNotification || false,
        kakao: user.kakaoNotification || false,
      });
    }
  }, []);

  // 정보 업데이트 함수
  const handleInfoUpdate = e => {
    e.preventDefault();

    // 필수 입력값 검증
    if (!username || !userId || !emailLocal || !emailDomain || !birth) {
      alert('필수 입력값을 모두 채워주세요.');
      return;
    }

    // 생년월일 하이픈 제거
    // const formattedBirth = birth.replace(/\./g, '-');

    // 이메일 재조합
    const email = `${emailLocal}@${emailDomain}`;

    // 전화번호 하이픈 제거
    const formattedPhone = phone.replace(/-/g, '');

    // payload 구성
    const payload = {
      username,
      userid: userId,
      email,
      birth: formattedBirth,
      tel: formattedPhone,
      gender,
      smsNotification: notification.sms,
      kakaoNotification: notification.kakao,
    };

    // 업데이트 액션 dispatch
    dispatch(authActions.updateUserInfo(payload));

    alert('회원정보가 성공적으로 업데이트되었습니다.');
  };

  // 비밀번호 변경 컨텐츠
  const PasswordChangeContent = () => (
    <div className="p-6">
      <p className="mt-4 mb-6 text-sm leading-relaxed text-[15px] justify-center text-center">
        비밀번호는 공백 없이 8~15자 이내의
        <br /> 영문과, 숫자, 특수문자의 조합으로 지정해주세요.
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
        <Button
          variant="secondary"
          className="w-[113px] h-[55px] px-6 py-2 border border-black text-black font-bold"
        >
          수정
        </Button>
        <Button
          variant="secondary"
          className="w-[113px] h-[55px] px-6 py-2 border border-black text-black font-bold"
        >
          취소
        </Button>
      </div>
    </div>
  );

  // 기본 정보 변경 페이지
  const InfoChange = () => (
    <form className="p-6" onSubmit={handleInfoUpdate}>
      {/* 이름 */}
      <div className="flex items-center mt-[50px] mb-[60px]">
        <label className="w-[200px] text-left font-regular">이름</label>
        <Input
          type="text"
          className="w-[300px] text-center"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </div>

      {/* 아이디 */}
      <div className="flex items-center mb-[60px]">
        <label className="w-[200px] text-left font-regular">아이디</label>
        <Input
          type="text"
          className="w-[300px] text-center"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          readOnly
        />
      </div>

      {/* 생년월일 */}
      <div className="flex flex-col justify-between items-center mb-[60px]">
        <div className="flex flex-row w-full">
          <label className="w-[200px] mb-2 font-regular text-left">생일</label>
          <Input
            type="text"
            className="w-[300px] h-[55px] text-[#9C9C9C] text-center font-bold"
            placeholder="YYYYMMDD"
            value={birth}
            onChange={handleBirthChange}
          />
        </div>
      </div>

      {/* 성별 */}
      <div className="flex flex-row items-center mb-[60px]">
        <label className="w-[200px] block mb-2 font-regular">성별</label>
        <div className="flex pb-[8px] items-center space-x-4">
          <label className="flex items-center">
            <CheckBox
              id="gender-none"
              checked={gender === 'none'}
              onChange={() => setGender('none')}
              className="w-[18px] h-[18px] items-start"
            />
            <span className="ml-2">선택안함</span>
          </label>
          <label className="flex items-center">
            <CheckBox
              id="gender-male"
              checked={gender === 'male'}
              onChange={() => setGender('male')}
              className="w-[18px] h-[18px] items-start"
            />
            <span className="ml-2">남</span>
          </label>
          <label className="flex items-center">
            <CheckBox
              id="gender-female"
              checked={gender === 'female'}
              onChange={() => setGender('female')}
              className="w-[18px] h-[18px] items-start"
            />
            <span className="ml-2">여</span>
          </label>
        </div>
      </div>

      {/* 이메일 */}
      <div className="flex flex-row items-center mb-[60px]">
        <label className="w-[200px] text-left block mb-2 font-regular">
          이메일
        </label>
        <div className="flex pb-[10px] items-center justify-between w-[300px]">
          <Input
            type="text"
            className="w-[45%] border-gray-300 text-center"
            value={emailLocal}
            onChange={e => setEmailLocal(e.target.value)}
          />
          <span>@</span>
          <Input
            type="text"
            className="w-[45%] border-gray-300 text-center"
            value={emailDomain}
            onChange={e => setEmailDomain(e.target.value)}
          />
        </div>
      </div>

      {/* 연락처 */}
      <div className="flex flex-row mb-[60px]">
        <label className="w-[200px] text-left block mb-2 font-regular">
          연락처
        </label>
        <Input
          type="tel"
          className="w-[300px] h-[55px] text-[#9C9C9C] text-center font-bold"
          value={phone}
          onChange={handlePhoneChange}
        />
      </div>

      {/* SMS/카카오 수신 (체크박스) */}
      <div className="flex flex-row mb-[60px]">
        <label className="w-[200px] text-left block mb-2 font-regular">
          메일 수신
        </label>
        <div className="flex mb-[20px] items-center space-x-4">
          <label className="flex items-center">
            <CheckBox
              id="sms"
              name="sms"
              checked={notification.sms}
              onChange={() =>
                setNotification({
                  ...notification,
                  sms: !notification.sms,
                })
              }
              className="w-[18px] h-[18px] items-start"
            />
            <label htmlFor="sms" className="ml-2">
              받습니다.
            </label>
          </label>
          <label className="flex items-center">
            <CheckBox
              id="kakao"
              name="kakao"
              checked={notification.kakao}
              onChange={() =>
                setNotification({
                  ...notification,
                  kakao: !notification.kakao,
                })
              }
              className="w-[18px] h-[18px] items-start"
            />
            <label htmlFor="kakao" className="ml-2">
              받지 않습니다.
            </label>
          </label>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex-wrap space-y-[18px]">
        <Button
          type="submit"
          variant="secondary"
          className="w-full h-[55px] border border-black text-black font-bold"
        >
          수정하기
        </Button>
        <Button
          variant="secondary"
          className="w-full h-[55px] border border-black text-black font-bold"
          onClick={() => {
            if (
              authed &&
              user &&
              window.confirm(`${user.username} 님, 탈퇴하시겠습니까?`)
            ) {
              // 모든 사용자 가져오기
              const allUsers = JSON.parse(localStorage.getItem('users')) || [];

              // 현재 사용자 제외하기
              const updatedUsers = allUsers.filter(u => u.id !== user.id);

              // 업데이트된 사용자 목록 저장
              localStorage.setItem('users', JSON.stringify(updatedUsers));

              // 로그인 정보 삭제
              localStorage.removeItem('currentUser');
              localStorage.removeItem('authed');

              // 로그아웃 처리
              dispatch(authActions.logout());

              alert('탈퇴가 완료되었습니다.');
              navigate('/login');
            }
          }}
        >
          탈퇴하기
        </Button>
      </div>
    </form>
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

export default ProfileEdit;
