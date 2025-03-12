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
    const [selectedOption, setSelectedOption] = useState(purpose.selectedOption || '');

    // Load saved data from localStorage on component mount
    useEffect(() => {
        const savedPurpose = localStorage.getItem('reservationPurpose');
        if (savedPurpose) {
            const parsedPurpose = JSON.parse(savedPurpose);
            setProductConsultation(parsedPurpose.productConsultation);
            setRepairService(parsedPurpose.repairService);
            setSelectedOption(parsedPurpose.selectedOption || '');

            // Also update Redux store
            dispatch(reservationActions.setPurpose(parsedPurpose));
        }
    }, [dispatch]);

    // 체크박스 변경 핸들러 - 일시적으로 상태와 Redux에만 저장
    const handleProductConsultationChange = (checked) => {
        setProductConsultation(checked);
        // 제품 상담을 선택하면 수리 서비스 체크 해제
        if (checked) {
            setRepairService(false);
            setSelectedOption(''); // 옵션 초기화
        }
        dispatch(
            reservationActions.setPurpose({
                productConsultation: checked,
                repairService: checked ? false : repairService,
                selectedOption: '', // 옵션 초기화
            })
        );
    };

    const handleRepairServiceChange = (checked) => {
        setRepairService(checked);
        // 수리 서비스를 선택하면 제품 상담 체크 해제
        if (checked) {
            setProductConsultation(false);
            setSelectedOption(''); // 옵션 초기화
        }
        dispatch(
            reservationActions.setPurpose({
                repairService: checked,
                productConsultation: checked ? false : productConsultation,
                selectedOption: '', // 옵션 초기화
            })
        );
    };

    // 옵션 선택 핸들러
    const handleOptionChange = (e) => {
        const selected = e.target.value;
        setSelectedOption(selected);
        dispatch(reservationActions.setPurpose({ selectedOption: selected }));
    };

    // 확인 버튼 핸들러
    const handleConfirm = () => {
        // 유효성 검사: 목적과 해당 옵션이 모두 선택되어 있어야 함
        if ((productConsultation && selectedOption) || (repairService && selectedOption)) {
            // Save to localStorage
            const purposeData = {
                productConsultation,
                repairService,
                selectedOption,
            };
            localStorage.setItem('reservationPurpose', JSON.stringify(purposeData));

            dispatch(reservationActions.setCurrentStep(3));
        } else {
            alert('방문 목적과 상세 옵션을 모두 선택해 주세요.');
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

    // 선택된 체크박스에 따라 옵션 목록 결정
    const optionItems = [];
    if (productConsultation) {
        optionItems.push(<option key='empty' value=''></option>);
        optionItems.push(
            <option key='necklace' value='목걸이'>
                목걸이
            </option>
        );
        optionItems.push(
            <option key='ring' value='반지'>
                반지
            </option>
        );
        optionItems.push(
            <option key='earring' value='귀걸이'>
                귀걸이
            </option>
        );
        optionItems.push(
            <option key='bracelet' value='팔찌'>
                팔찌
            </option>
        );
    } else if (repairService) {
        optionItems.push(<option key='empty' value=''></option>);
        optionItems.push(
            <option key='pickup' value='수리 제품 수령'>
                수리 제품 수령
            </option>
        );
        optionItems.push(
            <option key='delivery' value='수리 제품 픽업'>
                수리 제품 픽업
            </option>
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

                {/* 선택된 체크박스가 있을 때만 select 보여주기 */}
                {(productConsultation || repairService) && (
                    <div className='relative inline-block'>
                        <select
                            className='border py-[14px] px-[17px] w-full'
                            value={selectedOption}
                            onChange={handleOptionChange}
                        >
                            {optionItems}
                        </select>
                        <div className='absolute top-0 right-0 h-full flex items-center pr-3 pointer-events-none'>
                            <svg
                                width='24'
                                height='24'
                                viewBox='0 0 48 49'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
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
                )}

                <Button variant='secondary' className='w-[133px] h-[55px] mx-auto mb-[70px]' onClick={handleConfirm}>
                    확인
                </Button>
            </div>
        </div>
    );
};

export default PurposeForm;
