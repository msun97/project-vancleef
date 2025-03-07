import React from 'react';
import Button from '../../../components/button';
import { useNavigate } from 'react-router-dom';

const CCInquiry = ({ handleClick }) => {
  const inquiryList = [];
  const nowDate = new Date();
  const formattedDate = nowDate.toISOString().split('T')[0];

  const navigate = useNavigate();
  const onGo = tag => {
    navigate('/customers/inquiryform');
    handleClick(tag);
  };

  return (
    <div className="w-full ">
      <div className="ccHeader flex justify-between itmes-center mb-4">
        <h3 className="font-secondary text-content-xl font-bold">1:1 문의</h3>
        <Button
          className="w-[188px] h-[55px] text-content-s"
          onClick={() => onGo(null)}
        >
          1:1 문의하기
        </Button>
      </div>
      <div className="filter mt-[5px] border-t border-b border-b-gray-20 py-5 mb-10 flex justify-between items-center">
        <div className="specificDay flex gap-7 items-center">
          <h4>조회기간</h4>
          <ul className="flex gap-[10px]">
            <li className="w-[78px] h-10 border border-gray-20 flex justify-center items-center rounded">
              <button>오늘</button>
            </li>
            <li className="w-[78px] h-10 border border-gray-20 flex justify-center items-center rounded">
              <button>7일</button>
            </li>
            <li className="w-[78px] h-10 border border-gray-20 flex justify-center items-center rounded">
              <button>15일</button>
            </li>
            <li className="w-[78px] h-10 border border-gray-20 flex justify-center items-center rounded">
              <button>1개월</button>
            </li>
            <li className="w-[78px] h-10 border border-gray-20 flex justify-center items-center rounded">
              <button>3개월</button>
            </li>
            <li className="w-[78px] h-10 border border-gray-20 flex justify-center items-center rounded">
              <button>1년</button>
            </li>
          </ul>
        </div>
        <div className="calendar flex gap-[10px] items-center">
          <input
            type="date"
            value={formattedDate}
            className="w-[188px] h-10 bg-gray-10 p-4 rounded-[5px]"
          />
          -
          <input
            type="date"
            value={formattedDate}
            className="w-[188px] h-10 bg-gray-10 p-4 rounded-[5px]"
          />
        </div>
      </div>
      <table className="notices-table w-full">
        <thead>
          <tr className="border-t border-b border-b-gray-20">
            <th className="text-content-s text-center font-regular p-6">
              제목
            </th>
            <th className="text-content-s text-center font-regular p-6">
              날짜
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {inquiryList.length !== 0 ? (
            inquiryList.map(item => (
              <tr key={item.id} className="border-y border-gray-20">
                <td className="text-content-m py-10 flex gap-[10px] items-center">
                  <div className="tag bg-gray-90 text-gray-0 py-1 px-3 rounded-[8px]">
                    NOTICE
                  </div>
                  {item.title}
                </td>
                <td className="text-content-m text-center py-10">
                  {item.작성일}
                </td>
              </tr>
            ))
          ) : (
            <td colSpan="2" className="text-center py-10 text-content-s">
              게시글이 존재하지 않습니다.
            </td>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CCInquiry;
