[Questions]
(https://leetcode.com/studyplan/30-days-of-javascript/)
(https://leetcode.com/problemset/javascript/
)
---

### **Easy**

1. **Apply Operations to an Array** Input: `[1, 2, 2, 1, 1, 0]` Output: `[1, 4, 2, 0, 0, 0]`  
2. **Array Prototype Last** Input: `[1, 2, 3]` Output: `3`  
3. **Counter** Input: `n = 10` Output: `[10, 11, 12]`  
4. **Sleep** Input: `millis = 1000` Output: `Promise resolved after 1000ms`  
5. **Array Reduce Transformation** Input: `nums = [1, 2, 3, 4], fn = (acc, curr) => acc + curr, init = 0` Output: `10`  
6. **Function Composition** Input: `functions = [x => x + 1, x => x * x], x = 4` Output: `25`  
7. **Filter Elements from Array** Input: `arr = [1, 2, 3, 4], fn = (n) => n > 2` Output: `[3, 4]`  
8. **Apply Transform Over Each Element in Array** Input: `arr = [1, 2, 3], fn = (n) => n + 1` Output: `[2, 3, 4]`  
9. **Generate Fibonacci Sequence** Input: `n = 5` Output: `[0, 1, 1, 2, 3]`  
10. **Counter II** Input: `init = 5` Output: `[5, 6, 5, 4]`  
11. **Allow One Function Call** Input: `fn = (a, b) => a + b` Output: `3`  
12. **Create Hello World Function** Input: None Output: `"Hello World"`  
13. **Chunk Array** Input: `arr = [1, 2, 3, 4, 5], size = 2` Output: `[[1, 2], [3, 4], [5]]`  
14. **Array Wrapper** Input: `nums = [1, 2, 3]` Output: `6`  
15. **Differences Between Two Objects** Input: `obj1 = { a: 1, b: 2 }, obj2 = { a: 1, b: 3 }` Output: `{ b: [2, 3] }`  
16. **Return Length of Arguments Passed** Input: `args = [1, 2, 3]` Output: `3`  
17. **To Be Or Not To Be** Input: `value = 5` Output: `true`  
18. **Timeout Cancellation** Input: `fn = () => console.log("Hello"), t = 1000` Output: `"Hello"`  
19. **Add Two Promises** Input: `promise1 = Promise.resolve(2), promise2 = Promise.resolve(3)` Output: `5`  
20. **Sort By** Input: `arr = [5, 4, 1, 2, 3], fn = (x) => x` Output: `[1, 2, 3, 4, 5]`  
21. **Interval Cancellation** Input: `fn = () => console.log("Hello"), t = 1000` Output: `"Hello"`  
22. **Calculator with Method Chaining** Input: `calculator = new Calculator(10)` Output: `14`  
23. **Is Object Empty** Input: `obj = {}` Output: `true`  
24. **Next Day** Input: `date = "2023-10-31"` Output: `"2023-11-01"`  
25. **Array Upper Bound** Input: `arr = [1, 2, 2, 3], target = 2` Output: `2`  
26. **Create Object from Two Arrays** Input: `keys = ["a", "b"], values = [1, 2]` Output: `{ a: 1, b: 2 }`  
27. **Repeat String** Input: `str = "hello", times = 2` Output: `"hellohello"`  
28. **Partial Function with Placeholders** Input: `fn = (a, b, c) => a + b + c, args = [1, _, 3]` Output: `4`  
29. **Factorial Generator** Input: `n = 5` Output: `120`  
30. **Array Prototype ForEach** Input: `arr = [1, 2, 3], fn = (x) => console.log(x)` Output: `1, 2, 3`  
31. **Inversion of Object** Input: `obj = { a: 1, b: 2 }` Output: `{ 1: "a", 2: "b" }`  

---

### **Medium**

1. **Check if Object Instance of Class** Input: `obj = new Date(), classFunc = Date` Output: `true`  
2. **Cache With Time Limit** Input: `key = "a", value = 1, ttl = 1000` Output: `1`  
3. **Memoize** Input: `fn = (a, b) => a + b` Output: `3`  
4. **Snail Traversal** Input: `arr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]` Output: `[1, 2, 3, 6, 9, 8, 7, 4, 5]`  
5. **Flatten Deeply Nested Array** Input: `arr = [1, [2, [3, [4]]], depth = 2` Output: `[1, 2, 3, [4]]`  
6. **Debounce** Input: `fn = () => console.log("Hello"), t = 1000` Output: `"Hello"`  
7. **JSON Deep Equal** Input: `obj1 = { a: 1 }, obj2 = { a: 1 }` Output: `true`  
8. **Group By** Input: `arr = [1, 2, 3], fn = (x) => x % 2` Output: `{ 0: [2], 1: [1, 3] }`  
9. **Curry** Input: `fn = (a, b, c) => a + b + c` Output: `6`  
10. **Convert Object to JSON String** Input: `obj = { a: 1, b: 2 }` Output: `'{"a":1,"b":2}'`  
11. **Promise Pool** Input: `functions = [() => 1, () => 2], n = 1` Output: `[1, 2]`  
12. **Promise Time Limit** Input: `fn = () => new Promise(res => setTimeout(res, 1000)), t = 500` Output: `"Time Limit Exceeded"`  
13. **Nested Array Generator** Input: `arr = [[1, 2], [3, 4]]` Output: `[1, 2, 3, 4]`  
14. **Throttle** Input: `fn = () => console.log("Hello"), t = 1000` Output: `"Hello"`  
15. **Make Object Immutable** Input: `obj = { a: 1 }` Output: `Error`  
16. **Call Function with Custom Context** Input: `fn = function() { return this.a; }, context = { a: 1 }` Output: `1`  
17. **Event Emitter** Input: `emitter.emit("event")` Output: `true`  
18. **Compact Object** Input: `obj = { a: 1, b: null }` Output: `{ a: 1 }`  
19. **Execute Asynchronous Functions in Parallel** Input: `functions = [() => 1, () => 2]` Output: `[1, 2]`  
20. **Join Two Arrays by ID** Input: `arr1 = [{ id: 1, name: "John" }], arr2 = [{ id: 1, age: 30 }]` Output: `[{ id: 1, name: "John", age: 30 }]`  
21. **Bind Function to Context** Input: `fn = function() { return this.a; }, context = { a: 1 }` Output: `1`  
22. **Deep Merge of Two Objects** Input: `obj1 = { a: 1 }, obj2 = { b: 2 }` Output: `{ a: 1, b: 2 }`  
23. **Generate Circular Array Values** Input: `arr = [1, 2, 3]` Output: `1, 2, 3, 1, 2, 3, ...`  
24. **Undefined to Null** Input: `obj = { a: undefined }` Output: `{ a: null }`  
25. **Convert Callback Based Function to Promise Based Function** Input: `fn = (cb) => cb(1)` Output: `Promise resolved with 1`  
26. **Date Range Generator** Input: `start = "2023-10-01", end = "2023-10-03"` Output: `["2023-10-01", "2023-10-02", "2023-10-03"]`  
27. **Parallel Execution of Promises for Individual Results Retrieval** Input: `functions = [() => 1, () => 2]` Output: `[1, 2]`  
28. **Custom Interval** Input: `fn = () => console.log("Hello"), t = 1000` Output: `"Hello"`  
29. **Delay the Resolution of Each Promise** Input: `promises = [Promise.resolve(1)], t = 1000` Output: `1`  
30. **Deep Object Filter** Input: `obj = { a: 1, b: { c: 2 } }, fn = (k, v) => v > 1` Output: `{ b: { c: 2 } }`  

---

### **Hard**

1. **Memoize II** Input: `fn = (a, b) => a + b` Output: `3`  
2. **Design Cancellable Function** Input: `fn = () => new Promise(res => setTimeout(res, 1000))` Output: `"Cancelled"`  
3. **Array of Objects to Matrix** Input: `arr = [{ a: 1 }, { b: 2 }]` Output: `[["a", "b"], [1, null], [null, 2]]`  
4. **Immutability Helper** Input: `obj = { a: 1 }` Output: `Error`  
5. **Query Batching** Input: `queries = ["query1", "query2"]` Output: `["result1", "result2"]`  
6. **Convert JSON String to Object** Input: `str = '{"a":1}'` Output: `{ a: 1 }`  

---
