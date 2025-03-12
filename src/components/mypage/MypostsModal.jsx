import React, { useRef, useState } from 'react';
import Button from '../button';
import Input from '../input';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/modules/modalSlice';
import Draggable from 'react-draggable';

const MypostsModal = () => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  // Draggable에서 사용할 ref
  const nodeRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <Draggable nodeRef={nodeRef} bounds="" handle=".handle">
      <div className='fixed inset-0 bg-[rgba(0,0,0,0.09)]'>
      	<div ref={nodeRef} className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[710px] min-h-[626px] z-[1000] mt-[80px] mx-auto p-[50px] bg-white rounded-md border border-black">
	        {/* 드래그 가능한 영역을 표시하기 위해 상단에 handle 클래스 추가 */}
	        <div className="handle cursor-move mb-4">
	          <h1 className="text-center text-xl font-bold">리뷰쓰기</h1>
	        </div>
	
	        <div className="mb-[34px] mt-[73px] flex flex-row items-center">
	          <label className="block font-regular">상품은 만족하셨나요?</label>
	          <div className="flex space-x-1 ml-[34px]">
	            {[1, 2, 3, 4, 5].map((star) => (
	              <span 
	                key={star}
	                onClick={() => setRating(star)}
	                className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} text-[25px]`}
	              >
	                ★
	              </span>
	            ))}
	          </div>
	        </div>
	
	        <textarea 
	          rows={1} 
	          className="w-full p-2 bg-[#F4F4F4] focus:outline-none focus:ring-1 focus:ring-gray-200 placeholder-[#9C9C9C] text-[#000]" 
	          placeholder="제목"
									style={{ resize: 'none' }}
	        />
	        <div className="mb-4">
	          <textarea
	            rows={4}
	placeholder="내용"
							style={{ resize: 'none' }}
	            className="w-full p-2 bg-[#F4F4F4] placeholder-[#9C9C9C] text-[#000] focus:outline-none focus:ring-1 focus:ring-gray-200"
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
	            onChange={handleFileChange}
	            className="absolute opacity-0 w-0 h-0"
	          />
	        </div>
	
	        {fileName && (
	          <div className="mt-2 mb-2 text-sm">
	            선택된 파일: {fileName}
	          </div>
	        )}
	
	        <p className="text-xs mb-4">
	          상품 및 무관한 사진/동영상을 첨부할 경우에는 통보없이 삭제 및 적립 혜택이 회수됩니다.
	        </p>
	
	        <div className="min-w-[608px] flex justify-center space-x-[21px]">
	          <Button
	            onClick={() => dispatch(closeModal())}
	            variant="secondary"
	            className="text-[16px] font-bold w-[290px] h-[55px]"
	          >
	            취소
	          </Button>
	          <Button
	            variant="secondary"
	            className="text-[16px] font-bold w-[290px] h-[55px]"
	          >
	            등록
	          </Button>
	        </div>
	      </div>
      </div>
    </Draggable>
  );
};

export default MypostsModal;
