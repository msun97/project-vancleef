import { useNavigate } from 'react-router-dom';
import Button from '../button';
import Pagination from '../pagination';
import ProductInquiryItem from './ProductInquiryItem';

const ProductInquiryList = () => {
    const navigate = useNavigate();
    const toInquiry = () => {
        navigate('/productinquiry');
    };
    return (
        <div className='pt-[200px] px-[330px] flex flex-col gap-[22px]'>
            <div className='w-full flex items-center justify-between'>
                <h2 className='font-secondary text-[32px] font-bold'>상품문의</h2>
                <div className='relative'>
                    <Button
                        className='w-[290px] h-[55px] font-bold text-xl flex items-center !justify-between p-[30px]'
                        onClick={toInquiry}
                    >
                        <span className='whitespace-nowrap'>문의하기</span>
                        <svg width='24' height='24' viewBox='0 0 48 49' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path
                                d='M10 24.8784H38'
                                stroke='white'
                                strokeWidth='4'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                            <path
                                d='M24 10.8784L38 24.8784L24 38.8784'
                                stroke='white'
                                strokeWidth='4'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    </Button>
                </div>
            </div>
            <ul className='w-full border-t-2'>
                <ProductInquiryItem />
                <ProductInquiryItem />
                <ProductInquiryItem />
                <ProductInquiryItem />
                <ProductInquiryItem />
            </ul>
            <Pagination className='pt-[60px]' />
        </div>
    );
};

export default ProductInquiryList;
