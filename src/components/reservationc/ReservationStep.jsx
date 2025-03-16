import { useSelector } from 'react-redux';

// 각 예약 단계를 처리하는 컴포넌트
const ReservationStep = ({ stepNumber, children }) => {
    const { currentStep } = useSelector((state) => state.reservationR);

    // 현재 단계가 아니면 렌더링하지 않음
    if (stepNumber !== currentStep) {
        return null;
    }

    return <div className='w-full transition-all duration-500 ease-in-out'>{children}</div>;
};

export default ReservationStep;
