import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../store/modules/modalSlice';
import MypostsModal from './MypostsModal';

function MyPosts() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modalR.isOpen);

  // 리뷰보기 버튼 클릭 시 모달 열기
  const handleOpenModal = () => {
    dispatch(openModal());
  };

  return (
    <div className="mx-auto max-w-[1200px] pt-[20px] pb-[20px] pl-[13px]">
     
      {/* 리뷰 목록 예시 */}
      <div className="">
        <div className="flex flex-row justify-between items-center py-4">
          <span className="text-sm">201503040001</span>
          <span className="text-sm">프러포즈 펜던트, 스몰 모델</span>
          <span className="text-sm">KRW 5,400,000</span>
          <button
            onClick={handleOpenModal}
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            리뷰쓰기
          </button>
        </div>
      </div>
      {/* Redux 상태에 따라 모달 렌더링 */}
      {isOpen && (
<div className='fixed inset-0 z-[9998] bg-[rgba(0,0,0,0.5)]'>
	          <MypostsModal />
</div>
		 )}
    </div>
  );
}

export default MyPosts;
