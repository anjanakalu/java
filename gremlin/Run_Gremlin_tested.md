**Download and Use Gremlin Console with In-Memory TinkerGraph**
Ref: https://tinkerpop.apache.org/docs/current/tutorials/the-gremlin-console/
---

## **Section 1: Setting Up the Gremlin Console**

### **1. Prerequisites**

* **Java 8 or higher** installed.
* Ensure `JAVA_HOME` and `PATH` are set correctly.

```bash
java -version
```

### **2. Download and Install Gremlin Console**

* Visit: [https://tinkerpop.apache.org/downloads/](https://tinkerpop.apache.org/downloads/)
* Download the latest version (e.g., `apache-tinkerpop-gremlin-console-3.7.3-bin.zip`).
* Extract it to a convenient location:

```bash
unzip apache-tinkerpop-gremlin-console-3.7.3-bin.zip
cd apache-tinkerpop-gremlin-console-3.7.3
```

### **3. Start the Gremlin Console**

Run the console based on your OS:

* **Linux/macOS:**

```bash
bin/gremlin.sh
```

* **Windows:**

```bash
bin/gremlin.bat
```

---

## **Section 2: Start Querying with In-Memory Graph**

TinkerGraph is an in-memory graph engine perfect for learning and local experimentation.

> **Analogy**: In SQL, you deal with *rows* and *columns* in a *table*. In Gremlin, you work with *vertices* (like rows), *properties* (like columns), and *edges* (relationships). The *graph* acts like your *database*.

### **Option A: Start with an Empty In-Memory Graph**

```groovy
graph = TinkerGraph.open()
g = graph.traversal()
```

* `TinkerGraph.open()` creates a new, empty graph.
* `graph.traversal()` sets up a traversal source (`g`) to run queries.
* Output: `tinkergraph[vertices:0 edges:0]`

### **Option B: Load the Predefined "Modern" Graph**

```groovy
graph = TinkerFactory.createModern()
g = graph.traversal()
```

* `TinkerFactory.createModern()` loads a sample graph with 6 vertices and 6 edges.
* Commonly used for practice and examples.

---

## **Section 3: Common Gremlin Queries and Explanations**

### **Creating Data**

#### **Create Vertices (Nodes)**

```groovy
g.addV('person').property('name', 'marko').property('age', 29)
g.addV('person').property('name', 'vadas').property('age', 27)
g.addV('software').property('name', 'lop').property('lang', 'java')
```

* Adds vertices with label and properties.

#### **Create Edges (Relationships)**

```groovy
marko = g.V().has('name','marko').next()
vadas = g.V().has('name','vadas').next()
marko.addEdge('knows', vadas)
```

* Creates a relationship (edge) from Marko to Vadas with the label `knows`.

#### **Create Edge with Properties**

```groovy
lop = g.V().has('name','lop').next()
marko.addEdge('created', lop, 'weight', 0.4)
```

* Adds an edge labeled `created` with a property `weight`.

---

### **Query 1: List All Vertices**

```groovy
g.V()
```

* Selects all vertices in the graph.

### **Query 2: Get All Vertex Properties**

```groovy
g.V().valueMap()
```

* `.valueMap()` returns all properties of each vertex as key-value pairs.

### **Query 3: Who Does 'marko' Know?**

```groovy
g.V().has('name', 'marko').out('knows').values('name')
```

**Explanation:**

* `g.V()` – Get all vertices.
* `.has('name', 'marko')` – Filter where name = 'marko'.
* `.out('knows')` – Traverse outgoing `knows` edges.
* `.values('name')` – Extract the `name` property from connected vertices.
* In the Modern graph, this returns people 'marko' knows (e.g., Vadas, Josh).

### **Query 4: Get Ages of People Marko Knows**

```groovy
g.V().has('name', 'marko').out('knows').values('age')
```

* Same as above, but retrieves the `age` property.
