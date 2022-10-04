//[Slug] in brackets causes slug to be rendered dynamically in URL
import React, {useState} from 'react';
import  { client, urlFor } from '../../LIB/client';
import { product } from '../../components';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from 'react-icons/ai';
import { useStateContext } from '../../context/StateContext';


const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product;
    const [index, setIndex] = useState(0);
  return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={ urlFor(image && image[index]) } className="product-detail-image"/>
                    </div>
                    <div className="small-images-container">
                        {image?.map((item, i) => (
                            <img src={urlFor(item)}
                                className={i === index ? 
                                'small-image selected-image' :
                                'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="product-detail-desc">
                <h1>{name}</h1>
                <div className="reviews">
                    <div>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p>Number of reviews(20)</p>
                </div>
                <h4>Details: </h4>
                <p>{details}</p>
                <p className="price">${price}</p>
                <div className="quanity">
                    <h3>Quantity</h3>
                    <p className="quantity-desc">
                        <span className="minus" onClick=""><AiOutlineMinus/></span>
                        <span className="num" onClick="">0</span>
                        <span className="plus" onClick=""><AiOutlinePlus/></span>
                    </p>
                </div>
                <div className="buttons">
                    <button type="button" className="add-to-cart" onclick="">Add To Cart</button>
                    <button type="button" className="buy-now" onclick="">Buy Now</button>
                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    {/* track causes images to slide smoothly across screen */}
                    <div className="maylike-products-container track">
                        {/* Map over each product and return product component for each item  */}
                        {products.map((item) => (
                            <Product key={item._id} product={item}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    //Return just the "slug" property of all products
    const query = `*[_type == "product"] { 
        slug {
            current
        }
    }`;

    const products = await client.fetch(query);

    const paths = products.map((product) =>({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        //With blocking, new paths that aren't returned by getStaticPaths will
        //  wait for the HTML to generate, then be cached for future use so that
        //  it only happens once per path
        fallback: 'blocking'
    }
}

//GetStaticProps pre-renders page at build time ahead of user's request using props
//https://nextjs.org/docs/basic-features/data-fetching/get-static-props
export const getStaticProps = async ({ params: { slug }}) => {

    //Fetch product details from current page (first page found with unique slug)
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    //Fetch all products
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
    const bannerQuery = '*[_type == "banner"]';
    const bannerData = await client.fetch(bannerQuery);
  
    return {
      props: { products, bannerData}
    }
  }

export default ProductDetails