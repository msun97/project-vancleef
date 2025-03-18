import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RecentItem = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.viewedProductsR.products);
    console.log(products);
    return (
        <div className="mt-5">
            <ul className="flex flex-col">
                {products &&
                    products.map(
                        (
                            product // viewedProducts.products 사용
                        ) => (
                            <li key={product.productid} className="flex gap-2 text-[12px] leading-5">
                                <img
                                    src={product.objectimage[0]}
                                    alt={product.title}
                                    style={{ width: '100px', height: '100px' }}
                                    className="border border-gray-200"
                                />
                                <div className="w-full flex justify-between ">
                                    <div>
                                        <div>{product.title}</div>
                                        <div className="text-[#757575] ">{product.subtitle}</div>
                                    </div>
                                    <div>KRW {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                </div>
                            </li>
                        )
                    )}
            </ul>
        </div>
    );
};

export default RecentItem;
