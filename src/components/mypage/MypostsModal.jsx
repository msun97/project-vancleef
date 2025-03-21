import React, { useRef, useState, useEffect } from 'react';
import Button from '../button';
import Input from '../input';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modules/modalSlice';
import { reviewActions } from '../../store/modules/reviewSlice';
import Draggable from 'react-draggable';

const MypostsModal = ({ productId, productName, category }) => {
    const [rating, setRating] = useState(0);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [fileName, setFileName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [formInitialized, setFormInitialized] = useState(false); // 폼 초기화 상태 추적
    const fileInputRef = useRef(null);
    const nodeRef = useRef(null);

    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.modalR.isOpen);
    const currentCategory = useSelector((state) => state.reviewR?.currentProductCategory);
    const effectiveCategory = category || currentCategory;

    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const myreviews = currentUser.myreviews || [];
    const existingReview = myreviews.find((review) => String(review.productId) === String(productId));

    // 컴포넌트 마운트 시 기존 리뷰 데이터 설정 - formInitialized로 한 번만 실행
    useEffect(() => {
        if (existingReview && !formInitialized) {
            setTitle(existingReview.title || '');
            setContent(existingReview.content || '');
            setRating(existingReview.rating || 0);

            if (existingReview.img && existingReview.img.length > 0) {
                setImageFile(existingReview.img[0]);
                setFileName('기존 이미지');
            } else if (existingReview.images && existingReview.images.length > 0) {
                setImageFile(existingReview.images[0]);
                setFileName('기존 이미지');
            }

            setFormInitialized(true); // 폼 초기화 완료 표시
        }
    }, [existingReview, formInitialized]);

    // 모달이 열리고 닫힐 때 처리
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            setFormInitialized(false); // 모달이 닫힐 때 초기화 상태 리셋
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    // 이하 핸들러 함수들은 그대로 유지
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImageFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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

        if (!effectiveCategory) {
            alert('카테고리 정보가 없습니다. 관리자에게 문의하세요.');
            return;
        }

        const reviewData = {
            title: title,
            content: content,
            rating: rating,
            images: imageFile ? [imageFile] : [],
        };

        dispatch(
            reviewActions.addReview({
                productId: productId,
                reviewData: reviewData,
                category: effectiveCategory,
            })
        );

        const reviewAddedEvent = new CustomEvent('reviewAdded');
        window.dispatchEvent(reviewAddedEvent);

        dispatch(closeModal());
        alert('리뷰가 성공적으로 등록되었습니다.');

        setRating(0);
        setTitle('');
        setContent('');
        setFileName('');
        setImageFile(null);
        setFormInitialized(false); // 폼 초기화 상태 리셋
    };

    if (!isOpen) {
        return null;
    }

    // JSX 부분은 원래 코드와 동일
    return (
        <>
            <div
                className='fixed inset-0 bg-[rgba(0,0,0,0.5)]'
                style={{ zIndex: 9998 }}
                onClick={() => dispatch(closeModal())}
            />

            <Draggable nodeRef={nodeRef} bounds='' handle='.handle'>
                <div
                    ref={nodeRef}
                    className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[710px] min-h-[626px] mt-[80px] mx-auto p-[50px] bg-white rounded-md border border-black'
                    style={{ zIndex: 9999 }}
                >
                    <div className='handle cursor-move mb-4'>
                        <h1 className='text-center text-xl font-bold'>리뷰쓰기</h1>
                        {productName && <p className='text-center text-sm text-gray-600 mt-1'>{productName}</p>}
                        {effectiveCategory && (
                            <p className='text-center text-xs text-gray-500 mt-1'>카테고리: {effectiveCategory}</p>
                        )}
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
                            accept='image/*'
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
            </Draggable>
        </>
    );
};

export default MypostsModal;
