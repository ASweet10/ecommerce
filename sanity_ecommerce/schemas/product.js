export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{type: 'image'}],
            options: {
                hotspot: true, //Helps to responsively size images
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        //Slugs are unique strings used as part of URL
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string',
        },
        {
            name: 'productType',
            title: 'Product Type',
            type: 'string',
        }
    ]
}