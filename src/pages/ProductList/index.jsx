import React, { useEffect } from 'react';
import Rellax from 'rellax'; // Rellax.js 임포트
import { IoIosHeartEmpty } from 'react-icons/io';

const ProductListPage = () => {
    useEffect(() => {
        // Rellax 초기화
        const rellax = new Rellax('.rellax');

        // 컴포넌트 언마운트 시 리소스 정리
        return () => {
            rellax.destroy();
        };
    }, []);
    return (
        <div className='w-full h-auto relative bg-fixed bg-[url("/images/productListPageBg.png")] bg-no-repeat bg-top bg-cover'>
            <div className="w-full h-full pb-[100px]">
                <div className="w-full h-full p-330 pb-[180px] flex text-white font-secondary pt-[219px] ">
                    {/* */}
                    <div className="min-w-[250px] pt-0 pb-12 mt-1 mb-0 ml-0 mr-0 relative w-[26%]  ">
                        <div className="fixed top-[240px]">
                            <ul>
                                <li>
                                    <a href="" className="text-content-xxxl font-semibold">
                                        SHOP
                                    </a>

                                    <li>
                                        <ul className="text-content-l leading-18 font-semibold">
                                            <li>
                                                <a href="">All</a>
                                            </li>
                                            <ul className="submenu font-bold text-content-l hidden">
                                                <li>
                                                    <a href="../goods/goods_list.php?cateCd=001001001">Category-1</a>
                                                </li>
                                                <li>
                                                    <a href="../goods/goods_list.php?cateCd=001001002">Category-2</a>
                                                </li>
                                                <li>
                                                    <a href="../goods/goods_list.php?cateCd=001001003">Category-3</a>
                                                </li>
                                                <li>
                                                    <a href="../goods/goods_list.php?cateCd=001001004">Category-4</a>
                                                </li>
                                            </ul>
                                            <li>
                                                <a href="../goods/goods_list.php?cateCd=001007">New</a>
                                            </li>
                                            <li>
                                                <a href="../goods/goods_list.php?cateCd=001003">Best</a>
                                            </li>
                                            <li>
                                                <a href="../goods/goods_list.php?cateCd=001004">선물하기</a>
                                            </li>
                                        </ul>
                                    </li>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="pb-12 w-[74%] font-primary">
                        <p className="pb-5 text-[45px] min-h-[85px] font-secondary">All</p>
                        <div>
                            <div className="mb-[25px] relative">
                                <div>
                                    <span className="w-[128px]  inline-block relative font-primary tracking-wider">
                                        FILTER
                                        <img
                                            src="https://pbcommerce.cdn-nhncommerce.com/data/skin/front/m2021_VnA/img/icon/goods_icon/filter.png"
                                            className="absolute top-0 right-[50px]"
                                        />
                                    </span>
                                    <ul className="hidden w-[128px] bg-white py-2.5 text-black leading-[2]">
                                        <li className="h-[33px] radio-label">
                                            <input
                                                type="radio"
                                                id="sort1"
                                                name="sort"
                                                value=""
                                                className="radio-custom"
                                            />
                                            <label for="sort1" className="px-2.5 radio-custom-indicator">
                                                추천순
                                            </label>
                                        </li>
                                        <li className="h-[33px] radio-label">
                                            <input
                                                type="radio"
                                                id="sort2"
                                                name="sort"
                                                value="sellcnt"
                                                className="radio-custom"
                                            />
                                            <label for="sort2" className="px-2.5 radio-custom-indicator">
                                                판매인기순
                                            </label>
                                        </li>
                                        <li className="h-[33px] radio-label">
                                            <input
                                                type="radio"
                                                id="sort3"
                                                name="sort"
                                                value="price_asc"
                                                className="radio-custom"
                                            />
                                            <label for="sort3" className="px-2.5 radio-custom-indicator">
                                                낮은가격순
                                            </label>
                                        </li>
                                        <li className="h-[33px] radio-label">
                                            <input
                                                type="radio"
                                                id="sort4"
                                                name="sort"
                                                value="price_dsc"
                                                className="radio-custom"
                                            />
                                            <label for="sort4" className="px-2.5 radio-custom-indicator">
                                                높은가격순
                                            </label>
                                        </li>
                                    </ul>
                                    {/* detail nav */}
                                </div>
                            </div>
                            <div>
                                <div className="productList pb-[30px]">
                                    <div className="relative w-full">
                                        <div className="flex">
                                            <ul
                                                className="rellax relative w-full pt-[20px] pb-[28px]"
                                                data-rellax-speed="-3"
                                            >
                                                {/* 왼쪽 */}
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]   min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2l/BZ/wZ/IW/LU/KT/lh/_j/cx/ZQ/iA/2lBZwZIWLUKTlh_jcxZQiA.png.transform.vca-w820-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/97/cV/oJ/i8/yU/OP/p7/1z/AD/XV/5A/97cVoJi8yUOPp71zADXV5A.png.transform.vca-w820-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul
                                                className="rellax relative w-full pt-[100px] pb-[28px]"
                                                data-rellax-speed="-3"
                                            >
                                                {/* 오른쪽 */}
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]   min-h-[360px] mt-[70px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="transition-all duration-1000 ease-in-out top-0  bg-white p-[25px_30px_33px]  mt-[55px] min-h-[360px] mr-[7%]">
                                                    <div className="py-2.5 text-left text-[#1c1c1c]">
                                                        <div>
                                                            <a href="">
                                                                <img
                                                                    src="https://www.vancleefarpels.com/content/dam/rcq/vca/2p/PD/VX/nA/6E/qi/FX/7H/TV/JO/zw/2pPDVXnA6EqiFX7HTVJOzw.png.transform.vca-w350-1x.png"
                                                                    width="500"
                                                                    alt="스위트 버터플라이 펜던트"
                                                                    title="스위트 버터플라이 펜던트"
                                                                    className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1]"
                                                                />
                                                            </a>
                                                        </div>

                                                        <div>
                                                            {/* text */}
                                                            <div>
                                                                <a href="">
                                                                    <strong className="pt-3.5 font-secondary flex items-center justify-between text-[22px] break-all text-[#282828] tracking-[-1.1px] font-medium border-b-[1px] border-[#d2d2d2] pb-2">
                                                                        스위트 버터플라이 펜던트
                                                                        <IoIosHeartEmpty color="black" />
                                                                    </strong>
                                                                </a>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5">
                                                                <strong>₩2,380,000 </strong>

                                                                <strong>
                                                                    <span className="line-through text-[#6D6D6D]">
                                                                        <strong className="text-[#6D6D6D]">
                                                                            ₩2,000,000
                                                                        </strong>
                                                                    </span>
                                                                </strong>
                                                                <strong className="text-[#e4a690]">20%</strong>
                                                            </div>

                                                            <div className="flex gap-2 pt-2.5 items-center h-8">
                                                                <div className="border border-black font-bold py-1 px-3.5 rounded-lg bg-black text-white">
                                                                    NEW
                                                                </div>
                                                                <div className="py-1 px-3.5  text-white rounded-lg font-bold bg-[#74C365]">
                                                                    BEST
                                                                </div>
                                                                <div className="border border-black py-1 px-3.5 rounded-lg font-bold">
                                                                    기획
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;
