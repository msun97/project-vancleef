import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section3 = ({ isLoading }) => {
  const wrapperRef = useRef(null);
  const section3Ref = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const data = [
    { id: 1, name: 'perlee' },
    { id: 2, name: 'Frivole' },
    { id: 3, name: 'A-Cheval' },
  ];

  useEffect(() => {
    if (!isLoading && wrapperRef.current) {
      // 이미지 컨테이너를 처음에는 클리핑으로 중앙 30%만 보이게 설정
      gsap.set(section3Ref.current, {
        width: '100%', // 전체 너비를 100%로 설정
        clipPath: 'inset(0 35% 0 35%)', // 양쪽 35%씩 숨김
        left: '0', // 왼쪽에 위치
        x: '0', // x 이동 없음
        overflow: 'hidden',
      });

      gsap.set('.final-message', { opacity: 0 });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 4,
          markers: false,
          pin: true,
          pinSpacing: false,
          onEnter: () => {
            gsap.set(section3Ref.current, {
              width: '100%',
              clipPath: 'inset(0 35% 0 35%)',
              left: '0',
              x: '0',
            });
          },
          onLeaveBack: () => {
            gsap.set(section3Ref.current, {
              width: '100%',
              clipPath: 'inset(0 35% 0 35%)',
              left: '0',
              x: '0',
            });
          },
        },
      });

      // 클리핑 패스를 변경하여 이미지가 완전히 보이도록 애니메이션
      tl.fromTo(
        section3Ref.current,
        {
          clipPath: 'inset(0 35% 0 35%)', // 양쪽 35%씩 숨김
          width: '100%',
          x: '0',
          left: '0',
        },
        {
          clipPath: 'inset(0 0% 0 0%)', // 클리핑 제거하여 전체 보이기
          width: '100%',
          left: '0',
          x: '0',
          ease: 'linear',
          duration: 4000,
        },
      );

      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 4000, ease: 'power4.out' },
      );

      tl.fromTo(
        titleRef.current,
        { opacity: 0, rotationY: 90 },
        { opacity: 1, rotationY: 0, duration: 4000, ease: 'power4.out' },
        '-=20',
      );

      const lines = descriptionRef.current.children;
      gsap.set(lines, { opacity: 0, y: 20 });

      tl.to(lines, {
        opacity: 1,
        y: 0,
        duration: 4000,
        stagger: 0.5,
        ease: 'power4.out',
      });

      tl.to(
        descriptionRef.current.children,
        { opacity: 0, duration: 8000, stagger: 0.5, ease: 'power4.out' },
        '-=300',
      );
      tl.to([logoRef.current, titleRef.current, descriptionRef.current], {
        y: -50,
        opacity: 0,
        duration: 4000,
        ease: 'power2.out',
      });

      tl.to('.another .content', {
        y: -50,
        opacity: 0,
        duration: 4000,
        stagger: 1,
        ease: 'power2.out',
      });

      data.forEach((item, index) => {
        const delay = index * 5;

        tl.fromTo(
          `.brand-${item.id}`,
          { opacity: 0, x: -100, y: 0 },
          { opacity: 1, x: 0, y: 0, duration: 4000, ease: 'power4.out', delay },
        ).to(`.brand-${item.id}`, {
          opacity: 0,
          y: -30,
          duration: 4000,
          ease: 'power4.out',
          delay: 200,
        });
      });
      tl.fromTo(
        '.final-message',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 6000, ease: 'power4.out' },
      ).to('.final-message', {
        opacity: 0,
        scale: 1.2,
        duration: 6000,
        ease: 'power4.out',
      });
    }
  }, [isLoading]);
  return (
    <div ref={wrapperRef} className="relative w-dvw h-[400vh]">
      <div
        ref={section3Ref}
        className="absolute top-0 h-dvh text-gray-0 overflow-hidden z-10 transition-all"
      >
        <div className="absolute inset-0 w-screen h-dvh bg-[url(/images/homebg2.png)] bg-center bg-no-repeat"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-dvh flex items-center justify-center z-30 text-gray-0">
        <div className="content flex justify-center items-center flex-col gap-[30px]">
          <div ref={logoRef} className="logo">
            <img
              src="/images/alahambra.png"
              alt="alahambra"
              className="w-[155px]"
            />
          </div>

          <div
            ref={titleRef}
            className="text flex flex-col gap-[60px] justify-center items-center"
          >
            <div className="title text-center">
              <h3 className="text-content-l font-extrabold">Jewelry</h3>
              <h2 className="text-title-s font-secondary font-extrabold">
                Alhambra
              </h2>
            </div>
          </div>
          <div
            ref={descriptionRef}
            className="description text-center text-content-l font-extrabold"
          >
            <p>행운의 상징인 알함브라로</p>
            <p>긍정적인 삶의 비전을 가져보세요</p>
          </div>
        </div>
      </div>

      <div className="another h-screen absolute top-0 left-0 w-full h-dvh flex items-center justify-center z-30 text-gray-0">
        {data.map(item => (
          <div
            key={item.id}
            className={`content brand-${item.id} absolute flex justify-center items-center flex-col gap-[30px] opacity-0`}
          >
            <div className="logo">
              <img
                src={`/images/${item.name}.png`}
                alt={item.name}
                className="w-[155px]"
              />
            </div>
            <div className="text flex flex-col gap-[60px] justify-center items-center">
              <div className="title text-center">
                <h2 className="text-title-s font-secondary font-extrabold">
                  {item.name}
                </h2>
              </div>
            </div>
          </div>
        ))}

        <div className="content final-message flex justify-center items-center flex-col">
          <h3 className="text-content-xxxl font-extrabold">Van Cleef와 함께</h3>
          <h2 className="text-title-s font-extrabold font-secondary">
            가치관을, 비전을, 인생을
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Section3;
