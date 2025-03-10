// hooks/fetchshopify.ts

// Optional: Type for Shopify response (customize as needed)
export interface ShopifyResponse<T = any> {
  data: T;
  errors?: any;
}

/**
 * Fetch data from Shopify Storefront API using a GraphQL query.
 * @param query - GraphQL query string.
 * @param variables - Optional variables for the query.
 * @returns A promise that resolves to the JSON response from Shopify.
 */
export async function fetchShopify<T = any>(
  query: string,
  variables: Record<string, any> = {}
): Promise<ShopifyResponse<T>> {
  // Read environment variables
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  // Ensure all required env variables are available
  if (!domain || !apiVersion || !token) {
    throw new Error(
      "Missing one or more required environment variables: NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN, NEXT_PUBLIC_SHOPIFY_API_VERSION, NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN"
    );
  }

  // Construct the endpoint URL
  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

  // Make the fetch request
 const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    
    
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Shopify fetch error: ${response.status} ${errorText}`);
  }

  // Return the parsed JSON response
  return response.json();
}
