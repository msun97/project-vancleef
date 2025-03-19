import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

const ValueSec = () => {
  const sectionRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);

  useEffect(() => {
    // 메인 타임라인 생성
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top', // 섹션이 화면 맨 위에 닿으면 시작
        end: '+=250%', // 섹션 높이의 2.5배만큼 스크롤해야 애니메이션 완료
        scrub: 1, // 부드러운 스크롤 효과
        pin: true, // 섹션 고정
        pinSpacing: true,
        anticipatePin: 1, // 더 부드러운 핀 효과
        // markers: true, // 개발 중에 마커 표시 (완성 후 제거)
      },
    });

    // 처음에는 모든 요소 투명 상태 유지
    tl.set([leftTextRef.current, rightTextRef.current], { opacity: 0 });

    // 스크롤의 20% 지점까지는 아무 변화 없음 - 지연 시작
    tl.to({}, { duration: 0.2 });

    // 20% ~ 40% 지점: 왼쪽 텍스트 페이드 인
    tl.to(leftTextRef.current, { opacity: 1, duration: 0.2 });

    // 40% ~ 60% 지점: 왼쪽 텍스트 유지
    tl.to({}, { duration: 0.2 });

    // 60% ~ 70% 지점: 왼쪽 텍스트 페이드 아웃
    tl.to(leftTextRef.current, { opacity: 0, duration: 0.1 });

    // 70% ~ 85% 지점: 오른쪽 텍스트 페이드 인
    tl.to(rightTextRef.current, { opacity: 1, duration: 0.15 });

    // 85% ~ 100% 지점: 오른쪽 텍스트 유지 (더 오래 표시)
    tl.to({}, { duration: 0.15 });

    // 컴포넌트 언마운트 시 ScrollTrigger 정리
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section about-value h-screen w-full relative"
    >
      <div className="content-page step1 absolute inset-0 flex items-center">
        <div className="inner s max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-box flex justify-between items-center gap-8 md:gap-16">
            <div ref={leftTextRef} className="col opacity-0 w-full md:w-1/2">
              <p className="desc text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                알함브라®(Alhambra®) 컬렉션은 1968년 탄생의 순간부터
                <br className="hidden md:block" />
                소재의 조합, 다채로운 기능적인 측면,
                <br className="hidden md:block" />
                모티브 사이즈의 다양한 적용 등을 도입하여
                <br className="hidden md:block" />
                지속적인 진화를 거듭하고 있습니다.
              </p>
            </div>

            <div ref={rightTextRef} className="col opacity-0 w-full md:w-1/2">
              <p className="desc text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                새로운 알함브라® 작품들에는
                <br className="hidden md:block" />
                옐로우 골드 소재에 기요셰 기법으로 불어넣은
                <br className="hidden md:block" />
                깊은 광채와 블루 아게이트가 조화를 이루며 오묘한 매혹을
                펼쳐냅니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSec;
