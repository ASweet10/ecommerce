import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from "../LIB/client";

const Product = ({ product: { image, name, slug, price }}) => {
  return (
    <div>
      {/* Links to dynamic URL of unique product slug */}
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image 
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product