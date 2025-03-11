import Button from '../button';
import CheckBox from '../checkbox';

const PrivateInfoForm = () => {
    return (
        <div className='border-t-2 w-full'>
            <h3 className='font-secondary text-[20px] pt-[30px] pb-[40px]'>4. 개인 정보</h3>
            <div className='flex flex-col gap-[20px] px-[330px] font-bold text-[18px] w-full'>
                <p>호칭 *</p>
                <div className='flex items-center gap-8'>
                    <div className='flex items-center gap-[7px]'>
                        <CheckBox className='w-[25px] h-[25px]' />
                        <span>남성</span>
                    </div>
                    <div className='flex items-center gap-[7px]'>
                        <CheckBox className='w-[25px] h-[25px]' />
                        <span>여성</span>
                    </div>
                </div>
                <p>성(국문) *</p>
                <input type='text' name='firstnamekor' className='border-b w-full' />
                <p>이름(국문) *</p>
                <input type='text' name='namekor' className='border-b w-full' />
                <p>성(영문) *</p>
                <input type='text' name='namekor' className='border-b w-full' />
                <p>휴대폰 번호 *</p>
                <input type='text' name='namekor' className='border-b w-full' />
                <p>이메일 주소 *</p>
                <input type='text' name='namekor' className='border-b w-full' />
                <p>거주 나라 *</p>
                <div className='relative inline-block'>
                    <select name='' id='' className='border py-[14px] px-[17px] w-full'>
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
                        <CheckBox className='w-[25px] h-[25px]' />
                        <span>동의 *</span>
                    </div>
                    <div className='flex items-center gap-[7px]'>
                        <CheckBox className='w-[25px] h-[25px]' />
                        <span>동의 안함</span>
                    </div>
                </div>
                <button className='text-center text-[15px] font-normal pb-[10px]'>(전문보기)</button>
                <p>뉴스레터 및 마케팅 정보 전송을 위한 개인정보 수집 및 이용동의 (선택)</p>
                <button className='text-center text-[15px] font-normal pb-[10px]'>(전문보기)</button>
                <p>만 14세 미만의 아동의 경우 서비스의 이용이 제한됩니다.</p>
                <div className='flex items-center'>
                    <div className='flex items-center gap-[7px]'>
                        <CheckBox className='w-[25px] h-[25px]' />
                        <span>만 14세 이상입니다. *(필수)</span>
                    </div>
                </div>
                <p className='font-normal'>
                    고객들에게 더 나은 서비스를 제공하기 위하여, Van Cleef & Arpels은 개인정보의 관리 및 처리를 해외
                    계열사 및 신뢰할 수 있는 서비스 제공업체에게 위탁 또는 위임할 수 있습 니다. 개인정보 처리 위탁에
                    관한 자세한 내용은 여기에서 확인할 수 있습니다.
                </p>
                <Button variant='secondary' className='w-[133px] h-[55px] mx-auto'>
                    확인
                </Button>
            </div>
        </div>
    );
};

export default PrivateInfoForm;
