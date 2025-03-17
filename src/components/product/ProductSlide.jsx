import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
const ProductSlide = () => {
    return (
        <>
            <Swiper className="mySwiper">
                <SwiperSlide>
                    <img
                        src="https://www.vancleefarpels.com/content/dam/rcq/vca/F1/9s/OE/xL/mk/2f/kM/Pw/-V/AN/SQ/F19sOExLmk2fkMPw-VANSQ.jpeg"
                        alt=""
                        style={{ objectFit: 'contain' }}
                    />
                </SwiperSlide>

                <SwiperSlide>
                    <img
                        src="https://www.vancleefarpels.com/content/dam/rcq/vca/18/16/50/3/1816503.png"
                        alt=""
                        style={{ objectFit: 'contain' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://www.vancleefarpels.com/content/dam/rcq/vca/17/08/14/5/1708145.png.transform.vca-w820-1x.png"
                        alt=""
                        style={{ objectFit: 'contain' }}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://www.vancleefarpels.com/content/dam/rcq/vca/17/08/14/6/1708146.png.transform.vca-w820-1x.png"
                        alt=""
                        style={{ objectFit: 'contain' }}
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default ProductSlide;
