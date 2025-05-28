https://medium.com/@navneetskahlon/how-to-test-asynchronous-code-with-jest-promises-and-async-await-5b38e60021e3
https://spectralops.io/blog/jest-async-test-a-developers-tutorial/
https://jestjs.io/docs/asynchronous

# **Jest Testing Guide for Beginners: Asynchronous Code**  

## **Table of Contents**  
1. [Introduction to Asynchronous Testing](#introduction-to-asynchronous-testing)  
2. [Testing Promises](#testing-promises)  
3. [Testing Async/Await](#testing-asyncawait)  
4. [Testing Callbacks](#testing-callbacks)  
5. [Using `.resolves` and `.rejects`](#using-resolves-and-rejects)  
6. [Mocking and Spying](#mocking-and-spying)  
7. [Step-by-Step Guide to Jest Async Testing](#step-by-step-guide-to-jest-async-testing)  
8. [Key Points to Remember](#key-points-to-remember)  

---

## **1. Introduction to Asynchronous Testing**  
JavaScript often runs code asynchronously (e.g., API calls, timers). Jest needs to know when asynchronous operations complete before moving to the next test.  

### **Methods to Handle Async Code in Jest:**  
- **Promises** – Return a promise from the test.  
- **Async/Await** – Use `async/await` for cleaner syntax.  
- **Callbacks** – Use `done()` to signal test completion.  
- **`.resolves` / `.rejects`** – Simplify promise assertions.  

---

## **2. Testing Promises**  
### **Example: Testing a Resolved Promise**  
```javascript
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```
### **Example: Testing a Rejected Promise**  
```javascript
test('the fetch fails with an error', () => {
  expect.assertions(1); // Ensures an assertion is called
  return fetchData().catch(error => {
    expect(error).toMatch('error');
  });
});
```
**Key Points:**  
✔ Always `return` the promise.  
✔ Use `expect.assertions()` to verify assertions run.  

---

## **3. Testing Async/Await**  
### **Example: Successful Async Call**  
```javascript
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});
```
### **Example: Error Handling with Async/Await**  
```javascript
test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (error) {
    expect(error).toMatch('error');
  }
});
```
**Key Points:**  
✔ Use `async/await` for cleaner syntax.  
✔ Always handle errors with `try/catch`.  

---

## **4. Testing Callbacks**  
### **Problem: Test Finishes Before Callback Executes**  
❌ **Incorrect:**  
```javascript
test('the data is peanut butter', () => {
  function callback(error, data) {
    if (error) throw error;
    expect(data).toBe('peanut butter');
  }
  fetchData(callback); // Test completes before callback runs
});
```
✅ **Correct (Using `done`):**  
```javascript
test('the data is peanut butter', done => {
  function callback(error, data) {
    if (error) {
      done(error);
      return;
    }
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }
  fetchData(callback);
});
```
**Key Points:**  
✔ Use `done()` to signal test completion.  
✔ Wrap `expect` in `try/catch` to avoid silent failures.  

---

## **5. Using `.resolves` and `.rejects`**  
### **Example: `.resolves`**  
```javascript
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});
```
### **Example: `.rejects`**  
```javascript
test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
```
**Key Points:**  
✔ Simplifies promise testing.  
✔ Must `return` the assertion.  

---

## **6. Mocking and Spying**  
### **Mocking API Calls**  
```javascript
test('fetchData returns mock data', async () => {
  const mockData = { id: 1, name: 'John Doe' };
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData),
    })
  );
  const data = await fetchData();
  expect(data).toEqual(mockData);
});
```
### **Spying on Functions**  
```javascript
test('function was called', () => {
  const mockFn = jest.fn();
  mockFn();
  expect(mockFn).toHaveBeenCalled();
});
```
**Key Points:**  
✔ Mocks prevent real API calls.  
✔ Spies track function calls.  

---

## **7. Step-by-Step Guide to Jest Async Testing**  
1. **Set Up Jest**  
   ```bash
   npm install jest --save-dev
   ```
2. **Write Async Tests**  
   - Use `async/await`, `.resolves`, or `done()`.  
3. **Mock External Dependencies**  
   ```javascript
   jest.mock('axios', () => ({
     get: jest.fn(() => Promise.resolve({ data: 'mock data' }))
   }));
   ```
4. **Test Timers**  
   ```javascript
   jest.useFakeTimers();
   setTimeout(() => {}, 1000);
   jest.runAllTimers();
   ```
5. **Use Setup/Teardown**  
   ```javascript
   beforeEach(() => { /* setup */ });
   afterEach(() => { /* cleanup */ });
   ```

---

## **8. Key Points to Remember**  
✅ **Always handle promises:**  
   - Use `return`, `await`, or `done()`.  
✅ **Verify assertions:**  
   - Use `expect.assertions()` in error cases.  
✅ **Mock external calls:**  
   - Avoid real API requests in tests.  
✅ **Test both success & failure cases.**  
✅ **Avoid mixing `done()` and Promises** (can cause memory leaks).  

---

### **Final Thoughts**  
Testing async code in Jest requires understanding:  
✔ **Promises** (`.then`, `.catch`).  
✔ **Async/Await** (cleaner syntax).  
✔ **Callbacks** (`done()` for older patterns).  
✔ **Mocking** (isolate tests from dependencies).  

By following these practices, you can write **reliable, efficient, and maintainable** tests for asynchronous JavaScript. 🚀  

**Happy Testing!** 🧪🔍
