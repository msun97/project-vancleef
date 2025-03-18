import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button';
import CheckBox from '../checkbox';
import { reservationActions } from '../../store/modules/reservationSlice';

const PrivateInfoForm = () => {
    const dispatch = useDispatch();
    const { personalInfo } = useSelector((state) => state.reservationR.reservation);
    const currentStep = useSelector((state) => state.reservationR.currentStep);
    const { user, authed } = useSelector((state) => state.auth); // 인증 상태와 사용자 정보 가져오기

    // 상태 초기화 - 로그인한 경우 사용자 정보 활용
    const [gender, setGender] = useState(personalInfo.gender || '');
    const [firstNameKor, setFirstNameKor] = useState(
        personalInfo.firstNameKor || (authed && user ? user.username : '')
    );
    const [lastNameKor, setLastNameKor] = useState(personalInfo.lastNameKor || '');
    const [firstNameEng, setFirstNameEng] = useState(personalInfo.firstNameEng || '');
    const [lastNameEng, setLastNameEng] = useState(personalInfo.lastNameEng || '');
    const [phone, setPhone] = useState(personalInfo.phone || (authed && user ? user.tel : ''));
    const [email, setEmail] = useState(personalInfo.email || (authed && user ? user.email : ''));
    const [country, setCountry] = useState(personalInfo.country || '');
    const [privacyAgreement, setPrivacyAgreement] = useState(personalInfo.privacyAgreement || false);
    const [privacyDisagree, setPrivacyDisagree] = useState(personalInfo.privacyAgreement === false);
    const [marketingAgreement, setMarketingAgreement] = useState(personalInfo.marketingAgreement || false);
    const [ageVerification, setAgeVerification] = useState(personalInfo.ageVerification || false);

    // Load saved data from localStorage on component mount
    useEffect(() => {
        const savedReservation = localStorage.getItem('reservation');
        if (savedReservation) {
            const parsedReservation = JSON.parse(savedReservation);
            if (parsedReservation.personalInfo) {
                const parsedInfo = parsedReservation.personalInfo;
                setGender(parsedInfo.gender || '');
                setFirstNameKor(parsedInfo.firstNameKor || (authed && user ? user.username : ''));
                setLastNameKor(parsedInfo.lastNameKor || '');
                setFirstNameEng(parsedInfo.firstNameEng || '');
                setLastNameEng(parsedInfo.lastNameEng || '');
                setPhone(parsedInfo.phone || (authed && user ? user.tel : ''));
                setEmail(parsedInfo.email || (authed && user ? user.email : ''));
                setCountry(parsedInfo.country || '');
                setPrivacyAgreement(parsedInfo.privacyAgreement || false);
                setPrivacyDisagree(parsedInfo.privacyAgreement === false);
                setMarketingAgreement(parsedInfo.marketingAgreement || false);
                setAgeVerification(parsedInfo.ageVerification || false);
            }
        }
    }, [dispatch, authed, user]);

    // 성별 체크박스 핸들러 - 일시적으로 상태와 Redux에만 저장
    const handleMaleChange = (checked) => {
        if (checked) {
            setGender('남성');
            dispatch(reservationActions.setPersonalInfo({ gender: '남성' }));
            // localStorage에는 확인 버튼 클릭시에만 저장
        }
    };

    const handleFemaleChange = (checked) => {
        if (checked) {
            setGender('여성');
            dispatch(reservationActions.setPersonalInfo({ gender: '여성' }));
            // localStorage에는 확인 버튼 클릭시에만 저장
        }
    };

    // 입력 필드 변경 핸들러 - 일시적으로 상태와 Redux에만 저장
    const handleChange = (e, setter, field) => {
        const value = e.target.value;
        setter(value);
        dispatch(reservationActions.setPersonalInfo({ [field]: value }));
        // localStorage에는 확인 버튼 클릭시에만 저장
    };

    // 개인정보 동의 체크박스 핸들러 - 일시적으로 상태와 Redux에만 저장
    const handlePrivacyAgreementChange = (checked) => {
        setPrivacyAgreement(checked);
        if (checked) {
            setPrivacyDisagree(false);
        }
        dispatch(reservationActions.setPersonalInfo({ privacyAgreement: checked }));
        // localStorage에는 확인 버튼 클릭시에만 저장
    };

    // 개인정보 비동의 체크박스 핸들러 - 일시적으로 상태와 Redux에만 저장
    const handlePrivacyDisagreeChange = (checked) => {
        setPrivacyDisagree(checked);
        if (checked) {
            setPrivacyAgreement(false);
            dispatch(reservationActions.setPersonalInfo({ privacyAgreement: false }));
            // localStorage에는 확인 버튼 클릭시에만 저장
        }
    };

    // 마케팅 동의 핸들러 - 일시적으로 상태와 Redux에만 저장
    const handleMarketingAgreementChange = (checked) => {
        setMarketingAgreement(checked);
        dispatch(reservationActions.setPersonalInfo({ marketingAgreement: checked }));
        // localStorage에는 확인 버튼 클릭시에만 저장
    };

    // 연령 확인 핸들러 - 일시적으로 상태와 Redux에만 저장
    const handleAgeVerificationChange = (checked) => {
        setAgeVerification(checked);
        dispatch(reservationActions.setPersonalInfo({ ageVerification: checked }));
        // localStorage에는 확인 버튼 클릭시에만 저장
    };

    // 확인 버튼 핸들러
    const handleConfirm = () => {
        // 유효성 검사
        if (!gender) {
            alert('호칭을 선택해주세요.');
            return;
        }

        if (!firstNameKor || !lastNameKor) {
            alert('국문 이름을 입력해주세요.');
            return;
        }

        if (!firstNameEng || !lastNameEng) {
            alert('영문 이름을 입력해주세요.');
            return;
        }

        if (!phone) {
            alert('휴대폰 번호를 입력해주세요.');
            return;
        }

        if (!email) {
            alert('이메일 주소를 입력해주세요.');
            return;
        }

        if (!country) {
            alert('거주 나라를 선택해주세요.');
            return;
        }

        if (!privacyAgreement) {
            alert('개인정보 수집 및 이용에 동의해주세요.');
            return;
        }

        if (!ageVerification) {
            alert('만 14세 이상 확인에 동의해주세요.');
            return;
        }

        // 개인 정보를 Redux 저장
        const personalInfoData = {
            gender,
            firstNameKor,
            lastNameKor,
            firstNameEng,
            lastNameEng,
            phone,
            email,
            country,
            privacyAgreement,
            marketingAgreement,
            ageVerification,
        };

        dispatch(reservationActions.setPersonalInfo(personalInfoData));

        // 현재 로그인한 사용자의 ID를 전달하여 예약 완료 처리
        const userId = authed && user ? user.userid : null;
        dispatch(reservationActions.completeReservation(userId));

        // 예약 완료 단계로 이동
        dispatch(reservationActions.setCurrentStep(5));
        alert('예약이 완료되었습니다.');
    };

    // 이전 단계에서 완료되지 않았다면 접근 제한
    if (currentStep < 4) {
        return (
            <div className='border-t-2 w-full'>
                <h3 className='font-secondary text-[20px] pt-[30px] pb-[40px]'>4. 개인 정보</h3>
                <p className='text-center py-4'>예약 상세 정보를 먼저 입력해주세요.</p>
            </div>
        );
    }

    return (
        <div className='border-t-2 w-full'>
            <h3 className='font-secondary text-[20px] pt-[30px] pb-[40px]'>4. 개인 정보</h3>
            <div className='flex flex-col gap-[20px] font-bold text-[18px] w-full'>
                <p>호칭 *</p>
                <div className='flex items-center gap-8'>
                    <div className='flex items-center gap-[7px]'>
                        <CheckBox
                            id='gender-male'
                            className='w-[25px] h-[25px]'
                            checked={gender === '남성'}
                            onChange={handleMaleChange}
                        />
                        <span>남성</span>
                    </div>
                    <div className='flex items-center gap-[7px]'>
                        <CheckBox
                            id='gender-female'
                            className='w-[25px] h-[25px]'
                            checked={gender === '여성'}
                            onChange={handleFemaleChange}
                        />
                        <span>여성</span>
                    </div>
                </div>
                <p>성(국문) *</p>
                <input
                    type='text'
                    name='firstnamekor'
                    className='border-b w-full'
                    value={firstNameKor}
                    onChange={(e) => handleChange(e, setFirstNameKor, 'firstNameKor')}
                />
                <p>이름(국문) *</p>
                <input
                    type='text'
                    name='namekor'
                    className='border-b w-full'
                    value={lastNameKor}
                    onChange={(e) => handleChange(e, setLastNameKor, 'lastNameKor')}
                />
                <p>성(영문) *</p>
                <input
                    type='text'
                    name='firstnameeng'
                    className='border-b w-full'
                    value={firstNameEng}
                    onChange={(e) => handleChange(e, setFirstNameEng, 'firstNameEng')}
                />
                <p>이름(영문) *</p>
                <input
                    type='text'
                    name='lastnameeng'
                    className='border-b w-full'
                    value={lastNameEng}
                    onChange={(e) => handleChange(e, setLastNameEng, 'lastNameEng')}
                />
                <p>휴대폰 번호 *</p>
                <input
                    type='text'
                    name='phone'
                    className='border-b w-full'
                    value={phone}
                    onChange={(e) => handleChange(e, setPhone, 'phone')}
                />
                <p>이메일 주소 *</p>
                <input
                    type='text'
                    name='email'
                    className='border-b w-full'
                    value={email}
                    onChange={(e) => handleChange(e, setEmail, 'email')}
                />
                <p>거주 나라 *</p>
                <div className='relative inline-block'>
                    <select
                        className='border py-[14px] px-[17px] w-full'
                        value={country}
                        onChange={(e) => handleChange(e, setCountry, 'country')}
                    >
                        <option value=''></option>
                        <option value='대한민국'>대한민국</option>
                        <option value='영국'>영국</option>
                    </select>
                    <div className='absolute top-0 right-0 h-full flex items-center pr-3 pointer-events-none'>
                        <svg width='24' height='24' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M12 18.875L24 30.875L36 18.875'
                                stroke='black'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </div>
                </div>
                <p>개인정보 수집 및 이용 동의 (필수) *</p>
                <div className='flex items-center gap-8'>
                    <div className='flex items-center gap-[7px]'>
                        <CheckBox
                            id='privacy-agree'
                            className='w-[25px] h-[25px]'
                            checked={privacyAgreement}
                            onChange={handlePrivacyAgreementChange}
                        />
                        <span>동의 *</span>
                    </div>
                    <div className='flex items-center gap-[7px]'>
                        <CheckBox
                            id='privacy-disagree'
                            className='w-[25px] h-[25px]'
                            checked={privacyDisagree}
                            onChange={handlePrivacyDisagreeChange}
                        />
                        <span>동의 안함</span>
                    </div>
                </div>
                <button className='text-center text-[15px] font-normal pb-[10px]'>(전문보기)</button>
                <p>뉴스레터 및 마케팅 정보 전송을 위한 개인정보 수집 및 이용동의 (선택)</p>
                <div className='flex items-center gap-[7px]'>
                    <CheckBox
                        id='marketing-agree'
                        className='w-[25px] h-[25px]'
                        checked={marketingAgreement}
                        onChange={handleMarketingAgreementChange}
                    />
                    <span>동의</span>
                </div>
                <button className='text-center text-[15px] font-normal pb-[10px]'>(전문보기)</button>
                <p>만 14세 미만의 아동의 경우 서비스의 이용이 제한됩니다.</p>
                <div className='flex items-center'>
                    <div className='flex items-center gap-[7px]'>
                        <CheckBox
                            id='age-verification'
                            className='w-[25px] h-[25px]'
                            checked={ageVerification}
                            onChange={handleAgeVerificationChange}
                        />
                        <span>만 14세 이상입니다. *(필수)</span>
                    </div>
                </div>
                <p className='font-normal'>
                    고객들에게 더 나은 서비스를 제공하기 위하여, Van Cleef & Arpels은 개인정보의 관리 및 처리를 해외
                    계열사 및 신뢰할 수 있는 서비스 제공업체에게 위탁 또는 위임할 수 있습 니다. 개인정보 처리 위탁에
                    관한 자세한 내용은 여기에서 확인할 수 있습니다.
                </p>
                <Button variant='secondary' className='w-[133px] h-[55px] mx-auto' onClick={handleConfirm}>
                    확인
                </Button>
            </div>
        </div>
    );
};

export default PrivateInfoForm;
