import { GraphQLClient } from 'graphql-request';

// Type definitions for GraphQL responses
interface ShopifyImage {
  url: string;
  altText: string | null;
}

interface ProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

interface ProductsResponse {
  products: {
    edges: Array<{
      node: ProductNode;
    }>;
  };
}

interface SingleProductResponse {
  product: ProductNode;
}

interface CheckoutResponse {
  checkoutCreate: {
    checkout: {
      id: string;
      webUrl: string;
    };
    checkoutUserErrors: Array<{
      code: string;
      field: string[];
      message: string;
    }>;
  };
}

// Initialize GraphQL Client
const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || !process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  console.error('Missing Shopify environment variables. Please check your .env.local file.');
}

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
    'Content-Type': 'application/json',
  },
});

// GraphQL Queries
export const PRODUCTS_QUERY = `
  query Products {
    products(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
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
          currencyCode
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`;

export const CREATE_CHECKOUT_MUTATION = `
  mutation CheckoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

// Helper functions
export async function getProducts() {
  try {
    console.log('Fetching products from Shopify...');
    const data = await shopifyClient.request<ProductsResponse>(PRODUCTS_QUERY);
    console.log('Successfully fetched products');
    return data.products.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      description: node.description,
      handle: node.handle,
      price: node.priceRange.minVariantPrice.amount,
      currencyCode: node.priceRange.minVariantPrice.currencyCode,
      image: node.images.edges[0]?.node.url || '',
      variantId: node.variants.edges[0]?.node.id || '',
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    return [];
  }
}

export async function getProductByHandle(handle: string) {
  try {
    console.log(`Fetching product with handle: ${handle}`);
    if (!handle) {
      console.error('Product handle is undefined or empty');
      return null;
    }

    const data = await shopifyClient.request<SingleProductResponse>(
      PRODUCT_BY_HANDLE_QUERY,
      { handle }
    );

    if (!data || !data.product) {
      console.error('No product data returned from Shopify');
      return null;
    }

    console.log('Successfully fetched product data');
    const product = data.product;
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      handle: product.handle,
      price: product.priceRange.minVariantPrice.amount,
      currencyCode: product.priceRange.minVariantPrice.currencyCode,
      image: product.images.edges[0]?.node.url || '',
      variantId: product.variants.edges[0]?.node.id || '',
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack trace:', error.stack);
    }
    return null;
  }
}

export async function createCheckout(variantIds: string[]) {
  try {
    const data = await shopifyClient.request<CheckoutResponse>(
      CREATE_CHECKOUT_MUTATION,
      {
        input: {
          lineItems: variantIds.map(variantId => ({
            variantId,
            quantity: 1,
          })),
        },
      }
    );

    return data.checkoutCreate.checkout;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
} 