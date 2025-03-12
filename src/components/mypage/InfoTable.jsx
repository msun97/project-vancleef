import React from 'react';

function InfoTable() {
  return (
    <div className="w-full mx-auto">
      {/* 상단 타이틀 */}
      <div className="">
        <h2 className="text-[24px] font-semibold text-lg">정보입력</h2>
      </div>

      {/* 테이블 */}
      <table className="w-full border-t border-black text-sm">
        <tbody>
          {/* 첫 번째 행 */}
					<tr className="border-b">
  <td className="w-1/2 align-top h-[55px]">
  <div className='flex items-center'>
  	  <span className="bg-[#D9D9D9] w-[98px] h-[55px] flex items-center justify-center font-medium text-[#706F6F]">
	      주문자명
	    </span>
	    <span className='ml-[26px]'>언네임</span>
  </div>
  </td>
  <td className="w-1/2 align-top">
<div className='flex items-center'>
	    <span className="bg-[#D9D9D9] w-[98px] h-[55px] flex items-center justify-center font-medium text-[#706F6F]">결제수단</span>
			<span className='ml-[26px]'>신용카드</span>
</div>
  </td>
</tr>

          {/* 두 번째 행 */}
          <tr>
            <td className="">
          <div className='flex items-center border-b'>
          	    <span className="bg-[#D9D9D9] w-[98px] h-[54px] flex items-center justify-center font-medium text-[#706F6F] ">연락처</span>
	              <span className='ml-[26px]'>000-0000-0000</span>
          </div>
            </td>
            <td className="border-b">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default InfoTable;