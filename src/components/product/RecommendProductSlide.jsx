import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { Keyboard, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const RecommendProductSlide = () => {
    const productdata = useSelector((state) => state.productR.productdata);
    const { category, id } = useParams();
    const foundCategory = productdata.find(
        (categoryData) => categoryData.category === category && categoryData.data && Array.isArray(categoryData.data)
    );

    const [randomData, setRandomData] = useState([]);

    useEffect(() => {
        if (foundCategory && foundCategory.data) {
            const data = foundCategory.data;
            const shuffled = [...data].sort(() => 0.5 - Math.random()); // 배열을 랜덤하게 섞음
            const selected = shuffled.slice(0, 5); // 처음 5개 항목 추출
            setRandomData(selected);
            console.log(selected, '랜덤 데이터');
        }
    }, [foundCategory]);
    return (
        <>
            <div className="w-full mt-60 p-330">
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
                    {randomData.map((product, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div>
                                    <img
                                        src={product.objectimage[0]}
                                        alt={product.title}
                                        style={{ width: '300px', height: '300px' }}
                                    />
                                    <div>
                                        {/* text */}
                                        <div>
                                            <strong className="pt-3.5 font-secondary text-[22px]  text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2 text-center inline-block w-full">
                                                {product.title}
                                            </strong>
                                        </div>

                                        <div className="flex gap-2 pt-2.5 justify-center">
                                            <strong>
                                                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                                            </strong>

                                            {/*      <strong>
                                                <span className="line-through text-[#6D6D6D]">
                                                    <strong className="text-[#6D6D6D]">₩2,000,000</strong>
                                                </span>
                                            </strong>
                                            <strong className="text-[#e4a690]">20%</strong> */}
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </>
    );
};

export default RecommendProductSlide;
