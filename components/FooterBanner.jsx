import React from 'react'
import Link from  'next/Link'

import { urlFor } from "../LIB/client";

const FooterBanner = ( {footerBanner: {
  discount, largeText1, largeText2, saleTime, smallText, midText,
    product, buttonText, image
}} ) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h1>{largeText1}</h1>
          <h1>{largeText2}</h1>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <Link href={'/product/${product}'}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <img src={ urlFor(image)} className="footer-banner-image" />

      </div>
    </div>
  )
}

export default FooterBanner