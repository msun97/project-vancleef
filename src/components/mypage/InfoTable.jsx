import React, { useEffect, useState } from 'react';

function formatPhone(tel) {
  if (!tel) return '000-0000-0000';
  // 이미 '-'가 포함되어 있다면 그대로 반환
  if (tel.includes('-')) return tel;
  // 숫자 길이가 10 혹은 11인 경우에만 포맷팅 (일반적인 한국 전화번호 형식)
  if (tel.length === 10) {
    return tel.slice(0, 3) + '-' + tel.slice(3, 6) + '-' + tel.slice(6);
  } else if (tel.length === 11) {
    return tel.slice(0, 3) + '-' + tel.slice(3, 7) + '-' + tel.slice(7);
  }
  return tel;
}

function InfoTable() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  if (!currentUser) {
    return (
      <div className="w-full mx-auto text-center py-4">
        사용자 정보를 불러오는 중입니다.
      </div>
    );
  }

  return (
    <div className="w-full mx-auto">
      {/* 상단 타이틀 */}
      <div>
        <h2 className="text-[24px] font-semibold text-lg">정보입력</h2>
      </div>

      {/* 테이블 */}
      <table className="w-full border-t border-black text-sm">
        <tbody>
          {/* 첫 번째 행 */}
          <tr className="border-b">
            <td className="w-1/2 align-top h-[55px]">
              <div className="flex items-center">
                <span className="bg-[#D9D9D9] w-[98px] h-[55px] flex items-center justify-center font-medium text-[#706F6F]">
                  주문자명
                </span>
                <span className="ml-[26px]">
                  {currentUser.username || '언네임'}
                </span>
              </div>
            </td>
            <td className="w-1/2 align-top">
              <div className="flex items-center">
                <span className="bg-[#D9D9D9] w-[98px] h-[55px] flex items-center justify-center font-medium text-[#706F6F]">
                  결제정보
                </span>
                <span className="ml-[26px]">
                  {currentUser.whatPurchase === 'card'
                    ? '신용카드'
                    : currentUser.whatPurchase === 'account'
                    ? '무통장입금'
                    : '미선택'}
                </span>
              </div>
            </td>
          </tr>

          {/* 두 번째 행 */}
          <tr>
            <td className="border-b">
              <div className="flex items-center h-[54px]">
                <span className="bg-[#D9D9D9] w-[98px] h-[54px] flex items-center justify-center font-medium text-[#706F6F]">
                  연락처
                </span>
                <span className="ml-[26px]">
                  {formatPhone(currentUser.tel)}
                </span>
              </div>
            </td>
            <td className="border-b">
              {/* 추가 정보가 필요하다면 여기에 작성 */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default InfoTable;
