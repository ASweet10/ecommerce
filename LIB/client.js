import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId: '6seujxin',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

//To use sanity images
const builder = imageUrlBuilder(client);

//Sanity gives access to where URLs are stored
export const urlFor = (source) => builder.image(source);