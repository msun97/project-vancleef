import { useNavigate } from 'react-router-dom';

function ToShopBtn() {
    const navigate = useNavigate();

    const onGoShop = () => {
        navigate('/productlist');
    };
    return (
        <>
            <button
                onClick={onGoShop}
                className='fixed bottom-8 right-8 bg-black text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-800 transition-all z-50 p-8'
                aria-label='샵으로 이동'
            >
                <span className='font-bold font-secondary '>SHOP</span>
            </button>
        </>
    );
}

export default ToShopBtn;
