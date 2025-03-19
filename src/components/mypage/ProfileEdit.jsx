import React, { useState, useEffect } from 'react';
import Button from '../button';
import Input from '../input';
import CheckBox from '../checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/modules/authSlice';

function PasswordChange() {
    const [activeTab, setActiveTab] = useState('password');

    // 기본 정보 상태 (이메일은 두 파트로 관리)
    const [name, setName] = useState('');
    const [userId, setUserId] = useState('');
    const [emailLocal, setEmailLocal] = useState('');
    const [emailDomain, setEmailDomain] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDay, setBirthDay] = useState('');
    // 연락처 상태 (필요시 추가)
    const [phone1, setPhone1] = useState('');
    const [phone2, setPhone2] = useState('');
    const [phone3, setPhone3] = useState('');

    // 체크 상태 관리
    const [gender, setGender] = useState({
        male: false,
        female: false,
    });
    const [notification, setNotification] = useState({
        sms: false,
        kakao: false,
    });

    const dispatch = useDispatch();
    const { user, authed } = useSelector((state) => state.authR);

    // 로컬스토리지에서 계정정보 불러오기 (이메일, 생일 분리)
    useEffect(() => {
        if (user && user.id_email) {
            const storedUser = JSON.parse(localStorage.getItem('user_' + user.id_email) || '{}');
            if (storedUser) {
                setName(storedUser.username || '');
                setUserId(storedUser.id_email || '');
                if (storedUser.email) {
                    const [localPart, domainPart] = storedUser.email.split('@');
                    setEmailLocal(localPart || '');
                    setEmailDomain(domainPart || '');
                }
                if (storedUser.birth) {
                    const [year, month, day] = storedUser.birth.split('-');
                    setBirthYear(year || '');
                    setBirthMonth(month || '');
                    setBirthDay(day || '');
                }
                // 연락처가 저장되어 있다면
                if (storedUser.phone) {
                    // 예: "010-1234-5678" 형식이라면 분리
                    const parts = storedUser.phone.split('-');
                    setPhone1(parts[0] || '');
                    setPhone2(parts[1] || '');
                    setPhone3(parts[2] || '');
                }
                // 성별, 알림 등은 필요에 따라 초기화
            }
        }
    }, [user]);

    // 정보 업데이트 함수 (기본 정보 변경)
    const handleInfoUpdate = (e) => {
        e.preventDefault();

        // 필요한 검증: 예) 필수 항목이 비어있는지
        if (!name || !userId || !emailLocal || !emailDomain || !birthYear) {
            alert('필수 입력값을 모두 채워주세요.');
            return;
        }

        // 성별: male, female 중 선택된 값. 둘 다 false면 "none"
        const selectedGender = gender.male ? 'male' : gender.female ? 'female' : 'none';

        // 생년월일 문자열 구성 (YYYY-MM-DD)
        const birth = `${birthYear}-${birthMonth}-${birthDay}`;

        // 이메일 재조합
        const email = `${emailLocal}@${emailDomain}`;

        // 연락처 재조합 (입력받은 값이 있다면)
        const phone = phone1 && phone2 && phone3 ? `${phone1}-${phone2}-${phone3}` : '';

        // payload 구성
        const payload = {
            username: name,
            id_email: userId,
            email,
            birth,
            gender: selectedGender,
            notification, // { sms, kakao }
            phone,
        };

        // 업데이트 액션 dispatch (authActions.updateUserInfo는 예시 액션)
        dispatch(authActions.updateUserInfo(payload));

        // 로컬스토리지 업데이트 (필요한 경우)
        localStorage.setItem('user_' + userId, JSON.stringify(payload));

        alert('회원정보가 성공적으로 업데이트되었습니다.');
    };

    // 기본 정보 변경 페이지
    const InfoChange = () => (
        <form className='p-6' onSubmit={handleInfoUpdate}>
            {/* 이름 */}
            <div className='flex items-center mt-[50px] mb-[60px]'>
                <label className='w-[200px] text-left font-regular'>이름</label>
                <Input type='text' className='w-[300px]' value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            {/* 아이디 */}
            <div className='flex items-center mb-[60px]'>
                <label className='w-[200px] text-left font-regular'>아이디</label>
                <Input type='text' className='w-[300px]' value={userId} onChange={(e) => setUserId(e.target.value)} />
            </div>

            {/* 생년월일 */}
            <div className='flex flex-col justify-between items-center'>
                <div className='flex flex-row mb-[60px] w-full'>
                    <label className='w-[200px] mb-2 font-regular text-left'>생일</label>
                    <div className='flex items-center space-x-10 w-[300px]'>
                        <Input
                            type='text'
                            placeholder='년'
                            className='w-[60%] text-[gray]'
                            value={birthYear}
                            onChange={(e) => setBirthYear(e.target.value)}
                        />
                        <Input
                            type='text'
                            placeholder='월'
                            className='w-[20%] text-[gray]'
                            value={birthMonth}
                            onChange={(e) => setBirthMonth(e.target.value)}
                        />
                        <Input
                            type='text'
                            placeholder='일'
                            className='w-[20%] text-[gray]'
                            value={birthDay}
                            onChange={(e) => setBirthDay(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* 성별 (체크박스) */}
            <div className='flex flex-row items-center mb-[60px]'>
                <label className='w-[200px] block mb-2 font-regular'>성별</label>
                <div className='flex pb-[8px] items-center space-x-4'>
                    <label className='flex items-center'>
                        <CheckBox
                            id='male'
                            name='male'
                            checked={gender.male}
                            onChange={() => setGender({ ...gender, male: !gender.male })}
                            className='w-[18px] h-[18px] items-start'
                        />
                        <label htmlFor='male' className='ml-1'>
                            남
                        </label>
                    </label>
                    <label className='flex items-center'>
                        <CheckBox
                            id='female'
                            name='female'
                            checked={gender.female}
                            onChange={() => setGender({ ...gender, female: !gender.female })}
                            className='w-[18px] h-[18px] items-start'
                        />
                        <label htmlFor='female' className='ml-1'>
                            여
                        </label>
                    </label>
                </div>
            </div>

            {/* 이메일 */}
            <div className='flex flex-row items-center mb-[60px]'>
                <label className='w-[200px] text-left block mb-2 font-regular'>이메일</label>
                <div className='flex pb-[10px] items-center justify-between w-[300px]'>
                    <Input
                        type='text'
                        className='w-[45%] border-gray-300'
                        value={emailLocal}
                        onChange={(e) => setEmailLocal(e.target.value)}
                    />
                    <span>@</span>
                    <Input
                        type='text'
                        className='w-[45%] border-gray-300'
                        value={emailDomain}
                        onChange={(e) => setEmailDomain(e.target.value)}
                    />
                </div>
            </div>

            {/* SMS/카카오 수신 (체크박스) */}
            <div className='flex flex-row mb-[60px]'>
                <label className='w-[200px] text-left block mb-2 font-regular'>메일 수신</label>
                <div className='flex mb-[20px] items-center space-x-4'>
                    <label className='flex items-center'>
                        <CheckBox
                            id='sms'
                            name='sms'
                            checked={notification.sms}
                            onChange={() =>
                                setNotification({
                                    ...notification,
                                    sms: !notification.sms,
                                })
                            }
                            className='w-[18px] h-[18px] items-start'
                        />
                        <label htmlFor='sms' className='ml-2'>
                            받습니다.
                        </label>
                    </label>
                    <label className='flex items-center'>
                        <CheckBox
                            id='kakao'
                            name='kakao'
                            checked={notification.kakao}
                            onChange={() =>
                                setNotification({
                                    ...notification,
                                    kakao: !notification.kakao,
                                })
                            }
                            className='w-[18px] h-[18px] items-start'
                        />
                        <label htmlFor='kakao' className='ml-2'>
                            받지 않습니다.
                        </label>
                    </label>
                </div>
            </div>

            {/* 연락처 */}
            <div className='flex flex-row mb-[60px]'>
                <label className='w-[200px] text-left block mb-2 font-regular'>연락처</label>
                <Input
                    type='tel'
                    className='w-[10%] underline border-gray-300 rounded'
                    value={phone1}
                    onChange={(e) => setPhone1(e.target.value)}
                />
                -
                <Input
                    type='tel'
                    className='w-[10%] underline border-gray-300 rounded'
                    value={phone2}
                    onChange={(e) => setPhone2(e.target.value)}
                />
                -
                <Input
                    type='tel'
                    className='w-[10%] underline border-gray-300 rounded'
                    value={phone3}
                    onChange={(e) => setPhone3(e.target.value)}
                />
            </div>

            {/* 버튼 영역 */}
            <div className='flex-wrap space-y-[18px]'>
                <Button
                    type='submit'
                    variant='secondary'
                    className='w-full h-[55px] border border-black text-black font-bold'
                >
                    수정하기
                </Button>
                <Button
                    variant='secondary'
                    className='w-full h-[55px] border border-black text-black font-bold'
                    onClick={() => {
                        if (authed && user && window.confirm(`${user.username} 님, 탈퇴하시겠습니까?`)) {
                            localStorage.removeItem('user_' + user.id_email);
                            localStorage.removeItem('authed');
                            dispatch(authActions.logout());
                            alert('탈퇴가 완료되었습니다.');
                        }
                    }}
                >
                    탈퇴하기
                </Button>
            </div>
        </form>
    );

    // 비밀번호 변경 페이지 (현재 페이지)
    const PasswordChangeContent = () => (
        <div className='p-6'>
            <p className='mt-4 mb-6 text-sm leading-relaxed text-[15px] justify-center text-center'>
                비밀번호는 공백 없이 8~15자 이내의
                <br /> 영문과, 숫자, 특수문자의 조합으로 지정해주세요.
                <br />
                아이디, 동일한 연속 문자와 숫자 사용 불가.
            </p>
            <div className='mb-4'>
                <label className='block mb-2 font-regular'>기존 비밀번호 입력</label>
                <Input
                    type='password'
                    className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400'
                    placeholder='기존 비밀번호 입력'
                />
            </div>
            <div className='mb-4'>
                <label className='block mb-2 font-regular'>새 비밀번호 입력</label>
                <Input
                    type='password'
                    className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400'
                    placeholder='새 비밀번호 입력'
                />
            </div>
            <div className='mb-8'>
                <label className='block mb-2 font-regular'>새 비밀번호 확인</label>
                <Input
                    type='password'
                    className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400'
                    placeholder='새 비밀번호 확인'
                />
            </div>
            <div className='flex space-x-4 justify-center'>
                <Button
                    variant='secondary'
                    className='w-[113px] h-[55px] px-6 py-2 border border-black text-black font-bold'
                >
                    수정
                </Button>
                <Button
                    variant='secondary'
                    className='w-[113px] h-[55px] px-6 py-2 border border-black text-black font-bold'
                >
                    취소
                </Button>
            </div>
        </div>
    );

    return (
        <div className='max-w-[708px] mt-[30px] mx-auto mb-[60px]'>
            {/* 최상단 탭 버튼 영역 */}
            <div className='flex flex-row'>
                <button
                    onClick={() => setActiveTab('info')}
                    className={`w-1/2 h-[55px] py-3 text-center font-bold border border-black ${
                        activeTab === 'info' ? 'bg-black text-white border-b-2' : 'bg-white text-red font-regular'
                    }`}
                >
                    기본 정보 변경
                </button>
                <button
                    onClick={() => setActiveTab('password')}
                    className={`w-1/2 h-[55px] py-3 text-center font-bold border border-black ${
                        activeTab === 'password' ? 'bg-black text-white border-b-2' : 'bg-white text-red font-regular'
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
