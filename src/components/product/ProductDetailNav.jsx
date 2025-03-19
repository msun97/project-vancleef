const ProductDetailNav = () => {
    const handleScrollView = (event) => {
        const name = event.target.innerText; //이벤트가 발생한 HTML 요소를 가져옴,해당 요소의 텍스트 내용을 가져옴

        // 해당 id를 가진 요소로 스크롤
        const element = document.getElementById(name);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <ul
                className="w-full h-full font-bold flex justify-center text-center text-xl cursor-pointer"
                onClick={handleScrollView}
            >
                <li className="w-2xs">상세정보</li>
                <li className="w-2xs">리뷰</li>
                <li className="w-2xs">상품고시</li>
                <li className="w-2xs">상품문의</li>
            </ul>
        </>
    );
};

export default ProductDetailNav;
