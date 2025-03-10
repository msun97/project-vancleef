import React from "react";

const SizeGuide = () => {
  return (
    <div className="w-full h-[800px]  p-330 mt-[152px]">
      <div className="py-5 px-8">
        <h1 className="text-center text-[42px] font-secondary font-extrabold">
          Van Cleef & Arpels
        </h1>
        <p className="mt-[20px] text-center">시리즈명</p>
        <div className=" text-center mt-[9px] font-secondary text-[37px] font-extrabold pb-[17px]">
          사이즈 가이드
        </div>
        <div className="w-full flex gap-5">
          <div>
            <img src="/images/size/sizeguide2.png" alt="브레이슬릿가이드" />
          </div>
          <div>
            <h1 className="text-[21px] font-extrabold mb-[20px]">
              반클리프 아펠 손목 사이즈 측정 도구는 어떻게 사용하나요?
            </h1>
            <ol className="flex flex-col gap-3">
              <li>
                1. 인쇄 옵션에서 “페이지 크기 조정”이 “아니오”로 설정되어 있는지
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;확인하고 랜드스케이프 포맷이
                선택되었는지 확인해주세요.
              </li>
              <li>2. 양식지 위에 손목 사이즈 측정 도구를 프린트하세요</li>
              <li>
                3. 확실하지 않은 경우, 자를 이용해서 프린트된 길이를 재어보세요.
              </li>
              <li>4. 손목 사이즈 측정 도구를 잘라낸 후 손목에 맞춰 보세요.</li>
              <li>
                5. 손목에 딱 맞는 브레이슬릿 사이즈를 확인하시려면 첨부된 차트를
                &nbsp;&nbsp;&nbsp;참조해주세요.
              </li>
            </ol>
            <div className="mt-[30px] text-[12px] text-gray-500">
              사이즈 가이드는 참고 지표로서 제공됩니다. 고객님께 맞는 사이즈를
              확인하시려면 반클리프 아펠 부티크에 방문하셔서 브레이슬릿을 직접
              착용해보시길 추천해드립니다.
            </div>
          </div>
        </div>
        <div className="mt-[30px]">
          <img src="/images/size/size.png" alt="size" />
        </div>
        <div className="text-center text-[13px] mt-[29px]">
          지수는 참고 지표로서 제공됩니다. 모든 반클리프 아펠(Van Cleef &
          Arpels) 작품은 수작업으로 제작되므로 크기는 제품마다 다소 차이가 날 수
          있습니다.
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
