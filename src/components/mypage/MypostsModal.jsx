import React, { useRef, useState } from 'react';
import Button from '../button';
import Input from '../input';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modules/modalSlice';

const MypostsModal = () => {
  const [rating, setRating] = useState(0);
  const [fileName, setFileName] = useState(''); // 파일명 상태 추가
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

	const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modalR.isOpen);

  if (!isOpen) {
    return null; // 모달이 닫혀있으면 렌더링하지 않음
  };

  return (
    <div className="min-w-[710px] min-h-[626px] mx-auto bg-[white] p-[50px] rounded-md border border-black">
      <h1 className="text-center text-xl font-bold mb-4">리뷰쓰기</h1>

      <div className="mb-[34px] mt-[73px] flex flex-row items-center">
        <label className="block font-regular">
          상품은 만족하셨나요?
        </label>
        <div className="flex space-x-1 ml-[34px]">
          {[1, 2, 3, 4, 5].map((star) => (
            <span 
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              } text-[25px]`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-regular">어떤 점이 좋았나요?</label>
        <textarea
          rows={4}
          className="w-full p-2 border bg-[#F4F4F4] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      <div className="relative">
        <Button
          variant="secondary"
          onClick={handleButtonClick}
          className="block mb-2 font-regular w-full h-[52px]"
        >
          사진 동영상 첨부
        </Button>
        <Input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange} // 파일 선택 시 이벤트 연결
          className="absolute opacity-0 w-0 h-0"
        />
      </div>

      {/* 선택된 파일명이 있을 때 표시 */}
      {fileName && (
        <div className="mt-2 mb-2 text-sm text-[#]">
          선택된 파일: {fileName}
        </div>
      )}

      <p className="text-xs mb-4">
        상품 및 무관한 사진/동영상을 첨부할 경우에는 통보없이 삭제 및 적립 혜택이 회수됩니다.
      </p>

      <div className="min-w-[608px] flex justify-center space-x-[21px]">
        <Button onClick={() => dispatch(closeModal())} variant="secondary" className="text-[16px] font-bold w-[290px] h-[55px]">취소</Button>
        <Button variant="secondary" className="text-[16px] font-bold w-[290px] h-[55px]">등록</Button>
      </div>
    </div>
  );
}

export default MypostsModal;
