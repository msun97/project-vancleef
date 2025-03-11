import React, { useRef, useState } from 'react';
import Button from '../button';
import Input from '../input';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modules/modalSlice';
import { reviewActions } from '../../store/modules/reviewSlice';

const MypostsModal = () => {
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState(''); // 리뷰 내용 상태 추가
    const [fileName, setFileName] = useState('');
    const [imageFile, setImageFile] = useState(null); // 이미지 파일 데이터 상태 추가
    const fileInputRef = useRef(null);

    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modalR.isOpen);

    // 파일 버튼 클릭 핸들러
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

            // 이미지 파일을 Data URL로 변환하여 저장
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 리뷰 내용 변경 핸들러
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    // 리뷰 등록 핸들러
    const handleSubmit = () => {
        // 입력값 검증
        if (rating === 0) {
            alert('별점을 선택해주세요.');
            return;
        }

        if (!content.trim()) {
            alert('리뷰 내용을 입력해주세요.');
            return;
        }

        // 리뷰 데이터 생성
        const reviewData = {
            content: content,
            rating: rating,
            images: imageFile ? [imageFile] : [], // 이미지가 있으면 배열에 추가
        };

        // Redux 액션 디스패치하여 리뷰 추가
        dispatch(reviewActions.addReview(reviewData));

        // 모달 닫기
        dispatch(closeModal());

        // 상태 초기화
        setRating(0);
        setContent('');
        setFileName('');
        setImageFile(null);
    };

    if (!isOpen) {
        return null; // 모달이 닫혀있으면 렌더링하지 않음
    }

    return (
        <div className='min-w-[710px] min-h-[626px] mx-auto bg-[white] p-[50px] rounded-md border border-black'>
            <h1 className='text-center text-xl font-bold mb-4'>리뷰쓰기</h1>

            <div className='mb-[34px] mt-[73px] flex flex-row items-center'>
                <label className='block font-regular'>상품은 만족하셨나요?</label>
                <div className='flex space-x-1 ml-[34px]'>
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
            <div className='mb-4'>
                <label className='block mb-2 font-regular'>어떤 점이 좋았나요?</label>
                <textarea
                    rows={4}
                    value={content}
                    onChange={handleContentChange}
                    className='w-full p-2 border bg-[#F4F4F4] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200'
                />
            </div>

            <div className='relative'>
                <Button
                    variant='secondary'
                    onClick={handleButtonClick}
                    className='block mb-2 font-regular w-full h-[52px]'
                >
                    사진 동영상 첨부
                </Button>
                <Input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*,video/*'
                    onChange={handleFileChange}
                    className='absolute opacity-0 w-0 h-0'
                />
            </div>

            {/* 선택된 파일명이 있을 때 표시 */}
            {fileName && <div className='mt-2 mb-2 text-sm text-gray-600'>선택된 파일: {fileName}</div>}

            <p className='text-xs mb-4'>
                상품 및 무관한 사진/동영상을 첨부할 경우에는 통보없이 삭제 및 적립 혜택이 회수됩니다.
            </p>

            <div className='min-w-[608px] flex justify-center space-x-[21px]'>
                <Button
                    onClick={() => dispatch(closeModal())}
                    variant='secondary'
                    className='text-[16px] font-bold w-[290px] h-[55px]'
                >
                    취소
                </Button>
                <Button onClick={handleSubmit} variant='secondary' className='text-[16px] font-bold w-[290px] h-[55px]'>
                    등록
                </Button>
            </div>
        </div>
    );
};

export default MypostsModal;
