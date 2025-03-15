import React, { useRef, useState } from 'react';
import Button from '../button';
import Input from '../input';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modules/modalSlice';
import { reviewActions } from '../../store/modules/reviewSlice';
import Draggable from 'react-draggable';

const MypostsModal = ({ productId, productName }) => {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState(''); // 리뷰 제목 상태
    const [content, setContent] = useState(''); // 리뷰 내용 상태
    const [fileName, setFileName] = useState('');
    const [imageFile, setImageFile] = useState(null); // 이미지 파일 데이터 상태
    const fileInputRef = useRef(null);
    // Draggable에서 사용할 ref
    const nodeRef = useRef(null);

    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modalR.isOpen);
    const userNum = useSelector((state) => state.authR); // 로그인한 사용자 정보 가져오기

    // 기존 리뷰 불러오기 (수정 모드인 경우)
    const userReviews = useSelector((state) => state.reviewR.userReviews);
    const existingReview = userReviews[userNum] && userReviews[userNum][productId];

    // 컴포넌트 마운트 시 기존 리뷰 데이터 설정
    React.useEffect(() => {
        if (existingReview) {
            setTitle(existingReview.title || '');
            setContent(existingReview.content || '');
            setRating(existingReview.rating || 0);

            // 이미지가 있는 경우
            if (existingReview.images && existingReview.images.length > 0) {
                setImageFile(existingReview.images[0]);
                setFileName('기존 이미지');
            }
        }
    }, [existingReview]);

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

    // 리뷰 제목 변경 핸들러
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
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

        if (!title.trim()) {
            alert('리뷰 제목을 입력해주세요.');
            return;
        }

        if (!content.trim()) {
            alert('리뷰 내용을 입력해주세요.');
            return;
        }

        // 리뷰 데이터 생성
        const reviewData = {
            title: title,
            content: content,
            rating: rating,
            images: imageFile ? [imageFile] : [], // 이미지가 있으면 배열에 추가
        };

        // Redux 액션 디스패치하여 리뷰 추가
        dispatch(
            reviewActions.addReview({
                userNum: userNum,
                productId: productId,
                reviewData: reviewData,
            })
        );

        // 모달 닫기
        dispatch(closeModal());

        // 상태 초기화
        setRating(0);
        setTitle('');
        setContent('');
        setFileName('');
        setImageFile(null);
    };

    if (!isOpen) {
        return null; // 모달이 닫혀있으면 렌더링하지 않음
    }

    return (
        <Draggable nodeRef={nodeRef} bounds='' handle='.handle'>
            <div className='fixed inset-0 bg-[rgba(0,0,0,0.09)]'>
                <div
                    ref={nodeRef}
                    className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[710px] min-h-[626px] z-[9999] mt-[80px] mx-auto p-[50px] bg-white rounded-md border border-black'
                >
                    {/* 드래그 가능한 영역을 표시하기 위해 상단에 handle 클래스 추가 */}
                    <div className='handle cursor-move mb-4'>
                        <h1 className='text-center text-xl font-bold'>리뷰쓰기</h1>
                        {productName && <p className='text-center text-sm text-gray-600 mt-1'>{productName}</p>}
                    </div>

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

                    <textarea
                        rows={1}
                        className='w-full p-2 bg-[#F4F4F4] focus:outline-none focus:ring-1 focus:ring-gray-200 placeholder-[#9C9C9C] text-[#000]'
                        placeholder='제목'
                        style={{ resize: 'none' }}
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <div className='mb-4'>
                        <textarea
                            rows={4}
                            placeholder='내용'
                            style={{ resize: 'none' }}
                            className='w-full p-2 bg-[#F4F4F4] placeholder-[#9C9C9C] text-[#000] focus:outline-none focus:ring-1 focus:ring-gray-200'
                            value={content}
                            onChange={handleContentChange}
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
                            onChange={handleFileChange}
                            className='absolute opacity-0 w-0 h-0'
                        />
                    </div>

                    {fileName && <div className='mt-2 mb-2 text-sm'>선택된 파일: {fileName}</div>}

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
                        <Button
                            onClick={handleSubmit}
                            variant='secondary'
                            className='text-[16px] font-bold w-[290px] h-[55px]'
                        >
                            {existingReview ? '수정' : '등록'}
                        </Button>
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default MypostsModal;
