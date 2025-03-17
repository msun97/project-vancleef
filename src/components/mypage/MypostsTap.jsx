import { useState } from 'react';
import AvailableReviews from './AvailableReviews';
import MyReviews from './MyReviews';

const MypostsTap = () => {
    const [activeTab, setActiveTab] = useState('available');

    const postsTap = [
        { id: 1, name: 'available', menu: '작성 가능한 리뷰' },
        { id: 2, name: 'written', menu: '내가 작성한 리뷰' },
        { id: 3, name: 'qna', menu: '내가 작성한 문의' },
    ];

    const handleClick = (name) => {
        setActiveTab(name);
    };

    //   return (
    //     <ul className="flex w-full">
    //       {postsTap.map(tab => (
    //         <li
    //           key={tab.id}
    //           onClick={() => handleClick(tab.name)}
    //           className={`w-1/2 border-b-2 h-[45px] flex justify-center items-center cursor-pointer font-bold mb-[30px] ${
    //             activeTab === tab.name ? 'text-black' : 'text-gray-20'
    //           }`}
    //         >
    //           {tab.menu}
    //         </li>
    //       ))}
    //     </ul>
    //   );
    // 선택된 탭에 따라 다른 컴포넌트 렌더링
    const renderTabContent = () => {
        switch (activeTab) {
            case 'available':
                return <AvailableReviews />;
            case 'written':
                return <MyReviews />;
            case 'inquiry':
                return <MyInquiry />;
            default:
                return <AvailableReviews />;
        }
    };

    return (
        <div className='w-full'>
            <ul className='flex w-full'>
                {postsTap.map((tab) => (
                    <li
                        key={tab.id}
                        onClick={() => handleClick(tab.name)}
                        className={`w-1/3 border-b-2 h-[45px] flex justify-center items-center cursor-pointer font-bold mb-[30px] ${
                            activeTab === tab.name ? 'text-black border-black' : 'text-gray-400 border-gray-200'
                        }`}
                    >
                        {tab.menu}
                    </li>
                ))}
            </ul>

            {/* 선택된 탭에 따라 다른 컨텐츠 렌더링 */}
            <div className='mt-4'>{renderTabContent()}</div>
        </div>
    );
};

export default MypostsTap;
