import { useDispatch, useSelector } from 'react-redux';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { addFavorite, removeFavorite } from '../../store/modules/favoritesSlice';
import { useEffect, useState } from 'react';

const ProductDescription = ({ productdata }) => {
    const dispatch = useDispatch();
    const { favorites } = useSelector((state) => state.favoritesR || []);

    // 현재 productdata.productid에 대한 찜 여부를 state에서 동적으로 관리
    const isLiked = favorites.some((product) => product.productid === productdata.productid);

    const toggle = () => {
        if (isLiked) {
            // 찜 목록에서 제거
            dispatch(removeFavorite(productdata)); // productdata 전체를 전달
            console.log('찜 목록에서 제거', favorites);
        } else {
            // 찜 목록에 추가
            dispatch(addFavorite(productdata)); // productdata 전체를 전달
            console.log('찜 목록에 추가', favorites);
        }
    };
    useEffect(() => {
        console.log('Updated favorites:', favorites);
    }, [favorites]); // favorites 상태가 변경될 때마다 실행됩니다.
    return (
        <div>
            <div>
                <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2 ">
                    {productdata.title}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggle();
                        }}
                        className="text-3xl"
                    >
                        {isLiked ? <IoIosHeart className="text-red-500" /> : <IoIosHeartEmpty className="text-black" />}
                    </button>
                </strong>
            </div>

            <div className="flex gap-2 pt-2.5">
                <strong>
                    {productdata.price
                        .toLocaleString('ko-KR', {
                            style: 'currency',
                            currency: 'KRW',
                        })
                        .replace('₩', '₩ ')}
                </strong>
            </div>

            {productdata.isNew || productdata.isBest || productdata.isPromo ? (
                <div className="flex gap-2 pt-2.5 items-center h-8">
                    {productdata.isNew && (
                        <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                            NEW
                        </div>
                    )}
                    {productdata.isBest && (
                        <div className="py-1 px-3.5 text-white rounded-lg font-bold bg-[#74C365]">BEST</div>
                    )}
                    {productdata.isPromo && (
                        <div className="border border-black py-1 px-3.5 rounded-lg font-bold">기획</div>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default ProductDescription;
