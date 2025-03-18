---

# Complete Guide to Apollo Server for Beginners

This guide explains the Apollo Server setup, schema design, resolver implementation, and CRUD operations in a beginner-friendly way. It includes inline comments to help you understand what each part of the code does.

## Table of Contents

1. [Apollo Server Setup](#1-apollo-server-setup)
   - [Installation](#11-installation)
   - [Project Structure](#12-project-structure)
2. [Mock Data (`_db.js`)](#2-mock-data-_dbjs)
3. [Schema (`schema.js`)](#3-schema-schemajs)
4. [Resolvers (`index.js`)](#4-resolvers-indexjs)
   - [Resolvers in Apollo Server: Query Resolvers, Type Resolver, Mutation Resolvers](#41-resolvers-in-apollo-server-query-resolvers-type-resolver-mutation-resolvers)
   - [Query Resolvers](#42-query-resolvers)
   - [Type Resolvers](#43-type-resolvers)
   - [When Are Resolvers Required?](#44-when-are-resolvers-required)
   - [Key Differences](#45-key-differences)
   - [Example: Combining Query and Type Resolvers](#46-example-combining-query-and-type-resolvers)
5. [CRUD Operations](#5-crud-operations)
   - [Fetch All Games](#51-fetch-all-games)
   - [Fetch a Single Game by ID (Including Nested Data)](#52-fetch-a-single-game-by-id-including-nested-data)
   - [Add a New Game](#53-add-a-new-game)
   - [Delete a Game](#54-delete-a-game)
   - [Update a Game](#55-update-a-game)
6. [Key Concepts](#6-key-concepts)
   - [Resolvers](#61-resolvers)
   - [Difference Between `game` and `games`](#62-difference-between-game-and-games)
   - [Nested Queries](#63-nested-queries)
   - [Relationships](#64-relationships)
7. [Things to Keep in Mind While Designing Schema](#7-things-to-keep-in-mind-while-designing-schema)
   - [Schema Definitions Explained](#71-schema-definitions-explained)
     - [`type Game`](#711-type-game)
     - [`type Review`](#712-type-review)
     - [`type Author`](#713-type-author)
     - [`type Query`](#714-type-query)
     - [`type Mutation`](#715-type-mutation)
     - [`input AddGameInput`](#716-input-addgameinput)
   - [GraphQL Naming Considerations & Resolver Mapping](#72-graphql-naming-considerations--resolver-mapping)
8. [Step-by-Step Flow for a Query in Apollo Server](#8-step-by-step-flow-for-a-query-in-apollo-server)
   - [Simple Query Example: Fetching All Games](#81-simple-query-example-fetching-all-games)
   - [Nested Query Example: Fetching Games with Reviews](#82-nested-query-example-fetching-games-with-reviews)

---

## 1. Apollo Server Setup

### 1.1 Installation

1. Install Node.js from [nodejs.org](https://nodejs.org/).
2. Create a project folder and initialize a Node.js project:

   ```bash
   mkdir apollo-server
   cd apollo-server
   npm init -y
   ```

3. Install required dependencies:

   ```bash
   npm install @apollo/server graphql nodemon
   ```

### 1.2 Project Structure

```plaintext
apollo-server/
│
├── index.js         # Main server file
├── schema.js        # GraphQL type definitions
├── _db.js           # Mock database
└── package.json
```

---

## 2. Mock Data (`_db.js`)

This file contains mock data for games, authors, and reviews. Relationships are established using `game_id` and `author_id`.

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

// Reviews link games and authors using game_id and author_id
let reviews = [
  { id: '1', rating: 9, content: 'lorem ipsum', author_id: '1', game_id: '2' },
  { id: '2', rating: 10, content: 'lorem ipsum', author_id: '2', game_id: '1' },
  { id: '3', rating: 7, content: 'lorem ipsum', author_id: '3', game_id: '3' },
  { id: '4', rating: 5, content: 'lorem ipsum', author_id: '2', game_id: '4' },
  { id: '5', rating: 8, content: 'lorem ipsum', author_id: '2', game_id: '5' },
  { id: '6', rating: 7, content: 'lorem ipsum', author_id: '1', game_id: '2' },
  { id: '7', rating: 10, content: 'lorem ipsum', author_id: '3', game_id: '1' },
];

export default { games, authors, reviews };
```

---

## 3. Schema (`schema.js`)

The schema defines the structure of the data and the operations that can be performed.

```javascript
export const typeDefs = `#graphql
  # Define the Game type
  type Game {
    id: ID!               # Unique identifier for the game
    title: String!        # Title of the game
    platform: [String!]!  # Platforms the game is available on
    reviews: [Review]     # List of reviews for the game
  }

  # Define the Review type
  type Review {
    id: ID!               # Unique identifier for the review
    rating: Int!          # Rating of the review (1-10)
    content: String!      # Content of the review
    game: Game!           # The game this review belongs to
    author: Author!       # The author who wrote the review
  }

  # Define the Author type
  type Author {
    id: ID!               # Unique identifier for the author
    name: String!         # Name of the author
    verified: Boolean!    # Whether the author is verified
    reviews: [Review!]    # List of reviews written by the author
  }

  # Define the Query type (entry points for fetching data)
  type Query {
    reviews: [Review]     # Get all reviews
    review(id: ID!): Review # Get a single review by ID
    games: [Game]         # Get all games
    game(id: ID!): Game   # Get a single game by ID
    authors: [Author]     # Get all authors
    author(id: ID!): Author # Get a single author by ID
  }

  # Define the Mutation type (entry points for modifying data)
  type Mutation {
    addGame(game: AddGameInput): Game       # Add a new game
    deleteGame(id: ID!): [Game]             # Delete a game by ID
    updateGame(id: ID!, edits: EditGameInput!): Game # Update a game by ID
  }

  # Input type for adding a new game
  input AddGameInput {
    title: String!         # Title of the game
    platform: [String!]!   # Platforms the game is available on
  }

  # Input type for updating a game
  input EditGameInput {
    title: String          # New title for the game
    platform: [String!]    # New platforms for the game
  }
`;
```

---

## 4. Resolvers (`index.js`)

Resolvers handle the logic for fetching or modifying data. They match the fields defined in the schema.

```javascript
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import db from './_db.js'; // Import mock data
import { typeDefs } from './schema.js'; // Import schema

// Resolvers define how to fetch or modify data
const resolvers = {
  // Entry points for queries
  // Query Resolvers (query resolvers when you need to fetch data for the top-level fields in your query)
  Query: {
    // Get all games
    games() {
      return db.games;
    },
    // Get a single game by ID
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    // Get all authors
    authors() {
      return db.authors;
    },
    // Get a single author by ID
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
    // Get all reviews
    reviews() {
      return db.reviews;
    },
    // Get a single review by ID
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
  },

  // Resolvers for nested fields
  // Type Resolvers (type resolvers when you need to resolve nested fields in your schema)
  Game: {
    // Get reviews for a specific game
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    // Get reviews written by a specific author
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    // Get the game associated with a review
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
    // Get the author associated with a review
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
  },

  // Entry points for mutations
  Mutation: {
    // Delete a game by ID
    deleteGame(_, args) {
      db.games = db.games.filter((g) => g.id !== args.id);
      return db.games;
    },
    // Add a new game
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(), // Generate a random ID
      };
      db.games.push(game);
      return game;
    },
    // Update a game by ID
    updateGame(_, args) {
      db.games = db.games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits }; // Merge existing game with new edits
        }
        return g;
      });
      return db.games.find((g) => g.id === args.id);
    },
  },
};

// Create the Apollo Server
const server = new ApolloServer({
  typeDefs, // Schema
  resolvers, // Resolvers
});

// Start the server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log('Server ready at port', 4000);
```

### 4.1 Resolvers in Apollo Server: Query Resolvers, Type Resolver, Mutation Resolvers

Resolvers are functions that **fetch or compute data** for fields in your GraphQL schema. They are divided into two types:

### 4.2 Query Resolvers

- **Definition**: Query resolvers handle **top-level fields** in the `Query` type of your schema. These fields are the entry points for fetching data in a GraphQL query.
- **When to Use**: Use query resolvers when you need to fetch data for **root-level queries** (e.g., `games`, `game`, `authors`).
- **Where Defined**: Defined under the `Query` key in the resolvers object.
- **Parent Argument**: Not applicable, as these resolvers handle top-level fields.
- **Example**:
  ```javascript
  const resolvers = {
    Query: {
      games() {
        return db.games; // Fetch all games
      },
      game(_, args) {
        return db.games.find((game) => game.id === args.id); // Fetch a single game by ID
      },
    },
  };
  ```

### 4.3 Type Resolvers

- **Definition**: Type resolvers handle **nested fields** within specific types (e.g., `reviews` in `Game`, `game` in `Review`). They are used to resolve fields that depend on the parent object.
- **When to Use**: Use type resolvers when you need to fetch data for **nested fields** in your schema (e.g., fetching reviews for a game or the author of a review).
- **Where Defined**: Defined under the type name (e.g., `Game`, `Review`, `Author`) in the resolvers object.
- **Parent Argument**: Receives the **parent object** (the result of the parent resolver) as context to resolve nested fields.
- **Example**:
  ```javascript
  const resolvers = {
    Game: {
      reviews(parent) {
        return db.reviews.filter((review) => review.game_id === parent.id); // Fetch reviews for a game
      },
    },
    Review: {
      game(parent) {
        return db.games.find((game) => game.id === parent.game_id); // Fetch the game for a review
      }
      // ...
    }
  }
  ```
What is the parent Argument?  
When you define a resolver for a field (e.g., `reviews` in the `Game` type), the `parent` argument represents the parent object that contains the field being resolved. In this case: The `parent` object is the `Game` object. The `parent.id` is the `id` field of the `Game` object.

### 4.4 When Are Resolvers Required?

- **Query Resolvers**: Required for every field defined in the `Query` type. These resolvers are mandatory for root-level queries.
- **Type Resolvers**: Required for every field in a type that **cannot be resolved directly from the parent object**. For example:
  - If a field is computed (e.g., `reviews` in `Game`).
  - If a field requires additional data fetching (e.g., `game` in `Review`).

### 4.5 Key Differences

| **Aspect**         | **Query Resolvers**                          | **Type Resolvers**                          |
|---------------------|----------------------------------------------|---------------------------------------------|
| **Definition**      | Handle top-level fields in the `Query` type. | Handle nested fields within specific types. |
| **When to Use**     | Fetching data for root-level queries.        | Fetching data for nested fields.            |
| **Where Defined**   | Under the `Query` key in resolvers.          | Under the type name (e.g., `Game`, `Review`). |
| **Parent Argument** | Not applicable.                              | Receives the parent object for context.     |

### 4.6 Example: Combining Query and Type Resolvers

#### Schema
```graphql
type Query {
  games: [Game]
  game(id: ID!): Game
}

type Game {
  id: ID!
  title: String!
  platform: [String!]!
  reviews: [Review]
}
```

---

### Summary
- **Query Resolvers**: Handle top-level fields in the `Query` type. Use them for root-level queries.
- **Type Resolvers**: Handle nested fields within specific types. Use them for resolving fields that depend on the parent object or require additional data fetching.
- **When Required**:
  - Query resolvers are required for every field in the `Query` type.
  - Type resolvers are required for nested fields that cannot be resolved directly from the parent object.

---

## 5. CRUD Operations

### 5.1 Fetch All Games

**Purpose:** Retrieve a list of all games.

**Query:**

```graphql
query GameQuery {
  games {
    id
    platform
    title
  }
}
```

**What to do:**
- Use this query to fetch all games.
- No variables are required.
- Returns `id`, `platform`, and `title` for each game.

---

### 5.2 Fetch a Single Game by ID (Including Nested Data)

**Purpose:** Retrieve details of a specific game by its ID, including nested data like reviews.

**Query:**

```graphql
query GameQuery($id: ID!) {  # Define a query operation named GameQuery, which takes a variable $id of type ID
  game(id: $id) {            # Call the game query with the provided id variable to fetch a single game
    id                       # Fetch the unique identifier of the game
    platform                 # Fetch the platforms the game is available on
    title                    # Fetch the title of the game
    reviews {                # Fetch nested data: reviews associated with the game
      content                # Fetch the content of the review
      rating                 # Fetch the rating of the review
    }
  }
}
```

**Example Variables:**

```json
{
  "id": "1"  // The ID of the game to fetch
}
```

**What to do:**
- Pass the `id` variable to fetch a specific game.
- Returns `id`, `platform`, `title`, and associated reviews (with `content` and `rating`).

---

### 5.3 Add a New Game

**Purpose:** Create a new game.

**Mutation:**

```graphql
mutation AddGameQuery($game: AddGameInput!) {  # Define a mutation operation named AddGameQuery, which takes a variable $game of type AddGameInput
  addGame(game: $game) {                      # Call the addGame mutation with the provided game variable
    id                                        # Fetch the unique identifier of the newly added game
    title                                     # Fetch the title of the newly added game
    platform                                  # Fetch the platforms the game is available on
  }
}
```

**Example Variables:**

```json
{
  "game": {  // The input object for adding a game
    "title": "New Game",  // The title of the game
    "platform": ["PC", "Console"]  // The platforms the game is available on
  }
}
```

**What to do:**
- Pass the `game` variable of type `AddGameInput`.
- Returns the `id`, `title`, and `platform` of the newly added game.

---

### 5.4 Delete a Game

**Purpose:** Delete a game by its ID.

**Mutation:**

```graphql
mutation DeleteMutation($id: ID!) {  # Define a mutation operation named DeleteMutation, which takes a variable $id of type ID
  deleteGame(id: $id) {              # Call the deleteGame mutation with the provided id variable
    id                               # Fetch the unique identifier of the deleted game
    title                            # Fetch the title of the deleted game
    platform                         # Fetch the platforms the game was available on
  }
}
```

**Example Variables:**

```json
{
  "id": "1"  // The ID of the game to delete
}
```

**What to do:**
- Pass the `id` variable to delete a specific game.
- Returns the `id`, `title`, and `platform` of the deleted game.

---

### 5.5 Update a Game

**Purpose:** Update an existing game.

**Mutation:**

```graphql
mutation EditMutation($edits: EditGameInput!, $id: ID!) {  # Define a mutation operation named EditMutation
  updateGame(edits: $edits, id: $id) {                    # Call the updateGame mutation with the provided edits and id variables
    title                                                 # Fetch the updated title of the game
    platform                                              # Fetch the updated platforms of the game
  }
}
```

**Example Variables:**

```json
{
  "id": "1",  // The ID of the game to update
  "edits": {  // The input object for updating a game
    "title": "Updated Title",  // The new title of the game
    "platform": ["PC"]  // The new platforms of the game
  }
}
```

**What to do:**
- Pass the `id` of the game to update and the `edits` variable of type `EditGameInput`.
- Returns the `title` and `platform` of the updated game.

---

## 6. Key Concepts

### 6.1 Resolvers
Resolvers are functions that handle the logic for fetching or modifying data. They take three arguments:
- `parent`: The result of the parent resolver (used for nested fields).
- `args`: Arguments passed in the query (e.g., `id`).
- `context`: Shared context across resolvers (not used here).

### 6.2 Difference Between `game` and `games`
- `games`: A resolver that returns all games.
- `game`: A resolver that returns a single game based on the `id` argument.

### 6.3 Nested Queries
Nested queries are resolved using the `parent` argument. For example:
- `Game.reviews` uses the `parent` argument to find reviews for a specific game.

### 6.4 Relationships
Relationships are defined using fields like `game_id` and `author_id` in the mock data. Resolvers like `Game.reviews` and `Author.reviews` fetch related data.

---

## 7. Things to Keep in Mind While Designing Schema

1. **Define Types Clearly:** Each type should have a unique name and define the fields it contains.
2. **Use Scalars:** Use built-in scalar types like `ID`, `String`, `Int`, `Boolean`, and `Float`.
3. **NonNullable Fields:** Use `!` to indicate that a field cannot be null.
4. **Lists:** Use `[]` to indicate a list of items.
5. **Input Types:** Use input types for complex arguments in mutations.
6. **Relationships:** Define relationships clearly using fields like `game_id` and `author_id`.
7. **Nested Queries:** Ensure resolvers for nested fields return the correct data.

### 7.1 Schema Definitions Explained

#### 7.1.1 `type Game`

```graphql
type Game {
  id: ID!               # Unique identifier for the game (non-nullable)
  title: String!        # Title of the game (non-nullable)
  platform: [String!]!  # Platforms the game is available on (non-nullable list of non-nullable strings)
  reviews: [Review]     # List of reviews for the game (nullable list of Review objects)
}
```

**Explained:** This defines the `Game` type, which represents a game in the system. It has:
- `id`: A unique identifier for the game.
- `title`: The title of the game.
- `platform`: A list of platforms the game is available on.
- `reviews`: A list of reviews associated with the game (optional).

#### 7.1.2 `type Review`

```graphql
type Review {
  id: ID!               # Unique identifier for the review (non-nullable)
  rating: Int!          # Rating of the review (1-10, non-nullable)
  content: String!      # Content of the review (non-nullable)
  game: Game!           # The game this review belongs to (non-nullable)
  author: Author!       # The author who wrote the review (non-nullable)
}
```

**Explained:** This defines the `Review` type, which represents a review in the system. It has:
- `id`: A unique identifier for the review.
- `rating`: The rating of the review (an integer between 1 and 10).
- `content`: The content of the review.
- `game`: The game this review belongs to (a `Game` object).
- `author`: The author who wrote the review (an `Author` object).

#### 7.1.3 `type Author`

```graphql
type Author {
  id: ID!               # Unique identifier for the author (non-nullable)
  name: String!         # Name of the author (non-nullable)
  verified: Boolean!    # Whether the author is verified (non-nullable)
  reviews: [Review!]    # List of reviews written by the author (nullable list of non-nullable Review objects)
}
```

**Explained:** This defines the `Author` type, which represents an author in the system. It has:
- `id`: A unique identifier for the author.
- `name`: The name of the author.
- `verified`: A boolean indicating whether the author is verified.
- `reviews`: A list of reviews written by the author (optional).

#### 7.1.4 `type Query`

```graphql
type Query {
  reviews: [Review]     # Get all reviews (nullable list of Review objects)
  review(id: ID!): Review # Get a single review by ID (non-nullable Review object)
  games: [Game]         # Get all games (nullable list of Game objects)
  game(id: ID!): Game   # Get a single game by ID (non-nullable Game object)
  authors: [Author]     # Get all authors (nullable list of Author objects)
  author(id: ID!): Author # Get a single author by ID (non-nullable Author object)
}
```

**Explained:** This defines the `Query` type, which represents the entry points for fetching data. It includes:
- `reviews`: Fetches all reviews.
- `review(id: ID!)`: Fetches a single review by its ID.
- `games`: Fetches all games.
- `game(id: ID!)`: Fetches a single game by its ID.
- `authors`: Fetches all authors.
- `author(id: ID!)`: Fetches a single author by its ID.

#### 7.1.5 `type Mutation`

```graphql
type Mutation {
  addGame(game: AddGameInput): Game       # Add a new game (returns a single Game object)
  deleteGame(id: ID!): [Game]             # Delete a game by ID (returns a list of remaining Game objects)
  updateGame(id: ID!, edits: EditGameInput!): Game # Update a game by ID (returns the updated Game object)
}
```

**Explained:** This defines the `Mutation` type, which represents the entry points for modifying data. It includes:
- `addGame(game: AddGameInput)`: Adds a new game. It takes a `game` argument of type `AddGameInput` and returns the newly added `Game` object.
- `deleteGame(id: ID!)`: Deletes a game by its ID. It takes an `id` argument and returns the updated list of `Game` objects.
- `updateGame(id: ID!, edits: EditGameInput!)`: Updates a game by its ID. It takes an `id` argument and an `edits` argument of type `EditGameInput`, and returns the updated `Game` object.

#### 7.1.6 `input AddGameInput`

```graphql
input AddGameInput {
  title: String!         # Title of the game (non-nullable)
  platform: [String!]!   # Platforms the game is available on (non-nullable list of non-nullable strings)
}
```

**Explained:** This defines the `AddGameInput` input type, which is used as an argument for the `addGame` mutation. It includes:
- `title`: The title of the game (required).
- `platform`: A list of platforms the game is available on (required).

### 7.2 GraphQL Naming Considerations & Resolver Mapping

| **Element**              | **Where Used (Resolvers)**            | **Schema Definition**                                      | **Naming Convention**    | **Needs to Match Schema?** | **Apollo Server Matching (Query/Field)**                              |
|--------------------------|---------------------------------------|------------------------------------------------------------|--------------------------|----------------------------|----------------------------------------------------------------------|
| **Game Query**            | `Query.games`, `Query.game`           | `games: [Game!]!` <br> `game(id: ID!): Game!`               | ✅ Plural (`games`) for list, singular (`game`) for entity | ✅ Yes | `query { games { id title } }`                                    |
| **Game Type**             | `Game`                                | `type Game { id, title, platform, reviews }`                | ✅ Matches schema exactly | ✅ Yes | Used in multiple queries                                          |
| **Game Reviews**          | `Game.reviews(parent)`                | `reviews: [Review]` inside `Game`                           | ✅ Matches schema exactly | ✅ Yes | `query { game(id: "1") { reviews { content rating } } }`          |
| **Review Query**          | `Query.reviews`, `Query.review`       | `reviews: [Review!]!` <br> `review(id: ID!): Review!`       | ✅ Consistent plural/singular usage | ✅ Yes | `query { reviews { content rating } }`                             |
| **Review Type**           | `Review`                              | `type Review { id, content, rating, game, author }`         | ✅ Matches schema exactly | ✅ Yes | Referenced in queries                                             |
| **Review Game**           | `Review.game(parent)`                 | `game: Game` inside `Review`                                | ✅ Matches schema exactly | ✅ Yes | `query { reviews { game { title } } }`                             |
| **Review Author**         | `Review.author(parent)`               | `author: Author` inside `Review`                            | ✅ Matches schema exactly | ✅ Yes | `query { reviews { author { name } } }`                            |
| **Author Query**          | `Query.authors`, `Query.author`       | `authors: [Author!]!` <br> `author(id: ID!): Author!`       | ✅ Proper plural/singular usage | ✅ Yes | `query { authors { id name verified } }`                           |
| **Author Type**           | `Author`                              | `type Author { id, name, verified, reviews }`               | ✅ Matches schema exactly | ✅ Yes | Used in multiple queries                                          |
| **Author Reviews**        | `Author.reviews(parent)`              | `reviews: [Review]` inside `Author`                         | ✅ Matches schema exactly | ✅ Yes | `query { authors { reviews { content rating } } }`                 |
| **Add Game Mutation**     | `Mutation.addGame`                    | `addGame(game: AddGameInput!): Game!`                       | ✅ Action verb (`addGame`) | ✅ Yes | `mutation { addGame(game: { title: "New Game" platform: ["PC"] }) { id title } }` |
| **Delete Game Mutation**  | `Mutation.deleteGame`                 | `deleteGame(id: ID!): [Game]`                               | ✅ Action verb (`deleteGame`) | ✅ Yes | `mutation { deleteGame(id: "1") { id title } }`                    |
| **Update Game Mutation**  | `Mutation.updateGame`                 | `updateGame(id: ID!, edits: EditGameInput!): Game!`         | ✅ Action verb (`updateGame`) | ✅ Yes | `mutation { updateGame(id: "1", edits: { title: "Updated Game" }) { title } }` |

#### Key Considerations:

- **Apollo Server Matching Schema & Resolvers:**
  - **All field names in Apollo Server queries and resolvers MUST match** the schema exactly. This means that `game` in the schema should be used as the field name in the query as well as in the resolver function.
  
- **Matching the Resolvers to the Schema:**
  - The resolver function **MUST return data according to the schema definitions**. For example, `Query.game` should return a single `Game` object, and `Game.reviews` should return an array of `Review` objects, all matching their respective schema definitions.

- **Apollo Server Query Naming:**
  - All query field names (like `games`, `reviews`, `authors`) **MUST follow the schema's plural/singular conventions**. For example, the `Query.games` resolver corresponds to the `games: [Game!]!` field in the schema.
  - Nested fields, such as `reviews` inside `Game` or `author` inside `Review`, must also **match** the schema's field names exactly, both in the resolver and the schema.

---

## 8. Step-by-Step Flow for a Query in Apollo Server

### 8.1 Simple Query Example: Fetching All Games

```graphql
query {
  games {
    id
    title
    platform
  }
}
```

**Step 1: Query Parsing & Validation**
- The Apollo Server receives the query and parses it to understand the requested fields (`id`, `title`, `platform`) and the operation (`games`).
- The server validates the query against the `typeDefs` (schema) to ensure:
  - The `games` field is a valid query.
  - The requested fields (`id`, `title`, `platform`) exist in the `Game` type.
- The schema defines:
  ```graphql
  type Query {
    games: [Game]
  }
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
  }
  ```
  This ensures the `games` field is valid and returns an array of `Game` objects.

**Step 2: Resolver Invocation**
- The server identifies that the `games` field in the query corresponds to the `games` resolver in the `Query` type.
- The resolver function `Query.games()` is triggered.

**Step 3: Data Fetching**
- The resolver accesses the mock database (`db.games`) to fetch all games.
- It returns the list of game objects:
  ```json
  [
    { id: "1", title: "Zelda, Tears of the Kingdom", platform: ["Switch"] },
    { id: "5", title: "Pokemon Scarlet", platform: ["PS5", "Xbox", "PC"] }
  ]
  ```

**Step 4: Response Construction**
- The server constructs the response with the requested fields:
  ```json
  {
    "data": {
      "games": [
        { "id": "1", "title": "Zelda, Tears of the Kingdom", "platform": ["Switch"] },
        { "id": "5", "title": "Pokemon Scarlet", "platform": ["PS5", "Xbox", "PC"] }
      ]
    }
  }
  ```

---

### 8.2 Nested Query Example: Fetching Games with Reviews

```graphql
query {
  games {
    id
    title
    platform
    reviews {
      content
      rating
    }
  }
}
```

**Step 1: Query Parsing & Validation**
- The server parses the query and identifies the requested fields (`id`, `title`, `platform`, `reviews`) and the nested fields inside `reviews` (`content`, `rating`).
- The server validates the query against the `typeDefs` (schema) to ensure:
  - The `games` field is a valid query.
  - The requested fields (`id`, `title`, `platform`) exist in the `Game` type.
  - The `reviews` field is a valid nested field in the `Game` type.
- The schema defines:
  ```graphql
  type Query {
    games: [Game]
  }
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review]
  }
  type Review {
    id: ID!
    content: String!
    rating: Int!
  }
  ```

**Step 2: Resolver Invocation (Top-Level)**
- The server identifies that the `games` field in the query corresponds to the `games` resolver in the `Query` type.
- The resolver function `Query.games()` is triggered.
- It fetches all games from the mock database and returns:
  ```json
  [
    { id: "1", title: "Zelda, Tears of the Kingdom", platform: ["Switch"] },
    { id: "2", title: "Final Fantasy 7 Remake", platform: ["PS5", "Xbox"] },
    // ...
  ]
  ```

**Step 3: Resolver Invocation (Nested Field)**
- For each game, the server detects the `reviews` field in the query and triggers the `Game.reviews(parent)` resolver.
- The `parent` argument contains the game object returned in Step 2.
- The resolver filters `db.reviews` to find reviews where `game_id === parent.id` and returns:
  - For `game_id: "1"`:
    ```json
    [
      { id: "2", rating: 10, content: "lorem ipsum", author_id: "2", game_id: "1" },
      { id: "7", rating: 10, content: "lorem ipsum", author_id: "3", game_id: "1" }
    ]
    ```
  - For `game_id: "2"`:
    ```json
    [
      { id: "1", rating: 9, content: "lorem ipsum", author_id: "1", game_id: "2" },
      { id: "6", rating: 7, content: "lorem ipsum", author_id: "1", game_id: "2" }
    ]
    ```
  - For other games, it returns the corresponding reviews.

**Step 4: Response Construction**
- The server constructs the response with the requested fields:
  ```json
  {
    "data": {
      "games": [
        {
          "id": "1",
          "title": "Zelda, Tears of the Kingdom",
          "platform": ["Switch"],
          "reviews": [
            { "content": "lorem ipsum", "rating": 10 },
            { "content": "lorem ipsum", "rating": 10 }
          ]
        },
        {
          "id": "2",
          "title": "Final Fantasy 7 Remake",
          "platform": ["PS5", "Xbox"],
          "reviews": [
            { "content": "lorem ipsum", "rating": 9 },
            { "content": "lorem ipsum", "rating": 7 }
          ]
        },
        // so on...
      ]
    }
  }
  ```

---

### Where It Triggers
- **Apollo Server** is running at `http://localhost:4000`.
- The query is submitted to this endpoint, and the server processes it.

### How It Gets Results
- The resolver accesses `db.games` (static data in this example).
- In real-world scenarios, this could involve database queries or API calls to fetch the data dynamically.

---

### Summary of Steps
1. **Query Parsing & Validation**: The server parses and validates the query against the schema to ensure the requested fields and operations are valid.
2. **Resolver Invocation**: The appropriate resolver function is triggered based on the query.
3. **Data Fetching**: The resolver fetches data from the database or other sources.
4. **Response Construction**: The server constructs the response by mapping the fetched data to the requested fields.

--- 
