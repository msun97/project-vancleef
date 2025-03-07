import React from 'react';

const CCNav = ({ isOn, handleClick }) => {
  const navList = [
    {
      id: 1,
      name: 'notice',
      menu: '공지사항',
    },
    {
      id: 2,
      name: 'faq',
      menu: '자주 묻는 질문',
    },
    {
      id: 3,
      name: 'inquiry',
      menu: '1:1 문의',
    },
  ];
  return (
    <ul className="flex w-full">
      {navList.map(nav => (
        <li
          key={nav.id}
          className={`w-1/3 border-b-4 h-[45px] flex justify-center items-start cursor-pointer text-content-m font-bold mb-[100px] ${
            isOn === nav.name ? 'text-black' : 'text-gray-20 '
          }`}
          onClick={() => handleClick(nav.name)}
        >
          {nav.menu}
        </li>
      ))}
    </ul>
  );
};

export default CCNav;
