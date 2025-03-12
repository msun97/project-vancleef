import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../button';
import CheckBox from '../checkbox';
import { reservationActions } from '../../store/modules/reservationSlice';

const PurposeForm = () => {
    const dispatch = useDispatch();
    const { purpose } = useSelector((state) => state.reservationR.reservation);
    const currentStep = useSelector((state) => state.reservationR);

    const [productConsultation, setProductConsultation] = useState(purpose.productConsultation);
    const [repairService, setRepairService] = useState(purpose.repairService);
    const [repairType, setRepairType] = useState(purpose.repairType || '');

    // Load saved data from localStorage on component mount
    useEffect(() => {
        const savedPurpose = localStorage.getItem('reservationPurpose');
        if (savedPurpose) {
            const parsedPurpose = JSON.parse(savedPurpose);
            setProductConsultation(parsedPurpose.productConsultation);
            setRepairService(parsedPurpose.repairService);
            setRepairType(parsedPurpose.repairType || '');

            // Also update Redux store
            dispatch(reservationActions.setPurpose(parsedPurpose));
        }
    }, [dispatch]);

    // 체크박스 변경 핸들러 - 일시적으로 상태와 Redux에만 저장
    const handleProductConsultationChange = (checked) => {
        setProductConsultation(checked);
        dispatch(reservationActions.setPurpose({ productConsultation: checked }));
        // localStorage에는 확인 버튼 클릭시에만 저장
    };

    const handleRepairServiceChange = (checked) => {
        setRepairService(checked);
        dispatch(reservationActions.setPurpose({ repairService: checked }));
        // localStorage에는 확인 버튼 클릭시에만 저장
    };

    // 수리 유형 선택 핸들러 - 일시적으로 상태와 Redux에만 저장
    const handleRepairTypeChange = (e) => {
        const selectedType = e.target.value;
        setRepairType(selectedType);
        dispatch(reservationActions.setPurpose({ repairType: selectedType }));
        // localStorage에는 확인 버튼 클릭시에만 저장
    };

    // 확인 버튼 핸들러
    const handleConfirm = () => {
        // 유효성 검사: 적어도 하나의 목적이 선택되어 있어야 함
        if (productConsultation || (repairService && repairType)) {
            // Save to localStorage
            const purposeData = {
                productConsultation,
                repairService,
                repairType,
            };
            localStorage.setItem('reservationPurpose', JSON.stringify(purposeData));

            dispatch(reservationActions.setCurrentStep(3));
        } else {
            alert('방문 목적을 선택해 주세요.');
        }
    };

    // 이전 단계에서 완료되지 않았다면 접근 제한
    if (currentStep < 2) {
        return (
            <div className='border-t-2 w-full'>
                <h3 className='font-secondary text-[20px] pt-[30px] pb-[40px]'>2. 방문 목적</h3>
                <p className='text-center py-4'>부티크를 먼저 선택해주세요.</p>
            </div>
        );
    }

    return (
        <div className='border-t-2 w-full'>
            <h3 className='font-secondary text-[20px] pt-[30px] pb-[40px]'>2. 방문 목적</h3>
            <div className='flex flex-col gap-[20px] font-bold text-[18px] w-full'>
                <p>어떤 도움이 필요하신가요? *</p>
                <div className='flex items-center gap-[50px] w-full mt-[5px] mb-[7px]'>
                    <div className='flex items-center gap-[12px]'>
                        <CheckBox
                            id='product-consultation'
                            className='w-[25px] h-[25px]'
                            checked={productConsultation}
                            onChange={handleProductConsultationChange}
                        />
                        <span>반클리프 아펠 제품 상담</span>
                    </div>
                    <div className='flex items-center gap-[12px]'>
                        <CheckBox
                            id='repair-service'
                            className='w-[25px] h-[25px]'
                            checked={repairService}
                            onChange={handleRepairServiceChange}
                        />
                        <span>수리 서비스</span>
                    </div>
                </div>

                {/* Always show repair type select regardless of checkbox state */}
                <div className='relative inline-block'>
                    <select
                        className='border py-[14px] px-[17px] w-full'
                        value={repairType}
                        onChange={handleRepairTypeChange}
                    >
                        <option value=''></option>
                        <option value='수리 제품 수령'>수리 제품 수령</option>
                        <option value='수리 제품 픽업'>수리 제품 픽업</option>
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

                <Button variant='secondary' className='w-[133px] h-[55px] mx-auto mb-[70px]' onClick={handleConfirm}>
                    확인
                </Button>
            </div>
        </div>
    );
};

export default PurposeForm;
