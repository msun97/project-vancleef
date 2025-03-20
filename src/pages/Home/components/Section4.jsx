import React, { useEffect, useRef, useState } from 'react';
import { productdata } from '../../../assets/api/productdata';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section4 = () => {
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const animatedSlidesRef = useRef(new Set());

  const Item = productdata.map(item => {
    return {
      ...item,
      data: item.data.slice(0, 6).map(dataItem => ({
        ...dataItem,
        title: dataItem.title.split(',')[0],
        category: item.category,
      })),
      maindata: item.data[7],
    };
  });
  console.log(Item);
  useEffect(() => {
    const section = sectionRef.current;
    const totalSlides = Item.length;

    if (!section || !swiperRef.current) return;
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars.id === 'section4-pin') {
        trigger.kill();
      }
    });
    const scrollTrigger = ScrollTrigger.create({
      id: 'section4-pin',
      trigger: section,
      pin: true,
      pinSpacing: true,
      start: 'top top',
      end: () => `+=${window.innerHeight * totalSlides}`,
      scrub: 0.1,
      anticipatePin: 1,
      onUpdate: self => {
        const slideProgress = self.progress * totalSlides;
        const slideIndex = Math.min(Math.floor(slideProgress), totalSlides - 1);
        if (slideIndex !== activeIndex) {
          setActiveIndex(slideIndex);
          swiperRef.current.swiper.slideTo(slideIndex, 0);
          if (!animatedSlidesRef.current.has(slideIndex)) {
            animateSlide(slideIndex);
            animatedSlidesRef.current.add(slideIndex);
          }
        }
      },
    });
    const setupSlides = () => {
      Item.forEach((_, index) => {
        const slide = document.querySelector(
          `.swiper-slide[data-swiper-slide-index="${index}"]`,
        );
        if (!slide) return;

        const mainContainer = slide.querySelector('.main-product-container');
        const overlay = slide.querySelector('.overlay');
        const textContent = slide.querySelector('.text-content');
        const productItems = slide.querySelectorAll('.product-item');
        gsap.set(mainContainer, { scale: 1.05, opacity: 0.8 });
        gsap.set(overlay, { opacity: 0 });
        gsap.set(textContent, { y: 30, opacity: 0 });
        gsap.set(productItems, { y: 50, opacity: 0 });
      });
    };
    const animateSlide = index => {
      const slide = document.querySelector(
        `.swiper-slide[data-swiper-slide-index="${index}"]`,
      );
      if (!slide) return;

      const mainContainer = slide.querySelector('.main-product-container');
      const overlay = slide.querySelector('.overlay');
      const textContent = slide.querySelector('.text-content');
      const productItems = slide.querySelectorAll('.product-item');
      const tl = gsap.timeline();
      tl.to(
        mainContainer,
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        0,
      );

      tl.to(
        overlay,
        {
          opacity: 0.6,
          duration: 0.6,
        },
        0,
      );

      tl.to(
        textContent,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out',
        },
        0.3,
      );
      productItems.forEach((item, i) => {
        tl.to(
          item,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          0.3 + 0.1 * i,
        );
      });
    };
    setTimeout(() => {
      setupSlides();
      animateSlide(0);
      animatedSlidesRef.current.add(0);
    }, 300);
    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    });

    return () => {
      scrollTrigger.kill();
      window.removeEventListener('resize', () => {
        ScrollTrigger.refresh();
      });
    };
  }, [Item.length]);
  const handlePaginationClick = index => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      swiperRef.current.swiper.slideTo(index, 0);
      if (!animatedSlidesRef.current.has(index)) {
        animateSlide(index);
        animatedSlidesRef.current.add(index);
      }
    }
  };
  const animateSlide = index => {
    const slide = document.querySelector(
      `.swiper-slide[data-swiper-slide-index="${index}"]`,
    );
    if (!slide) return;

    const mainContainer = slide.querySelector('.main-product-container');
    const overlay = slide.querySelector('.overlay');
    const textContent = slide.querySelector('.text-content');
    const productItems = slide.querySelectorAll('.product-item');
    const tl = gsap.timeline();

    tl.to(
      mainContainer,
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      },
      0,
    );

    tl.to(
      overlay,
      {
        opacity: 0.6,
        duration: 0.6,
      },
      0,
    );

    tl.to(
      textContent,
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out',
      },
      0.3,
    );

    productItems.forEach((item, i) => {
      tl.to(
        item,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        0.3 + 0.1 * i,
      );
    });
  };
  const renderCustomPagination = () => {
    return (
      <div className="custom-pagination absolute right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {Item.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === activeIndex ? 'bg-gray-90' : 'bg-gray-40'
            }`}
            onClick={() => handlePaginationClick(index)}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      id="section4"
      ref={sectionRef}
      className="bg-gray-0 px-[330px] h-[100vh] relative py-[50px] overflow-hidden"
    >
      <div className="flex h-full">
        <Swiper
          ref={swiperRef}
          modules={[Pagination]}
          allowTouchMove={false}
          speed={0}
          watchSlidesProgress={true}
          onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
        >
          {Item.map((item, index) => (
            <SwiperSlide key={item.id} data-swiper-slide-index={index}>
              <div className="flex gap-5 h-full justify-center items-center overflow-hidden">
                <div className="w-fit h-fit relative main-product-container">
                  <div className="bg-gray-90 z-[50] w-full h-full absolute rounded-[20px] opacity-0 overlay"></div>
                  <img
                    src={item.maindata.objectimage[1]}
                    className="!w-[500px] !h-[500px] rounded-[20px] main-image"
                  />

                  <div className="absolute top-[50%] left-[50%] flex flex-col text-gray-0 -translate-x-2/4 -translate-y-2/4 w-full items-center gap-5 z-[60] text-content">
                    <h3 className="text-[20px]">
                      제품을 넘은 가치를 만나보세요
                    </h3>
                    <div className="flex gap-3 items-center">
                      <div className="border-2 border-gray-0 hover:bg-gray-0 hover:bg-opacity-20 transition-all cursor-pointer">
                        <img
                          src="/icons/arrow-up-right.svg"
                          className="w-8 h-8"
                        />
                      </div>
                      <Link to="/productlist">
                        <p className="font-bold underline hover:text-gray-10 transition-all">
                          More Info
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full h-full flex flex-wrap gap-x-4 gap-y-[1px] justify-center items-center">
                  {item.data.map(product => (
                    <Link
                      to={`/productdetail/${product.category}/${product.productid}`}
                    >
                      <div
                        key={product.id}
                        className="flex flex-col gap-2 px-5 w-[250px] h-[300px] product-item hover:scale-105 transition-transform cursor-pointer"
                      >
                        <div className="bg-[#f9f9f9] px-5 overflow-hidden group">
                          <img
                            src={product.objectimage[0]}
                            className="w-[200px] h-[200px] group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex flex-col gap-1 items-start">
                          <h3 className="font-bold">{product.title}</h3>
                          <p>{product.description}</p>
                          <p className="text-gray-90">
                            ₩{product.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {renderCustomPagination()}
      </div>

      <div className="scroll-indicator absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-60 animate-bounce">
        <p className="text-sm mb-1">스크롤하여 더 보기</p>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Section4;
