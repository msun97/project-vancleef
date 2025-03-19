import React, { useMemo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Mousewheel, Pagination } from 'swiper/modules';
const Unnow = ({ data, handleClick }) => {
  const unnowData = data.filter(data => data.state === 'unnow');
   const swiperRefs = useRef([]);
  
    // 데이터 분할 로직
    const { rowCount, splitData } = useMemo(() => {
      const totalItems = unnowData.length;
      
      if (totalItems >=11) {
        const itemsPerRow = Math.ceil(totalItems / 3);
        return {
          rowCount: 3,
          splitData: [
            unnowData.slice(0, itemsPerRow),
            unnowData.slice(itemsPerRow, itemsPerRow * 2),
            unnowData.slice(itemsPerRow * 2)
          ]
        };
      } else if (totalItems >= 6) {
        const itemsPerRow = Math.ceil(totalItems / 2);
        return {
          rowCount: 2,
          splitData: [
            unnowData.slice(0, itemsPerRow),
            unnowData.slice(itemsPerRow)
          ]
        };
      } else {
        return {
          rowCount: 1,
          splitData: [unnowData]
        };
      }
    }, [unnowData]);
  
    // 휠 이벤트 핸들러
    const handleWheel = (event) => {
      // 휠 이벤트 방향 (deltaY > 0는 아래로 스크롤)
      const isScrollingDown = event.deltaY > 0;
      
      // 각 스와이퍼에 대해 방향 설정
      swiperRefs.current.forEach((swiper, index) => {
        if (swiper) {
          // 홀수 인덱스는 역방향, 짝수 인덱스는 정방향
          const shouldReverseDirection = index % 2 !== 0;
          
          if (shouldReverseDirection) {
            // 역방향: 아래로 스크롤하면 위로 슬라이드, 위로 스크롤하면 아래로 슬라이드
            if (isScrollingDown) {
              swiper.slidePrev();
            } else {
              swiper.slideNext();
            }
          } else {
            // 정방향: 아래로 스크롤하면 아래로 슬라이드, 위로 스크롤하면 위로 슬라이드
            if (isScrollingDown) {
              swiper.slideNext();
            } else {
              swiper.slidePrev();
            }
          }
        }
      });
    };
  
    // 스와이퍼 초기화 시 참조 저장
    const onSwiperInit = (swiper, index) => {
      swiperRefs.current[index] = swiper;
    };
  
  return (
    <div 
      className="flex space-x-8 w-full h-[100vh] gap-10 justify-center"
      onWheel={handleWheel}
    >
      {splitData.map((rowData, rowIndex) => (
        <div key={`row-${rowIndex}`} className={`w-fit `}>
          <Swiper
            direction={'vertical'}
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={30}
            // 기본 마우스휠 비활성화 (커스텀 핸들러 사용)
            mousewheel={false}
            pagination={false}
            loop={true}
            modules={[Mousewheel, Pagination]}
            className="mySwiper w-fit h-[full]"
            onInit={(swiper) => onSwiperInit(swiper, rowIndex)}
          >
            {rowData.map((item, index) => (
              <SwiperSlide
                key={item.id}
                className="relative group w-[400px] h-[480px] overflow-hidden"
                onClick={() => handleClick(item)}
              >
                <img src={item.img} className="w-full h-full object-cover" />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-transparent to-[#CCD3B5]"
                ></div>
                <div className="absolute inset-0 flex flex-col justify-end text-gray-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 gap-2 overflow-auto">
                  <p className="text-[12px] font-bold">{item.todate}</p>
                  <p className="text-[16px] font-bold">{item.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
};

export default Unnow;
