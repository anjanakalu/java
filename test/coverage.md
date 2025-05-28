## Jest with code coverage (using `--coverage`)
### **How to Generate**
Run with coverage:
```bash
npm test -- --coverage
```
---
Here’s a clear breakdown of Jest coverage metrics in a table format:

| **Metric**       | **What It Measures**                                                                 | **Example**                                                                 | **How to Improve**                                                                 |
|------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------|
| **Statements (Stmts)** | % of executable statements (e.g., assignments, function calls) run by tests.        | `const x = 10;` (✅ if executed)                                            | Add tests to cover missed lines.                                                  |
| **Branches**     | % of conditional paths (e.g., `if/else`, ternaries) tested.                         | `if (x > 5) { ... } else { ... }` (Need tests for both `true` and `false`) | Test all logical branches (edge cases, error paths).                              |
| **Functions (Funcs)** | % of functions (named/anonymous) called at least once.                              | `function greet() { ... }` (✅ if called)                                    | Ensure helper/util functions are exercised.                                       |
| **Lines**        | % of physical lines in the file executed.                                           | Similar to statements but counts multi-statement lines as one.              | Aligns with statement coverage; focus on untested lines.                         |

---

### **1. Statements (Stmts)**
- **Definition**: A *statement* is a single executable line of code (e.g., variable declaration, function call, assignment).  
- **Coverage**: Measures what percentage of statements were executed by tests.  
- **Example**:
  ```javascript
  const x = 10;       // ✅ Covered if reached
  console.log(x);      // ✅ Covered if executed
  ```
- **What to Aim For**: High statement coverage (e.g., 80%+) ensures most code paths are tested.

---

### **2. Branches**
- **Definition**: A *branch* represents a logical decision point (e.g., `if`, `switch`, ternary operators).  
- **Coverage**: Measures whether **both outcomes** of a condition were tested.  
- **Example**:
  ```javascript
  if (x > 5) {       // Branch 1: `true` path
    console.log(">5");
  } else {           // Branch 2: `false` path
    console.log("≤5");
  }
  ```
  - **Branch Coverage = 50%** if only `x > 5` is tested.  
  - Requires tests for **both cases** to reach 100%.

---

### **3. Functions (Funcs)**
- **Definition**: A *function* is any named or anonymous function in your code.  
- **Coverage**: Measures what percentage of functions were **called at least once**.  
- **Example**:
  ```javascript
  function greet() {   // ✅ Covered if called
    return "Hello!";
  }
  const goodbye = () => {}; // ❌ Not covered if never called
  ```

---

### **4. Lines (Lines)**
- **Definition**: A *line* is a physical line in your source file.  
- **Coverage**: Measures what percentage of lines were executed.  
- **Note**: Similar to statement coverage but may differ in multi-statement lines (e.g., `const x = 10; console.log(x);` counts as 1 line but 2 statements).

---

### **Example Coverage Report**
```
File      | % Stmts | % Branch | % Funcs | % Lines
-----------------------------------------------
utils.js  |   80    |    50    |   100   |   80
```
**Interpretation**:
- **80% Statements**: 4 out of 5 statements were executed.  
- **50% Branches**: Only 1 of 2 conditional paths was tested.  
- **100% Functions**: All functions were called.  
- **80% Lines**: 4 out of 5 lines were hit.

---

### **How to Improve Coverage**
1. **Target Branches**: Add tests for `else`, `catch`, and edge cases.  
2. **Cover All Functions**: Ensure helper functions are called.  
3. **Use Istanbul/Jest Flags**:  
   ```bash
   jest --collectCoverageFrom='src/**/*.js' --coverageThreshold='{"global":{"branches":80}}'
   ```
   - Enforces a minimum branch coverage of 80%.

---

### **Where to Find the Report**
- **Terminal**: Summary printed after tests run.  
- **HTML Report**: Open `coverage/lcov-report/index.html` for visuals:  
  ```bash
  open coverage/lcov-report/index.html  # Mac
  start coverage/lcov-report/index.html # Windows
  ```

---

### **Key Takeaway**
- **Statements/Lines**: Basic coverage metrics.  
- **Branches**: Critical for logic-heavy code.  
- **Functions**: Ensures no dead code exists.  

