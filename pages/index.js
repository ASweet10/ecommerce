import React from 'react';
import { client } from '../LIB/client';

import Product from '../components/Product';
import HeroBanner from '../components/HeroBanner';
import FooterBanner from '../components/FooterBanner';

const index = ({ products, bannerData }) => (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>

      <div className="products-heading">
        <h2>Soccer products</h2>
        <p>Futbol</p>
      </div>

      <div className="products-container">

        {/* Loop over products & return product's name
              -(?) checking if products exist */}
        {products?.map((product) => <Product key={product._id} product={product} />)}
      </div>

      <FooterBanner footerBanner={bannerData.length && bannerData[0]}/>

    </div>
  );

export const getServerSideProps = async () => {
  //Grab all products from Sanity dashboard
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData}
  }
}
export default index;