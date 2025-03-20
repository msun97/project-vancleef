import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button';
import TimePicker from './TimePicker';
import { reservationActions } from '../../store/modules/reservationSlice';

const ReservationDetailForm = () => {
  const dispatch = useDispatch();
  const { details } = useSelector(state => state.reservationR.reservation);
  const currentStep = useSelector(state => state.reservationR.currentStep);

  const [dateValue, setDateValue] = useState(
    details.date || new Date().toISOString().split('T')[0],
  );
  const [timeValue, setTimeValue] = useState(details.time || '');
  const [language, setLanguage] = useState(details.preferredLanguage || '');
  const [message, setMessage] = useState(details.message || '');

  // Redux에서 데이터 로드
  useEffect(() => {
    setDateValue(details.date || new Date().toISOString().split('T')[0]);
    setTimeValue(details.time || '');
    setLanguage(details.preferredLanguage || '');
    setMessage(details.message || '');
  }, [details]);

  // 날짜 변경 핸들러 - Redux에만 저장
  const handleDateChange = e => {
    const newDate = e.target.value;
    setDateValue(newDate);
    dispatch(reservationActions.setReservationDetails({ date: newDate }));
  };

  // 시간 변경 핸들러 (TimePicker 컴포넌트에서 호출) - Redux에만 저장
  const handleTimeChange = time => {
    setTimeValue(time);
    dispatch(reservationActions.setReservationDetails({ time }));
    console.log('Time selected:', time); // Debug log
  };

  // 언어 변경 핸들러 - Redux에만 저장
  const handleLanguageChange = e => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    dispatch(
      reservationActions.setReservationDetails({
        preferredLanguage: selectedLanguage,
      }),
    );
  };

  // 메시지 변경 핸들러 - Redux에만 저장
  const handleMessageChange = e => {
    const newMessage = e.target.value;
    setMessage(newMessage);
    dispatch(reservationActions.setReservationDetails({ message: newMessage }));
  };

  // 확인 버튼 핸들러
  const handleConfirm = () => {
    // 유효성 검사
    if (!timeValue || timeValue.trim() === '') {
      alert('시간을 선택해 주세요.');
      return;
    }

    if (!language) {
      alert('선호 언어를 선택해 주세요.');
      return;
    }

    // 다음 단계로 이동 (로컬 스토리지 저장은 setCurrentStep에서 처리)
    dispatch(reservationActions.setCurrentStep(4));
  };

  // 이전 단계에서 완료되지 않았다면 접근 제한
  if (currentStep < 3) {
    return (
      <div className="border-t-2 w-full">
        <h3 className="font-secondary text-[20px] pt-[30px] pb-[40px]">
          3. 예약 상세정보
        </h3>
        <p className="text-center py-4">방문 목적을 먼저 선택해주세요.</p>
      </div>
    );
  }

  return (
    <div className="border-t-2 w-full">
      <h3 className="font-secondary text-[20px] pt-[30px] pb-[40px]">
        3. 예약 상세정보
      </h3>
      <div className="flex flex-col gap-[20px] font-bold text-[18px] w-full">
        <p>날짜 *</p>
        <div className="border flex items-center">
          <div className="relative border-r">
            <input
              type="date"
              value={dateValue}
              onChange={handleDateChange}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
            <div className="p-3 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
            </div>
          </div>

          {/* 날짜 표시 부분 */}
          <div className="flex-1 px-3 font-normal">{dateValue}</div>
        </div>
        <p>이용 가능 시간 *</p>
        <TimePicker selectedTime={timeValue} onTimeSelect={handleTimeChange} />
        <p>선호 언어 *</p>
        <div className="relative inline-block">
          <select
            className="border py-[14px] px-[17px] w-full font-normal"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value=""></option>
            <option value="한국어">한국어</option>
            <option value="영어">영어</option>
          </select>
          <div className="absolute top-0 right-0 h-full flex items-center pr-3 pointer-events-none">
            <svg
              width="24"
              height="24"
              viewBox="0 0 48 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 18.875L24 30.875L36 18.875"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <p>부티끄에 남기는 메시지</p>
        <textarea
          placeholder="추가로 전달하고자 하는 요청 사항"
          className="border text-content-s py-[11px] px-[17px] w-full h-[400px] placeholder-gray-30 font-normal"
          value={message}
          onChange={handleMessageChange}
        ></textarea>

        <Button
          variant="secondary"
          className="w-[133px] h-[55px] mx-auto mb-[70px]"
          onClick={handleConfirm}
        >
          확인
        </Button>
      </div>
    </div>
  );
};

export default ReservationDetailForm;
