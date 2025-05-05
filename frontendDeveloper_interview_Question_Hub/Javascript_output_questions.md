### Javascript Output:
1. **What is the output of Counter and Objects?**
```javascript
function createCounter(initialValue = 0) {
  let count = initialValue;

  return {
    increment: () => {
      count++;
      return count;
    },
    reset: () => {
      count = initialValue;
      return count;
    },
    getValue: () => {
        return count;
    }
  };
}

const myCounter = createCounter(10);

console.log(myCounter.increment()); // Output: 11
console.log(myCounter.increment()); // Output: 12
console.log(myCounter.reset());   // Output: 10
console.log(myCounter.getValue()); // Output: 10

const employee = {
  id: 101,
  info: {
    name: 'Alice Smith',
    skills: ['JavaScript', 'React']
  }
};

const { id, info: { name, skills: [primarySkill] } } = employee;

console.log(id); // Output: 101
console.log(name); // Output: Alice Smith
console.log(primarySkill); // Output: JavaScript

const product = {
    id: 201,
    details: {
        name: "Laptop",
        price: 1200
    }
};

const { details: { name: productName, price: productPrice } } = product;

console.log(productName); // Output: Laptop
console.log(productPrice); // Output: 1200

const user = {
  id: 1,
  name: 'John Doe',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    zipCode: '12345'
  }
};

const { name, address: { city } } = user;

console.log(name); // Output: John Doe
console.log(city); // Output: Anytown
```
<details>
<summary>Answer</summary>

```javascript
// Output: 
// 11
// 12
// 10
// 10
// 101
// Alice Smith
// JavaScript
// Laptop
// 1200
// John Doe
// Anytown
```

**Explanation:**
- **`createCounter` function:**  
  - `increment()`: Increases the `count` by `1` and returns the updated value.
  - `reset()`: Resets the `count` to the `initialValue` and returns it.
  - `getValue()`: Returns the current value of `count`.

- **Object destructuring:**  
  - Extracts `id`, `name`, and `primarySkill` from the `employee` object.
  - Extracts `productName` and `productPrice` from the `product` object.
  - Extracts `name` and `city` from the `user` object.
</details>

---

2. **What's the output?**
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
```
<details>
<summary>Answer</summary>

```javascript
// Output: 3, 3, 3, 0, 1, 2
```

**Explanation:**
- **`var` behavior:**  
  When `var` is used, the variable `i` is function-scoped, not block-scoped. By the time the `setTimeout` callback runs, the loop has already completed, and `i` has the value `3`. This is why all three `setTimeout` callbacks log `3`.

- **`let` behavior:**  
  When `let` is used, the variable `i` is block-scoped. Each iteration of the loop creates a new `i` in the block scope, so the `setTimeout` callback captures the correct value of `i` for that iteration. This is why the output is `0, 1, 2`.
</details>

---

3. **What is the output of the following function using promises?**
```javascript
function resolvePromise() {
    let newPromise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Hello Geeks. Wrapped setTimeout() in a promise");
        }, 1000);
    });

    newPromise
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

resolvePromise();
```
<details>
<summary>Answer</summary>

```javascript
// Output: "Hello Geeks. Wrapped setTimeout() in a promise"
```

**Explanation:**  
The `resolve` function is called after 1 second, and the resolved value is passed to the `.then()` handler, which logs it to the console.
</details>

---

4. **What is the output after converting the above promise to async/await?**
```javascript
async function resolvePromise() {
    let newPromise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Hello Geeks. Wrapped setTimeout() in a promise");
        }, 1000);
    });

    try {
        const result = await newPromise;
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
}

resolvePromise();
```
<details>
<summary>Answer</summary>

```javascript
// Output: "Hello Geeks. Wrapped setTimeout() in a promise"
```

**Explanation:**  
The `await` keyword pauses the execution of the `async` function until the promise resolves. Once resolved, the result is logged to the console.
</details>

---

5. **What is the output of `setTimeout` with synchronous code?**
```javascript
console.log("Before setTimeout");

setTimeout(function() {
  console.log("Inside setTimeout");
}, 0);

console.log("After setTimeout");
```
<details>
<summary>Answer</summary>

```javascript
// Output: "Before setTimeout", "After setTimeout", "Inside setTimeout"
```

**Explanation:**  
Even though `setTimeout` has a delay of `0`, it is still asynchronous. The synchronous code (`console.log`) runs first, and the `setTimeout` callback is pushed to the event loop and executed after the synchronous code completes.
</details>

---

6. **What is the output of this closure with counter increment function?**
```javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    console.log(count);
  };
}

const counter = createCounter();

counter(); 
counter(); 
counter();
```
<details>
<summary>Answer</summary>

```javascript
// Output: 1, 2, 3
```

**Explanation:**  
The `createCounter` function returns a closure that retains access to the `count` variable. Each call to `counter()` increments and logs the value of `count`.
</details>

---

7. **What is the output of this currying example?**
```javascript
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const multiplyBy2 = multiply(2);
console.log(multiplyBy2(3)); 
console.log(multiplyBy2(5)); 

const multiplyBy5 = multiply(5);
console.log(multiplyBy5(3)); 
console.log(multiplyBy5(4));
```
<details>
<summary>Answer</summary>

```javascript
// Output: 6, 10, 15, 20
```

**Explanation:**  
Currying allows partial application of a function. `multiplyBy2` and `multiplyBy5` are partially applied functions that multiply their argument by `2` and `5`, respectively.
</details>

---

8. **What will be the output of the shallow copy of the object?**
```javascript
const userDetails = {
  firstName: "Surbhi",
  lastName: "Dighe",
  age: 20,
  address: {
    city: "Hyderabad",
    country: "India",
  },
};

let cloneUserDetails = { ...userDetails };
userDetails.age = 22;
userDetails.address.city = "Banglore";

console.log(cloneUserDetails.age); 
console.log(cloneUserDetails.address.city);
```
<details>
<summary>Answer</summary>

```javascript
// Output: 20, "Banglore"
```

**Explanation:**  
Shallow copying using `{ ...userDetails }` creates a new object, but nested objects (like `address`) are still referenced. Changing `userDetails.address.city` affects `cloneUserDetails.address.city` because they share the same reference.
</details>

---

9. **What will be the output of the following function?**
```javascript
function hello(){
  console.log(name);
  console.log(age);
  var name = "Alice";
  let age = 21;
}
hello();
```
<details>
<summary>Answer</summary>

```javascript
// Output: undefined, ReferenceError
```

**Explanation:**  
`var` declarations are hoisted but initialized as `undefined`, while `let` declarations are not hoisted. Accessing `age` before its declaration results in a `ReferenceError`.
</details>

---

10. **What will be the output of this comparison between an array and string?**
```javascript
const arr1 = [1,2,3];
const arr2 = [1,2,3];
const str = "1,2,3";

console.log(arr1 == str); 
console.log(arr1 == arr2);
```
<details>
<summary>Answer</summary>

```javascript
// Output: true, false
```

**Explanation:**  
When comparing an array to a string, the array is converted to a string (`"1,2,3"`), so `arr1 == str` is `true`. However, `arr1` and `arr2` are different objects, so `arr1 == arr2` is `false`.
</details>

---

11. **What will be the output of the closure function?**
```javascript
function outer() {
  let x = 10;
  
  function inner() {
    console.log(x);
  }
  
  return inner;
}

let closureFunc = outer();
closureFunc();
```
<details>
<summary>Answer</summary>

```javascript
// Output: 10
```

**Explanation:**  
The `inner` function forms a closure and retains access to the `x` variable from its outer scope, even after `outer` has finished executing.
</details>

---

12. **What will be the output of this loop with `setTimeout`?**
```javascript
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
```
<details>
<summary>Answer</summary>

```javascript
// Output: 5, 5, 5, 5, 5
```

**Explanation:**  
Since `var` is function-scoped, by the time the `setTimeout` callback runs, the loop has completed, and `i` is `5`. All callbacks log the final value of `i`.
</details>

---

13. **What will be the output of the following code using prototypes?**
```javascript
let animal = {
  sound: '...',
  makeSound() {
    console.log(this.sound);
  }
};

let cat = {
  sound: 'Meow!'
};

cat.__proto__ = animal;
cat.makeSound();
```
<details>
<summary>Answer</summary>

```javascript
// Output: "Meow!"
```

**Explanation:**  
The `cat` object inherits the `makeSound` method from `animal`, but its own `sound` property (`"Meow!"`) is used when the method is called.
</details>

---

14. **What will be the output of this comparison between two objects?**
```javascript
const a = {x : 1};
const b = {x : 1};
console.log(a === b); 
console.log(a.x === b.x);
```
<details>
<summary>Answer</summary>

```javascript
// Output: false, true
```

**Explanation:**  
`a` and `b` are different objects, so `a === b` is `false`. However, their properties (`a.x` and `b.x`) have the same value, so `a.x === b.x` is `true`.
</details>

---

15. **What will be the output of this sorted array?**
```javascript
const arr = [10, -1, 2];
arr.sort((a, b) => a - b);
console.log(arr);
```
<details>
<summary>Answer</summary>

```javascript
// Output: [-1, 2, 10]
```

**Explanation:**  
The `sort` method sorts the array in ascending order when a compare function `(a, b) => a - b` is provided.
</details>

---

16. **What will be the output of this `filter(Boolean)` method?**
```javascript
const arr = [11, 0, '', false, 2, 1];
const filtered = arr.filter(Boolean);
console.log(filtered);
```
<details>
<summary>Answer</summary>

```javascript
// Output: [11, 2, 1]
```

**Explanation:**  
`filter(Boolean)` removes falsy values (`0`, `''`, `false`) from the array, leaving only truthy values.
</details>

---

17. **What will be the output of this object destructuring?**
```javascript
const obj = {
  var1: 1,
  var2: 2
};
const { var1, var2 } = obj;
console.log(var1, var2);
```
<details>
<summary>Answer</summary>

```javascript
// Output: 1, 2
```

**Explanation:**  
Destructuring extracts `var1` and `var2` from `obj` and assigns their values to the corresponding variables.
</details>

---

18. **What will be the output of this destructuring with renaming?**
```javascript
const user = { 
  name: "Surbhi dighe", 
  country: "India" 
};
const { name: fullname, country } = user;
console.log(fullname); 
console.log(name);
```
<details>
<summary>Answer</summary>

```javascript
// Output: "Surbhi dighe", ReferenceError
```

**Explanation:**  
The `name` property is renamed to `fullname`, so `console.log(name)` results in a `ReferenceError` because `name` is not defined.
</details>

---

19. **What is the output of slicing an array?**
```javascript
const animals = ["ant", "bison", "camel", "duck", "elephant"];

console.log(animals.slice(2)); 
console.log(animals.slice(2, 4)); 
console.log(animals.slice(1, 5)); 
console.log(animals.slice(-2)); 
console.log(animals.slice(2, -1)); 
console.log(animals.slice(-4, -1)); 
console.log(animals.slice());
```
<details>
<summary>Answer</summary>

```javascript
// Output: 
// ["camel", "duck", "elephant"]
// ["camel", "duck"]
// ["bison", "camel", "duck", "elephant"]
// ["duck", "elephant"]
// ["camel", "duck"]
// ["bison", "camel", "duck"]
// ["ant", "bison", "camel", "duck", "elephant"]
```

**Explanation:**  
- `slice(2)`: Extracts from index `2` to the end.
- `slice(2, 4)`: Extracts from index `2` to `4` (exclusive).
- `slice(1, 5)`: Extracts from index `1` to `5` (exclusive).
- `slice(-2)`: Extracts the last two elements.
- `slice(2, -1)`: Extracts from index `2` to the second-to-last element.
- `slice(-4, -1)`: Extracts from the fourth-to-last element to the second-to-last element.
- `slice()`: Creates a shallow copy of the entire array.
</details>

---

20. **What is the output of this `splice` method?**
```javascript
const months = ["Jan", "March", "April", "June"];
months.splice(1, 0, "Feb");
console.log(months); 
months.splice(4, 1, "May");
console.log(months);
```
<details>
<summary>Answer</summary>

```javascript
// Output: ["Jan", "Feb", "March", "April", "June"], ["Jan", "Feb", "March", "April", "May"]
```

**Explanation:**  
- `splice(1, 0, "Feb")`: Inserts `"Feb"` at index `1` without removing any elements.
- `splice(4, 1, "May")`: Replaces the element at index `4` with `"May"`.
</details>

---

21. **What is the output of `Object.keys()` on an array?**
```javascript
const arr = ["A", "B", "C", "D", "E"];
console.log(Object.keys(arr));
```
<details>
<summary>Answer</summary>

```javascript
// Output: ["0", "1", "2", "3", "4"]
```

**Explanation:**  
`Object.keys()` returns an array of the enumerable property names (indices) of the array.
</details>

---

22. **What is the output of this loop with a variable?**
```javascript
for (let i = 0; i < 3; i++) {
  console.log(i);
}

console.log(i);
```
<details>
<summary>Answer</summary>

```javascript
// Output: 0, 1, 2, ReferenceError
```

**Explanation:**  
`let` is block-scoped, so `i` is only accessible inside the loop. Attempting to access `i` outside the loop results in a `ReferenceError`.
</details>

---

23. **What will be the output of the addition of arrays?**
```javascript
let x = [];
let y = [];
let z = x + y;

console.log(typeof z);
```
<details>
<summary>Answer</summary>

```javascript
// Output: "string"
```

**Explanation:**  
When arrays are added, they are converted to strings and concatenated. The result is an empty string (`""`), and `typeof ""` is `"string"`.
</details>

---

24. **What will be the output of the object cloning example?**
```javascript
const a = { b: { c: 2 } };
const b = { ...a };
a.b.c = 3;

console.log(b.b.c);
```
<details>
<summary>Answer</summary>

```javascript
// Output: 3
```

**Explanation:**  
Shallow copying using `{ ...a }` creates a new object, but nested objects (like `b`) are still referenced. Changing `a.b.c` affects `b.b.c` because they share the same reference.
</details>

---

25. **What will be the output of this destructuring with a skip?**
```javascript
let x = [1, 2, 3];
let [, , y] = x;

console.log(y);
```
<details>
<summary>Answer</summary>

```javascript
// Output: 3
```

**Explanation:**  
Destructuring skips the first two elements and assigns the third element to `y`.
</details>

---

26. **What is the output of merging objects?**
```javascript
let x = { a: 1, b: 2 };
let y = { b: 3 };
let z = { ...x, ...y };

console.log(z);
```
<details>
<summary>Answer</summary>

```javascript
// Output: { a: 1, b: 3 }
```

**Explanation:**  
The `...` spread operator merges `x` and `y`. If there are overlapping properties (like `b`), the value from the last object (`y`) is used.
</details>

---

27. **What is the output of setting an array length?**
```javascript
let arr = [1, 2, 3];
arr[10] = 4;

console.log(arr.length);
```
<details>
<summary>Answer</summary>

```javascript
// Output: 11
```

**Explanation:**  
Setting an element at index `10` extends the array length to `11`. The missing indices (`3` to `9`) are empty slots.
</details>

---

28. **What is the output of `Object.assign()`?**
```javascript
let x = { a: 1 };
let y = Object.assign({}, x);

console.log(x === y);
```
<details>
<summary>Answer</summary>

```javascript
// Output: false
```

**Explanation:**  
`Object.assign()` creates a new object, so `x` and `y` are not the same object, even though they have the same properties.
</details>

---

29. **What is the output of adding booleans?**
```javascript
let x = true;
let y = false;

console.log(x + y);
```
<details>
<summary>Answer</summary>

```javascript
// Output: 1
```

**Explanation:**  
`true` is converted to `1` and `false` to `0`, so `1 + 0 = 1`.
</details>

---

30. **What is the output of adding two arrays?**
```javascript
let a = [1, 2, 3];
let b = [4, 5, 6];

console.log(a + b);
```
<details>
<summary>Answer</summary>

```javascript
// Output: "1,2,34,5,6"
```

**Explanation:**  
When arrays are added, they are converted to strings and concatenated. The result is `"1,2,3" + "4,5,6" = "1,2,34,5,6"`.
</details>

---

31. **What is the output of the comparison between boolean and number?**
```javascript
const x = true;
const y = 1;

console.log(x == y, x === y);
```
<details>
<summary>Answer</summary>

```javascript
// Output: true, false
```

**Explanation:**  
`==` performs type coercion, so `true` is converted to `1`, making `x == y` true. `===` does not perform type coercion, so `x === y` is false.
</details>

---

32. **What will be the output of the `hello` function?**
```javascript
function hello() {
  console.log("1");
    setTimeout(() => {
        console.log("2");
    })
  console.log("3");
}
hello();
```
<details>
<summary>Answer</summary>

```javascript
// Output: "1", "3", "2"
```

**Explanation:**  
The `setTimeout` callback is asynchronous and is executed after the synchronous code (`console.log("1")` and `console.log("3")`).
</details>

---

33. **What is the output of this comparison?**
```javascript
console.log(7 > 6 > 5);
```
<details>
<summary>Answer</summary>

```javascript
// Output: false
```

**Explanation:**  
The expression is evaluated as `(7 > 6) > 5`, which becomes `true > 5`. Since `true` is coerced to `1`, the final comparison is `1 > 5`, which is `false`.
</details>

---

34. **What is the output of the following comparison between objects?**
```javascript
console.log({} == {});
console.log({} === {});
```
<details>
<summary>Answer</summary>

```javascript
// Output: false, false
```

**Explanation:**  
Two different objects are never equal, even if they have the same properties.
</details>

---

35. **What will be the output of `indexOf` method?**
```javascript
const arr = [2,3,5,2,8,10,5];
console.log(arr.indexOf(5));
```
<details>
<summary>Answer</summary>

```javascript
// Output: 2
```

**Explanation:**  
`indexOf` returns the first index at which the element `5` is found.
</details>

---

36. **What is the output of `Array.isArray()`?**
```javascript
function checkValue(value){
    var result = Array.isArray(value);
    console.log(result);
}
checkValue([1,2,3]);
```
<details>
<summary>Answer</summary>

```javascript
// Output: true
```

**Explanation:**  
`Array.isArray()` returns `true` if the argument is an array.
</details>

---

37. **What will be the output of the `sum` function with undefined as parameter?**
```javascript
function sum(a=5, b=7){
    return a+b;
}
console.log(sum(undefined, 20));
```
<details>
<summary>Answer</summary>

```javascript
// Output: 25
```

**Explanation:**  
The default value for `a` is `5` because `undefined` is passed. `b` is `20`, so the result is `5 + 20 = 25`.
</details>

---

38. **What will be the output of string and number concatenation?**
```javascript
console.log(10 + "5");
console.log("5" + 10);
```
<details>
<summary>Answer</summary>

```javascript
// Output: "105", "510"
```

**Explanation:**  
When a number is concatenated with a string, the number is converted to a string.
</details>

---

39. **What will be the output of the function `printName`?**
```javascript
console.log(printName());
function printName(){
    return "Hi my name is Bob";
}
```
<details>
<summary>Answer</summary>

```javascript
// Output: "Hi my name is Bob"
```

**Explanation:**  
Function declarations are hoisted, so `printName()` can be called before its definition.
</details>
```
