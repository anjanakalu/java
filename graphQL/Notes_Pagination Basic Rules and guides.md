# **GraphQL Pagination Guide**  

## **1️⃣ Pagination Rules**  

### **General Rules**  
1. **Cursor-based Pagination**  
   - Each element (**node**) has a **cursor** (e.g., base64-encoded `prod_id`).  
   - **`startCursor`** → Cursor of the first item in the fetched data.  
   - **`endCursor`** → Cursor of the last item in the fetched data.  

2. **Navigation**  
   - **Forward Pagination** (`first + after`) → Uses `first` and `after`.  If `after is null`, fetch from the beginning.
   - **Backward Pagination** (`last + before`) → Uses `last` and `before`.  If `before is null`, fetch from the end (last items).
 
   - Cannot mix **forward (`first`/`after`) and backward (`last`/`before`) pagination** in the same request.  

3. **Initial Fetch**  
   - If **`after`** is not provided, fetch starts from the beginning.  

4. **Restrictions**  
   - **Cannot use both `first` and `last` together**
   - If `first` and `after` are used, `last` and `before` must not be present.
   - If `last` and `before` are used, `first` and `after` must not be present.
   - **Cursors must be valid** → If `after` or `before` is invalid or undecodable, an error is thrown.  
---

### **2️⃣ Pagination Logic**  

#### **Forward Pagination (`first` & `after`)**  
- If **`after`** is null, start from the **beginning** of the dataset.  
- Otherwise, find the item **immediately after** the decoded `after` cursor.  
- **Fetch up to** `first` items starting from the computed start index or after the `after` cursor.

#### **Backward Pagination (`last` & `before`)**  
- If **`before`** is null, start from the **last items** in the dataset.  
- Otherwise, find the item **immediately before** the decoded `before` cursor.  
- **Fetch up to** `last` items ending at the computed end index or before the `before` cursor.

#### **Determine Slice Indices**  
- If **`after`** is provided, start from the item **immediately after** the decoded `after` cursor.  
- If **`before`** is provided, end at the item **immediately before** the decoded `before` cursor.  
- If **neither `after` nor `before`** is provided, consider the **entire dataset**.

#### **Apply Pagination Limits**  
- If **`first`** is provided, retrieve **up to** `first` items **starting from** the computed start index or **after the `after` cursor**.  
- If **`last`** is provided, retrieve **up to** `last` items **ending at** the computed end index or **before the `before` cursor**.

#### **Ensure Valid Indices**  
- If **`startIndex` or `endIndex` is `-1`**, throw an **invalid cursor** error.  
- Ensure indices **stay within dataset boundaries** (`0 ≤ index ≤ totalCount`).  
---

### **3️⃣ Building the Response**  

#### **Edges (Paginated Items)**  
Each item should have:  
- **`cursor`** → Base64-encoded unique identifier (e.g., `prod_id`).  
- **`node`** → The actual item data.  

#### **PageInfo Object**  
- **`startCursor`** → Cursor of the first item in the result set.  
- **`endCursor`** → Cursor of the last item in the result set.  
- **`hasNextPage`** → `true` if there are more items **after** `endCursor`.  
- **`hasPreviousPage`** → `true` if there are more items **before** `startCursor`.  

---
Here are the examples with corresponding GraphQL queries and responses, as requested:

### 4️⃣ Pagination Examples

#### Example 1: Fetch First 5 Items (1-5)
**GraphQL Query**
```graphql
query {
  products(first: 5) {
    edges {
      cursor
      node {
        id
        name
        price
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
```
**Response**
```json
{
  "data": {
    "products": {
      "edges": [
        { "cursor": "MQ==", "node": { "id": 1, "name": "Product A", "price": 10.0 } },
        { "cursor": "Mg==", "node": { "id": 2, "name": "Product B", "price": 15.0 } },
        { "cursor": "Mw==", "node": { "id": 3, "name": "Product C", "price": 20.0 } },
        { "cursor": "NA==", "node": { "id": 4, "name": "Product D", "price": 25.0 } },
        { "cursor": "NQ==", "node": { "id": 5, "name": "Product E", "price": 30.0 } }
      ],
      "pageInfo": {
        "startCursor": "MQ==",
        "endCursor": "NQ==",
        "hasNextPage": true,
        "hasPreviousPage": false
      }
    }
  }
}
```
Use `endCursor = "NQ=="` for the next request.

#### Example 2: Fetch Next 5 Items (6-10)
**GraphQL Query**
```graphql
query {
  products(first: 5, after: "NQ==") {
    edges {
      cursor
      node {
        id
        name
        price
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
```
**Response**
```json
{
  "data": {
    "products": {
      "edges": [
        { "cursor": "NjA=", "node": { "id": 6, "name": "Product F", "price": 35.0 } },
        { "cursor": "NjE=", "node": { "id": 7, "name": "Product G", "price": 40.0 } },
        { "cursor": "NjI=", "node": { "id": 8, "name": "Product H", "price": 45.0 } },
        { "cursor": "NjM=", "node": { "id": 9, "name": "Product I", "price": 50.0 } },
        { "cursor": "NjQ=", "node": { "id": 10, "name": "Product J", "price": 55.0 } }
      ],
      "pageInfo": {
        "startCursor": "NjA=",
        "endCursor": "NjQ=",
        "hasNextPage": true,
        "hasPreviousPage": true
      }
    }
  }
}
```

#### Example 3: Fetch Last 5 Items (Last 5)
**GraphQL Query**
```graphql
query {
  products(last: 5) {
    edges {
      cursor
      node {
        id
        name
        price
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
```
**Response**
```json
{
  "data": {
    "products": {
      "edges": [
        { "cursor": "Mjk1", "node": { "id": 295, "name": "Product 295", "price": 295.0 } },
        { "cursor": "MzAw", "node": { "id": 296, "name": "Product 296", "price": 296.0 } },
        { "cursor": "MzAx", "node": { "id": 297, "name": "Product 297", "price": 297.0 } },
        { "cursor": "MzAy", "node": { "id": 298, "name": "Product 298", "price": 298.0 } },
        { "cursor": "MzAz", "node": { "id": 299, "name": "Product 299", "price": 299.0 } }
      ],
      "pageInfo": {
        "startCursor": "Mjk1",
        "endCursor": "MzAz",
        "hasNextPage": false,
        "hasPreviousPage": true
      }
    }
  }
}
```

#### Example 4: Fetch Previous 5 Items (Last 5 Again)
**GraphQL Query**
```graphql
query {
  products(last: 5, before: "Mjk1") {
    edges {
      cursor
      node {
        id
        name
        price
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
```
**Response**
```json
{
  "data": {
    "products": {
      "edges": [
        { "cursor": "Mjg5", "node": { "id": 290, "name": "Product 290", "price": 290.0 } },
        { "cursor": "Mjkw", "node": { "id": 291, "name": "Product 291", "price": 291.0 } },
        { "cursor": "Mjkx", "node": { "id": 292, "name": "Product 292", "price": 292.0 } },
        { "cursor": "Mjk2", "node": { "id": 293, "name": "Product 293", "price": 293.0 } },
        { "cursor": "Mjk3", "node": { "id": 294, "name": "Product 294", "price": 294.0 } }
      ],
      "pageInfo": {
        "startCursor": "Mjg5",
        "endCursor": "Mjk3",
        "hasNextPage": true,
        "hasPreviousPage": true
      }
    }
  }
}
```
Here are the examples with corresponding GraphQL queries and responses, as requested:

### 4️⃣ Pagination Examples

#### Example 1: Fetch First 5 Items (1-5)
**GraphQL Query**
```graphql
query {
  products(first: 5) {
    edges {
      cursor
      node {
        id
        name
        price
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
```
**Response**
```json
{
  "data": {
    "products": {
      "edges": [
        { "cursor": "MQ==", "node": { "id": 1, "name": "Product A", "price": 10.0 } },
        { "cursor": "Mg==", "node": { "id": 2, "name": "Product B", "price": 15.0 } },
        { "cursor": "Mw==", "node": { "id": 3, "name": "Product C", "price": 20.0 } },
        { "cursor": "NA==", "node": { "id": 4, "name": "Product D", "price": 25.0 } },
        { "cursor": "NQ==", "node": { "id": 5, "name": "Product E", "price": 30.0 } }
      ],
      "pageInfo": {
        "startCursor": "MQ==",
        "endCursor": "NQ==",
        "hasNextPage": true,
        "hasPreviousPage": false
      }
    }
  }
}
```
Use `endCursor = "NQ=="` for the next request.

#### Example 2: Fetch Next 5 Items (6-10)
**GraphQL Query**
```graphql
query {
  products(first: 5, after: "NQ==") {
    edges {
      cursor
      node {
        id
        name
        price
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
```
**Response**
```json
{
  "data": {
    "products": {
      "edges": [
        { "cursor": "NjA=", "node": { "id": 6, "name": "Product F", "price": 35.0 } },
        { "cursor": "NjE=", "node": { "id": 7, "name": "Product G", "price": 40.0 } },
        { "cursor": "NjI=", "node": { "id": 8, "name": "Product H", "price": 45.0 } },
        { "cursor": "NjM=", "node": { "id": 9, "name": "Product I", "price": 50.0 } },
        { "cursor": "NjQ=", "node": { "id": 10, "name": "Product J", "price": 55.0 } }
      ],
      "pageInfo": {
        "startCursor": "NjA=",
        "endCursor": "NjQ=",
        "hasNextPage": true,
        "hasPreviousPage": true
      }
    }
  }
}
```

#### Example 3: Fetch Last 5 Items (Last 5)
**GraphQL Query**
```graphql
query {
  products(last: 5) {
    edges {
      cursor
      node {
        id
        name
        price
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
```
**Response**
```json
{
  "data": {
    "products": {
      "edges": [
        { "cursor": "Mjk1", "node": { "id": 295, "name": "Product 295", "price": 295.0 } },
        { "cursor": "MzAw", "node": { "id": 296, "name": "Product 296", "price": 296.0 } },
        { "cursor": "MzAx", "node": { "id": 297, "name": "Product 297", "price": 297.0 } },
        { "cursor": "MzAy", "node": { "id": 298, "name": "Product 298", "price": 298.0 } },
        { "cursor": "MzAz", "node": { "id": 299, "name": "Product 299", "price": 299.0 } }
      ],
      "pageInfo": {
        "startCursor": "Mjk1",
        "endCursor": "MzAz",
        "hasNextPage": false,
        "hasPreviousPage": true
      }
    }
  }
}
```

#### Example 4: Fetch Previous 5 Items (Last 5 Again)
**GraphQL Query**
```graphql
query {
  products(last: 5, before: "Mjk1") {
    edges {
      cursor
      node {
        id
        name
        price
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
```
**Response**
```json
{
  "data": {
    "products": {
      "edges": [
        { "cursor": "Mjg5", "node": { "id": 290, "name": "Product 290", "price": 290.0 } },
        { "cursor": "Mjkw", "node": { "id": 291, "name": "Product 291", "price": 291.0 } },
        { "cursor": "Mjkx", "node": { "id": 292, "name": "Product 292", "price": 292.0 } },
        { "cursor": "Mjk2", "node": { "id": 293, "name": "Product 293", "price": 293.0 } },
        { "cursor": "Mjk3", "node": { "id": 294, "name": "Product 294", "price": 294.0 } }
      ],
      "pageInfo": {
        "startCursor": "Mjg5",
        "endCursor": "Mjk3",
        "hasNextPage": true,
        "hasPreviousPage": true
      }
    }
  }
}
```
Here’s the updated summary table with an additional column indicating whether the query uses `startCursor` or `endCursor`:

### 5️⃣ Summary Table

| Step | Query                              | Items Fetched | Cursor Used         |
|------|------------------------------------|---------------|---------------------|
| 1️⃣  | `{ first: 5 }`                     | 1 - 5         |       From Begining |
| 2️⃣  | `{ first: 5, after: "NQ==" }`      | 6 - 10        | "NQ==" is `endCursor` Again Forward (next 5)        |
| 3️⃣  | `{ last: 5 }`                      | 295 - 299     |   From Last    |
| 4️⃣  | `{ last: 5, before: "Mjk1" }`      | 290 - 294     | "Mjk1" is `startCursor`  Again Backward (previous 5)         |
