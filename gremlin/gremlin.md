
# JanusGraph Beginner's Guide for Windows Users

## Table of Contents
1. [Introduction](#introduction)
2. [Setup Instructions](#setup-instructions)
3. [Getting Started with Gremlin Console](#getting-started-with-gremlin-console)
4. [Building Your First Graph](#building-your-first-graph)
5. [Basic Queries](#basic-queries)
6. [JanusGraph (Gremlin) Complete Cheatsheet](#janusgraph-gremlin-complete-cheatsheet)
7. [Next Steps](#next-steps)

## Introduction <a name="introduction"></a>
This guide walks Windows users through setting up JanusGraph and learning the Gremlin query language. JanusGraph is a scalable graph database that supports complex queries across large datasets.

## Setup Instructions <a name="setup-instructions"></a>

### Prerequisites
1. Java JDK 8 or later installed
2. JanusGraph downloaded (version 1.1.0 used in this guide)

### Installation Steps
1. Download JanusGraph from the official website
2. Extract the archive to `C:\janusgraph-1.1.0`
3. Download `winutils.exe` from:
   ```
   https://github.com/cdarlint/winutils/raw/master/hadoop-2.8.5/bin/winutils.exe
   ```
4. Place `winutils.exe` in the `bin` folder of your JanusGraph installation

## Getting Started with Gremlin Console <a name="getting-started-with-gremlin-console"></a>

1. Open Command Prompt (CMD)
2. Navigate to your JanusGraph directory:
   ```cmd
   cd C:\janusgraph-1.1.0
   ```
3. Start the Gremlin console:
   ```cmd
   bin\gremlin.bat
   ```
4. Wait for the message "Channel started at port 8182" indicating the server is ready

## Building Your First Graph <a name="building-your-first-graph"></a>

### Initialize the In-Memory Database
```gremlin
graph = JanusGraphFactory.open('conf/janusgraph-inmemory.properties')
g = graph.traversal()
```

### Add Vertices (Nodes)
```gremlin
// Add people
v1 = g.addV('person').property('name', 'Alice').next()
v2 = g.addV('person').property('name', 'Bob').next()
v3 = g.addV('person').property('name', 'Charlie').property('age', 28).next()
v4 = g.addV('person').property('name', 'Diana').property('age', 32).next()
v5 = g.addV('person').property('name', 'Eve').property('age', 24).next()

// Add places
v11 = g.addV('place').property('name', 'New York').property('type', 'city').next()
v12 = g.addV('place').property('name', 'San Francisco').property('type', 'city').next()

// Add companies
v16 = g.addV('company').property('name', 'Acme Corp').property('industry', 'technology').next()
v17 = g.addV('company').property('name', 'Globex').property('industry', 'finance').next()

// Add interests
v20 = g.addV('interest').property('name', 'hiking').property('category', 'outdoor').next()
v21 = g.addV('interest').property('name', 'programming').property('category', 'technology').next()
```

### Add Edges (Relationships)
```gremlin
// KNOWS relationships
g.V(v1).addE('knows').to(v2).property('since', 2015).next()
g.V(v1).addE('knows').to(v3).property('since', 2018).next()

// LIVES_IN relationships
g.V(v1).addE('lives_in').to(v11).property('since', 2017).next()
g.V(v2).addE('lives_in').to(v12).property('since', 2016).next()

// WORKS_AT relationships
g.V(v1).addE('works_at').to(v16).property('position', 'engineer').next()
g.V(v2).addE('works_at').to(v17).property('position', 'analyst').next()

// LIKES relationships
g.V(v1).addE('likes').to(v20).property('intensity', 'high').next()
g.V(v1).addE('likes').to(v21).property('intensity', 'very high').next()
```

## Basic Queries <a name="basic-queries"></a>

### Find all people
```gremlin
g.V().hasLabel('person').valueMap()
```

### Find who knows whom
```gremlin
g.V().hasLabel('person').out('knows').path().by('name')
```

### Find people who live in New York
```gremlin
g.V().has('name', 'New York').in('lives_in').values('name')
```

### Find coworkers
```gremlin
g.V().has('name', 'Acme Corp').in('works_at').values('name')
```

### Find people who like hiking
```gremlin
g.V().has('name', 'hiking').in('likes').values('name')
```

### Find path between people
```gremlin
g.V().has('name', 'Alice').repeat(out('knows')).until(out('works_at').has('name', 'Wayne Enterprises')).path().by('name')
```

# JanusGraph (Gremlin) Complete Cheatsheet <a name="janusgraph-gremlin-complete-cheatsheet"></a>

## **1. Basic Vertex Operations**  
| Command | Description |
|---------|------------|
| `g.V()` | Get all vertices |
| `g.V(id)` | Get vertex by ID |
| `g.addV(label)` | Add new vertex with label |
| `g.V().hasLabel(label)` | Filter vertices by label |
| `g.V().has(key, value)` | Filter vertices by property |
| `g.V().count()` | Count all vertices |

---

## **2. Basic Edge Operations**  
| Command | Description |
|---------|------------|
| `g.E()` | Get all edges |
| `g.V(v1).outE(edgeLabel)` | Get outgoing edges from `v1` |
| `g.V(v1).inE(edgeLabel)` | Get incoming edges to `v1` |
| `g.V(v1).bothE(edgeLabel)` | Get both incoming & outgoing edges |
| `g.V(v1).addE(edgeLabel).to(v2)` | Create edge from `v1` to `v2` |

---

## **3. Property Operations**  
| Command | Description |
|---------|------------|
| `.property(key, value)` | Add/update property |
| `.values(propertyName)` | Get property values |
| `.valueMap()` | Get all properties as a map |
| `.has(key, predicate)` | Filter by property condition |

---

## **4. Traversal Steps**  
| Command | Description |
|---------|------------|
| `.out(label)` | Traverse outgoing edges |
| `.in(label)` | Traverse incoming edges |
| `.both(label)` | Traverse both directions |
| `.path()` | Show full traversal path |
| `.repeat().until(condition)` | Loop until condition met |
| `.limit(n)` | Limit results to `n` items |

---

## **5. Filtering & Predicates**  
| Command | Description |
|---------|------------|
| `.has(key, value)` | Exact match |
| `.has(key, gt(value))` | Greater than |
| `.has(key, lt(value))` | Less than |
| `.has(key, between(x, y))` | Between two values |
| `.has(key, within(val1, val2))` | In a list of values |
| `.has(key, without(val1, val2))` | Not in a list |

---

## **6. Aggregation & Grouping**  
| Command | Description |
|---------|------------|
| `.count()` | Count results |
| `.sum()` | Sum of values |
| `.mean()` | Average of values |
| `.max()` | Maximum value |
| `.min()` | Minimum value |
| `.group().by(key)` | Group by property |
| `.dedup()` | Remove duplicates |

---

## **7. Result Modification**  
| Command | Description |
|---------|------------|
| `.order().by(key)` | Sort by property |
| `.range(start, end)` | Pagination |
| `.select(keys)` | Select specific properties |
| `.as(alias).select(alias)` | Create and use aliases |
| `.union(traversal1, traversal2)` | Combine multiple traversals |

---

## **8. Query Execution Methods**  
| Method | Purpose | Returns |
|--------|---------|---------|
| `.next()` | Get **one result** | Single object (throws if empty) |
| `.toList()` | Get **all results** | `List` of objects |
| `.iterate()` | Execute but **no return** | Nothing (void) |

**Best Practices:**  
- Use `.toList()` when expecting **multiple results**  
- Use `.next()` when you need **just one result**  
- Use `.iterate()` for **inserts/updates** (no return needed)  

---

## **9. Advanced Tips**  
### **Indexing for Performance**  
```groovy
mgmt = graph.openManagement()
name = mgmt.makePropertyKey('name').dataType(String.class).make()
mgmt.buildIndex('nameIndex', Vertex.class).addKey(name).buildCompositeIndex()
mgmt.commit()
```
- **Use `indexOnly(label)`** to restrict index to a specific label  

### **Transactions**  
```groovy
graph.tx().commit()  // Save changes
graph.tx().rollback()  // Discard changes
```

### **Persistent Storage (Not In-Memory)**  
```groovy
graph = JanusGraphFactory.open('conf/janusgraph-cql.properties')  # Cassandra backend
```

---

## Next Steps <a name="next-steps"></a>
1. Explore more complex queries with path finding and pattern matching
2. Learn about indexing for better performance
3. Try persisting your graph to disk instead of in-memory
4. Explore JanusGraph's support for transactions
5. Consider using a visualization tool like Gephi or Cytoscape

### Example Workflow
```groovy
// 1. Add data
alice = g.addV('person').property('name', 'Alice').next()
bob = g.addV('person').property('name', 'Bob').next()
g.addE('knows').from(alice).to(bob).property('since', 2020).iterate()

// 2. Query
friends = g.V().hasLabel('person').has('name', 'Alice').out('knows').toList()

// 3. Commit
graph.tx().commit()
```
