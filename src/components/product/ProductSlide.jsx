import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ProductSlide = () => {
    const { productID } = useParams();
    const productdata = useSelector((state) => state.productR.productdata);
    
    // 모든 카테고리의 제품을 하나의 배열로 합침
    let allProducts = [];
    if (productdata && Array.isArray(productdata)) {
        productdata.forEach((category) => {
            if (category.data && Array.isArray(category.data)) {
                allProducts = [...allProducts, ...category.data];
            }
        });
    }
    
    // 현재 제품 ID에 해당하는 제품 찾기
    const product = allProducts.find((item) => item.productid === parseInt(productID));
    
    // product가 없거나 이미지 배열이 없는 경우 예외 처리
    if (!product || !product.objectimage || !Array.isArray(product.objectimage) || product.objectimage.length === 0) {
        return <div className="no-images">이미지를 찾을 수 없습니다.</div>;
    }
    
    return (
        <>
            <Swiper className="mySwiper">
                {product.objectimage.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={imageUrl}
                            alt={`${product.title} - 이미지 ${index + 1}`}
                            style={{ objectFit: 'contain' }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default ProductSlide;