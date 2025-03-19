import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const RecentItem = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.viewedProductsR.products);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && products) {
            currentUser.recentview = products; // products instead of recentview
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }, [products]);

    const formattedProducts = useMemo(() => {
        return products
            ? products.map((product) => ({
                  ...product,
                  formattedPrice: product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
              }))
            : [];
    }, [products]);

    return (
        <div className="mt-5">
            <ul className="flex flex-col">
                {formattedProducts.length > 0 ? (
                    formattedProducts.map((product) => (
                        <li key={product.productid} className="flex gap-2 text-[12px] leading-5 mb-3">
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
                                <div>KRW {product.formattedPrice}</div>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No recent items available</li>
                )}
            </ul>
        </div>
    );
};

export default RecentItem;
