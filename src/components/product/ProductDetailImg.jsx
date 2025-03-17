import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// 컴포넌트 내에서
const ProductDetailImg = () => {
    const { productID } = useParams();
    const productdata = useSelector((state) => state.productR.productdata);

    // 모든 카테고리의 제품을 하나의 배열로 합침
    let allProducts = [];
    if (productdata && Array.isArray(productdata)) {
        productdata.forEach((category) => {
            if (category.data && Array.isArray(category.data)) {
                allProducts = [...allProducts, ...category.data];
            }
        });
    }

    // 현재 제품 ID에 해당하는 제품 찾기
    const currentProduct = allProducts.find((item) => item.productid === parseInt(productID));

    return (
        <div className=" p-330 flex flex-col items-center">
            {currentProduct?.objectimage?.[0] && (
                <img src={currentProduct.objectimage[0]} className="w-[37%] object-contain mt-22" />
            )}
            {currentProduct?.objectimage?.[1] && (
                <img src={currentProduct.objectimage[1]} className="w-[37%] object-contain mt-20" />
            )}
            {currentProduct?.objectimage?.[2] && (
                <img src={currentProduct.objectimage[2]} className="w-[37%] object-contain" />
            )}
        </div>
    );
};
export default ProductDetailImg;
