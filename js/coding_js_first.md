---

### **1. What does the `slice` method do in JavaScript? What happens if the start index is greater than the end index?**

**Answer:**

The `slice` method extracts a portion of an array between the specified start and end indices (excluding the end index). If the start index is greater than the end index, the result is an empty array.

**Example:**
```javascript
const arr = [10, 20, 30, 40, 50];

// Trying to slice from the last element to the third-to-last element
const newArr = arr.slice(-1, -3);

console.log(newArr); // Output: []
```

**Explanation:**
- Negative indices count from the end of the array.
- `arr.slice(-1, -3)` attempts to extract elements starting from the last element (`-1`) up to (but not including) the third-to-last element (`-3`).
- Since the start index (`-1`) is greater than the end index (`-3`), no elements are extracted, resulting in an empty array.

---

### **2. What is the difference between `splice` and `slice` in JavaScript? Provide an example.**

**Answer:**

- **`slice`:** Extracts a portion of an array without modifying the original array.
- **`splice`:** Removes or replaces existing elements and/or adds new elements in place, modifying the original array.

**Example:**
```javascript
const arr = [10, 20, 30, 40, 50];

// Using slice
const slicedArr = arr.slice(1, 3);
console.log(slicedArr); // Output: [20, 30]
console.log(arr);       // Original array remains unchanged: [10, 20, 30, 40, 50]

// Using splice
arr.splice(1, 2); // Removes 2 elements starting from index 1
console.log(arr); // Output: [10, 40, 50]
```

**Explanation:**
- `slice(1, 3)` extracts elements from index `1` to `3` (excluding `3`) without modifying the original array.
- `splice(1, 2)` removes `2` elements starting from index `1`, modifying the original array.

---

### **3. How can you check if a substring exists in a string, find its first occurrence, and count its occurrences in JavaScript?**

**Answer:**

Here is how you can perform these operations:

```javascript
let mainString = "Hello world, Hello everyone, Hello again!";
let searchSubstring = "Hello";

// Case 1: Check if the substring exists in the main string
let isSubstringPresent = mainString.includes(searchSubstring);
console.log("Is the substring present? ", isSubstringPresent);

// Case 2: Find the index of the first occurrence of the substring
let firstOccurrenceIndex = mainString.indexOf(searchSubstring);
console.log("Index of first occurrence: ", firstOccurrenceIndex);

// Case 3: Count how many times the substring appears in the main string
let substringOccurrences = mainString.split(searchSubstring).length - 1;
console.log("Number of times the substring appears: ", substringOccurrences);
```

**Output:**
```
Is the substring present? true
Index of first occurrence: 0
Number of times the substring appears: 3
```

---

### **4. How can you reverse a number in JavaScript?**

**Answer:**

There are two common approaches to reverse a number in JavaScript: using arithmetic operations or converting the number to a string.

#### **Method 1: Using Arithmetic Operations**
```javascript
function reverseNumberArithmetic(num) {
  let reversed = 0;

  while (num > 0) {
    const lastDigit = num % 10; // Extract the last digit
    reversed = reversed * 10 + lastDigit; // Append the last digit to the reversed number
    num = Math.floor(num / 10); // Remove the last digit from the original number
  }

  return reversed;
}

const num = 123456;
const reversedNum = reverseNumberArithmetic(num);
console.log(reversedNum); // Output: 654321
```

#### **Method 2: Using String Manipulation**
```javascript
function reverseNumber(num) {
  // Convert the number to a string, reverse it, and convert it back to a number
  const reversed = parseInt(num.toString().split('').reverse().join(''), 10);
  return reversed;
}

const num = 123456;
const reversedNum = reverseNumber(num);
console.log(reversedNum); // Output: 654321
```

---

### **5. What is the output of the following JavaScript code, and why?**

```javascript
console.log('A'); // Logs 'A' immediately.

setTimeout(() => {
  console.log('B'); // Scheduled to run after the synchronous code is done.
});

['C', 'D'].forEach((x) => console.log(x)); // Logs 'C' and 'D' immediately.

console.log('E'); // Logs 'E' immediately.
```

**Answer:**

The output of the code is:

```
A
C
D
E
B
```

**Explanation:**
1. `console.log('A')` is executed immediately, so `'A'` is logged first.
2. `setTimeout` is asynchronous, meaning it schedules the function to run after the current stack of synchronous code is executed. Therefore, `console.log('B')` is logged last.
3. The `['C', 'D']` array is iterated using `forEach()`, which calls the callback function for each element in the array, logging `'C'` and then `'D'`.
4. `console.log('E')` is executed immediately after the `forEach` loop, so `'E'` is logged after `'C'` and `'D'`.
5. After all synchronous code finishes, the `setTimeout` callback (`console.log('B')`) is executed.

---

### **6. How can you group an array of objects by a specific property (e.g., `key`) in JavaScript? Provide an example.**

**Answer:**

You can group an array of objects by a specific property using a combination of `forEach` and an object to store the grouped results. Here's an example:

```javascript
let obj = [
  { key: 'Sample 1', data: 'Data1' },
  { key: 'Sample 1', data: 'Data1' },
  { key: 'Sample 1', data: 'Data1' },
  { key: 'Sample 2', data: 'Data2' },
  { key: 'Sample 3', data: 'Data3' },
  { key: 'Sample 4', data: 'Data4' }
];

let Output = {};

obj.forEach(item => {
  if (!Output[item.key]) {
    Output[item.key] = [];
  }
  Output[item.key].push(item);
});

console.log(Output);
```

**Output:**
```javascript
{
  'Sample 1': [
    { key: 'Sample 1', data: 'Data1' },
    { key: 'Sample 1', data: 'Data1' },
    { key: 'Sample 1', data: 'Data1' }
  ],
  'Sample 2': [{ key: 'Sample 2', data: 'Data2' }],
  'Sample 3': [{ key: 'Sample 3', data: 'Data3' }],
  'Sample 4': [{ key: 'Sample 4', data: 'Data4' }]
}
```

**Explanation:**
- An empty object `Output` is initialized to store the grouped results.
- The `forEach` method iterates through the `obj` array.
- For each item, it checks if the `key` already exists in `Output`. If not, it initializes an empty array for that key.
- The current item is pushed into the corresponding array in `Output`.

---

### **7. Write a function to flatten a nested array in JavaScript. Provide an example.**

**Answer:**

#### **Iterative Approach**
```javascript
const a = [1, 2, 3, [4, [5, 6]], 7, 8];

function flattenArrayIterative(arr) {
  let result = [];
  let stack = [...arr]; // Initialize the stack with the input array

  while (stack.length > 0) {
    let current = stack.pop(); // Take the last element from the stack

    if (Array.isArray(current)) {
      stack.push(...current); // If it's an array, push its elements back onto the stack
    } else {
      result.unshift(current); // If it's not an array, add it to the front of the result
    }
  }

  return result;
}

const result = flattenArrayIterative(a);
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8]
```

#### **Recursive Approach**
```javascript
const a = [1, 2, 3, [4, [5, 6]], 7, 8];

function flattenArray(arr) {
  let result = [];

  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item)); // Recursively flatten sub-arrays
    } else {
      result.push(item); // Push non-array items
    }
  });

  return result;
}

const result = flattenArray(a);
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8]
```

**Explanation:**
- The `flattenArray` function takes an array as input.
- It iterates through each element of the array using `forEach`.
- If an element is an array (`Array.isArray(item)`), the function recursively flattens it.
- Non-array elements are directly pushed into the `result` array.
- The final flattened array is returned.

---

### **8. What is memoization, and how can it be implemented in JavaScript? Provide an example.**

**Answer:**

Memoization is an optimization technique used to cache the results of expensive function calls so that they can be reused when the same inputs occur again.

Here is an example of memoization in JavaScript:

```javascript
// Function to calculate the sum of numbers from 0 to n
const sumOfNumbersUpTo = (n) => {
  let totalSum = 0;
  for (let i = 0; i <= n; i++) {
    totalSum += i;
  }
  return totalSum;
};

// Memoization function to optimize repeated calculations
const memoizeFunction = (originalFunction) => {
  let cache = {}; // Cache for storing results
  return function(n) {
    if (n in cache) {
      console.log("Cache hit!"); // Use cached result
      return cache[n];
    } else {
      console.log("First time calculation!"); // Calculate and store result in cache
      let result = originalFunction(n);
      cache[n] = result;
      return result;
    }
  };
};

const optimizedSum = memoizeFunction(sumOfNumbersUpTo);

console.time("Execution Time");
console.log(optimizedSum(5)); // First time calculation for 5
console.timeEnd("Execution Time");

console.time("Execution Time");
console.log(optimizedSum(5)); // This time it should hit the cache
console.timeEnd("Execution Time");
```

**Output:**
```
First time calculation!
15
Execution Time: X ms
Cache hit!
15
Execution Time: Y ms
```

**Explanation:**
- The `sumOfNumbersUpTo` function calculates the sum of numbers from `0` to `n`.
- The `memoizeFunction` wraps the original function and adds caching logic.
- When `optimizedSum(5)` is called for the first time, the result is calculated and stored in the cache.
- On subsequent calls with the same input (`5`), the cached result is returned, avoiding redundant calculations.

---

### **9. How can you remove duplicate elements from an array in JavaScript? Provide two methods: one using `Set` and another without using `Set`.**

**Answer:**

#### **Method 1: Using `Set`**
```javascript
const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = [...new Set(arr)];
console.log(uniqueArr); // Output: [1, 2, 3, 4, 5]
```

**Explanation:**
- `Set` automatically removes duplicate values because it only stores unique values.
- The `...` spread operator is used to convert the `Set` back into an array.

#### **Method 2: Without Using `Set`**
```javascript
const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = arr.filter((value, index, self) => self.indexOf(value) === index);
console.log(uniqueArr); // Output: [1, 2, 3, 4, 5]
```

**Explanation:**
- The `filter` method iterates through the array and keeps only the first occurrence of each element.
- `self.indexOf(value) === index` ensures that only the first occurrence of each value is included in the result.

---

### **10. How can you remove duplicate objects from an array in JavaScript?**

**Answer:**

To remove duplicate objects from an array, you can use a combination of `Set` and `JSON.stringify` to compare objects by their properties.

```javascript
const arr = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 1, name: "John" }, // Duplicate
  { id: 3, name: "Alice" },
];

const uniqueArr = Array.from(
  new Set(arr.map(obj => JSON.stringify(obj)))
).map(str => JSON.parse(str));

console.log(uniqueArr);
```

**Output:**
```javascript
[
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Alice" }
]
```

**Explanation:**
- `arr.map(obj => JSON.stringify(obj))` converts each object into a JSON string.
- `new Set()` removes duplicate strings.
- `Array.from()` converts the `Set` back into an array of strings.
- `.map(str => JSON.parse(str))` converts the strings back into objects.

---

### **11. Find Indices of Numbers Whose Target is 30**
**Input:** `[10, 20, 30]` → **Output:** `[0, 1]`

#### **Using Nested For Loop**
```javascript
function findIndices(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}

const arr = [10, 20, 30];
console.log(findIndices(arr, 30)); // Output: [0, 1]
```

#### **Using `new Map()`**
```javascript
function findIndicesWithMap(arr, target) {
  const map = new Map();
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(arr[i], i);
  }
  return [];
}

const arr = [10, 20, 30];
console.log(findIndicesWithMap(arr, 30)); // Output: [0, 1]
```

---

### **12. Calculate Factorial of a Number**

#### **Using Recursion**
```javascript
function factorialRecursive(n) {
  if (n === 0 || n === 1) return 1;
  return n * factorialRecursive(n - 1);
}

console.log(factorialRecursive(4)); // Output: 24
```

#### **Without Recursion**
```javascript
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

console.log(factorialIterative(4)); // Output: 24
```

---

### **13. Find Maximum Difference Between Two Numbers in an Array**

#### **Using `reduce`**
```javascript
function maxDifference(arr) {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  return max - min;
}

const arr = [1, 2, 90, 10, 110];
console.log(maxDifference(arr)); // Output: 109
```

---

### **14. Find the Longest and Count String from Sentence**
**Input:** `"This is our country Nepal"` → **Output:** Longest string = `"country"`, Count = `7`

```javascript
function longestString(sentence) {
  const words = sentence.split(' ');
  let longest = '';
  for (const word of words) {
    if (word.length > longest.length) {
      longest = word;
    }
  }
  return { longestString: longest, count: longest.length };
}

const sentence = "This is our country Nepal";
console.log(longestString(sentence));
// Output: { longestString: "country", count: 7 }
```

---

### **15. Group Elements by Divide by 2**
**Input:** `[10, 15, 20, 25, 30]` → **Output:** `{ 0: [10, 20, 30], 1: [15, 25] }`

```javascript
function groupByDivideByTwo(arr) {
  const grouped = { 0: [], 1: [] };
  for (const num of arr) {
    grouped[num % 2].push(num);
  }
  return grouped;
}

const arr = [10, 15, 20, 25, 30];
console.log(groupByDivideByTwo(arr));
// Output: { 0: [10, 20, 30], 1: [15, 25] }
```

---

### **16. Merge Two Objects by ID**
**Input:** 
```javascript
arr1 = [{ id: 1, name: "John" }];
arr2 = [{ id: 1, age: 30 }];
```
**Output:** `[{ id: 1, name: "John", age: 30 }]`

```javascript
function mergeObjectsById(arr1, arr2) {
  const merged = arr1.map(obj1 => {
    const obj2 = arr2.find(o => o.id === obj1.id);
    return { ...obj1, ...obj2 };
  });
  return merged;
}

const arr1 = [{ id: 1, name: "John" }];
const arr2 = [{ id: 1, age: 30 }];
console.log(mergeObjectsById(arr1, arr2));
// Output: [{ id: 1, name: "John", age: 30 }]
```

---

### **17. Check Anagram or Not**
**Input:** 
```javascript
let str1 = "listen";
let str2 = "silent";
```
**Output:** `true`

```javascript
function isAnagram(str1, str2) {
  return (
    str1.split('').sort().join('') === str2.split('').sort().join('')
  );
}

console.log(isAnagram("listen", "silent")); // Output: true
```

---

### **18. Check Array Anagram**
**Input:** 
```javascript
const arr1 = ['eat', 'go', 're ad'];
const arr2 = ['tea', 'read', 'go'];
```
**Output:** `true`

```javascript
function isArrayAnagram(arr1, arr2) {
  return (
    JSON.stringify(arr1.map(word => word.split('').sort().join('')).sort()) ===
    JSON.stringify(arr2.map(word => word.split('').sort().join('')).sort())
  );
}

console.log(isArrayAnagram(['eat', 'go', 're ad'], ['tea', 'read', 'go'])); // Output: true
```

---

### **19. Check if a Number is Prime**
**Input:** `17` → **Output:** `true`

```javascript
function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

console.log(isPrime(17)); // Output: true
```

---

### **20. Generate Fibonacci Sequence Up to N Numbers**
**Input:** `7` → **Output:** `[0, 1, 1, 2, 3, 5, 8]`

```javascript
function fibonacci(n) {
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib.push(fib[i - 1] + fib[i - 2]);
  }
  return fib.slice(0, n);
}

console.log(fibonacci(7)); // Output: [0, 1, 1, 2, 3, 5, 8]
```

---

### **21. Check if a String is a Palindrome**
**Input:** `"madam"` → **Output:** `true`

```javascript
function isPalindrome(str) {
  const reversed = str.split('').reverse().join('');
  return str === reversed;
}

console.log(isPalindrome("madam")); // Output: true
```

---

### **22. Add Two Promises**
**Input:** 
```javascript
promise1 = Promise.resolve(2);
promise2 = Promise.resolve(3);
```
**Output:** `5`

```javascript
async function addPromises(promise1, promise2) {
  const [val1, val2] = await Promise.all([promise1, promise2]);
  return val1 + val2;
}

addPromises(Promise.resolve(2), Promise.resolve(3)).then(console.log); // Output: 5
```

---

### **23. Convert Promise Wrapped with `setTimeout` to `async/await`**
```javascript
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncTimeout() {
  console.log("Start");
  await delay(1000);
  console.log("End after 1 second");
}

asyncTimeout();
```

---

### **24. Find All Numbers Disappeared in an Array**
**Input:** `[4, 3, 2, 7, 8, 2, 3, 1]` → **Output:** `[5, 6]`

```javascript
function findDisappearedNumbers(nums) {
  const set = new Set(nums);
  const disappeared = [];
  for (let i = 1; i <= nums.length; i++) {
    if (!set.has(i)) disappeared.push(i);
  }
  return disappeared;
}

console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])); // Output: [5, 6]
```

---

### **25. Longest Palindrome**
**Input:** `"abccccdd"` → **Output:** `7`

```javascript
function longestPalindrome(s) {
  const charCount = {};
  let length = 0;
  let hasOdd = false;

  for (const char of s) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  for (const count of Object.values(charCount)) {
    length += Math.floor(count / 2) * 2;
    if (count % 2 === 1) hasOdd = true;
  }

  return hasOdd ? length + 1 : length;
}

console.log(longestPalindrome("abccccdd")); // Output: 7
```

---

### **26. Add 1 to the Last Number and Return as List of Digits**
**Input:** `[1, 2, 3]` → **Output:** `[1, 2, 4]`

```javascript
function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  return [1, ...digits];
}

console.log(plusOne([1, 2, 3])); // Output: [1, 2, 4]
```

---

### **27. Contains Duplicate**
**Input:** `[1, 2, 3, 1]` → **Output:** `true`

```javascript
function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}

console.log(containsDuplicate([1, 2, 3, 1])); // Output: true
```

---

### **28. Combine Properties Having the Same ID**
**Input:** 
```javascript
{ id: 12, name: "Anjana", age: 35 }, { id: 12, name: "Anjana", school: "Kali zone" }
```
**Output:** `{ id: 12, name: "Anjana", age: 35, school: "Kali zone" }`

```javascript
function combineProperties(obj1, obj2) {
  return { ...obj1, ...obj2 };
}

console.log(combineProperties(
  { id: 12, name: "Anjana", age: 35 },
  { id: 12, name: "Anjana", school: "Kali zone" }
));
// Output: { id: 12, name: "Anjana", age: 35, school: "Kali zone" }
```

---

### **29. Find Count of Substring G or eek Repeated in "GeeksForGeeks"**
**Input:** `"GeeksForGeeks"` → **Output:** `G = 2, eek = 2`

```javascript
function countSubstrings(str, substrings) {
  const counts = {};
  for (const sub of substrings) {
    counts[sub] = (str.match(new RegExp(sub, 'g')) || []).length;
  }
  return counts;
}

console.log(countSubstrings("GeeksForGeeks", ["G", "eek"]));
// Output: { G: 2, eek: 2 }
```

---

### **30. Find Min or Max Number in an Array**
**Input:** `[1, 1, 2, 3, 3, 4]` → **Output:** `min = 1, max = 4`

```javascript
function findMinMax(arr) {
  return {
    min: Math.min(...arr),
    max: Math.max(...arr),
  };
}

console.log(findMinMax([1, 1, 2, 3, 3, 4]));
// Output: { min: 1, max: 4 }
```

---

### **31. First Letter of String Uppercase**
**Input:** `"hey whats up"` → **Output:** `"Hey Whats Up"`

```javascript
function capitalizeWords(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

console.log(capitalizeWords("hey whats up")); // Output: "Hey Whats Up"
```

---

### **32. Object Problems**

#### **Using `Object.entries()`**
```javascript
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.entries(obj));
// Output: [['a', 1], ['b', 2], ['c', 3]]
```

#### **Using `Object.hasOwn()` to Check if Object is Empty**
```javascript
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

console.log(isEmpty({})); // Output: true
```

#### **Using `Object.keys()`**
```javascript
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.keys(obj)); // Output: ['a', 'b', 'c']
```

#### **Sort by Name and Age**
```javascript
const people = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
];

// Sort by name (ascending)
people.sort((a, b) => a.name.localeCompare(b.name));
console.log(people);

// Sort by age (descending)
people.sort((a, b) => b.age - a.age);
console.log(people);
```

--- 
