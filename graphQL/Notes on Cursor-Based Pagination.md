
# Notes on Cursor-Based Pagination

## Index
- [Overview](#overview)
- [Key Points](#key-points)
- [Implemented Features](#implemented-features)
- [Improvements](#improvements)
- [Variable Definitions](#variable-definitions)
- [GraphQL Schema (Complete)](#graphql-schema-complete)
- [Resolvers (Complete)](#resolvers-complete)
- [Query Sample (Apollo Client)](#query-sample-apollo-client)
- [Query Sample (React with Apollo)](#query-sample-react-with-apollo)
- [Potential Further Enhancements](#potential-further-enhancements)

---

## Overview <a id="overview"></a>
Cursor-based pagination, inspired by Relay, uses opaque cursors to mark positions within a dataset, offering a scalable and stable alternative to offset-based pagination. It's particularly suited for large datasets and dynamic data environments where records are frequently added or removed.

---

## Key Points <a id="key-points"></a>
- **Relay-Style**: Follows the Connection/Edge/PageInfo pattern for a consistent, standardized structure.
- **Components**:
  - **Edge**: Pairs a node (data item) with its cursor for pagination tracking. (node + cursor) `{ node: <data (e.g., Product Obj)>, cursor: <unique string> }`
  - **Node**: The primary entity (e.g., Product/ Product Obj).
  - **Cursor**: An opaque, unique string (e.g., base64-encoded ID), Used in pagination queries (`after` or `before` cursors to fetch the `next/previous` page).
  - **PageInfo**: Metadata for navigation, including `startCursor`, `endCursor`, `hasNextPage`, and `hasPreviousPage`.
    - `startCursor` (cursor of the first item in the current page).
    - `endCursor` (cursor of the last item in the current page).
    - `hasNextPage` (boolean, true if more items exist after the current page).
    - `hasPreviousPage` (boolean, true if more items exist before the current page).
  - **TotalCount**: The total number of items in the filtered dataset.
- **Mechanics**:
  - **Forward Pagination**: Uses `first` (number of items to fetch) and `after` (cursor) to move forward.
  - **Backward Pagination**: Uses `last` (number of items to fetch) and `before` (cursor) to move backward.
  - **Cursor Role**: Encodes a stable position (e.g., based on ID), resilient to dataset changes like insertions or deletions.
- **Return Structure**: A `ProductConnection` object encapsulates `edges`, `pageInfo`, and `totalCount` for a complete response.
- **Advantages**:
  - **Stability**: Unaffected by data modifications, unlike offset-based methods.
  - **Performance**: Enables efficient lookups (e.g., via indexed queries) instead of scanning large offsets.
  - **Flexibility**: Supports filtering, sorting, and bidirectional navigation.
- **Filters**: Applied pre-pagination (e.g., `searchText`, `category`) to ensure an accurate `totalCount`.
- **Sorting**: Controlled by `sortBy` (e.g., "Product Name") and `sortOrder` (`ASC` or `DESC`), maintaining cursor consistency.

---

## Implemented Features <a id="implemented-features"></a>
This implementation enhances the standard cursor-based pagination with the following features:
- **Bidirectional Navigation**: Supports both forward (`first`, `after`) and backward (`last`, `before`) pagination for flexible traversal.
- **Sorting Flexibility**: 
  - `sortBy`: Allows sorting by fields like "Product Name" or "prod_id" (mapped to `name` and `prod_id` internally).
  - `sortOrder`: Adds ascending (`ASC`) or descending (`DESC`) direction, defaulting to `ASC`.
- **Enhanced PageInfo**: Includes `startCursor` alongside `endCursor` for symmetry, debugging, and bidirectional clarity.
- **Filtering**: Pre-pagination filters (e.g., `searchText`, `category`) ensure accurate results and `totalCount`.
- **Error Handling**: 
  - Validates conflicting args (e.g., using `first` and `last` together).
  - Handles invalid cursors and empty datasets gracefully.
- **Infinite Scroll Support**: Optimized for client-side infinite scrolling with Apollo Client integration.
- **Human-Readable Sort Fields**: Uses "Product Name" instead of "name" for better readability and developer experience.
- **Stable Cursors**: Base64-encoded `prod_id` ensures cursors remain stable within a given sort order.

---

## Improvements <a id="improvements"></a>
- **Error Handling**: Added checks for invalid cursors, conflicting pagination args, and edge cases like empty datasets.
- **Sorting**: Enhanced with `sortBy` and `sortOrder` for customizable ordering, applied before pagination.
- **Client Integration**: Optimized for real-world use cases like infinite scrolling with clear loading states.
- **Clarity**: Added `startCursor` to `PageInfo` and improved documentation for better understanding.

---

## Variable Definitions <a id="variable-definitions"></a>
What each variable will accept based on its assigned value:

- **first (number)** – Specifies the number of items to fetch (likely for pagination).  
  ✅ **Accepts**: Positive integers (e.g., 10, 20).

- **after (string | null)** – Typically used for cursor-based pagination.  
  ✅ **Accepts**: A cursor (string) or null if no cursor is provided.

- **skip (number)** – Specifies how many items to skip.  
  ✅ **Accepts**: Non-negative integers (e.g., 0, 2, 5).

- **searchText (string)** – A text string for filtering results by name, description, etc.  
  ✅ **Accepts**: Any string (e.g., "laptop", "phone").

- **categories (string[])** – A list of category names for filtering.  
  ✅ **Accepts**: An array of strings (e.g., ["Electronics", "Portable"]).

- **brand (string)** – A single brand name for filtering.  
  ✅ **Accepts**: A string (e.g., "TechCo", "Apple").

- **sortBy (string)** – The field by which to sort the results.  
  ✅ **Accepts**: A string representing a valid field name (e.g., "Product Name", "Price").

- **sortOrder ("ASC" | "DESC")** – The sorting direction.  
  ✅ **Accepts**: "ASC" (ascending) or "DESC" (descending).

---

## GraphQL Schema (Complete) <a id="graphql-schema-complete"></a>

```graphql
# schema/product.typeDefs.js

# Enum for sort direction
enum SortOrder {
  ASC   # Ascending (default)
  DESC  # Descending
}

# Represents a paginated item with its position
type ProductEdge {
  cursor: String!       # Opaque, unique position identifier
  node: Product!        # The Product entity
}

# Pagination navigation metadata
type PageInfo {
  endCursor: String     # Last item's cursor in this page, null if empty
  hasNextPage: Boolean! # Indicates more items after this page
  hasPreviousPage: Boolean! # Indicates items before this page
  startCursor: String   # First item's cursor, null if empty
}

# Container for paginated results
type ProductConnection {
  edges: [ProductEdge!]!    # Non-nullable array of edges, empty if no items
  pageInfo: PageInfo!       # Non-nullable navigation info
  totalCount: Int!          # Total items in filtered dataset
}

# Simplified Product entity
type Product {
  prod_id: ID!
  name: String!
}

type Query {
  products(
    first: Int          # Number of items forward (optional)
    after: String       # Cursor to start after (optional)
    last: Int           # Number of items backward (optional)
    before: String      # Cursor to start before (optional)
    searchText: String  # Filter by text (optional)
    category: String    # Filter by category (optional)
    sortBy: String      # Sort field (e.g., "Product Name", "prod_id", optional)
    sortOrder: SortOrder # Sort direction (ASC or DESC, optional)
  ): ProductConnection! # Always returns a connection object
}
```

**Notes**:
- `sortBy` uses "Product Name" for readability, mapped to `name` in the resolver.
- `sortOrder` defaults to `ASC` if not provided.

---

## Resolvers (Complete) <a id="resolvers-complete"></a>

```javascript
// schema/product.resolvers.js
const { base64encode, base64decode } = require('nodejs-base64');

const resolvers = {
  Query: {
    products: async (
      _,
      { first, after, last, before, searchText, category, sortBy, sortOrder = 'ASC' },
      { dataSources }
    ) => {
      try {
        // Fetch all products (replace with DB query)
        let products = dataSources.products.getAll();

        // Apply filters
        if (searchText) {
          products = products.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()));
        }
        if (category) {
          products = products.filter(p => p.category === category);
        }

        // Map "Product Name" to "name" field
        const fieldMap = { "Product Name": "name", "prod_id": "prod_id" };
        const sortField = fieldMap[sortBy] || sortBy; // Fallback to raw sortBy if unmapped

        // Sort (stable ordering for cursors)
        if (sortField) {
          products.sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];
            if (sortOrder === 'ASC') {
              return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            } else {
              // DESC
              return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
            }
          });
        }

        const totalCount = products.length;

        // Validate pagination args
        if (first && last) throw new Error('Cannot use both "first" and "last"');
        if ((first || after) && (last || before)) {
          throw new Error('Mixing forward and backward pagination is invalid');
        }

        // Decode cursors
        const decodeCursor = cursor => (cursor ? parseInt(base64decode(cursor)) : null);
        const afterId = decodeCursor(after);
        const beforeId = decodeCursor(before);

        // Determine slice
        let startIndex = afterId
          ? products.findIndex(p => p.prod_id === afterId) + 1
          : 0;
        let endIndex = beforeId
          ? products.findIndex(p => p.prod_id === beforeId)
          : totalCount;

        if (startIndex === -1 || endIndex === -1) {
          throw new Error('Invalid cursor provided');
        }

        if (first) {
          endIndex = Math.min(startIndex + first, totalCount);
        } else if (last) {
          startIndex = Math.max(endIndex - last, 0);
        }

        const paginatedProducts = products.slice(startIndex, endIndex);

        // Build edges
        const edges = paginatedProducts.map(product => ({
          cursor: base64encode(product.prod_id.toString()), // Stable cursor
          node: product,
        }));

        // PageInfo
        const pageInfo = {
          startCursor: edges.length > 0 ? edges[0].cursor : null,
          endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null,
          hasNextPage: endIndex < totalCount,
          hasPreviousPage: startIndex > 0,
        };

        return { edges, pageInfo, totalCount };
      } catch (error) {
        throw new Error(`Pagination error: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
```

**Notes**:
- Maps "Product Name" to `name` via `fieldMap` for consistency with the schema.
- Sorting occurs before pagination to ensure stable cursors.

---

## Query Sample (Apollo Client) <a id="query-sample-apollo-client"></a>

```javascript
import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts($first: Int, $after: String, $searchText: String, $sortBy: String, $sortOrder: SortOrder) {
    products(first: $first, after: $after, searchText: $searchText, sortBy: $sortBy, sortOrder: $sortOrder) {
      edges {
        cursor
        node {
          prod_id
          name
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;

// Usage: Sort by Product Name descending
client
  .query({
    query: GET_PRODUCTS,
    variables: {
      first: 5,
      after: null,
      searchText: "laptop",
      sortBy: "Product Name",
      sortOrder: "DESC",
    },
  })
  .then(result => {
    console.log(JSON.stringify(result.data.products, null, 2));
  })
  .catch(error => console.error('Query error:', error.message));
```

**Output Example**:
```json
{
  "edges": [
    {
      "cursor": "cHJvZF8z",
      "node": { "prod_id": "prod_3", "name": "Laptop Z" }
    },
    {
      "cursor": "cHJvZF8y",
      "node": { "prod_id": "prod_2", "name": "Laptop B" }
    }
  ],
  "pageInfo": {
    "startCursor": "cHJvZF8z",
    "endCursor": "cHJvZF8y",
    "hasNextPage": true
  },
  "totalCount": 20
}
```

---

## Query Sample (React with Apollo) <a id="query-sample-react-with-apollo"></a>

```jsx
// components/ProductList.jsx
import React, { useCallback } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts($first: Int, $after: String, $searchText: String, $sortBy: String, $sortOrder: SortOrder) {
    products(first: $first, after: $after, searchText: $searchText, sortBy: $sortBy, sortOrder: $sortOrder) {
      edges {
        cursor
        node {
          prod_id
          name
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`;

const ProductList = () => {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(GET_PRODUCTS, {
    variables: { 
      first: 10, 
      after: null, 
      searchText: "laptop", 
      sortBy: "Product Name", 
      sortOrder: "DESC" 
    },
    notifyOnNetworkStatusChange: true,
  });

  const loadMore = useCallback(() => {
    if (!data?.products.pageInfo.hasNextPage) return;
    fetchMore({
      variables: { first: 10, after: data.products.pageInfo.endCursor },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          products: {
            ...fetchMoreResult.products,
            edges: [...prev.products.edges, ...fetchMoreResult.products.edges],
          },
        };
      },
    });
  }, [data, fetchMore]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !loading &&
        data?.products.pageInfo.hasNextPage
      ) {
        loadMore();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data, loading, loadMore]);

  if (loading && !data) return <p>Loading initial data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { edges, pageInfo, totalCount } = data.products;

  return (
    <div>
      <h2>Products (Total: {totalCount}) - Sorted by Product Name (Descending)</h2>
      <ul>
        {edges.map(({ node, cursor }) => (
          <li key={node.prod_id}>
            {node.name} (ID: {node.prod_id}, Cursor: {cursor})
          </li>
        ))}
      </ul>
      {networkStatus === 3 && <p>Loading more...</p>}
      {!pageInfo.hasNextPage && edges.length > 0 && <p>No more products to load.</p>}
    </div>
  );
};

export default ProductList;
```

---

## Potential Further Enhancements <a id="potential-further-enhancements"></a>
- **Sort Field Validation**: Restrict `sortBy` to valid fields (e.g., "Product Name", "prod_id").
- **Composite Sorting**: Allow multiple sort fields (e.g., `sortBy: ["category", "Product Name"]`).
- **Advanced Cursors**: Encode additional data (e.g., timestamp) for datasets with frequent updates.

---
