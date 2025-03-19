import React, { useState } from 'react';
import KbrandModal from './components/KbrandModal';

import Now from './components/Now';
import All from './components/All';
import Unnow from './components/Unnow';

const Kbrand = () => {
  const data = [
    {
      id: 1,
      img: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/newsroom/2024/shakudo-exhibition/Key-Visual-H_ENTC-version.jpg',
      state: 'now',
      time: '월요일 ~ 일요일, 오후 1시 ~ 오후 7시',
      fromdata: '2024년 12월 11일 ~ 2025년 04월 13일',
      todate: '~ 2025년 04월 13일',
      space:
        'L’ÉCOLE Asia Pacific, School of Jewelry Arts, 510A, 5F, K11 MUSEA, Hong Kong',
      pic: "레꼴 주얼리 스쿨(L'ÉCOLE, School of Jewelry Arts) - 뱅자맹 셸리(Benjamin Chelly)",
      title: 'Shakudō: from Samurai Ornaments to Jewelry',
      totalTitle: '“A Glimpse of Van Cleef & Arpels’ Art de Vivre',
      description1:
        '비밀의 정원이라는 의미를 지닌 레 자뎅 시크릿(Les Jardins Secrets) 공간에서 열리는 이번 전시는 반클리프 아펠의 패트리모니 컬렉션 작품과 아카이브 문서를 감상하는 기회를 선사합니다. 또한 20세기의 주얼리 작품, 타임피스, 고귀한 오브제와 액세서리 작품을 통해 메종의 노하우와 영감을 불어넣는 원천을 발견하게 합니다. 작품들은 때로 특별한 주문을 통해 제작되고, 일부 액세서리는 특정한 기능을 갖춘 경우도 있습니다. 그중에 특히, 골드 및 크랩우드로 제작된 페이퍼 나이프와 향수 보틀, 그리고 길이 조절이 가능하도록 제작된 1960년대의 샴페인 스위즐이 돋보입니다. 메종은 1920년대부터 미러 폴리싱 처리된 옐로우 골드 소재로 제작된 작품을 선보이고 있습니다. 가드룬 형태로 제작된 쉘 파우더 케이스는 수 세기의 역사를 지닌 유서 깊은 테이블웨어의 제작 기법이 반영되었습니다. 이와 같이 반클리프 아펠은 종종 다른 예술 분야에서 받은 영감을 바탕으로, 입체적인 텍스처를 활용하여 골드의 아름다움을 극대화했고 1950년대부터 1970년대까지 부드러운 곡선으로 이어지는 링, 이어링, 워치 작품을 선보였습니다.',
      img1: [
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/raffles_art_of_living/van-cleef-arpels-page-page-raffles-exhibition-art-of-living-carrousel-2760-2760-01.jpg.transform.vca-h460-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/raffles_art_of_living/van-cleef-arpels-page-page-raffles-exhibition-art-of-living-carrousel-2760-2760-02.jpg.transform.vca-h460-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/raffles_art_of_living/van-cleef-arpels-page-page-raffles-exhibition-art-of-living-carrousel-2760-2760-03.jpg.transform.vca-h460-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/raffles_art_of_living/van-cleef-arpels-page-page-raffles-exhibition-art-of-living-carrousel-2760-2760-04.jpg.transform.vca-h460-1x.jpg',
      ],
      img2: [
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/raffles_art_of_living/van-cleef-arpels-page-page-raffles-exhibition-art-of-living-carrousel-2760-2760-03.jpg.transform.vca-h460-1x.jpg',
        'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/raffles_art_of_living/van-cleef-arpels-page-page-raffles-exhibition-art-of-living-carrousel-2760-2760-04.jpg.transform.vca-h460-1x.jpg',
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
      time: '월요일 ~ 일요일, 오후 12시 ~ 오후 8시',
      fromdata: '2024년 11월 25일 ~ 2025년 3월 23일',
      todate: '~ 2025년 03월 23일',
      space:
        '싱가포르 래플즈 호텔(Raffles Hotel), 레 자뎅 시크릿(Les Jardins Secrets)',
      pic: '',
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
      id: 3,
      img: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/aom---guangzhou/cover-aom-card.jpg',
      state: 'unnow',
      time: '월요일 ~ 일요일, 오후 12시 ~ 오후 8시',
      fromdata: '2024년 11월 25일 ~ 2025년 3월 23일',
      todate: '~ 2024년 09월 08일',
      space:
        '싱가포르 래플즈 호텔(Raffles Hotel), 레 자뎅 시크릿(Les Jardins Secrets)',
      pic: '',
      title: 'The Art of Movement',
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
      id: 4,
      img: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/pot-london-2024/VCA_Foret_Enchantee_CARROUSEL_Heures-Florales_2000x3000_01.jpg',
      state: 'unnow',
      time: '월요일 ~ 일요일, 오후 12시 ~ 오후 8시',
      fromdata: '2024년 11월 25일 ~ 2025년 3월 23일',
      todate: '~ 2024년 06월 09일',
      space:
        '싱가포르 래플즈 호텔(Raffles Hotel), 레 자뎅 시크릿(Les Jardins Secrets)',
      pic: '',
      title: '포에트리 오브 타임과 함께 떠나는 서정의 여정',
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
      id: 5,
      img: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/landing-exhibitions/van-cleef-arpels-page-raffles-exhibition-V2-cover-1080-1440.png',
      state: 'unnow',
      time: '월요일 ~ 일요일, 오후 12시 ~ 오후 8시',
      fromdata: '2024년 11월 25일 ~ 2025년 3월 23일',
      todate: '~ 2024년 06월 16일',
      space:
        '싱가포르 래플즈 호텔(Raffles Hotel), 레 자뎅 시크릿(Les Jardins Secrets)',
      pic: '',
      title: '반클리프 아펠의 고귀한 자연',
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
      id: 6,
      img: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/an-eye-for-beauty-exhibition-hk/van-cleef-arpels-page-exhibitions-1080-1440-2023-eye-for-beauty.jpg',
      state: 'unnow',
      time: '월요일 ~ 일요일, 오후 12시 ~ 오후 8시',
      fromdata: '2024년 11월 25일 ~ 2025년 3월 23일',
      todate: '~ 2024년 03월 31일',
      space:
        '싱가포르 래플즈 호텔(Raffles Hotel), 레 자뎅 시크릿(Les Jardins Secrets)',
      pic: '',
      title: '아름다움을 향한 시선, 일루미나타 주얼리 컬렉션',
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
      id: 7,
      img: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/the-art-of-movement-exhibition---wuhan/CARTE%20EXPO_1080x1440.jpg',
      state: 'unnow',
      time: '월요일 ~ 일요일, 오후 12시 ~ 오후 8시',
      fromdata: '2024년 11월 25일 ~ 2025년 3월 23일',
      todate: '~ 2023년 10월 02일',
      space:
        '싱가포르 래플즈 호텔(Raffles Hotel), 레 자뎅 시크릿(Les Jardins Secrets)',
      pic: '',
      title: 'The Art of Movement',
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
      id: 8,
      img: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/landing-exhibitions/van-cleef-arpels-page-exhibitions-1080-1440-2023-daniel-brush.jpg',
      state: 'unnow',
      time: '월요일 ~ 일요일, 오후 12시 ~ 오후 8시',
      fromdata: '2024년 11월 25일 ~ 2025년 3월 23일',
      todate: '~ 2023년 10월 06일',
      space:
        '싱가포르 래플즈 호텔(Raffles Hotel), 레 자뎅 시크릿(Les Jardins Secrets)',
      pic: '',
      title:
        '다니엘 브러쉬, 거듭나는 깨달음의 여정(Daniel Brush, an Edifying Journey) 전시회',
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
      id: 9,
      img: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/van-cleef---arpels--time,-nature,-love-riyadh/VCA_TimeNatureLove_EN-Posters-1575-2100.jpg',
      state: 'unnow',
      time: '월요일 ~ 일요일, 오후 12시 ~ 오후 8시',
      fromdata: '2024년 11월 25일 ~ 2025년 3월 23일',
      todate: '~ 2023년 04월 15일',
      space:
        '싱가포르 래플즈 호텔(Raffles Hotel), 레 자뎅 시크릿(Les Jardins Secrets)',
      pic: '',
      title:
        '반클리프 아펠: 시간, 자연, 사랑(Van Cleef & Arpels: Time, Nature, Love)',
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
      id: 10,
      img: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/landing-exhibitions/van-cleef-arpels-page-exhibitions-1080-1440-2022-men-rings.jpg',
      state: 'unnow',
      time: '월요일 ~ 일요일, 오후 12시 ~ 오후 8시',
      fromdata: '2024년 11월 25일 ~ 2025년 3월 23일',
      todate: '~ 2023년 01월 31일',
      space:
        '싱가포르 래플즈 호텔(Raffles Hotel), 레 자뎅 시크릿(Les Jardins Secrets)',
      pic: '',
      title: '맨즈 링, 이브 가스투(Yves Gastou) 컬렉션',
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
      id: 11,
      img: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/landing-exhibitions/van-cleef-arpels-page-exhibitions-1080-1440-2021-lacloche-online-exhibition.jpg',
      state: 'unnow',
      time: '월요일 ~ 일요일, 오후 12시 ~ 오후 8시',
      fromdata: '2024년 11월 25일 ~ 2025년 3월 23일',
      todate: '~ 2022년 04월 28일',
      space:
        '싱가포르 래플즈 호텔(Raffles Hotel), 레 자뎅 시크릿(Les Jardins Secrets)',
      pic: '',
      title:
        '파리의 주얼러 라클로슈, 1892년부터 1967년까지(Lacloche, Parisian Jewelers, 1892-1967)',
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
      id: 12,
      img: 'https://www.vancleefarpels.com/content/dam/vancleefarpels/La-Maison/exhibitions/landing-exhibitions/van-cleef-arpels-page-exhibitions-1080-1440-2021-art-of-gold.jpg',
      state: 'unnow',
      time: '월요일 ~ 일요일, 오후 12시 ~ 오후 8시',
      fromdata: '2024년 11월 25일 ~ 2025년 3월 23일',
      todate: '~ 2022년 08월 29일',
      space:
        '싱가포르 래플즈 호텔(Raffles Hotel), 레 자뎅 시크릿(Les Jardins Secrets)',
      pic: '',
      title: '아트 오브 골드',
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
  ];
  const [isModal, setIsModal] = useState(false);
  const handleClick = () => {
    setIsModal(!isModal);
  };
  const [selected, setSelected] = useState('all');
  const handleSelect = value => {
    setSelected(value);
  };
  return (
    <div className="max-w-7xl h-[100vh] bg-white flex justify-center items-center">
      <div className="flex w-screen">
        <ul className="ml-[330px] font-secondary font-extrabold text-[34px] flex flex-col gap-8 relative z-[10]">
          <li
            className={`hover:border-b-3 transition-all ${
              selected === 'all' ? 'text-gray-90' : 'text-gray-30'
            }`}
            onClick={() => handleSelect('all')}
          >
            All
          </li>
          <li
            className={`hover:border-b-3 transition-all ${
              selected === 'now' ? 'text-gray-90' : 'text-gray-30'
            }`}
            onClick={() => handleSelect('now')}
          >
            Now Exhibition
          </li>
          <li
            className={`hover:border-b-3 transition-all ${
              selected === 'unnow' ? 'text-gray-90' : 'text-gray-30'
            }`}
            onClick={() => handleSelect('unnow')}
          >
            Archive
          </li>
        </ul>
      </div>
      <div className="w-full flex justify-center items-center absolute top-1/2 -translate-y-2/4 left-1/2 -translate-x-2/4 ">
        {selected === 'all' && <All data={data} handleClick={handleClick} />}
        {selected === 'now' && <Now data={data} handleClick={handleClick} />}
        {selected === 'unnow' && (
          <Unnow data={data} handleClick={handleClick} />
        )}
      </div>
      {isModal ? <KbrandModal handleClick={handleClick} /> : ''}
    </div>
  );
};

export default Kbrand;
