**TypeScript Cheat Sheet**
---

### **1. Basic Types**
*Description: Used to define the type of variables explicitly, ensuring type safety at compile time. Helps catch errors early, especially when working with primitive data like numbers, strings, or booleans.*

```typescript
let num: number = 42;           // Number
let str: string = "Hello";      // String
let bool: boolean = true;       // Boolean
let undef: undefined;           // Undefined
let nul: null = null;           // Null
let anyValue: any = "anything"; // Any (avoid when possible)
let unknownValue: unknown;      // Unknown (safer alternative to any)
```

---

### **2. Arrays**
*Description: Used to define collections of items of the same type. Ideal for lists or sequences where type consistency is required, like a list of numbers or strings. For nested arrays (e.g., arrays within arrays), you can specify types recursively, which is useful for multi-dimensional data like matrices or grouped lists.*

```typescript
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Nested arrays
let nestedNumbers: number[][] = [[1, 2], [3, 4]]; // Array of number arrays
let nestedStrings: Array<Array<string>> = [["a", "b"], ["c", "d"]]; // Array of string arrays
```

---

### **3. Tuples**
*Description: Used when you need a fixed-length array with specific types for each position, such as representing a pair or a record with mixed types.*

```typescript
let tuple: [string, number] = ["hello", 10]; // Fixed length and types
```

---

### **4. Objects**
*Description: Used to define structured data with named properties. Useful for representing real-world entities like users or configurations with optional fields.*

```typescript
let obj: { name: string; age: number } = { name: "Alice", age: 25 };

// Optional properties
let optionalObj: { name: string; age?: number } = { name: "Bob" };
```

---

### **5. Interfaces**
*Description: Used to define reusable object shapes or contracts for data structures. Common in object-oriented programming or when sharing type definitions across multiple entities.*

```typescript
interface User {
  name: string;
  age?: number; // Optional property
}

let user: User = { name: "Charlie" };

// Extending interface
interface Admin extends User {
  role: string;
}

let admin: Admin = { name: "Dave", role: "admin" };
```

---

### **6. Type Aliases**
*Description: Used to create custom type names, especially for unions, primitives, or complex types. Offers flexibility compared to interfaces and is great for one-off type definitions.*

```typescript
type Point = {
  x: number;
  y: number;
};

let coord: Point = { x: 10, y: 20 };

// Union types with type alias
type Status = "success" | "error" | "pending";
let result: Status = "success";
```

---

### **7. Union and Intersection Types**
*Description: Union types are used when a value can be one of several types (e.g., string or number). Intersection types combine multiple types into one, useful for merging object properties.*

```typescript
// Union
let mixed: string | number = "hello"; // Can be string or number

// Intersection
interface A { a: string; }
interface B { b: number; }
let combined: A & B = { a: "test", b: 42 };
```

---

### **8. Functions**
*Description: Used to type function parameters and return values, ensuring predictable inputs and outputs. Essential for reusable logic or APIs.*

```typescript
// Basic function
function add(a: number, b: number): number {
  return a + b;
}

// Optional parameters
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}`;
}

// Function type
let myFunc: (x: number, y: number) => number;
myFunc = add;
```

---

### **9. Type Assertions**
*Description: Used when you know more about a value’s type than TypeScript can infer, such as when working with `any` or external data. Use sparingly to avoid runtime errors.*

```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length; // 'as' syntax
// or
let strLengthAlt: number = (<string>someValue).length; // Angle-bracket syntax
```

---

### **10. Enums**
*Description: Used to define a set of named constants, making code more readable and self-documenting. Great for fixed options like statuses or directions.*

```typescript
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

let move: Direction = Direction.Up; // 0

// Custom values
enum StatusCode {
  OK = 200,
  NotFound = 404
}
```

---

### **11. Generics**
*Description: Used to create reusable components that work with any type while maintaining type safety. Common in functions, classes, or data structures like lists.*

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("hello"); // T is string
let numOutput = identity<number>(42);   // T is number

// Generic interface
interface Box<T> {
  contents: T;
}

let stringBox: Box<string> = { contents: "data" };
```

---

### **12. Classes**
*Description: Used for object-oriented programming to define blueprints for objects with properties and methods. Useful for modeling entities with behavior.*

```typescript
class Person {
  constructor(public name: string, private age: number) {}

  greet(): string {
    return `Hi, I'm ${this.name}`;
  }
}

let person = new Person("Eve", 30);

// Inheritance
class Employee extends Person {
  constructor(name: string, age: number, public role: string) {
    super(name, age);
  }
}
```

---

### **13. Type Guards**
*Description: Used to narrow down the type of a variable within a conditional block, enabling safe access to type-specific properties or methods.*

```typescript
function isString(value: any): value is string {
  return typeof value === "string";
}

let val: string | number = "test";
if (isString(val)) {
  console.log(val.toUpperCase()); // TypeScript knows val is string
}
```

---

### **14. Utility Types**
*Description: Used to transform existing types (e.g., making properties optional or readonly). Saves time when manipulating complex type definitions.*

```typescript
interface User {
  id: number;
  name: string;
}

// Partial: Makes all properties optional
let partialUser: Partial<User> = { name: "Frank" };

// Pick: Select specific properties
let picked: Pick<User, "name"> = { name: "Grace" };

// Omit: Exclude specific properties
let omitted: Omit<User, "id"> = { name: "Hank" };

// Readonly: Makes properties immutable
let readonlyUser: Readonly<User> = { id: 1, name: "Ivy" };
```

---

### **15. Modules**
*Description: Used to organize code into reusable, importable units. Essential for large projects to maintain modularity and avoid namespace conflicts.*

```typescript
// Export
export const myVar: number = 42;
export interface MyInterface {
  field: string;
}

// Import
import { myVar, MyInterface } from "./myModule";
```

---

### **16. Type Inference**
*Description: Used implicitly by TypeScript to automatically determine types when not explicitly specified. Reduces boilerplate but requires caution with complex logic.*

```typescript
let inferred = "hello"; // TypeScript infers 'string'
inferred = 42; // Error: Type 'number' is not assignable to 'string'
```

---

### **17. Never and Void**
*Description: `Never` is used for functions that never return (e.g., throw errors), while `void` is used for functions with no return value. Clarifies intent in function signatures.*

```typescript
function throwError(msg: string): never {
  throw new Error(msg); // Never returns
}

function logMessage(): void {
  console.log("Logged"); // No return value
}
```

---

### **18. Decorators (Experimental)**
*Description: Used to add metadata or modify behavior of classes, methods, or properties. Common in frameworks like Angular, but requires enabling in `tsconfig.json`.*

```typescript
// Enable in tsconfig.json: "experimentalDecorators": true
function log(target: any, key: string) {
  console.log(`${key} was called`);
}

class Example {
  @log
  method() {}
}
```

---

### **19. Common tsconfig.json Options**
*Description: Used to configure the TypeScript compiler for your project, controlling output, strictness, and module behavior. Tailor it to your build and runtime needs.*

```json
{
  "compilerOptions": {
    "target": "es6",           // Output JS version
    "module": "commonjs",      // Module system
    "strict": true,            // Enable all strict type-checking
    "outDir": "./dist",        // Output directory
    "rootDir": "./src",        // Source directory
    "esModuleInterop": true    // Better module interop
  }
}
```

---

