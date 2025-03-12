import React, { useState } from 'react';

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

  return (
    <ul className="flex w-full">
      {postsTap.map(tab => (
        <li
          key={tab.id}
          onClick={() => handleClick(tab.name)}
          className={`w-1/2 border-b-4 h-[45px] flex justify-center items-center cursor-pointer font-bold mb-[30px] ${
            activeTab === tab.name ? 'text-black' : 'text-gray-20'
          }`}
        >
          {tab.menu}
        </li>
      ))}
    </ul>
  );
};

export default MypostsTap;
