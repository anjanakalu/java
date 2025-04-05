Here’s the updated and comprehensive list, now including the **GraphQL Pagination** section:

---

### 1. **Pagination Parameters**
   - **`currentPage`**: The current page number being viewed.
   - **`pageSize`**: The number of items per page.
   - **`totalItems`**: Total number of items across all pages (needed for calculating `totalPages`).
   - **`totalPages`**: Total number of pages (calculated as `Math.ceil(totalItems / pageSize)`).

### 2. **Pagination Information to Track**
   - **`items`**: The data items for the current page.
   - **`startIndex` / `endIndex`**: The range of indices for items on the current page (optional for display purposes).
   - **`hasPreviousPage`**: Boolean indicating if there’s a previous page (`currentPage > 1`).
   - **`hasNextPage`**: Boolean indicating if there’s a next page (`currentPage < totalPages`).
   - **`isLoading`**: Boolean flag for when data is being fetched.

### 3. **UI Considerations**
   - **Page Numbers**: Display a range of page numbers like `[1, 2, 3, 4, ...]`.
   - **Next/Previous Buttons**: Provide buttons for navigating between pages.
   - **First/Last Buttons**: Optionally include buttons to go directly to the first or last page.
   - **Loading Spinner**: Display while new data is being fetched.
   - **Jump to Page**: Allow users to input a page number to jump to directly.
   - **Page Size Selector**: Optionally allow users to choose how many items per page.

### 4. **Backend Pagination (API Design)**
   - **Offset-based**: 
     - Use `offset` and `limit` (e.g., `offset = (currentPage - 1) * pageSize`).
   - **Cursor-based**: 
     - Use `after`/`before` with cursors for efficient navigation.
     - `pageInfo`: Include `hasNextPage`, `hasPreviousPage`, `startCursor`, `endCursor`.

   **Example for Offset-based Pagination:**
   ```graphql
   query {
     products(page: 1, pageSize: 10) {
       totalCount
       items { id, name, price }
     }
   }
   ```

   **Example for Cursor-based Pagination:**
   ```graphql
   query {
     products(first: 10, after: "cursor_value") {
       edges {
         node { id, name, price }
         cursor
       }
       pageInfo { hasNextPage, hasPreviousPage, startCursor, endCursor }
     }
   }
   ```

### 5. **GraphQL Pagination**
   For GraphQL APIs, pagination is often implemented with **cursor-based pagination** (using cursor fields) or **offset-based pagination**.

   #### **Cursor-based Pagination (Relay-style)**
   - **`pageInfo`**: Contains metadata about the page:
     - **`hasNextPage`**: Boolean indicating if there’s a next page of data.
     - **`hasPreviousPage`**: Boolean indicating if there’s a previous page of data.
     - **`startCursor`**: Cursor pointing to the first item in the current page.
     - **`endCursor`**: Cursor pointing to the last item in the current page.
   - **`edges`**: List of objects representing the data items, where each item contains:
     - **`node`**: The actual data item (the entity).
     - **`cursor`**: A unique identifier for the item used to fetch the next/previous page.

   **Example Query:**
   ```graphql
   query {
     products(first: 10, after: "cursor_value") {
       edges {
         node { id, name, price }
         cursor
       }
       pageInfo { hasNextPage, hasPreviousPage, startCursor, endCursor }
     }
   }
   ```

   #### **Offset-based Pagination**
   - **`totalCount`**: Total number of items.
   - **`items`**: List of items for the current page.
   - **`page`**: Current page number.
   - **`pageSize`**: Items per page.

   **Example Query:**
   ```graphql
   query {
     products(page: 1, pageSize: 10) {
       totalCount
       items { id, name, price }
     }
   }
   ```

### 6. **Edge Cases to Consider**
   - **Empty Pages**: Handle when there are no items to display on a page.
   - **Data Changes During Pagination**: Ensure that users' current page view is consistent even if the dataset changes (e.g., items are added/removed).
   - **Large Data Sets**: If the dataset is too large, consider lazy loading or infinite scrolling instead of traditional pagination.
   - **Error Handling**: Handle errors gracefully if data fetching fails during pagination.
