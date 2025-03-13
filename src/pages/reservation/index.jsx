import LocationResultList from '../../components/reservationc/LocationResultList';
import PrivateInfoForm from '../../components/reservationc/PrivateInfoForm';
import PurposeForm from '../../components/reservationc/PurposeForm';
import ReservationComplete from '../../components/reservationc/ReservationComplete';
import ReservationDetailForm from '../../components/reservationc/ReservationDetailForm';

const ReservationPage = () => {
    return (
        <div className='pt-[80px] px-[545px] w-full'>
            <h2 className='font-secondary font-bold text-[36px] text-center pb-[80px]'>예약 요청</h2>
            <ReservationComplete />
            <LocationResultList />
            <PurposeForm />
            <ReservationDetailForm />
            <PrivateInfoForm />
        </div>
    );
};

export default ReservationPage;
