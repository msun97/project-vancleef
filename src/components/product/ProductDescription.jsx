import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/store/modules/authSlice';

const ProductDescription = ({ productdata }) => {
    const dispatch = useDispatch();
    const authed = useSelector((state) => state.authR.authed);
    const user = useSelector((state) => state.authR.user);

    // 현재 상품이 즐겨찾기에 있는지 확인
    const isProductInFavorites = () => {
        if (!user || !user.favorites) return false;
        return user.favorites.some((item) => item.productid === productdata.productid);
    };

    // 초기 즐겨찾기 상태 설정
    const [isLiked, setIsLiked] = useState(isProductInFavorites());

    // user 또는 user.favorites가 변경될 때마다 좋아요 상태 업데이트
    useEffect(() => {
        setIsLiked(isProductInFavorites());
    }, [user, user?.favorites]);

    const toggleLike = () => {
        if (!authed) {
            alert('로그인이 필요합니다.');
            return;
        }

        if (!isLiked) {
            // 즐겨찾기에 추가
            dispatch(authActions.addfavorites(productdata));
        } else {
            // 즐겨찾기에서 제거
            dispatch(authActions.removeFavorite(productdata));
        }
    };

    return (
        <div>
            <div>
                <strong className='pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2'>
                    {productdata.title}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleLike();
                        }}
                        className='text-3xl'
                    >
                        {isLiked ? (
                            <img src='/icons/like-filled.svg' className='w-[30px]' />
                        ) : (
                            <img src='/icons/like-unfilled.svg' className='w-[30px]' />
                        )}
                    </button>
                </strong>
            </div>

            <div className='flex gap-2 pt-2.5'>
                <strong>
                    {productdata.price
                        .toLocaleString('ko-KR', {
                            style: 'currency',
                            currency: 'KRW',
                        })
                        .replace('₩', '₩ ')}
                </strong>
            </div>

            {(productdata.isNew || productdata.isBest || productdata.isPromo) && (
                <div className='flex gap-2 pt-2.5 items-center h-8'>
                    {productdata.isNew && (
                        <div className='font-bold py-1 px-3.5 rounded-lg bg-black text-white'>NEW</div>
                    )}
                    {productdata.isBest && (
                        <div className='py-1 px-3.5 text-white rounded-lg font-bold bg-[#74C365]'>BEST</div>
                    )}
                    {productdata.isPromo && <div className='outline py-1 px-3.5 rounded-lg font-bold'>기획</div>}
                </div>
            )}
        </div>
    );
};

export default ProductDescription;
