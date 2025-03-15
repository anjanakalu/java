```markdown
# Complete Guide to Apollo Server for Beginners

This guide explains the Apollo Server setup, schema design, resolver implementation, and CRUD operations in a beginner-friendly way. It includes inline comments to help you understand what each part of the code does.

---

## 1. Apollo Server Setup

### Installation

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

### Project Structure

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

---

## 5. CRUD Operations

### Fetch All Games

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

### Fetch a Single Game by ID (Including Nested Data)

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

### Add a New Game

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

### Delete a Game

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

### Update a Game

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

### Resolvers
Resolvers are functions that handle the logic for fetching or modifying data. They take three arguments:
- `parent`: The result of the parent resolver (used for nested fields).
- `args`: Arguments passed in the query (e.g., `id`).
- `context`: Shared context across resolvers (not used here).

### Difference Between `game` and `games`
- `games`: A resolver that returns all games.
- `game`: A resolver that returns a single game based on the `id` argument.

### Nested Queries
Nested queries are resolved using the `parent` argument. For example:
- `Game.reviews` uses the `parent` argument to find reviews for a specific game.

### Relationships
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

---

## Schema Definitions Explained

### 1. `type Game`

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

---

### 2. `type Review`

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

---

### 3. `type Author`

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

---

### 4. `type Query`

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

---

### 5. `type Mutation`

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

---

### 6. `input AddGameInput`

```graphql
input AddGameInput {
  title: String!         # Title of the game (non-nullable)
  platform: [String!]!   # Platforms the game is available on (non-nullable list of non-nullable strings)
}
```

**Explained:** This defines the `AddGameInput` input type, which is used as an argument for the `addGame` mutation. It includes:
- `title`: The title of the game (required).
- `platform`: A list of platforms the of the game (required).
