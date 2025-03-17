import ProductImg from './ProductImg';
import ProductDescription from './ProductDescription';
import { Link } from 'react-router-dom';

const ProductListItem = ({ className, productdata }) => {
    const { category, categoryId, productid, objectimage, title, subtitle } = productdata;
    return (
        <div className={`product-item ${className}`}>
            <div className="py-2.5 text-left text-[#1c1c1c]">
                <Link to={`/productdetail/${category}/${productid}`}>
                    {/* // 링크 눌렀을 때 경로 이동 productdata 객체에 category 필드에서 안쪽 productid로 이동 to=""는 동적으로 전달될 path를 넣어준다.*/}
                    <div key={productid}>
                        <ProductImg
                            src={objectimage[0]} // 첫 번째 이미지 가져오기
                            width={500}
                            alt={title}
                            title={title}
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
