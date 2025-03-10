// queries/products.js

export const PRODUCTS_QUERY = `
{
  products(first: 10) {
    edges {
      node {
        id
        title
        handle
        images(first: 1) {
          edges {
            node {
              url
              altText
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
      }
    }
  }
}
`;
