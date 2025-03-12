const RingSizeGuide = () => {
    return (
        <div className='w-full h-[800px] p-330 mt-[152px]'>
            <div className='py-5 px-8'>
                <div className=' text-center mt-[9px] font-secondary text-[37px] font-extrabold pb-[17px]'>
                    사이즈 가이드
                </div>
                <div className='text-[21px] font-extrabold mb-[20px] text-center'>손가락 사이즈 측정</div>
                <ul className='flex flex-col items-start gap-3 w-xl mx-auto my-10'>
                    <li className='flex items-center gap-10'>
                        <span>1.</span>
                        <p>너비 1cm(반 인치에 조금 못 미치는 길이)가 넘지 않는 끈이나 종이를 준비합니다.</p>
                    </li>
                    <li className='flex items-center gap-10'>
                        <span>2.</span>
                        <p>손가락의 가장 굵은 부분에 끈 혹은 종이를 두릅니다.</p>
                    </li>
                    <li className='flex items-center gap-10'>
                        <span>3.</span>
                        <p>끈 혹은 종이에 원이 만들어지는 지점을 펜으로 표시합니다. </p>
                    </li>
                    <li className='flex items-center gap-10'>
                        <span>4.</span>
                        <p>평평한 바닥에 표시된 끈 혹은 종이를 놓습니다.</p>
                    </li>
                    <li className='flex items-center gap-10'>
                        <span>5.</span>
                        <p>자를 사용해서 끈 혹은 종이의 끝부분부터 표시된 부분까지의 길이를 측정합니다.</p>
                    </li>
                    <li className='flex items-center gap-10'>
                        <span>6.</span>
                        <p>측정한 사이즈를 아래 차트와 비교하여 링 사이즈를 결정합니다.</p>
                    </li>
                </ul>
                <div className='text-center text-[13px] pt-[19px]'>
                    지수는 참고 지표로서 제공됩니다. 모든 반클리프 아펠(Van Cleef & Arpels) 작품은 수작업으로 제작되므로
                    크기는 제품마다 다소 차이가 날 수 있습니다.
                </div>
            </div>
        </div>
    );
};

export default RingSizeGuide;
