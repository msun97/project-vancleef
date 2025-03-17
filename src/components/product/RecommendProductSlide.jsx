import 'swiper/css';
import 'swiper/css/navigation';
import { Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const RecommendProductSlide = () => {
    return (
        <>
            <div className="w-full h-full mt-60 p-330">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    keyboard={{
                        enabled: true,
                    }}
                    navigation={true}
                    modules={[Keyboard, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div>
                            <img
                                src="https://www.vancleefarpels.com/content/dam/vancleefarpels/collections/jewelry/frivole/frivole-2024/Frivole_corporate_2024_Carrousel_02_2_4_1x1.jpg.transform.vca-h460-1x.jpg"
                                alt="이어링"
                            />
                            <div>
                                {/* text */}
                                <div>
                                    <a href="">
                                        <strong className="pt-3.5 font-secondary text-[22px]  text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2 text-center inline-block w-full">
                                            스위트 버터플라이 펜던트
                                        </strong>
                                    </a>
                                </div>

                                <div className="flex gap-2 pt-2.5 justify-center">
                                    <strong>₩2,380,000 </strong>

                                    <strong>
                                        <span className="line-through text-[#6D6D6D]">
                                            <strong className="text-[#6D6D6D]">₩2,000,000</strong>
                                        </span>
                                    </strong>
                                    <strong className="text-[#e4a690]">20%</strong>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="https://www.vancleefarpels.com/content/dam/vancleefarpels/collections/jewelry/frivole/frivole-2024/Frivole_corporate_2024_Carrousel_01_3_5_1x1.jpg.transform.vca-h460-1x.jpg"
                            alt="반지"
                        />
                        <div>
                            {/* text */}
                            <div>
                                <a href="">
                                    <strong className="pt-3.5 font-secondary text-[22px]  text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2 text-center inline-block w-full">
                                        스위트 버터플라이 펜던트
                                    </strong>
                                </a>
                            </div>

                            <div className="flex gap-2 pt-2.5 justify-center">
                                <strong>₩2,380,000 </strong>

                                <strong>
                                    <span className="line-through text-[#6D6D6D]">
                                        <strong className="text-[#6D6D6D]">₩2,000,000</strong>
                                    </span>
                                </strong>
                                <strong className="text-[#e4a690]">20%</strong>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <img
                            src="https://www.vancleefarpels.com/content/dam/vancleefarpels/collections/jewelry/frivole/frivole-2024/Advertising_Content_Frivole_Corporate_2023_Worn%20View%205_1X1_300dpi%20(1).jpg.transform.vca-h460-1x.jpg"
                            alt="이어링"
                        />
                        <div>
                            {/* text */}
                            <div>
                                <a href="">
                                    <strong className="pt-3.5 font-secondary text-[22px]  text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2 text-center inline-block w-full">
                                        스위트 버터플라이 펜던트
                                    </strong>
                                </a>
                            </div>

                            <div className="flex gap-2 pt-2.5 justify-center">
                                <strong>₩2,380,000 </strong>

                                <strong>
                                    <span className="line-through text-[#6D6D6D]">
                                        <strong className="text-[#6D6D6D]">₩2,000,000</strong>
                                    </span>
                                </strong>
                                <strong className="text-[#e4a690]">20%</strong>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            src="https://www.vancleefarpels.com/content/dam/vancleefarpels/collections/jewelry/frivole/frivole-2024/Frivole_corporate_2024_Carrousel_05_4_5_1x1.jpg.transform.vca-h460-1x.jpg"
                            alt="이어링"
                        />
                        <div>
                            {/* text */}
                            <div>
                                <a href="">
                                    <strong className="pt-3.5 font-secondary text-[22px]  text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2 text-center inline-block w-full">
                                        스위트 버터플라이 펜던트
                                    </strong>
                                </a>
                            </div>

                            <div className="flex gap-2 pt-2.5 justify-center">
                                <strong>₩2,380,000 </strong>

                                <strong>
                                    <span className="line-through text-[#6D6D6D]">
                                        <strong className="text-[#6D6D6D]">₩2,000,000</strong>
                                    </span>
                                </strong>
                                <strong className="text-[#e4a690]">20%</strong>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
};

export default RecommendProductSlide;
