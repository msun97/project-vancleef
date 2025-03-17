import React from 'react';
import { Link } from 'react-router-dom';

const ProductImg = ({ src, width, alt, title, className }) => {
    return (
        <div>
            <img src={src} width={width} alt={alt} title={title} className={className} />
        </div>
    );
};

export default ProductImg;
