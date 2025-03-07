import React, { useState } from 'react';
import DropDown from '../../../components/dropdown';
import Input from '../../../components/input';

const CCFaq = () => {
  const faqList = [
    {
      id: 1,
      title: '주문건에 대해 결제 금액 영수증을 출력하고 싶어요',
      content:
        "결제 금액 영수증은 마이페이지 > 주문 내역에서 출력할 수 있습니다. 주문 상세 페이지로 이동한 후 '영수증 출력' 버튼을 클릭하면 PDF로 다운로드 가능합니다. 또한, 이메일로도 영수증을 받을 수 있으며, 주문 시 입력한 이메일 주소로 자동 전송됩니다. 추가적인 세금계산서 발행이 필요한 경우 고객센터로 문의해 주세요.",
      작성일: '2025-03-24',
      tag: '주문/결제',
    },
    {
      id: 2,
      title: '배송지를 변경하고 싶어요',
      content:
        "배송지는 주문 완료 후 일정 시간 내에만 변경이 가능합니다. 마이페이지 > 주문 내역에서 '배송지 변경' 버튼이 활성화되어 있다면 직접 수정할 수 있습니다. 이미 출고된 상품의 경우 변경이 불가능하며, 이 경우 고객센터로 연락하시면 도와드릴 수 있습니다.",
      작성일: '2025-03-24',
      tag: '배송관련',
    },
    {
      id: 3,
      title: '상품을 반품하고 싶어요',
      content:
        '상품 반품은 수령 후 7일 이내에 신청해야 합니다. 마이페이지 > 주문 내역에서 반품 신청을 진행할 수 있으며, 반품 신청이 완료되면 택배 기사가 방문하여 회수합니다. 단, 상품의 포장이 훼손되었거나 사용 흔적이 있을 경우 반품이 불가능할 수 있습니다. 자세한 사항은 교환/반품 정책을 확인해 주세요.',
      작성일: '2025-03-24',
      tag: '교환/반품/환불',
    },
    {
      id: 4,
      title: '회원 등급은 어떻게 올라가나요?',
      content:
        '회원 등급은 최근 6개월간의 구매 금액을 기준으로 매월 1일 자동 조정됩니다. 등급별 혜택은 마이페이지 > 회원 등급 안내에서 확인할 수 있으며, 등급이 오르면 추가 할인 혜택과 포인트 적립률이 증가합니다. 자세한 등급 정책은 사이트 내 공지를 참고해 주세요.',
      작성일: '2025-03-24',
      tag: '회원/포인트',
    },
    {
      id: 5,
      title: '비밀번호를 변경하고 싶어요',
      content:
        '비밀번호 변경은 마이페이지 > 계정 설정에서 가능합니다. 보안 강화를 위해 정기적으로 비밀번호를 변경하는 것이 좋으며, 영문 대소문자, 숫자, 특수문자를 조합하여 8자 이상 설정해 주세요. 비밀번호를 잊은 경우 로그인 페이지에서 ‘비밀번호 찾기’를 이용하시면 이메일로 재설정 링크를 받을 수 있습니다.',
      작성일: '2025-03-24',
      tag: '사이트 이용',
    },
    {
      id: 6,
      title: '포인트는 어떻게 적립되나요?',
      content:
        '포인트는 상품 구매 시 자동 적립되며, 적립률은 회원 등급에 따라 다릅니다. 또한, 이벤트 참여나 리뷰 작성 시 추가 포인트를 받을 수 있습니다. 적립된 포인트는 마이페이지에서 확인할 수 있으며, 일정 금액 이상 모이면 결제 시 사용할 수 있습니다.',
      작성일: '2025-03-24',
      tag: '회원/포인트',
    },
    {
      id: 7,
      title: '해외 배송도 가능한가요?',
      content:
        '현재 일부 국가를 대상으로 해외 배송을 지원하고 있습니다. 해외 배송 가능 여부는 상품 상세 페이지에서 확인할 수 있으며, 해외 배송비는 배송 국가와 무게에 따라 달라집니다. 정확한 배송비는 주문 시 자동 계산되며, 통관 및 세관 문제는 각 국가의 정책을 참고해 주세요.',
      작성일: '2025-03-24',
      tag: '배송관련',
    },
    {
      id: 8,
      title: '교환 신청 후 절차가 어떻게 되나요?',
      content:
        '교환 신청은 마이페이지 > 주문 내역에서 신청할 수 있으며, 신청 후 1~2일 내에 택배 기사가 방문하여 회수합니다. 상품이 회수된 후 검수 과정을 거쳐 새 상품이 발송됩니다. 교환 진행 상황은 마이페이지에서 실시간으로 확인할 수 있습니다.',
      작성일: '2025-03-24',
      tag: '교환/반품/환불',
    },
    {
      id: 9,
      title: '주문 취소는 어떻게 하나요?',
      content:
        '주문 취소는 마이페이지 > 주문 내역에서 직접 가능합니다. 단, 이미 출고된 상품은 취소가 불가능하며, 이 경우 반품 절차를 진행해야 합니다. 결제 후 일정 시간이 지나면 자동으로 취소 버튼이 비활성화되므로, 취소를 원하시면 빠르게 진행해 주세요.',
      작성일: '2025-03-24',
      tag: '주문/결제',
    },
    {
      id: 10,
      title: '로그인이 안 돼요',
      content:
        '로그인이 되지 않는 경우, 먼저 아이디와 비밀번호가 올바르게 입력되었는지 확인해 주세요. 비밀번호를 잊으셨다면 ‘비밀번호 찾기’를 통해 재설정할 수 있습니다. 그래도 문제가 해결되지 않으면 고객센터로 문의해 주세요.',
      작성일: '2025-03-24',
      tag: '사이트 이용',
    },
    {
      id: 11,
      title: '고객센터 운영 시간은 어떻게 되나요?',
      content:
        '고객센터는 평일 오전 9시부터 오후 6시까지 운영되며, 점심시간(12시~1시)에는 상담이 제한될 수 있습니다. 주말 및 공휴일에는 운영하지 않으며, 문의 사항은 홈페이지의 1:1 문의를 이용해 주세요. 빠른 답변을 원하시면 챗봇 상담을 이용할 수도 있습니다.',
      작성일: '2025-03-24',
      tag: '기타',
    },
  ];

  const [isCategory, setIsCategory] = useState('전체');
  const tagList = faqList.map(item => item.tag);
  const tag = new Set(tagList);
  const tagArray = ['전체', ...tag];

  const changeCategory = tag => {
    setIsCategory(tag);
  };

  let nowList = [];

  if (isCategory === '전체') {
    nowList = faqList;
  } else {
    nowList = faqList.filter(item => item.tag === isCategory);
  }

  return (
    <div className="w-full ">
      <h3 className="font-secondary text-content-xl font-bold mb-10">
        자주 묻는 질문
      </h3>
      <div className="ccHeader flex justify-between itmes-center mb-4">
        <div className="util w-full flex justify-between itmes-center">
          <div className="ccNav flex itmes-center">
            <ul className="flex gap-[30px] items-center">
              {tagArray.map((item, index) => (
                <li
                  key={index}
                  className={`text-content-m ${
                    isCategory === item
                      ? 'text-gray-100 font-bold'
                      : 'text-gray-20'
                  }`}
                  onClick={() => changeCategory(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <form className="relative">
            <Input
              className="w-[378px] h-[60px] p-4 border rounded-[2px]"
              placeholder="검색어를 입력해주세요."
            />
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
        <tbody className="w-full">
          {nowList.map(notice => (
            <tr key={notice.id} className="border-y border-gray-50">
              <td className="text-content-m py-7 flex gap-[10px] items-center">
                <div className="tag text-gray-60 text-content-xxl">Q.</div>
                {notice.title}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CCFaq;
