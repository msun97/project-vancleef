import React from 'react';

const ProductImg = ({ src, width, alt, title, className }) => {
    return (
        <div>
            <a href="">
                <img src={src} width={width} alt={alt} title={title} className={className} />
            </a>
        </div>
    );
};

export default ProductImg;
