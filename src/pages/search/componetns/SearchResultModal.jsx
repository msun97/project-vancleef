import React, { useEffect, useState, useRef } from 'react';
import CheckBox from '../../../components/checkbox';
import Button from '../../../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { searchActions } from '@/store/modules/searchSlice';
import { useParams } from 'react-router-dom';
import gsap from 'gsap';

const SearchResultModal = ({ onClick, originalData, handleFilterChange, isOpen }) => {
    const modalRef = useRef(null);
    const { keyword } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;

        const handleClickOutside = (event) => {
            if (modalRef.current && !event.composedPath().includes(modalRef.current)) {
                closeModal();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('mousedown', handleClickOutside);

            // 모달이 열릴 때 GSAP 애니메이션 적용
            if (modalRef.current) {
                gsap.set(modalRef.current, {
                    y: '-100%',
                    opacity: 0,
                });

                gsap.to(modalRef.current, {
                    y: '0%',
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power3.out',
                });
            }
        }

        return () => {
            document.body.style.overflow = originalStyle;
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const closeModal = () => {
        if (modalRef.current) {
            gsap.to(modalRef.current, {
                y: '-100%',
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: onClick,
            });
        } else {
            onClick();
        }
    };

    const groupPricesByMillionWon = (priceArray) => {
        const minPrice = Math.min(...priceArray);
        const maxPrice = Math.max(...priceArray);
        const millionWonGroups = [];
        const millionWon = 200000000;

        const startGroup = Math.floor(minPrice / millionWon) * millionWon;
        const endGroup = Math.ceil(maxPrice / millionWon) * millionWon;

        for (let i = startGroup; i < endGroup; i += millionWon) {
            millionWonGroups.push({
                range: `~ ${(i + millionWon).toLocaleString()}원`,
                min: i,
                max: i + millionWon,
            });
        }

        return millionWonGroups;
    };
    const price = originalData.map((item) => item.price);
    const priceRanges = groupPricesByMillionWon(price);

    const materialGroup = originalData.map((item) => item.subtitle.split(',')[0]);
    const setMaterial = new Set(materialGroup);
    const materialArray = [...setMaterial];

    const stoneSplit = originalData.map((item) => (item.stone ? item.stone.match(/[\w가-힣]+(?=:)/g) : [])).flat();
    const setStone = new Set(stoneSplit);
    const stoneArray = [...setStone];

    const { priceFilter, materialFilter, stonFilter, itemFilter } = useSelector((state) => state.searchR);

    const Defaultcategory = ['목걸이', '팔찌', '반지', '귀걸이'];
    const categoryIndex = originalData.map((item) => item.category);
    const setCategoryIndex = new Set(categoryIndex); // 중복 제거
    const categoryIndexArray = [...setCategoryIndex];
    const categoryGroup = categoryIndexArray.map((item) => ({
        categoryId: item,
        category: Defaultcategory[item],
    }));

    const [filterPrice, setFilterPrice] = useState(priceFilter);
    const [filterMaterial, setFilterMaterial] = useState(materialFilter);
    const [filterStone, setFilterStone] = useState(stonFilter);
    const [filterItems, setFilterItems] = useState(itemFilter);
    const filtered = {
        priceFilter: filterPrice,
        materialFilter: filterMaterial,
        stonFilter: filterStone,
        itemFilter: filterItems,
    };

    const filterButton = () => {
        dispatch(searchActions.setFiltered(filtered));
        closeModal();
    };

    const filteringPrice = (item) => {
        setFilterPrice((prev) => (prev.max === item.max ? {} : item));
        handleFilterChange();
    };
    const filteringMaterial = (item) => {
        setFilterMaterial((prev) => (prev === item ? '' : item));
        handleFilterChange();
    };

    const filteringStone = (item) => {
        setFilterStone((prev) => (prev === item ? '' : item));
        handleFilterChange();
    };
    const filteringItems = (item) => {
        setFilterItems((prev) => (prev === item ? '' : item));
        handleFilterChange();
    };

    const onReset = () => {
        setFilterPrice({});
        setFilterMaterial('');
        setFilterStone('');
        setFilterItems('');
        dispatch(searchActions.setFiltered({}));
        closeModal();
    };

    useEffect(() => {
        setFilterPrice({});
        setFilterMaterial('');
        setFilterStone('');
        setFilterItems('');
    }, [keyword]);

    if (!isOpen) return null;

    return (
        <div
            className='fixed w-full h-[100vh] bg-[rgba(0,0,0,0.5)] flex justify-center left-0 top-0'
            style={{ zIndex: 9999 }}
        >
            <div ref={modalRef} className='wrap bg-gray-0 p-[50px] w-full h-fit z-[1000] fixed'>
                <div className='title w-full flex justify-between mb-20'>
                    <h3 className='font-bold text-[20px]'>필터</h3>
                    <button onClick={onReset}>초기화</button>
                </div>
                <div className='fliters flex gap-10'>
                    <div className='price flex flex-col gap-10'>
                        <h4 className='text-[20px]'>가격대</h4>
                        <ul className='border border-gray-50 w-[220px] p-6 h-[240px] overflow-auto flex flex-col gap-5 '>
                            {priceRanges.map((range) => (
                                <li key={range.range} className='flex gap-1 items-center'>
                                    <CheckBox
                                        className='w-4 h-4 mr-2'
                                        id={range.max}
                                        checked={filterPrice.max === range.max}
                                        onChange={(checked) => filteringPrice(range)}
                                    />{' '}
                                    {range.range}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='subject flex flex-col gap-10'>
                        <h4 className='text-[20px]'>소재</h4>
                        <ul className='border border-gray-50 w-[220px] p-6 h-[240px] overflow-auto flex flex-col gap-5'>
                            {materialArray.map((material, idx) => (
                                <li key={idx} className='flex gap-1 items-center'>
                                    <CheckBox
                                        className='w-4 h-4 mr-2'
                                        id={material}
                                        checked={filterMaterial === material}
                                        onChange={(checked) => filteringMaterial(material)}
                                    />{' '}
                                    {material}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='jewraly flex flex-col gap-10'>
                        <h4 className='text-[20px]'>스톤</h4>
                        <ul className='border border-gray-50 w-[220px] p-6 pr-20 h-[240px] overflow-auto flex flex-col gap-4'>
                            {stoneArray.map((stone, idx) => (
                                <li key={idx} className='flex gap-1 items-center'>
                                    <CheckBox
                                        className='w-4 h-4 mr-2'
                                        id={stone}
                                        checked={filterStone === stone}
                                        onChange={(checked) => filteringStone(stone)}
                                    />{' '}
                                    {stone}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='item flex flex-col gap-10'>
                        <h4 className='text-[20px]'>아이템</h4>
                        <ul className='border border-gray-50 w-[220px] p-6 pr-20 h-[240px] overflow-auto flex flex-col gap-4'>
                            {categoryGroup.map((category, idx) => (
                                <li key={idx} className='flex gap-1 items-center'>
                                    <CheckBox
                                        className='w-4 h-4 mr-2'
                                        id={category.category}
                                        checked={filterItems === category.categoryId}
                                        onChange={(checked) => filteringItems(category.categoryId)}
                                    />{' '}
                                    {category.category}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='buttonWrap mt-10 w-full flex justify-end'>
                    <Button className='w-[250px] h-[55px]' onClick={filterButton}>
                        필터 적용
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SearchResultModal;
