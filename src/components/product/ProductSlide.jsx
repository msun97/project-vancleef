import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination } from 'swiper/modules';

const ProductSlide = ({ productImages, title }) => {
    // product가 없거나 이미지 배열이 없는 경우 예외 처리
    if (!productImages || !Array.isArray(productImages) || productImages.length === 0) {
        return <div className="no-images">이미지를 찾을 수 없습니다.</div>;
    }

    return (
        <>
            <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                {productImages.map((imageUrl, index) => (
                    <SwiperSlide key={index}>
                        <img src={imageUrl} alt={`${title} - 이미지 ${index + 1}`} style={{ objectFit: 'contain' }} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default ProductSlide;
