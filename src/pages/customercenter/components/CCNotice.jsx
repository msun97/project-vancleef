import React, { useEffect, useState } from 'react';
import DropDown from '../../../components/dropdown';
import Input from '../../../components/input';
import Pagination from '../../../components/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions } from '../../../store/modules/paginationSlice';

const CCNotice = () => {
  const dispatch = useDispatch();
  const noticeList = [
    {
      id: 1,
      title: '힐러비(주) 합병에 따른 개인정보 이전 안내',
      content: `안녕하세요, 고객 여러분.\n힐러비(주)와의 합병으로 인해 개인정보 이전이 진행됩니다.\n이전 대상은 회원 정보, 주문 내역 등이며, 합병 후에도 안전하게 관리됩니다.\n이와 관련된 자세한 사항은 홈페이지 공지를 확인해 주세요.\n\n개인정보 이전 일자: 2025년 4월 1일\n이전 후 운영 회사: 힐러비(주)\n\n개인정보 이전을 원치 않으실 경우 2025년 3월 31일까지 고객센터로 문의해 주세요.\n항상 최선을 다하는 서비스가 되겠습니다.\n감사합니다.`,
      작성일: '2025-03-24',
    },
    {
      id: 2,
      title: '시스템 점검 안내 (3월 30일)',
      content: `안녕하세요, 고객 여러분.\n보다 안정적인 서비스를 제공하기 위해 시스템 점검을 진행합니다.\n\n점검 일시: 2025년 3월 30일 00:00 - 06:00\n점검 내용: 서버 안정화 및 데이터베이스 최적화\n영향 범위: 점검 시간 동안 서비스 이용이 제한될 수 있습니다.\n\n고객 여러분의 양해 부탁드립니다. 감사합니다.`,
      작성일: '2025-03-24',
    },
    {
      id: 3,
      title: '회원 등급 및 혜택 개편 안내',
      content: `안녕하세요, 고객 여러분.\n2025년 4월 1일부터 회원 등급 및 혜택이 새롭게 개편됩니다.\n\n변경 사항:\n- 기존 3단계 등급 → 5단계 등급으로 확대\n- 등급별 할인 혜택 강화\n- VIP 회원 전용 이벤트 추가\n\n자세한 사항은 홈페이지 공지를 참고해 주세요.\n앞으로도 더 나은 서비스를 제공하기 위해 노력하겠습니다.`,
      작성일: '2025-03-24',
    },
    {
      id: 4,
      title: '4월 신규 프로모션 안내',
      content: `안녕하세요, 고객 여러분!\n4월 한 달간 진행되는 특별 프로모션을 안내드립니다.\n\n✅ 할인 행사:\n- 전 제품 10% 할인 (일부 품목 제외)\n- 신규 회원 가입 시 5,000원 쿠폰 지급\n\n✅ 이벤트 기간:\n2025년 4월 1일 ~ 4월 30일\n\n많은 관심과 참여 부탁드립니다!`,
      작성일: '2025-03-24',
    },
    {
      id: 5,
      title: '고객센터 운영 시간 변경 안내',
      content: `안녕하세요, 고객 여러분.\n2025년 4월 1일부터 고객센터 운영 시간이 변경됩니다.\n\n✅ 변경 전: 평일 09:00 - 18:00\n✅ 변경 후: 평일 10:00 - 19:00\n\n더 나은 서비스 제공을 위해 노력하겠습니다.\n감사합니다.`,
      작성일: '2025-03-24',
    },
    {
      id: 6,
      title: '배송비 정책 변경 안내',
      content: `안녕하세요, 고객 여러분.\n2025년 4월 5일부터 배송비 정책이 일부 변경됩니다.\n\n✅ 변경 사항:\n- 기존 무료 배송 기준: 50,000원 이상 → 70,000원 이상\n- 기본 배송비: 3,000원 (변동 없음)\n\n더 나은 서비스를 위해 항상 노력하겠습니다.\n감사합니다.`,
      작성일: '2025-03-24',
    },
    {
      id: 7,
      title: '앱 리뉴얼 업데이트 안내',
      content: `안녕하세요, 고객 여러분.\n보다 편리한 쇼핑 경험을 위해 앱이 새롭게 업데이트됩니다.\n\n✅ 업데이트 일자: 2025년 4월 10일\n✅ 주요 개선 사항:\n- UI/UX 개선\n- 검색 기능 강화\n- 개인화 추천 시스템 도입\n\n업데이트 후에도 많은 이용 부탁드립니다!`,
      작성일: '2025-03-24',
    },
    {
      id: 8,
      title: '리뷰 작성 이벤트 안내',
      content: `안녕하세요, 고객 여러분!\n정성스러운 리뷰를 남겨주신 고객님께 혜택을 드립니다.\n\n✅ 이벤트 기간: 2025년 4월 1일 ~ 4월 30일\n✅ 참여 방법:\n- 구매한 상품의 리뷰 작성 (텍스트+사진 필수)\n✅ 혜택:\n- 베스트 리뷰어 선정 시 10,000원 할인 쿠폰 지급\n\n많은 참여 부탁드립니다!`,
      작성일: '2025-03-24',
    },
    {
      id: 9,
      title: '4월 공휴일 배송 일정 안내',
      content: `안녕하세요, 고객 여러분.\n4월 공휴일로 인해 배송 일정이 조정됩니다.\n\n✅ 변경 사항:\n- 4월 10일(선거일) / 4월 15일(공휴일)에는 배송이 제한됩니다.\n- 4월 9일까지 결제 완료된 주문은 정상 출고됩니다.\n\n이용에 참고 부탁드립니다. 감사합니다.`,
      작성일: '2025-03-24',
    },
    {
      id: 10,
      title: '일부 상품 단종 안내',
      content: `안녕하세요, 고객 여러분.\n다음 상품들이 단종 예정이니 참고 부탁드립니다.\n\n✅ 단종 상품:\n- A 제품 (4월 5일 단종)\n- B 제품 (4월 10일 단종)\n\n해당 상품 구매를 원하시는 분들은 단종 전까지 주문 부탁드립니다.\n감사합니다.`,
      작성일: '2025-03-24',
    },
    {
      id: 11,
      title: '신규 결제 수단 추가 안내',
      content: `안녕하세요, 고객 여러분.\n더욱 편리한 결제를 위해 신규 결제 수단이 추가되었습니다.\n\n✅ 추가된 결제 방법:\n- 애플 페이 (4월 1일부터 사용 가능)\n- 카카오페이 송금 결제\n\n더 나은 서비스를 위해 최선을 다하겠습니다.\n감사합니다.`,
      작성일: '2025-03-24',
    },
  ];
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('제목')
  const [nowData, setNowData] = useState(noticeList)
  const [isSearch, setIsSearch] = useState(false);
  const searchClose = () => {
    setIsSearch(false)
    setSearch('')
    setNowData(noticeList)
  }
  const handleClick = (filter) => {
    setFilter(filter)
  }
  const changeInput = e => {
    setSearch(e.target.value)
  }
  const onSumbit = (e) => {
    e.preventDefault()
    if (!search) {
      alert('검색어를 입력하세요.')
    } else if (filter === '제목') {
      setNowData(noticeList.filter(item => item.title.includes(search)));
      setIsSearch(true);
    } else if (filter === '내용') {
      setNowData(noticeList.filter(item => item.content.includes(search)));
      setIsSearch(true);
    }
  }
  useEffect(() => {
    dispatch(
      paginationActions.addData({pageId : 'notice', data : nowData})
    )
  }, [nowData])
  const { notice = {}} = useSelector((state) => state.paginationR)
  const { currPage, postsPerPage} = notice;
  const lastPost = currPage * postsPerPage;
  const firstPost = lastPost - postsPerPage;
  const currentPost = nowData.slice(firstPost, lastPost);

  return (
    <div className="w-full ">
      <div className="ccHeader flex justify-between itmes-center mb-4">
        <h3 className="font-secondary text-content-xl font-bold">공지사항</h3>
        <div className="util flex gap-[9px]">
          <DropDown
            item={['제목', '내용']}
            className=" w-[294px] h-[60px] border rounded-[2px]"
            handleClick={handleClick}
          />
          <form className="relative" onSubmit={onSumbit}>
            <Input className="w-[378px] h-[60px] p-4 border rounded-[2px]" value={search} onChange={changeInput}/>
            <button type='submit'>
              <img
                src="/icons/search.svg"
                className="w-[26px] absolute right-0 top-1/2 -translate-y-2/4 -translate-x-4"
              />
            </button>
          </form>
        </div>
      </div>

        {isSearch &&       <div className="flex justify-end w-full items-center gap-2 py-4"><p className="text-content-s text-gray-90 text-[20px]">검색결과 {nowData.length}개</p> <button onClick={searchClose}><img src="/icons/close.svg" className='w-[32px]'/>   </button>   </div>}

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
          {currentPost.map(notice => (
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
          ))}
        </tbody>
      </table>
      <Pagination postsPerPage={10} pageId='notice' className='mt-10'/>
    </div>
  );
};

export default CCNotice;
