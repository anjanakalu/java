---

### **Questions:**

1. Reverse a string using `split` and `for` loop.
2. Find the longest word in a sentence using `reduce` and `for` loop.
3. Check if a string is a palindrome.
4. Count the number of vowels in a string.
5. Remove all white spaces from a string.
6. Remove duplicates from a string.
7. Find the largest number in an array.
8. Find the second largest number in an array.
9. Sort an array of numbers in ascending or descending order.
10. Sort an array of strings in ascending or descending order.
11. Find the missing number in an ordered array (using full range comparison).
12. Rotate an array by `K=3`.
13. Print a counter value every 1 second.
14. Remove duplicate objects from an array.
15. Find the intersection of two arrays with objects.
16. Check if a number is prime without using `sqrt`.
17. Print the Fibonacci series.
18. Find the factorial of a number.
19. Fetch an element with a custom header.
20. Reverse an entire sentence.

---


### **Notes:**

1. **`splice(-2)`**:
   - `splice(-2)` removes the last two elements from an array.
   - Example:
     ```javascript
     let arr = [1, 2, 3, 4, 5];
     arr.splice(-2); // Removes [4, 5]
     console.log(arr); // Output: [1, 2, 3]
     ```

2. **Why Use `JSON.stringify` for Object Comparison?**
   - Objects in JavaScript are reference types. This means that two objects with identical properties are not considered equal unless they reference the same memory location.
   - To compare objects based on their content, we convert them to strings using `JSON.stringify`.

---

### **Solutions:**

#### **1. Reverse a String**
```javascript
// Using split, reverse, and join
const reverseString = (inputStr) => {
    return inputStr.split('').reverse().join('');
};
console.log(reverseString("Hello")); // Output: "olleH"

// Using for loop
const reverseStringWithLoop = (inputStr) => {
    let reversedStr = '';
    for (let i = inputStr.length - 1; i >= 0; i--) {
        reversedStr += inputStr[i];
    }
    return reversedStr;
};
console.log(reverseStringWithLoop("Hello")); // Output: "olleH"
```

---

#### **2. Find the Longest Word in a Sentence**
```javascript
// Using reduce
const findLongestWord = (sentence) => {
    const words = sentence.split(' ');
    return words.reduce((longest, current) => 
        current.length > longest.length ? current : longest
    );
};
console.log(findLongestWord("I love buli")); // Output: "buli"

// Using for loop
const findLongestWordWithLoop = (sentence) => {
    const words = sentence.split(' ');
    let longest = "";
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > longest.length) {
            longest = words[i];
        }
    }
    return longest;
};
console.log(findLongestWordWithLoop("I love bulioo")); // Output: "bulioo"
```

---

#### **3. Check if a String is a Palindrome**
```javascript
// Using split, reverse, and join
const isPalindrome = (str) => {
    const reversedStr = str.split('').reverse().join('');
    return str === reversedStr;
};
console.log(isPalindrome("akaa")); // Output: true

// Using for loop
const isPalindromeWithLoop = (str) => {
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] !== str[str.length - 1 - i]) {
            return false;
        }
    }
    return true;
};
console.log(isPalindromeWithLoop("akaa")); // Output: true
```

---

#### **4. Count Vowels in a String**
```javascript
const countVowels = (str) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i].toLowerCase())) {
            count++;
        }
    }
    return count;
};
console.log(countVowels("i love u mulu ulla")); // Output: 9
```

---

#### **5. Remove All White Spaces**
```javascript
// Using split and join
const removeSpaces = (str) => {
    return str.split(' ').join('');
};
console.log(removeSpaces("i am buli")); // Output: "iambuli"

// Using for loop
const removeSpacesWithLoop = (str) => {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] !== ' ') {
            result += str[i];
        }
    }
    return result;
};
console.log(removeSpacesWithLoop("Hello   world! How are you?")); // Output: "Helloworld!Howareyou?"
```

---

#### **6. Remove Duplicates from a String**
```javascript
// Using Set
const removeDuplicates = (str) => {
    return [...new Set(str.split(''))].join('');
};
console.log(removeDuplicates("hello")); // Output: "helo"

// Using filter and indexOf
const removeDuplicatesWithFilter = (str) => {
    return str.split('').filter((char, index, arr) => arr.indexOf(char) === index).join('');
};
console.log(removeDuplicatesWithFilter("hello")); // Output: "helo"
```

---

#### **7. Find the Largest Number in an Array**
```javascript
const findLargestNumber = (arr) => {
    return arr.reduce((max, current) => (current > max ? current : max));
};
console.log(findLargestNumber([1, 5, 33, 2, 6, 44])); // Output: 44
```

---

#### **8. Find the Second Largest Number in an Array**
```javascript
const findSecondLargest = (arr) => {
    const uniqueSorted = [...new Set(arr)].sort((a, b) => b - a);
    return uniqueSorted[1];
};
console.log(findSecondLargest([1, 5, 33, 2, 6, 44])); // Output: 33
```

---

#### **9. Sort an Array of Numbers in Ascending or Descending Order**
```javascript
// Ascending
const sortNumbersAscending = (arr) => arr.sort((a, b) => a - b);
console.log(sortNumbersAscending([3, 1, 4, 2])); // Output: [1, 2, 3, 4]

// Descending
const sortNumbersDescending = (arr) => arr.sort((a, b) => b - a);
console.log(sortNumbersDescending([3, 1, 4, 2])); // Output: [4, 3, 2, 1]
```

---

#### **10. Sort an Array of Strings in Ascending or Descending Order**
```javascript
// Ascending
const sortStringsAscending = (arr) => arr.sort((a, b) => a.localeCompare(b));
console.log(sortStringsAscending(["banana", "apple", "cherry"])); // Output: ["apple", "banana", "cherry"]

// Descending
const sortStringsDescending = (arr) => arr.sort((a, b) => b.localeCompare(a));
console.log(sortStringsDescending(["banana", "apple", "cherry"])); // Output: ["cherry", "banana", "apple"]
```

---

#### **11. Find Missing Numbers Using Full Range Comparison**
```javascript
const findMissingNumbers = (arr) => {
    const firstNum = Math.min(...arr);
    const lastNum = Math.max(...arr);
    const fullRange = Array.from({ length: lastNum - firstNum + 1 }, (_, i) => i + firstNum);
    return fullRange.filter(num => !arr.includes(num));
};
console.log(findMissingNumbers([1, 2, 4, 6])); // Output: [3, 5]
```

```javascript
// preferred:
const findMissingNumbers = (numbersArray) => {
    const smallestNumber = Math.min(...numbersArray);
    const largestNumber = Math.max(...numbersArray);
    let completeRange = [];
    
    for (let i = smallestNumber; i <= largestNumber; i++) {
        completeRange.push(i);
    }
    
    let missingNumbers = completeRange.filter(number => !numbersArray.includes(number));
    return missingNumbers;
};
```

---

#### **12. Rotate an Array by K**
```javascript
const rotateArray = (arr, k) => {
    k = k % arr.length;
    return arr.slice(-k).concat(arr.slice(0, arr.length - k));
};
console.log(rotateArray([2, 3, 4, -5, 6, 2, 0, 9], 3)); // Output: [2, 0, 9, 2, 3, 4, -5, 6]
```

---

#### **13. Print a Counter Value Every 1 Second**
```javascript
let counter = 0;
const intervalId = setInterval(() => {
    counter++;
    console.log(counter);
    if (counter === 5) {
        clearInterval(intervalId);
    }
}, 1000);
```

---

#### **14. Remove Duplicate Objects from an Array**
```javascript
const removeDuplicateObjects = (arr) => {
    return arr.filter((obj, index, self) =>
        index === self.findIndex(item => JSON.stringify(item) === JSON.stringify(obj))
    );
};
console.log(removeDuplicateObjects([{ a: 2 }, { b: 2 }, { a: 2 }])); // Output: [{ a: 2 }, { b: 2 }]

// Note: We use JSON.stringify because objects are reference types. Direct comparison (`===`) won't work.
```

---

#### **15. Find the Intersection of Two Arrays with Objects**
```javascript
const findIntersection = (arr1, arr2) => {
    return arr1.filter(obj1 => 
        arr2.some(obj2 => JSON.stringify(obj1) === JSON.stringify(obj2))
    );
};
console.log(findIntersection([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 6 }])); // Output: [{ a: 1 }]

// Note: JSON.stringify is used to compare objects because objects are reference types.
```

---

#### **16. Check if a Number is Prime**
```javascript
const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
};
console.log(isPrime(7)); // Output: true
```

---

#### **17. Print the Fibonacci Series**
```javascript
const fibonacciSeries = (n) => {
    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
    }
    return fib;
};
console.log(fibonacciSeries(10)); // Output: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

---

#### **18. Find the Factorial of a Number**
```javascript
const factorial = (num) => {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
};
console.log(factorial(5)); // Output: 120
```

---

#### **19. Fetch an Element with a Custom Header**
```javascript
fetch('https://api.example.com/data', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_TOKEN'
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

#### **20. Reverse an Entire Sentence**
```javascript
const reverseSentence = (sentence) => {
    return sentence.split('').reverse().join('');
};
console.log(reverseSentence("I code js")); // Output: "js edoc I"
```

---
#### **20. Find Duplicate Element in Array using both Map and Set**
* new Map()
```javascript
function findDuplicates(arr) {
  const map = new Map(); // Create a new Map to store element counts
  const duplicates = []; // Array to store duplicate elements

  for (const item of arr) {
    if (map.has(item)) {
      // If the item already exists in the map, increment its count
      map.set(item, map.get(item) + 1);
    } else {
      // Otherwise, add the item to the map with an initial count of 1
      map.set(item, 1);
    }
  }

  // Iterate through the map to find elements with a count greater than 1
  for (const [key, value] of map) {
    if (value > 1) {
      duplicates.push(key); // Add the duplicate element to the result array
    }
  }

  return duplicates; // Return the array of duplicate elements
}

// Example usage
const array = [1, 2, 3, 4, 2, 5, 6, 3, 7, 8, 1];
const duplicates = findDuplicates(array);
console.log("Duplicate elements:", duplicates);
```
* new Set()
```javascript
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();

  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item); // Add to duplicates if already seen
    } else {
      seen.add(item); // Mark as seen
    }
  }

  return [...duplicates]; // Convert the Set to an array
}

// Example usage
const array = [1, 2, 3, 4, 2, 5, 6, 3, 7, 8, 1];
console.log("Duplicate elements:", findDuplicates(array));
```

---
```javascript
// split()
let text = "Hello world";
console.log(text.split());  // Output: ["Hello", "world"] - splits by any whitespace

// split('')
let text2 = "Hello";
console.log(text2.split(''));  // Output: ["H", "e", "l", "l", "o"] - splits into individual characters

// split(' ')
let text3 = "Hello world";
console.log(text3.split(' '));  // Output: ["Hello", "world"] - splits by space

// split(',')
let text4 = "apple,banana,orange";
console.log(text4.split(','));  // Output: ["apple", "banana", "orange"] - splits by comma

// join()
let words = ["Hello", "world"];
console.log(words.join());  // Output: "Hello,world" - joins with a comma by default

// join('')
console.log(words.join(''));  // Output: "Helloworld" - joins with no separator

// join(' ')
console.log(words.join(' '));  // Output: "Hello world" - joins with a space separator

// join(',')
console.log(words.join(','));  // Output: "Hello,world" - joins with a comma separator

// slice(-2)
let text5 = "Hello";
console.log(text5.slice(-2));  // Output: "lo" - slices the last 2 characters

// slice(2)
let text6 = "Hello";
console.log(text6.slice(2));  // Output: "llo" - slices from index 2 to the end

// slice(0,2)
let text7 = "Hello";
console.log(text7.slice(0, 2));  // Output: "He" - slices from index 0 to index 2 (not inclusive)
let arr = ["apple", "banana", "orange"];

// Adds "grape" at index 1 without removing any elements (remove count = 0)
arr.splice(1, 0, "grape");  // Adds "grape" at index 1
console.log(arr);  // Output: ["apple", "grape", "banana", "orange"]

// Removes 1 element starting at index 1 ("banana")
arr.splice(1, 1);  // Removes "banana" at index 1
console.log(arr);  // Output: ["apple", "orange"]

// Removes 1 element at index 1 ("banana") and adds "grape" at index 1
arr.splice(1, 1, "grape");  // Removes "banana" and adds "grape"
console.log(arr);  // Output: ["apple", "grape", "orange"]

```
### Notes on `new Set` and `new Map` in JavaScript

Both `Set` and `Map` are built-in objects introduced in ES6 (ECMAScript 2015) that provide more efficient ways to handle collections of data compared to traditional arrays and objects. Below are detailed notes on each:

---

## **1. `new Set`**

### **Overview**
- A `Set` is a collection of unique values.
- It automatically ensures that no duplicate values are stored.
- Values can be of any type (primitive or object).

### **Syntax**
```javascript
const set = new Set([iterable]);
```
- The optional `iterable` argument can be an array or any iterable object.

### **Key Features**
1. **Uniqueness**: No duplicate values are allowed.
2. **Order**: Values are stored in insertion order.
3. **Iterability**: Sets are iterable, meaning you can loop through them using `for...of`.

### **Common Methods**
| Method               | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `set.add(value)`     | Adds a new value to the set. Returns the set itself (chainable).            |
| `set.delete(value)`  | Removes a value from the set. Returns `true` if the value was found and removed, otherwise `false`. |
| `set.has(value)`     | Checks if a value exists in the set. Returns `true` or `false`.             |
| `set.clear()`        | Removes all elements from the set.                                         |
| `set.size`           | Returns the number of elements in the set (read-only property).            |

### **Examples**
```javascript
// Creating a Set
const mySet = new Set();

// Adding values
mySet.add(1);
mySet.add('hello');
mySet.add({ name: 'John' });

// Duplicate values are ignored
mySet.add(1); // This will not add another '1'

console.log(mySet); // Set { 1, 'hello', { name: 'John' } }

// Checking existence
console.log(mySet.has('hello')); // true
console.log(mySet.has(2));       // false

// Deleting a value
mySet.delete('hello');
console.log(mySet); // Set { 1, { name: 'John' } }

// Iterating over a Set
for (let item of mySet) {
  console.log(item);
}
```

### **Use Cases**
- Removing duplicates from an array:
  ```javascript
  const arr = [1, 2, 2, 3, 4, 4];
  const uniqueArr = [...new Set(arr)];
  console.log(uniqueArr); // [1, 2, 3, 4]
  ```
- Storing unique user IDs, tags, or other distinct entities.

---

## **2. `new Map`**

### **Overview**
- A `Map` is a collection of key-value pairs.
- Keys can be of any type (including objects, functions, or primitives).
- Unlike plain objects, `Map` preserves the insertion order of keys.

### **Syntax**
```javascript
const map = new Map([iterable]);
```
- The optional `iterable` argument can be an array of key-value pairs (e.g., `[[key1, value1], [key2, value2]]`).

### **Key Features**
1. **Key Flexibility**: Keys can be any type (not just strings or symbols like in objects).
2. **Order**: Keys are stored in insertion order.
3. **Iterability**: Maps are iterable, meaning you can loop through their entries using `for...of`.

### **Common Methods**
| Method                   | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| `map.set(key, value)`    | Adds or updates a key-value pair. Returns the map itself (chainable).       |
| `map.get(key)`           | Retrieves the value associated with the key. Returns `undefined` if not found. |
| `map.has(key)`           | Checks if a key exists in the map. Returns `true` or `false`.               |
| `map.delete(key)`        | Removes a key-value pair. Returns `true` if the key was found and removed, otherwise `false`. |
| `map.clear()`            | Removes all key-value pairs from the map.                                  |
| `map.size`               | Returns the number of key-value pairs in the map (read-only property).      |

### **Examples**
```javascript
// Creating a Map
const myMap = new Map();

// Adding key-value pairs
myMap.set('name', 'Alice');
myMap.set(42, 'The answer');
myMap.set({ id: 1 }, 'Object as key');

console.log(myMap);

// Retrieving values
console.log(myMap.get('name')); // 'Alice'
console.log(myMap.get(42));     // 'The answer'

// Checking existence
console.log(myMap.has('name')); // true
console.log(myMap.has('age'));  // false

// Deleting a key-value pair
myMap.delete(42);
console.log(myMap);

// Iterating over a Map
for (let [key, value] of myMap) {
  console.log(`${key} => ${value}`);
}
```

### **Use Cases**
- Storing data with complex keys (e.g., objects or functions):
  ```javascript
  const objKey = { id: 1 };
  const map = new Map();
  map.set(objKey, 'Data for object key');
  console.log(map.get(objKey)); // 'Data for object key'
  ```
- Efficiently managing relationships between entities (e.g., user preferences, cache systems).

---

## **Comparison Between `Set` and `Map`**

| Feature                | `Set`                                   | `Map`                                   |
|------------------------|-----------------------------------------|-----------------------------------------|
| **Purpose**            | Stores unique values                   | Stores key-value pairs                  |
| **Keys/Values**        | Only values                            | Both keys and values                    |
| **Key Types**          | N/A (values can be of any type)        | Keys can be of any type                 |
| **Duplicate Handling** | Automatically removes duplicates       | Allows only one value per key           |
| **Iteration**          | Iterates over values                   | Iterates over key-value pairs           |
| **Use Case**           | Removing duplicates, tracking presence | Managing relationships, caching         |

---
