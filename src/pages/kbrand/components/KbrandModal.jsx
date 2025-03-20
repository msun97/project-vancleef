import React from 'react';

const KbrandModal = ({ handleClick }) => {
  return (
    <div
      className="fixed w-full h-[100vh] bg-[rgba(0,0,0,0.5)] flex justify-center left-0 top-0"
      style={{ zIndex: 9999 }}
    >
      <button
        className="absolute top-0 right-0 mt-[60px] mr-[60px] p-1 bg-gray-0 rounded-full"
        onClick={handleClick}
      >
        <img src="/icons/close.svg" className="w-8 h-8" />
      </button>
      <div className="wrap bg-gray-0 w-[1260px] h-[calc(100vh-160px)] z-[1000] fixed overflow-auto top-1/2 -translate-y-2/4">
        <div>
          <div>
            <img src="https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/van-cleef-arpels-news-shakudo-2880-1620-V03.jpg.transform.vca-w2560-1x.jpg" />
          </div>
          <div className="p-[50px]  text-[16px] font-bold">
            <div className="flex flex-col gap-[38px]">
              <h3 className="font-extrabold text-[30px]">
                {' '}
                “Shakudō: from Samurai Ornaments to Jewelry” at L’ ÉCOLE, School
                of Jewelry Arts in Hong Kong
              </h3>
              <div className="flex flex-col gap-[38px]">
                <p>
                  레꼴 주얼리 스쿨은 샤쿠도(Shakudō)라 불리는 적동 기법에 대한
                  최초의 전시를 통해 사무라이의 일본도 장식에 전통적으로 적용된
                  블랙 메탈 소재의 기법, 용도, 그리고 흥미로운 역사를 깊이
                  탐구하며 조명합니다. 이번 전시에서 선보이는 유럽식 마운트를
                  갖춘 36피스의 주얼리 작품은 골드, 실버, 구리 인레이를 더한
                  적동 요소로 장식된 에도 시대(도쿄의 옛 이름)의 일본 풍경을
                  표현하고 있습니다. 작품 모두는 단일 프라이빗 컬렉션을 통해
                  확보되었고, 일반 대중을 대상으로, 최초로 공개됩니다.
                </p>
                <div className="flex justify-between gap-3">
                  <img src="https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/26%20-%20Brooch%20with%20a%20boat,%20Japan,%20late%201800s,%20gold%20and%20silver%20gilt%20shakudo.%20%20Private%20Collection.%20Photo%20-%20L%27ECOLE,%20School%20of%20Jewelry%20Arts%20-%20B.%20Chelly%20(2).jpg.transform.vca-w2560-1x.jpg" className='w-1/2 object-cover'  />
                  <img src="https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/26%20-%20Brooch%20with%20a%20boat,%20Japan,%20late%201800s,%20gold%20and%20silver%20gilt%20shakudo.%20%20Private%20Collection.%20Photo%20-%20L%27ECOLE,%20School%20of%20Jewelry%20Arts%20-%20B.%20Chelly.jpg.transform.vca-w2560-1x.jpg" className='w-1/2 object-cover'/>
                </div>
                <p>
                  이번 전시는 주요 세 가지 섹션으로 구성되었습니다. 가장 먼저
                  구리 94%에 골드 4%로 구성되어 레드 컬러를 띠는 합금인 적동에
                  대해 기술적으로 살펴봅니다. 금속 공예 장인들은 기름을 제거하고
                  숯을 활용하여 폴리싱 단계를 거친 후 화학 용액에 담가 블랙
                  컬러의 파티나를 연출합니다. 이 적동 기법은 일본도에 우루시
                  라커 대신 적용되기 시작한 12세기부터 완벽히 구사되고 있습니다.
                </p>
                <div className="flex justify-between gap-3">
                  <img src="https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/two%20brooches%20with%20peonies%20or%20chrysanthemums_2.jpg.transform.vca-w2560-1x.jpg" className='w-1/2 object-cover'/>
                  <img src="https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/two%20brooches%20with%20peonies%20or%20chrysanthemums.jpg.transform.vca-w2560-1x.jpg" className='w-1/2 object-cover'/>
                </div>
                <p>
                  어떤 계기로 일본도에 사용되던 적동이 주얼리에서 활용되기
                  시작했을까요? 이에 얽힌 흥미진진한 이야기는 1853년 이후 에도
                  시대에 미국 '흑선’의 압박을 받아 일본이 강제로 개항하게 된
                  정치적 사건으로 시작됩니다. 일본에서 봉건제도 폐지로 인해
                  근대화를 겪으면서 사무라이 체제가 사라지게 되었고, 1876년
                  일본도 소지가 금지되었습니다. 고객을 잃게 된 금속 공예
                  장인들은 메이지 정부의 수출 정책에 힘입어 유럽인의 취향을
                  반영한 제품을 제작하게 되었습니다. 이들은 먼저 적동을 사용하여
                  작은 구성품을 만들기 시작했습니다. 새로운 것을 찾던 서양의
                  주얼러들은 골드, 구리, 실버의 생생한 컬러를 구현해 내는 일본
                  장인들의 기량을 발견했고 적동 작품을 유럽식 세팅 기법에
                  통합하여 카메오 또는 에나멜 미니어처를 대체하는 요소로
                  활용했습니다.
                </p>
                <div className="flex justify-between gap-3">
                  <img src="https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/5%20-%20Bracelet,%20Japan,%20late%201800s,%20gold%20and%20silver-gilt.%20Private%20Collection.%20Photo%20-%20L%27ECOLE,%20School%20of%20Jewelry%20Arts%20-%20B.%20Chelly%20(2).jpg" className='w-[24%] object-cover'/>
                  <img src="https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/31%20-%20Buckle%20resembling%20a%20tsuba,%20Japan,%20late%201800s,%20gold%20and%20silver%20gilt%20shakudo.%20Private%20Collection.%20Photo%20-%20L%27ECOLE,%20School%20of%20Jewelry%20Arts.%20B%20Chelly%20(2).jpg" className='w-[24%] object-cover' />
                  <img src="https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/11%20-%20Necklace,%20Japan,%201800s,%20gold%20and%20silver-gilt%20shakudo.%20Private%20Collection.%20Photo%20-%20L%27ECOLE,%20School%20of%20Jewelry%20Arts%20-%20B.%20Chelly%20(2).jpg" className='w-[24%] object-cover' />
                  <img src="https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/12%20-%20Earrings,%20Japan,%20late%201800s,%20gold%20and%20silver-gilt%20shakudo.%20Private%20Collection.%20Photo%20-%20L%27ECOLE,%20School%20of%20Jewelry%20Arts%20-%20B.%20Chelly%20(1).jpg" className='w-[24%] object-cover' />
                </div>
                <p>
                  유럽의 미학과 일본의 기술이 혼재하는 주얼리들은 1860년에서
                  1880년 사이에 제작되었습니다. 이 작품들에서 당시 많은 이들을
                  매혹시킨 아시아 문화가 돋보입니다. 미니어처 풍경 디테일이
                  장식된 적동 작품은 놀랍고도 경이로운 순간을 끊임없이
                  선사합니다. 관람객들은 돋보기를 통해 어선, 야생 갈대, 의인화된
                  동물의 디테일 하나하나를 감상할 수 있습니다. 전사의 정신이
                  사라진 사무라이들이 기모노를 입고 물가를 거니는 모습을 담은
                  미니어처 작품은 전통적인 세계가 외국의 영향을 받아 저물어 가는
                  모습을 보여줍니다. 세 가지 섹션으로 구성된 이번 전시는 대여
                  작품을 통해 더욱더 풍성한 매력을 전합니다. 홍콩 리앙이
                  미술관(Liang Yi Museum)에서 소장 중인 일본도는 중국 프라이빗
                  컬렉션이 소유하고 있는 검날과 나란히 전시되고 프랑스 프라이빗
                  컬렉션 소유의 포스터와 드로잉은 19세기 말, 유럽이 일본의 모든
                  것에 열광했던 사조를 의미하는 ‘자포니즘(Japonism)’을 고스란히
                  드러냅니다.
                </p>
              </div>
            </div>
          </div>
          <div className="p-[50px]">
            <p>기간 : 2024년 12월 11일 ~ 2025년 4월 13일</p>
            <p>관람 시간 : 월요일 ~ 일요일, 오후 1시 ~ 오후 7시</p>
            <p>
              장소 : L’ÉCOLE Asia Pacific, School of Jewelry Arts, 510A, 5F, K11
              MUSEA, Hong Kong
            </p>
            <p>크레딧 : 모두 프라이빗 컬렉션 작품</p>
            <p>
              사진: 레꼴 주얼리 스쿨(L'ÉCOLE, School of Jewelry Arts) - 뱅자맹
              셸리(Benjamin Chelly)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KbrandModal;
