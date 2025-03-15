### Complete Notes on Schema & Types, Resolver Functions, Query Variables, and Related Data for Beginners

GraphQL is a powerful query language for APIs that allows clients to request exactly the data they need. Below is a detailed breakdown of key concepts to help beginners understand how GraphQL works, focusing on **Schema & Types**, **Resolver Functions**, **Query Variables**, and **Related Data**.

---

#### 1. **Schema & Types**

The **schema** is the foundation of any GraphQL API. It defines the structure of the data and the relationships between different types of data. Think of it as a blueprint that tells the client what data is available and how it can be accessed.

- **Schema Definition**: The schema (often referred to as `typeDefs`) defines the structure of your data and relationships in GraphQL. It tells Apollo (or any GraphQL server) what types exist, their fields, and how they connect.

- **Types**: In GraphQL, types define the shape of the data. There are two main categories of types:
  - **Scalar Types**: These are basic data types like `Int`, `Float`, `String`, `Boolean`, and `ID`. They represent leaf nodes in your data structure (i.e., they don’t have sub-fields).
  - **Object Types**: These are custom types that you define to represent more complex data structures. For example, a `Game` type might have fields like `id`, `title`, and `platform`.

- **Relationships**: Types can have relationships with other types. For example:
  - A `Game` might have multiple `Review` objects.
  - A `Review` might be associated with an `Author`.

- **Exclamation Mark (`!`)**: This indicates that a field is **non-nullable**, meaning it must always return a value. For example, `title: String!` means the `title` field cannot be `null`.

- **Square Brackets (`[]`)**: These indicate a list of items. For example, `platform: [String!]!` means the `platform` field is a non-nullable list of non-nullable strings.

**Example Schema:**
```graphql
type Game {
  id: ID!  # Unique identifier, required
  title: String!  # Required string
  platform: [String!]!  # Array of non-null strings, required
  reviews: [Review]  # Array of Review objects, optional - no ! outside brackets
}

type Review {
  id: ID!  # Required
  rating: Int!  # Required integer
  content: String!  # Required string
  game: Game!  # A required related Game object
  author: Author!  # A required related Author object
}

type Author {
  id: ID!  # Required
  name: String!  # Required string
  verified: Boolean!  # Required true/false
  reviews: [Review!]  # Array of non-null Review objects, optional overall
}

type Query {
  reviews: [Review]  # Fetch all reviews
  review(id: ID!): Review  # Fetch a single review by ID
  games: [Game]  # Fetch all games
  game(id: ID!): Game  # Fetch a single game by ID
  authors: [Author]  # Fetch all authors
  author(id: ID!): Author  # Fetch a single author by ID
}
```

**Key Points to Remember:**
- **Usage**: The schema acts as a contract between the client and server, defining what data can be queried.
- **What to Map**: Map each type to its corresponding data structure in your database or data source.
- **Relationships**: Define relationships between types using fields (e.g., `Review.game` links a review to a game).

---

#### 2. **Resolver Functions**

Resolvers are functions that tell GraphQL how to fetch the data for each field in the schema. They are the bridge between the schema and the actual data source (e.g., a database).

- **Purpose**: Resolvers tell Apollo how to fetch or compute data for a query. They match the schema's structure.

- **Root Resolvers (Query)**:
  - Defined under `Query` in the resolvers object.
  - Handle top-level queries (entry points) like `games`, `review(id)`, etc.
  - **Arguments**: `(parent, args, context)`. Here, `args` provides query variables (e.g., `id`).

- **Nested Resolvers**:
  - Defined under specific types (e.g., `Game`, `Review`, `Author`) to resolve related data.
  - Use the `parent` argument to access the result of the previous resolver.

**Example Resolvers:**
```javascript
const resolvers = {
  Query: {
    games() {
      return db.games;  // Fetch all games
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);  // Fetch a game by ID
    },
    authors() {
      return db.authors;  // Fetch all authors
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);  // Fetch an author by ID
    },
    reviews() {
      return db.reviews;  // Fetch all reviews
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);  // Fetch a review by ID
    }
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id === parent.id);  // Fetch reviews for a specific game
    }
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id);  // Fetch reviews by a specific author
    }
  },
  Review: {
    author(parent) {
      return db.authors.find((a) => a.id === parent.author_id);  // Fetch the author of a review
    },
    game(parent) {
      return db.games.find((g) => g.id === parent.game_id);  // Fetch the game for a review
    }
  }
};
```

**Key Points to Remember:**
- **Usage**: Resolvers are like instructions: "If someone asks for this field, here's how to find the data."
- **Parent Argument**: Use the `parent` argument to access data from the previous resolver in the chain.
- **Resolver Chain**: Resolvers can nest. For example, `review → game → reviews` follows a chain:
  1. `Query.review` gets a review.
  2. `Review.game` gets the game for that review.
  3. `Game.reviews` gets all reviews for that game.

---

#### 3. **Query Variables**

Query variables allow you to pass dynamic values to your queries. They make your queries reusable and flexible.

- **What Are They?**: Variables passed into a query to make it dynamic (e.g., fetching a specific item by ID).
- `ID` is a built-in scalar type in GraphQL, just like String, Int, Float, or Boolean. `ID!` means the field or argument is required and cannot be null. In your query, `$id: ID!` is a variable that must be passed to fetch a specific game by its unique identifier.

- A `variable` is a placeholder in a GraphQL query that represents a dynamic value. Variables are prefixed with a `$` symbol `(e.g., $id)`.
- **Syntax**: Defined in the query and passed separately.

**Example Query with Variables:**
```graphql
query GetGame($id: ID!) {
  game(id: $id) {
    title
    platform
    reviews {
      rating
      content
    }
  }
}
```

**Variables:**
```json
{
  "id": "2"
}
```

**Key Points to Remember:**
- **Usage**: Variables make queries reusable and dynamic.
- **Syntax**: Define variables in the query and pass them as a separate dictionary.
- **Example**: Use `$id` to fetch a specific game or review by ID.

---

#### 4. **Related Data**

One of the most powerful features of GraphQL is the ability to fetch related data in a single query. For example, you can fetch a game, its reviews, and the authors of those reviews all in one request.

- **Relationships in Data**: The database (db) links objects via IDs. For example, `reviews` has `game_id` and `author_id` to connect to `games` and `authors`.

- **Defining Relationships in Schema**: Add fields to types to show connections (e.g., `Review.game: Game!`, `Game.reviews: [Review]`). Without these, Apollo won’t know how objects relate.

- **Fetching Related Data**: Apollo uses resolvers to "jump" from one object to another. For example:
  - Use `filter` for lists (e.g., all reviews for a game).
  - Use `find` for single items (e.g., one author for a review).

**Example Nested Query:**
```graphql
query GetGameWithReviews($id: ID!) {
  game(id: $id) {
    title
    platform
    reviews {
      rating
      content
      author {
        name
        verified
      }
    }
  }
}
```

**Key Points to Remember:**
- **Usage**: Related data allows you to fetch nested data in a single query.
- **Resolver Logic**: Use `filter` for lists and `find` for single items.
- **Flexibility**: You can nest queries as deep as the schema allows (e.g., `review → game → reviews`).

---

#### 5. **Data Structure**

The data structure should reflect the relationships defined in the schema. For example:
- Reviews should have `author_id` and `game_id` to link them to authors and games.
- Authors and games should have unique IDs.

**Example Data:**
```javascript
let games = [
  { id: '1', title: 'Zelda, Tears of the Kingdom', platform: ['Switch'] },
  { id: '2', title: 'Final Fantasy 7 Remake', platform: ['PS5', 'Xbox'] },
  { id: '3', title: 'Elden Ring', platform: ['PS5', 'Xbox', 'PC'] },
  { id: '4', title: 'Mario Kart', platform: ['Switch'] },
  { id: '5', title: 'Pokemon Scarlet', platform: ['PS5', 'Xbox', 'PC'] },
];

let authors = [
  { id: '1', name: 'mario', verified: true },
  { id: '2', name: 'yoshi', verified: false },
  { id: '3', name: 'peach', verified: true },
];

let reviews = [
  { id: '1', rating: 9, content: 'lorem ipsum', author_id: '1', game_id: '2' },
  { id: '2', rating: 10, content: 'lorem ipsum', author_id: '2', game_id: '1' },
  { id: '3', rating: 7, content: 'lorem ipsum', author_id: '3', game_id: '3' },
  { id: '4', rating: 5, content: 'lorem ipsum', author_id: '2', game_id: '4' },
  { id: '5', rating: 8, content: 'lorem ipsum', author_id: '2', game_id: '5' },
  { id: '6', rating: 7, content: 'lorem ipsum', author_id: '1', game_id: '2' },
  { id: '7', rating: 10, content: 'lorem ipsum', author_id: '3', game_id: '1' },
];
```

**Key Points to Remember:**
- **Usage**: The data structure should mirror the relationships defined in the schema.
- **What to Map**: Map each field in the schema to its corresponding data in the database.
- **Relationships**: Use IDs to link related data (e.g., `game_id` in reviews links to a game).

---

#### 6. **Summary**

- **Schema**: Defines the structure and relationships of your data.
- **Resolvers**: Fetch the data for each field in the schema.
- **Query Variables**: Allow dynamic values in queries.
- **Related Data**: Enables fetching nested data in a single query.
- **Data Structure**: Should reflect the relationships defined in the schema.

By understanding these concepts, you can effectively build and query a GraphQL API that handles related data. Happy coding! 🚀
