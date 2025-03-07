import React from 'react';

const MotiveGuide = () => {
    return (
        <div className="w-full h-[500px]  p-330">
            <div className="border border-gray-300 ">
                <h1 className="text-center text-[42px] font-secondary font-extrabold">Van Cleef & Arpels</h1>
                <p className="mt-[20px] text-center">시리즈명</p>
                <div className=" text-center mt-[9px] font-secondary text-[37px] font-extrabold">
                    모티브 사이즈 가이드
                </div>
                <div className="w-full flex justify-center gap-2">
                    <div>
                        <img src="/images/size/sweet-1.PNG" alt="스위트알함브라" width={'250px'} height={'209px'} />
                        <div>
                            <div>
                                <img src="/images/size/size1.PNG" alt="스위트 사이즈 크기" />
                            </div>
                            <div>
                                <p className="text-center">0.37인치</p>
                            </div>
                            <div>
                                <p className="text-center">9.5mm</p>
                            </div>
                            <div className="text-center">스위트 알함브라</div>
                        </div>
                    </div>
                    <div>
                        <img src="/images/size/vintate-2.PNG" alt="스위트알함브라" width={'250px'} height={'209px'} />
                        <div>
                            <div className="text-center">
                                <img src="/images/size/size2.PNG" alt="스위트 사이즈 크기" />
                            </div>
                            <div>
                                <p className="text-center">0.37인치</p>
                            </div>
                            <div>
                                <p className="text-center">9.5mm</p>
                            </div>
                            <div className="text-center">스위트 알함브라</div>
                        </div>
                    </div>
                    <div>
                        <img src="/images/size/pure-3.PNG" alt="스위트알함브라" width={'250px'} height={'209px'} />
                        <div>
                            <div>
                                <img src="/images/size/size3.PNG" alt="스위트 사이즈 크기" />
                            </div>
                            <div>
                                <p className="text-center">0.37인치</p>
                            </div>
                            <div>
                                <p className="text-center">9.5mm</p>
                            </div>
                            <div className="text-center">스위트 알함브라</div>
                        </div>
                    </div>
                    <div>
                        <img src="/images/size/magin-4.PNG" alt="스위트알함브라" width={'250px'} height={'209px'} />
                        <div>
                            <div className="w-full ">
                                <img
                                    src="/images/size/size4.PNG"
                                    alt="스위트 사이즈 크기"
                                    className='className="block mx-auto" '
                                />
                            </div>
                            <div>
                                <p className="text-center">0.37인치</p>
                            </div>
                            <div>
                                <p className="text-center">9.5mm</p>
                            </div>
                            <div className="text-center">스위트 알함브라</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MotiveGuide;
