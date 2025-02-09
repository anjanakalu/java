Here is a well-organized version of your content, categorized into **JavaScript** and **CSS** sections, with problems arranged in order of increasing complexity. I've also included alternative solutions where requested, and skipped React-specific coding as per your request.

---

## **JavaScript Solutions**

### **1. Flatten an Array**
```javascript
// Using reduce and concat
const arr = [['a', 'b'], ['c', 'd']];
const flatArr = arr.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
console.log(flatArr); // Output: ['a', 'b', 'c', 'd']

// Using flat()
const flatArr2 = arr.flat();
console.log(flatArr2); // Output: ['a', 'b', 'c', 'd']
```

---

### **2. Throttle a Function**
```javascript
function throttle(fn, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn.apply(this, args);
        }
    };
}
```

---

### **3. Check if Two Arrays Are Equal**
```javascript
// Using every()
function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((val, index) => val === arr2[index]);
}

// Alternative: Using JSON.stringify
function arraysAreEqualJSON(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}
```

---

### **4. Count Occurrences of Each Word in a String**
```javascript
// Using regex
function countWordOccurrences(str) {
    const words = str.toLowerCase().split(/\s+/);
    const wordCount = {};
    words.forEach(word => {
        wordCount[word] = (wordCount[word] || 0) + 1;
    });
    return wordCount;
}

// Without regex
function countWordOccurrencesNoRegex(str) {
    const words = str.toLowerCase().split(' ');
    const wordCount = {};
    for (let word of words) {
        wordCount[word] = (wordCount[word] || 0) + 1;
    }
    return wordCount;
}
```

---

### **5. Generate a Random Integer Between Two Numbers**
```javascript
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

---

### **6. Reverse a String**
```javascript
// Using split, reverse, join
function reverseString(str) {
    return str.split('').reverse().join('');
}

// Alternative: Using a loop
function reverseStringLoop(str) {
    let reversed = '';
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}
```

---

### **7. Check if a String is a Palindrome**
```javascript
// Using regex
function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

// Without regex
function isPalindromeNoRegex(str) {
    const cleaned = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
    let left = 0, right = cleaned.length - 1;
    while (left < right) {
        if (cleaned[left] !== cleaned[right]) return false;
        left++;
        right--;
    }
    return true;
}
```

---

### **8. Remove Duplicate Elements from an Array**
```javascript
// Using Set
function removeDuplicates(arr) {
    return [...new Set(arr)];
}

// Alternative: Using filter
function removeDuplicatesFilter(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}
```

---

### **9. Sort an Array Without Using `sort`**
```javascript
// Bubble Sort
function customSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// Selection Sort
function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return arr;
}
```

---

### **10. Check if a Number is Prime**
```javascript
// Using sqrt
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Without sqrt
function isPrimeNoSqrt(num) {
    if (num <= 1) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}
```

---

### **11. Generate Fibonacci Series**
```javascript
// Iterative
function generateFibonacci(n) {
    const fib = [0, 1];
    for (let i = 2; i < n; i++) {
        fib.push(fib[i - 1] + fib[i - 2]);
    }
    return fib.slice(0, n);
}

// Recursive
function fibonacciRecursive(n) {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];
    const fib = fibonacciRecursive(n - 1);
    fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
    return fib;
}
```

---

### **12. Check if an Object is Empty**
```javascript
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}
```

---

### **13. Convert a String to Title Case**
```javascript
// Using regex
function toTitleCase(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Without regex
function toTitleCaseNoRegex(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
```

---

### **14. Factorial of a Number**
```javascript
// Iterative
function factorialIterative(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Recursive
function factorialRecursive(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorialRecursive(n - 1);
}
```

---

### **15. Find the Intersection of Two Arrays**
```javascript
// Using filter and includes
function arrayIntersection(arr1, arr2) {
    return arr1.filter(item => arr2.includes(item));
}

// Using Set
function arrayIntersectionSet(arr1, arr2) {
    const set = new Set(arr2);
    return arr1.filter(item => set.has(item));
}
```

---

### **16. Check if Two Strings Are Anagrams**
```javascript
// Using sort
function areAnagrams(str1, str2) {
    const normalize = str => str.toLowerCase().split('').sort().join('');
    return normalize(str1) === normalize(str2);
}

// Without sort
function areAnagramsNoSort(str1, str2) {
    const charCount = {};
    for (let char of str1.toLowerCase()) {
        charCount[char] = (charCount[char] || 0) + 1;
    }
    for (let char of str2.toLowerCase()) {
        if (!charCount[char]) return false;
        charCount[char]--;
    }
    return Object.values(charCount).every(count => count === 0);
}
```

---

### **17. Calculate the nth Power of a Number**
```javascript
function power(base, exponent) {
    let result = 1;
    for (let i = 0; i < exponent; i++) {
        result *= base;
    }
    return result;
}
```

---

### **18. Find the Longest Word in a Sentence**
```javascript
// Using reduce
function findLongestWord(sentence) {
    const words = sentence.split(' ');
    return words.reduce((longest, current) => (current.length > longest.length ? current : longest), '');
}

// Using a loop
function findLongestWordLoop(sentence) {
    const words = sentence.split(' ');
    let longest = '';
    for (let word of words) {
        if (word.length > longest.length) longest = word;
    }
    return longest;
}
```

---

### **19. Shuffle the Elements of an Array**
```javascript
// Fisher-Yates Algorithm
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Alternative: Using sort
function shuffleArraySort(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
```

---

### **20. Merge Two Sorted Arrays**
```javascript
// Two-pointer approach
function mergeSortedArrays(arr1, arr2) {
    const merged = [];
    let i = 0, j = 0;
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            merged.push(arr1[i++]);
        } else {
            merged.push(arr2[j++]);
        }
    }
    return merged.concat(arr1.slice(i), arr2.slice(j));
}

// Alternative: Using concat and sort
function mergeSortedArraysConcat(arr1, arr2) {
    return [...arr1, ...arr2].sort((a, b) => a - b);
}
```

---

## **CSS Solutions**

### **1. Center a `div` in CSS**
```css
/* Flexbox */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* Grid */
.container {
    display: grid;
    place-items: center;
    height: 100vh;
}

/* Positioning */
.container {
    position: relative;
    height: 100vh;
}
.centered-div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

---

### **2. Implement Flexbox and Grid**
```css
/* Flexbox Example */
.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Grid Example */
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
```

---

### **3. Session Storage vs Local Storage**
```javascript
// Session Storage
sessionStorage.setItem('key', 'value');
const sessionValue = sessionStorage.getItem('key');

// Local Storage
localStorage.setItem('key', 'value');
const localValue = localStorage.getItem('key');
```
- **Difference**: `sessionStorage` clears data when the tab is closed, while `localStorage` persists data even after the browser is closed.

---

### **4. Token-Based Authentication**
```javascript
// Store token in localStorage or sessionStorage
localStorage.setItem('authToken', 'your-token-here');

// Add token to headers for API requests
fetch('https://api.example.com/data', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
});
```

---

### **5. DOM Selection**
```javascript
// Select by ID
const element = document.getElementById('myElement');

// Select by class
const elements = document.getElementsByClassName('myClass');

// Select by querySelector
const firstButton = document.querySelector('.button-class');
```

---

### **6. Nested Destructuring**
```javascript
const user = {
    name: 'John',
    address: {
        city: 'New York',
        zip: '10001'
    }
};

const { name, address: { city, zip } } = user;
console.log(name, city, zip); // Output: John New York 10001
```

---

### **7. Deep Clone a Nested Object**
```javascript
// Using JSON
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// Using recursion
function deepCloneRecursive(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    const clone = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepCloneRecursive(obj[key]);
        }
    }
    return clone;
}
```

---

### **8. Closures**
```javascript
function outerFunction() {
    let count = 0;
    return function innerFunction() {
        count++;
        console.log(count);
    };
}
const counter = outerFunction();
counter(); // Output: 1
counter(); // Output: 2
```

---

### **9. Custom Event Emitter**
```javascript
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }

    off(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(l => l !== listener);
        }
    }
}
```

---

### **10. Fetch Data from an API**
```javascript
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetchData('https://api.example.com/data');
```

---

This organized structure should make it easier to navigate and understand the solutions. Let me know if you need further refinements!
