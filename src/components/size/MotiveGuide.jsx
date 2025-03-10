import React from "react";

const MotiveGuide = () => {
  return (
    <div className="w-full h-[800px]  p-330 mt-[152px]">
      <div className="border border-gray-300 py-5 px-8">
        <h1 className="text-center text-[42px] font-secondary font-extrabold">
          Van Cleef & Arpels
        </h1>
        <p className="mt-[20px] text-center">시리즈명</p>
        <div className=" text-center mt-[9px] font-secondary text-[37px] font-extrabold pb-[17px]">
          모티브 사이즈 가이드
        </div>
        <div className="w-full flex justify-center gap-2">
          <div className="border border-gray-300">
            <img
              src="/images/size/sweet-1.png"
              alt="스위트알함브라"
              className="w-[250px] h-[205px]"
            />
            <div>
              <div className="h-[220px] flex items-center justify-center">
                <img src="/images/size/size1.PNG" alt="스위트 사이즈 크기" />
              </div>
              <div>
                <p className="text-center">0.37인치</p>
              </div>
              <div className="pb-[53px]">
                <p className="text-center">9.5mm</p>
              </div>
              <div className="text-center pb-[60px]">스위트 알함브라</div>
            </div>
          </div>
          <div className="border border-gray-300">
            <img
              src="/images/size/vintate-2.PNG"
              alt="스위트알함브라"
              className="w-[250px] h-[205px]"
            />
            <div>
              <div className="h-[220px] flex items-center justify-center">
                <img src="/images/size/size2.PNG" alt="스위트 사이즈 크기" />
              </div>
              <div>
                <p className="text-center">0.37인치</p>
              </div>
              <div className="pb-[53px]">
                <p className="text-center">9.5mm</p>
              </div>
              <div className="text-center pb-[60px]">스위트 알함브라</div>
            </div>
          </div>
          <div className="border border-gray-300">
            <img
              src="/images/size/pure-3.PNG"
              alt="스위트알함브라"
              className="w-[250px] h-[205px]"
            />
            <div>
              <div className="h-[220px] flex items-center justify-center">
                <img src="/images/size/size3.PNG" alt="스위트 사이즈 크기" />
              </div>
              <div>
                <p className="text-center">0.37인치</p>
              </div>
              <div className="pb-[53px]">
                <p className="text-center">9.5mm</p>
              </div>
              <div className="text-center pb-[60px]">스위트 알함브라</div>
            </div>
          </div>
          <div className="border border-gray-300">
            <img
              src="/images/size/magin-4.PNG"
              alt="스위트알함브라"
              className="w-[250px] h-[205px]"
            />
            <div>
              <div className="h-[220px] flex items-center justify-center">
                <img src="/images/size/size4.PNG" alt="스위트 사이즈 크기" />
              </div>
              <div>
                <p className="text-center">0.37인치</p>
              </div>
              <div className="pb-[53px]">
                <p className="text-center">9.5mm</p>
              </div>
              <div className="text-center pb-[60px]">스위트 알함브라</div>
            </div>
          </div>
        </div>
        <div className="text-center text-[13px] pt-[19px]">
          지수는 참고 지표로서 제공됩니다. 모든 반클리프 아펠(Van Cleef &
          Arpels) 작품은 수작업으로 제작되므로 크기는 제품마다 다소 차이가 날 수
          있습니다.
        </div>
      </div>
    </div>
  );
};

export default MotiveGuide;
