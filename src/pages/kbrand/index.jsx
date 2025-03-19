import React, { useState } from 'react';
import KbrandModal from './components/KbrandModal';

const Kbrand = () => {
  const data = [
    {
      id: 1,
      img: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/Key-Visual-H_ENTC-version.jpg',
      state: 'now',
      time: '월요일 ~ 일요일, 오후 1시 ~ 오후 7시',
      fromdata: '20241211',
      todate: '20250413',
      space:
        'L’ÉCOLE Asia Pacific, School of Jewelry Arts, 510A, 5F, K11 MUSEA, Hong Kong',
      pic: "레꼴 주얼리 스쿨(L'ÉCOLE, School of Jewelry Arts) - 뱅자맹 셸리(Benjamin Chelly)",
      title: 'Shakudō: from Samurai Ornaments to Jewelry',
      totalTitle:
        '“Shakudō: from Samurai Ornaments to Jewelry” at L’ ÉCOLE, School of Jewelry Arts in Hong Kong',
      description1:
        '레꼴 주얼리 스쿨은 샤쿠도(Shakudō)라 불리는 적동 기법에 대한 최초의 전시를 통해 사무라이의 일본도 장식에 전통적으로 적용된 블랙 메탈 소재의 기법, 용도, 그리고 흥미로운 역사를 깊이 탐구하며 조명합니다. 이번 전시에서 선보이는 유럽식 마운트를 갖춘 36피스의 주얼리 작품은 골드, 실버, 구리 인레이를 더한 적동 요소로 장식된 에도 시대(도쿄의 옛 이름)의 일본 풍경을 표현하고 있습니다. 작품 모두는 단일 프라이빗 컬렉션을 통해 확보되었고, 일반 대중을 대상으로, 최초로 공개됩니다.',
      img1: [
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/26%20-%20Brooch%20with%20a%20boat,%20Japan,%20late%201800s,%20gold%20and%20silver%20gilt%20shakudo.%20%20Private%20Collection.%20Photo%20-%20L%27ECOLE,%20School%20of%20Jewelry%20Arts%20-%20B.%20Chelly%20(2).jpg.transform.vca-w2560-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/26%20-%20Brooch%20with%20a%20boat,%20Japan,%20late%201800s,%20gold%20and%20silver%20gilt%20shakudo.%20%20Private%20Collection.%20Photo%20-%20L%27ECOLE,%20School%20of%20Jewelry%20Arts%20-%20B.%20Chelly.jpg.transform.vca-w2560-1x.jpg',
      ],
      img2: [
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/two%20brooches%20with%20peonies%20or%20chrysanthemums_2.jpg.transform.vca-w2560-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/two%20brooches%20with%20peonies%20or%20chrysanthemums.jpg.transform.vca-w2560-1x.jpg',
      ],
      img3: [
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/5%20-%20Bracelet,%20Japan,%20late%201800s,%20gold%20and%20silver-gilt.%20Private%20Collection.%20Photo%20-%20L%27ECOLE,%20School%20of%20Jewelry%20Arts%20-%20B.%20Chelly%20(2).jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/31%20-%20Buckle%20resembling%20a%20tsuba,%20Japan,%20late%201800s,%20gold%20and%20silver%20gilt%20shakudo.%20Private%20Collection.%20Photo%20-%20L%27ECOLE,%20School%20of%20Jewelry%20Arts.%20B%20Chelly%20(2).jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/11%20-%20Necklace,%20Japan,%201800s,%20gold%20and%20silver-gilt%20shakudo.%20Private%20Collection.%20Photo%20-%20L%27ECOLE,%20School%20of%20Jewelry%20Arts%20-%20B.%20Chelly%20(2).jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/12%20-%20Earrings,%20Japan,%20late%201800s,%20gold%20and%20silver-gilt%20shakudo.%20Private%20Collection.%20Photo%20-%20L%27ECOLE,%20School%20of%20Jewelry%20Arts%20-%20B.%20Chelly%20(1).jpg',
      ],
    },
    {
      id: 2,
      img: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/raffles_art_of_living/van-cleef-arpels-page-page-raffles-exhibition-art-of-living-cover-mobile-1080x1440.jpg',
      state: 'now',
      date: '20250322',
      title: 'A Glimpse of Van Cleef & Arpels’ Art de Vivre',
    },
    {
      id: 3,
      img: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/aom---guangzhou/cover-aom-card.jpg',
      state: 'unnow',
      date: '20240908',
      title: 'The Art of Movement',
    },
  ];
  const [isModal, setIsModal] = useState(false);
  const handleClick = () => {
    setIsModal(!isModal);
  };
  return (
    <div className="max-w-7xl h-[100vh] bg-white flex justify-center items-center">
      <div className="flex w-screen">
        <ul className="ml-[330px] font-secondary font-extrabold text-[34px] flex flex-col gap-8 relative z-[10]">
          <li className="border-b-3 border-transparent hover:border-black transition-all">
            All
          </li>
          <li className="border-b-3 border-transparent hover:border-black transition-all">
            Now Exhibition
          </li>
          <li className="border-b-3 border-transparent hover:border-black transition-all">
            Archive
          </li>
        </ul>
      </div>
      <div className="w-full flex justify-center items-center absolute top-1/2 -translate-y-2/4 left-1/2 -translate-x-2/4 ">
        <ul>
          {data.map(item => {})}
          <li
            className="relative group w-[280px] h-[480px] overflow-hidden"
            onClick={handleClick}
          >
            <img
              src="https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/Key-Visual-H_ENTC-version.jpg"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0) 0%, #CCD3B5 100%)',
              }}
            ></div>
            <div className="absolute inset-0 flex flex-col justify-end text-gray-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 gap-2 overflow-auto ">
              <p className="text-[12px] font-bold">~ 2025년 04월 13일</p>
              <p className="text-[16px] font-bold">
                Shakudō: from Samurai Ornaments to Jewelry
              </p>
            </div>
          </li>
        </ul>
      </div>
      {isModal ? <KbrandModal handleClick={handleClick} /> : ''}
    </div>
  );
};

export default Kbrand;
