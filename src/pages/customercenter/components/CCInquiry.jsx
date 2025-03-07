import React from 'react';
import DropDown from '../../../components/dropdown';
import Input from '../../../components/input';

const CCInquiry = () => {
  const inquiryList = [];
  return (
    <div className="w-full ">
      <div className="ccHeader flex justify-between itmes-center mb-4">
        <h3 className="font-secondary text-content-xl font-bold">공지사항</h3>
        <div className="util flex gap-[9px]">
          <DropDown
            item={['제목', '내용']}
            className=" w-[294px] h-[60px] border rounded-[2px]"
          />
          <form className="relative">
            <Input className="w-[378px] h-[60px] p-4 border rounded-[2px]" />
            <button>
              <img
                src="/icons/search.svg"
                className="w-[26px] absolute right-0 top-1/2 -translate-y-2/4 -translate-x-4"
              />
            </button>
          </form>
        </div>
      </div>
      <table className="notices-table w-full">
        <thead>
          <tr className="border-t">
            <th className="text-content-s text-center font-regular p-6">
              제목
            </th>
            <th className="text-content-s text-center font-regular p-6">
              날짜
            </th>
          </tr>
        </thead>
        <tbody className="w-full">
          {inquiryList ? (
            inquiryList.map(notice => (
              <tr key={notice.id} className="border-y border-gray-20">
                <td className="text-content-m py-10 flex gap-[10px] items-center">
                  <div className="tag bg-gray-90 text-gray-0 py-1 px-3 rounded-[8px]">
                    NOTICE
                  </div>
                  {notice.title}
                </td>
                <td className="text-content-m text-center py-10">
                  {notice.작성일}
                </td>
              </tr>
            ))
          ) : (
            <div className="none">게시글이 존재하지 않습니다.</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CCInquiry;
