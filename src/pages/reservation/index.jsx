import LocationResultList from '../../components/reservationc/LocationResultList';
import PrivateInfoForm from '../../components/reservationc/PrivateInfoForm';
import PurposeForm from '../../components/reservationc/PurposeForm';
import ReservationDetailForm from '../../components/reservationc/ReservationDetailForm';

const ReservationPage = () => {
    return (
        <div className='pt-[80px] p-330 w-full'>
            <h2 className='font-secondary font-bold text-[36px] text-center pb-[80px]'>예약 요청</h2>
            <LocationResultList />
            <PurposeForm />
            <ReservationDetailForm />
            <PrivateInfoForm />
        </div>
    );
};

export default ReservationPage;
