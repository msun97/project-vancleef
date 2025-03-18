const ProductDetailImg = ({ productImages, title }) => {
    if (!productImages || !Array.isArray(productImages) || productImages.length === 0) {
        return <div className="no-images">이미지를 찾을 수 없습니다.</div>;
    }

    return (
        <div className="p-330 flex flex-col items-center mt-24">
            {productImages.map((imageUrl, index) => (
                <img
                    key={index}
                    src={imageUrl}
                    alt={`${title} - 이미지 ${index + 1}`}
                    style={{ objectFit: 'contain', width: '500px', maxWidth: '100%' }}
                    className="mb-40"
                />
            ))}
        </div>
    );
};

export default ProductDetailImg;
