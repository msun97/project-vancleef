import { useState } from 'react';

const Pagination = ({ className }) => {
    const [circleOn, setCircleOn] = useState(false);

    const handleClick = () => {
        setCircleOn(!circleOn);
    };

    return (
        <div className={`flex gap-[47px] text-[14px] justify-center font-medium ${className}`}>
            <button className='relative' onClick={handleClick}>
                1
                {circleOn ? (
                    <div className='p-5 border-4 rounded-full border-primary-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
                ) : (
                    ''
                )}
            </button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>10</button>
        </div>
    );
};

export default Pagination;
