## 🧠 Amazon Neptune & Gremlin with English Premier League Data – Complete Guide

---

## 1️⃣ Setup and Configuration

### 1.1 Check Notebook Version
```python
%graph_notebook_version
```
Example output:
```
4.0.2
```

---

### 1.2 Check Neptune Configuration
```python
%graph_notebook_config
```

Expected output:
```json
{
  "host": "neptunedbcluster-xxxx.cluster-xxxx.eu-north-1.neptune.amazonaws.com",
  "neptune_service": "neptune-db",
  "port": 8182,
  "proxy_host": "",
  "proxy_port": 8182
}
```

Make sure:
- You replace `xxxx` with your actual cluster details.
- The host is reachable and matches your Neptune instance.
- Your Jupyter notebook is connected to the same VPC as Neptune (or via proxy).

---

### 1.3 Check Cluster Status
```python
%status
```
Expected status:
```
Status: Healthy
```

---

## 2️⃣ Gremlin Basics

### 2.1 Gremlin Cell Magic
Use this to run Gremlin queries in Jupyter:
```python
%%gremlin
// Gremlin code goes here
```

---

### 2.2 Syntax Explanation

- `g.addV("Label")`: Adds a vertex (node) with the label `"Label"`.
- `.property("key", "value")`: Adds a property to the vertex or edge.
- `g.addE("Label")`: Adds an edge (relationship) with the label `"Label"`.
- `.from("vertex_id").to("vertex_id")`: Connects two nodes.

Example:
```gremlin
g.addE("PLAYS_FOR").from("Player123").to("Team456")
```

---

## 3️⃣ Create EPL Graph

---

### 3.1 Create League Node
```gremlin
g.addV("League").
  property(id, 'EPL-2019-20').
  property("name", "English Premier League").
  property("nickname", "EPL")
```

---

### 3.2 Create Team Nodes (Complete Example for 3 Teams)

```gremlin
g.addV("Team").
  property(id,"Arsenal").
  property("name","Arsenal").
  property("fullName","Arsenal F. C.").
  property("nickname","The Gunners").
  property("founded", 1886)

g.addV("Team").
  property(id,"Chelsea").
  property("name","Chelsea").
  property("fullName","Chelsea F. C.").
  property("nickname","The Blues").
  property("founded", 1905)

g.addV("Team").
  property(id,"Liverpool").
  property("name","Liverpool").
  property("fullName","Liverpool F. C.").
  property("nickname","The Reds").
  property("founded", 1892)
```

Repeat this pattern for all other teams.

---

### 3.3 Create Stadium Nodes
```gremlin
g.addV("Stadium").
  property(id,"The_Emirates").
  property("name", "The Emirates").
  property("capacity", 60704).
  property("opened", 2006)

g.addV("Stadium").
  property(id,"Stamford_Bridge").
  property("name", "Stamford Bridge").
  property("capacity", 41837).
  property("opened", 1877)

g.addV("Stadium").
  property(id,"Anfield").
  property("name", "Anfield").
  property("capacity", 54000).
  property("opened", 1884)
```

---

### 3.4 Create City Nodes
```gremlin
g.addV("City").
  property(id,"City_London").
  property("name", "London")

g.addV("City").
  property(id,"City_Liverpool").
  property("name", "Liverpool")
```

---

## 4️⃣ Create Relationships (Edges)

Each line = 1 edge between nodes.

```gremlin
// Arsenal relationships
g.addE("CURRENT_LEAGUE").from("Arsenal").to("EPL-2019-20")
g.addE("STADIUM").from("Arsenal").to("The_Emirates")
g.addE("CITY").from("The_Emirates").to("City_London")

// Chelsea relationships
g.addE("CURRENT_LEAGUE").from("Chelsea").to("EPL-2019-20")
g.addE("STADIUM").from("Chelsea").to("Stamford_Bridge")
g.addE("CITY").from("Stamford_Bridge").to("City_London")

// Liverpool relationships
g.addE("CURRENT_LEAGUE").from("Liverpool").to("EPL-2019-20")
g.addE("STADIUM").from("Liverpool").to("Anfield")
g.addE("CITY").from("Anfield").to("City_Liverpool")
```

---

## 5️⃣ Validate Graph Data

---

### 5.1 Count of Node Labels
```gremlin
g.V().groupCount().by(label).unfold()
```

**Example Output**:
```
{'Team': 3}
{'Stadium': 3}
{'City': 2}
{'League': 1}
```

---

### 5.2 Count of Edges by Label
```gremlin
g.E().groupCount().by(label).unfold()
```

**Example Output**:
```
{'CURRENT_LEAGUE': 3}
{'STADIUM': 3}
{'CITY': 3}
```

---

## 6️⃣ Visualize Graph

### 6.1 Complete Path: League → Team → Stadium → City
```gremlin
%%gremlin -p v, ine, outv, oute, inv
g.V().hasLabel('League').
  inE().outV().
  outE().inV().
  outE().inV().
  path().by('name').by(label)
```

Use **Graph tab** to view.

---

## 7️⃣ Drop All Data (If Needed)

```gremlin
g.V().hasId(
'Arsenal', 'Chelsea', 'Liverpool',
'The_Emirates', 'Stamford_Bridge', 'Anfield',
'City_London', 'City_Liverpool',
'EPL-2019-20'
).drop()
```

---

## 8️⃣ Sample Queries with Outputs

---

### 8.1 How many teams are there?
```gremlin
g.V().hasLabel('Team').count()
```
**Output**:
```
3
```

---

### 8.2 Get all teams in the league
```gremlin
g.V('EPL-2019-20').in('CURRENT_LEAGUE').values('name')
```

**Output**:
```
Arsenal
Chelsea
Liverpool
```

---

### 8.3 Get all team details
```gremlin
g.V().hasLabel('Team').valueMap()
```

**Output**:
```json
[
  {'name': ['Arsenal'], 'fullName': ['Arsenal F. C.'], 'nickname': ['The Gunners'], 'founded': [1886]},
  {'name': ['Chelsea'], 'fullName': ['Chelsea F. C.'], 'nickname': ['The Blues'], 'founded': [1905]},
  {'name': ['Liverpool'], 'fullName': ['Liverpool F. C.'], 'nickname': ['The Reds'], 'founded': [1892]}
]
```

---

### 8.4 Team + Stadium + City Info
```gremlin
g.V().hasLabel('Team').
  project('name','stadium','city').
  by('name').
  by(out('STADIUM').values('name')).
  by(out('STADIUM').out('CITY').values('name'))
```

**Output**:
```json
{'name': 'Arsenal', 'stadium': 'The Emirates', 'city': 'London'}
{'name': 'Chelsea', 'stadium': 'Stamford Bridge', 'city': 'London'}
{'name': 'Liverpool', 'stadium': 'Anfield', 'city': 'Liverpool'}
```

---

### 8.5 Teams based in London
```gremlin
g.V().has('City','name','London').in('CITY').in('STADIUM').values('name')
```

**Output**:
```
Arsenal
Chelsea
```

---

### 8.6 Teams containing "ou"
```gremlin
g.V().has('Team','name', containing('ou')).values('name')
```

**Output**:
```
Liverpool
```

---

### 8.7 All Info for Arsenal
```gremlin
g.V().hasId('Arsenal').
  project('details','stadium','city').
  by(valueMap().by(unfold())).
  by(out('STADIUM').values('name')).
  by(out('STADIUM').out('CITY').values('name'))
```

**Output**:
```json
{
  'details': {
    'name': 'Arsenal',
    'fullName': 'Arsenal F. C.',
    'nickname': 'The Gunners',
    'founded': 1886
  },
  'stadium': 'The Emirates',
  'city': 'London'
}
```
