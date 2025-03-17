import ProductImg from './ProductImg';
import ProductDescription from './ProductDescription';
import { Link } from 'react-router-dom';

const ProductListItem = ({ className, productdata }) => {
    return (
        <div className={`product-item ${className}`}>
            <div className="py-2.5 text-left text-[#1c1c1c]">
                <Link to={`/productdetail/${productdata.productid}`}>
                    <div key={productdata.productid}>
                        <ProductImg
                            src={productdata.objectimage[0]} // 첫 번째 이미지 가져오기
                            width={500}
                            alt={productdata.title}
                            title={productdata.title}
                            className="rounded-t-[900px] h-[391px] w-full bg-[#F1F1F1] object-contain"
                        />
                        <ProductDescription productdata={productdata} />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ProductListItem;
