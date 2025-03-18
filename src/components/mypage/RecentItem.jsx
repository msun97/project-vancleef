import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RecentItem = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.viewedProductsR.products);
    console.log(products);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            currentUser.recentview = products; // products 대신 recentview로 저장
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }, [products]);

    return (
        <div className="mt-5">
            <ul className="flex flex-col">
                {products &&
                    products.map((product) => (
                        <li
                            key={product.productid}
                            className="flex gap-2 text-[12px] leading-5 pt-[19px] pb-[19px]"
                        >
                            <img
                                src={product.objectimage[0]}
                                alt={product.title}
                                style={{ width: '100px', height: '100px' }}
                                className="border border-gray-200"
                            />
                            <div className="w-full flex justify-between ">
                                <div>
                                    <div>{product.title}</div>
                                    <div className="text-[#757575]">{product.subtitle}</div>
                                </div>
                                <div>
                                    KRW{" "}
                                    {product.price
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </div>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default RecentItem;
