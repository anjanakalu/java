In database design and entity-relationship modeling, relationships between entities (tables) are categorized based on how entities interact with each other. The four main types of relationships are:

---

### 1. **One-to-One (1:1) Relationship**
- **Definition**: Each record in one table is associated with exactly one record in another table, and vice versa.
- **Example**: 
  - A `Person` table and a `Passport` table. Each person has only one passport, and each passport belongs to only one person.
- **Implementation**: 
  - Use a foreign key in one of the tables that references the primary key of the other table.
  - Example: Add a `passport_id` column in the `Person` table that references the `Passport` table.

---

### 2. **One-to-Many (1:N) Relationship**
- **Definition**: A record in one table can be associated with multiple records in another table, but a record in the second table is associated with only one record in the first table.
- **Example**:
  - A `Customer` table and an `Order` table. One customer can place many orders, but each order belongs to only one customer.
- **Implementation**:
  - Add a foreign key in the "many" side table that references the primary key of the "one" side table.
  - Example: Add a `customer_id` column in the `Order` table that references the `Customer` table.

---

### 3. **Many-to-One (N:1) Relationship**
- **Definition**: This is essentially the same as a one-to-many relationship but viewed from the opposite perspective.
- **Example**:
  - In the `Order` table, many orders can belong to one customer. This is the "many-to-one" perspective of the one-to-many relationship between `Customer` and `Order`.
- **Implementation**:
  - Same as one-to-many: Add a foreign key in the "many" side table.

---

### 4. **Many-to-Many (M:N) Relationship**
- **Definition**: Records in one table can be associated with multiple records in another table, and vice versa.
- **Example**:
  - A `Student` table and a `Course` table. A student can enroll in many courses, and a course can have many students.
- **Implementation**:
  - Use a **junction table** (also called an associative or bridge table) to link the two tables.
  - Example: Create a `Student_Course` table with foreign keys referencing the `Student` and `Course` tables (e.g., `student_id` and `course_id`).

---

### Summary Table

| Relationship Type | Description                          | Example                          | Implementation                          |
|-------------------|--------------------------------------|----------------------------------|-----------------------------------------|
| **One-to-One**    | One record in Table A links to one record in Table B. | Person ↔ Passport               | Foreign key in one table.               |
| **One-to-Many**   | One record in Table A links to many records in Table B. | Customer ↔ Orders               | Foreign key in the "many" side table.   |
| **Many-to-One**   | Many records in Table A link to one record in Table B. | Orders ↔ Customer               | Foreign key in the "many" side table.   |
| **Many-to-Many**  | Many records in Table A link to many records in Table B. | Students ↔ Courses              | Junction table with foreign keys.      |

---

Understanding these relationships is crucial for designing efficient and normalized databases. Let me know if you need further clarification or examples!
