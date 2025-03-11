import React, { useState } from 'react';
import Myposts from './Myposts';

function MyPosts() {
  const [isOpen, setIsOpen] = useState(false);

  // 리뷰쓰기 모달 열기
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  // 리뷰쓰기 모달 닫기
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const [activeTab, setActiveTab] = useState('available');

	
  return (
    <div className="mx-auto max-w-[1200px] p-8">
      {/* 상단 영역 */}
      <h1 className="text-2xl font-bold mb-2">나의 게시물</h1>
      <p className="mb-6">작업한 게시글이 없습니다.</p>
      {/* 작성 가능한 리뷰 / 내가 작성한 리뷰 */}
      <div className="mb-4">
        <h2 className="font-bold text-lg">
          <button onClick={() => setActiveTab('available')} className={`w-[118px] text-left text-[16px] border-b ${
    activeTab === 'available'
      ? 'border-b-4'
      : 'border-b'
  }`}
>

						작성 가능한 리뷰 
					</button>





					<button onClick={() => setActiveTab('written')} className={`w-[118px] text-left text-[16px] border-b ${
    activeTab === 'written'
      ? 'border-b-4'
      : 'border-b'
  }`}
>내가 작성한 리뷰</button>
        </h2>
      </div>

      {/* 리뷰 목록 (예시) */}
      <div className="border-t border-gray-200">
        <div className="flex flex-row justify-between items-center py-4 border-b border-gray-200">
          <span className="text-sm">201503040001</span>
          <span className="text-sm">프러포즈 펜던트, 스몰 모델</span>
          <span className="text-sm">KRW 5,400,000</span>
          <button
            onClick={handleOpenModal}
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            리뷰보기
          </button>
        </div>
      </div>

      {/* 리뷰쓰기 모달 (Myposts) */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
          <Myposts onClose={handleCloseModal} />
        </div>
      )}
    </div>
  );
}

export default MyPosts;
