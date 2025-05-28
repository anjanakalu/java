# **Ultimate Jest Async Testing Guide**

## **Table of Contents**
1. [Introduction to Async Testing](#introduction-to-async-testing)
2. [Testing Promises](#testing-promises)
   - [Original Code](#promise-original-code)
   - [Test Implementation](#promise-tests)
   - [Key Points](#promise-key-points)
3. [Testing Async/Await](#testing-asyncawait)
   - [Original Code](#async-original-code)
   - [Test Implementation](#async-tests)
   - [Key Points](#async-key-points)
4. [Testing Callbacks](#testing-callbacks)
   - [Original Code](#callback-original-code)
   - [Test Implementation](#callback-tests)
   - [Key Points](#callback-key-points)
5. [Using .resolves/.rejects](#using-resolves-rejects)
6. [Mocking and Spying](#mocking-and-spying)
7. [Step-by-Step Testing Guide](#step-by-step-guide)
8. [When to Handle Resolve vs Reject](#resolve-vs-reject)
9. [Advanced Assertions](#advanced-assertions)
10. [Best Practices](#best-practices)
11. [Key Takeaways](#key-takeaways)

---

## **1. Introduction to Async Testing** <a name="introduction-to-async-testing"></a>

JavaScript frequently executes code asynchronously through:
- API calls
- Timers (setTimeout/setInterval)
- File operations
- Database queries

**Jest needs explicit handling** to know when async operations complete before proceeding.

### **Testing Methods Comparison**

| Method | Use Case | Syntax | Error Handling |
|--------|----------|--------|----------------|
| **Promises** | Modern APIs | `.then()`/`.catch()` | `.catch()` block |
| **Async/Await** | ES2017+ code | `async`/`await` | `try`/`catch` |
| **Callbacks** | Legacy code | `done()` callback | Error-first callback |
| **.resolves/.rejects** | Simplified cases | Jest matchers | Built-in |

---

## **2. Testing Promises** <a name="testing-promises"></a>

### **Original Code** <a name="promise-original-code"></a>
```javascript
// promiseUtils.js
const fetchData = () => {
  return new Promise((resolve) => 
    setTimeout(() => resolve('peanut butter'), 1000)
  );
};

const fetchWithError = () => {
  return new Promise((_, reject) => 
    setTimeout(() => reject('network error'), 1000)
  );
};
```

### **Test Implementation** <a name="promise-tests"></a>
```javascript
// promiseUtils.test.js
test('resolves with correct data', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
    expect(typeof data).toBe('string');
  });
});

test('handles promise rejection', () => {
  expect.assertions(2);
  return fetchWithError()
    .catch(error => {
      expect(error).toBe('network error');
      expect(error).toContain('error');
    });
});
```

### **Key Points** <a name="promise-key-points"></a>
- ✔ **Always return** the promise
- ✔ **expect.assertions()** verifies error cases
- ✔ Chain **multiple expectations** for thorough validation
- ✔ **.resolves/.rejects** for cleaner syntax (see section 5)

---

## **3. Testing Async/Await** <a name="testing-asyncawait"></a>

### **Original Code** <a name="async-original-code"></a>
```javascript
// asyncService.js
async function getUser(id) {
  const response = await fetch(`/users/${id}`);
  return response.json();
}

async function failRequest() {
  throw new Error('API failure');
}
```

### **Test Implementation** <a name="async-tests"></a>
```javascript
// asyncService.test.js
test('fetches user data', async () => {
  const mockUser = { id: 1, name: 'John' };
  global.fetch = jest.fn(() => 
    Promise.resolve({ json: () => mockUser })
  );
  
  const user = await getUser(1);
  expect(user).toEqual(mockUser);
});

test('handles API failures', async () => {
  expect.assertions(3);
  
  try {
    await failRequest();
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('API failure');
    expect(error).toHaveProperty('message');
  }
});
```

### **Key Points** <a name="async-key-points"></a>
- ✔ **async/await** provides synchronous-like readability
- ✔ **Mock dependencies** (like fetch) for reliable tests
- ✔ **try/catch** is mandatory for error testing
- ✔ Combine with **.resolves/.rejects** (section 5)

---

## **4. Testing Callbacks** <a name="testing-callbacks"></a>

### **Original Code** <a name="callback-original-code"></a>
```javascript
// legacyCode.js
function oldSchoolFetch(callback) {
  setTimeout(() => callback(null, 'data'), 500);
}

function failingFetch(callback) {
  setTimeout(() => callback(new Error('Failed')), 500);
}
```

### **Test Implementation** <a name="callback-tests"></a>
```javascript
// legacyCode.test.js
test('handles callback success', done => {
  function callback(err, data) {
    try {
      expect(err).toBeNull();
      expect(data).toBe('data');
      done();
    } catch (error) {
      done(error);
    }
  }
  
  oldSchoolFetch(callback);
});

test('handles callback errors', done => {
  function callback(err) {
    try {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toMatch(/fail/i);
      done();
    } catch (error) {
      done(error);
    }
  }
  
  failingFetch(callback);
});
```

### **Key Points** <a name="callback-key-points"></a>
- ✔ **done()** must be called to complete test
- ✔ **Error wrapping** prevents silent failures
- ✔ Primarily for **legacy code** testing
- ✔ Consider **refactoring** to promises where possible

---

## **5. Using .resolves/.rejects** <a name="using-resolves-rejects"></a>

```javascript
// With promises
test('resolves with .resolves', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});

// With async/await
test('rejects with .rejects', async () => {
  await expect(fetchWithError()).rejects.toMatch('network');
});

// Complex assertions
test('validates response shape', () => {
  return expect(apiCall()).resolves.toMatchObject({
    id: expect.any(Number),
    name: expect.stringContaining('John')
  });
});
```

**When to use:**
- Simple success/failure cases
- When you only need basic assertions
- For cleaner test syntax

---

## **6. Mocking and Spying** <a name="mocking-and-spying"></a>

### **Mocking Example**
```javascript
jest.mock('axios', () => ({
  get: jest.fn()
    .mockResolvedValue({ data: 'mock' })
    .mockRejectedValueOnce(new Error('Rate limited'))
}));

// Verify mock usage
expect(axios.get).toHaveBeenCalledWith('/endpoint');
```

### **Spying Example**
```javascript
const util = {
  processData: (data) => data.toUpperCase()
};

test('spies on method', () => {
  const spy = jest.spyOn(util, 'processData');
  util.processData('test');
  
  expect(spy).toHaveBeenCalled();
  expect(spy).toHaveReturnedWith('TEST');
});
```

---

## **7. Step-by-Step Guide** <a name="step-by-step-guide"></a>

1. **Setup**
   ```bash
   npm install jest --save-dev
   ```

2. **Test Structure**
   ```javascript
   describe('API Service', () => {
     beforeEach(() => jest.clearAllMocks());
     
     test('success case', async () => {
       // Test implementation
     });
   });
   ```

3. **Execution**
   ```bash
   jest # Run all tests
   jest --watch # Watch mode
   ```

---

## **8. When to Handle Resolve vs Reject** <a name="resolve-vs-reject"></a>

**Handle Resolve When:**
- Testing successful API responses
- Validating data transformations
- Testing happy path scenarios

**Handle Reject When:**
- Testing error conditions
- Validating error handling logic
- Testing edge cases (network failures, etc.)

**Pro Tip:** Always test both paths for critical functionality

---

## **9. Advanced Assertions** <a name="advanced-assertions"></a>

```javascript
// Array testing
expect(responses).toHaveLength(3);
expect(users).toContainEqual(expect.objectContaining({
  admin: true
}));

// Error testing
expect(() => dangerousOp()).toThrow();
expect(() => dangerousOp()).toThrow('Specific error');

// Mock call verification
expect(mockFn).toHaveBeenCalledWith(
  expect.objectContaining({ key: 'value' })
);
```

---

## **10. Best Practices** <a name="best-practices"></a>

1. **Isolation**
   - Clear mocks between tests
   - Avoid shared state

2. **Readability**
   - Descriptive test names
   - Group related tests

3. **Reliability**
   - Test both success and failure
   - Include edge cases

4. **Performance**
   - Mock slow operations
   - Use fake timers

---

## **11. Key Takeaways** <a name="key-takeaways"></a>

✅ **Always handle async completion** properly  
✅ **Test both success and failure** scenarios  
✅ **Mock external dependencies** for reliability  
✅ **Use appropriate assertions** for thorough validation  
✅ **Follow best practices** for maintainable tests  

```mermaid
graph TD
    A[Async Test] --> B{Type}
    B --> C[Promises]
    B --> D[Async/Await]
    B --> E[Callbacks]
    C --> F[.then/.catch]
    D --> G[try/catch]
    E --> H[done()]
    F & G & H --> I[Assertions]
    I --> J[.resolves/.rejects]
    I --> K[Complex Matchers]
```

**Final Thought:** Mastering async testing ensures your JavaScript applications work reliably under real-world conditions. Happy testing! 🧪🚀
