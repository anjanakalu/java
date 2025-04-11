
## 🧮 1️⃣ SQL-style Table Structure with Foreign Key Annotations

### 🔹 1. `Team` Table

| id       | name      | fullName        | nickname      | founded |
|----------|-----------|------------------|----------------|---------|
| Arsenal  | Arsenal   | Arsenal F. C.    | The Gunners    | 1886    |
| Chelsea  | Chelsea   | Chelsea F. C.    | The Blues      | 1905    |
| Liverpool| Liverpool | Liverpool F. C.  | The Reds       | 1892    |

🟡 **Note**: `id` is the primary key.  
🔗 Links to:  
- `League` via `CURRENT_LEAGUE`  
- `Stadium` via `STADIUM`

---

### 🔹 2. `Stadium` Table

| id              | name             | capacity | opened |
|-----------------|------------------|----------|--------|
| The_Emirates    | The Emirates     | 60704    | 2006   |
| Stamford_Bridge | Stamford Bridge  | 41837    | 1877   |
| Anfield         | Anfield          | 54000    | 1884   |

🟡 `id` is the primary key.  
🔗 Links to:
- `Team` (via reverse of `STADIUM`)
- `City` via `CITY`

---

### 🔹 3. `City` Table

| id             | name      |
|----------------|-----------|
| City_London    | London    |
| City_Liverpool | Liverpool |

🟡 `id` is the primary key.

---

### 🔹 4. `League` Table

| id         | name                   | nickname |
|------------|------------------------|----------|
| EPL-2019-20| English Premier League | EPL      |

🟡 `id` is the primary key.

---

### 🔹 5. `CURRENT_LEAGUE` (Relationship Table – Edge)

| from_team | to_league   |
|-----------|-------------|
| Arsenal   | EPL-2019-20 |
| Chelsea   | EPL-2019-20 |
| Liverpool | EPL-2019-20 |

🟢 `from_team` = FK to `Team.id`  
🟢 `to_league` = FK to `League.id`

---

### 🔹 6. `STADIUM` (Relationship Table – Edge)

| from_team | to_stadium       |
|-----------|------------------|
| Arsenal   | The_Emirates     |
| Chelsea   | Stamford_Bridge  |
| Liverpool | Anfield          |

🟢 `from_team` = FK to `Team.id`  
🟢 `to_stadium` = FK to `Stadium.id`

---

### 🔹 7. `CITY` (Relationship Table – Edge)

| from_stadium     | to_city        |
|------------------|----------------|
| The_Emirates     | City_London    |
| Stamford_Bridge  | City_London    |
| Anfield          | City_Liverpool |

🟢 `from_stadium` = FK to `Stadium.id`  
🟢 `to_city` = FK to `City.id`

---

## 🧩 2️⃣ SQL Equivalent Queries vs Gremlin Traversals

### 🔹 A. Get all teams with their league name

**SQL:**
```sql
SELECT Team.name AS team_name, League.name AS league_name
FROM Team
JOIN CURRENT_LEAGUE ON Team.id = CURRENT_LEAGUE.from_team
JOIN League ON CURRENT_LEAGUE.to_league = League.id;
```

**Gremlin:**
```gremlin
g.V().hasLabel('Team')
  .as('team')
  .out('CURRENT_LEAGUE')
  .as('league')
  .select('team', 'league')
  .by('name')
```

---

### 🔹 B. Get all teams with their stadium name

**SQL:**
```sql
SELECT Team.name AS team_name, Stadium.name AS stadium_name
FROM Team
JOIN STADIUM ON Team.id = STADIUM.from_team
JOIN Stadium ON STADIUM.to_stadium = Stadium.id;
```

**Gremlin:**
```gremlin
g.V().hasLabel('Team')
  .as('team')
  .out('STADIUM')
  .as('stadium')
  .select('team', 'stadium')
  .by('name')
```

---

### 🔹 C. Get stadiums and the cities they are located in

**SQL:**
```sql
SELECT Stadium.name AS stadium_name, City.name AS city_name
FROM Stadium
JOIN CITY ON Stadium.id = CITY.from_stadium
JOIN City ON CITY.to_city = City.id;
```

**Gremlin:**
```gremlin
g.V().hasLabel('Stadium')
  .as('stadium')
  .out('CITY')
  .as('city')
  .select('stadium', 'city')
  .by('name')
```

---

## 🔁 3️⃣ Mapping SQL Concepts to Gremlin

| SQL Concept     | Gremlin/Graph Equivalent          |
|------------------|----------------------------------|
| Table            | Vertex label (e.g., `Team`, `City`) |
| Row              | A vertex                         |
| Column           | Vertex property (e.g., `name`, `nickname`) |
| Foreign Key      | Edge connecting two vertices     |
| Relationship Table | Edge with `from` and `to` vertices |
| Join             | Graph traversal (e.g., `out()`, `in()`) |
| SELECT           | `values()` or `select()` in Gremlin |

---
## 🔁 4 Gremlin (Graph) vs SQL (Relational) – Comparison

| **Feature**              | **SQL Relational DB**                                | **Gremlin (Amazon Neptune)**                                         |
|--------------------------|------------------------------------------------------|----------------------------------------------------------------------|
| **Model**                | Tables, rows, columns                                | Vertices (nodes) and Edges (relationships)                          |
| **Primary Key**          | `id` field in each table                             | Property like `property("id", "value")` in each vertex              |
| **Foreign Keys**         | Used to relate rows across tables                    | Edges: `addE("STADIUM").from().to()`                                |
| **Joins**                | SQL `JOIN` clauses                                   | Graph traversals using `out()` or `in()`                            |
| **Query Example**        | `SELECT * FROM Team JOIN Stadium ON ...`            | `g.V().hasLabel('Team').out('STADIUM').values('name')`              |
| **Speed (Relationships)**| Slower with many joins in large datasets             | Faster due to direct edge traversal in highly connected data        |
| **Use Case Fit**         | Structured/tabular data (banking, accounting)        | Highly connected data (social networks, knowledge graphs, etc.)     |

