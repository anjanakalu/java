# Comprehensive Jest Mocking Guide: `jest.fn()`, `jest.spyOn()`, and `jest.mock()`

Jest provides powerful mocking tools to isolate code during testing. This guide covers the three primary mocking methods: `jest.fn()`, `jest.spyOn()`, and `jest.mock()`, detailing their purposes, arguments, return values, and best practices.

## Table of Contents
1. [Introduction to Jest Mocking](#introduction)
2. [`jest.fn()` - Mock Functions](#jestfn)
   - [Purpose and Use Cases](#jestfn-purpose)
   - [Arguments and Return Values](#jestfn-args)
   - [Implementation Options](#jestfn-implementation)
   - [Key Points](#jestfn-key-points)
3. [`jest.spyOn()` - Method Spies](#jestspyon)
   - [Purpose and Use Cases](#jestspyon-purpose)
   - [Arguments and Return Values](#jestspyon-args)
   - [Implementation Options](#jestspyon-implementation)
   - [Key Points](#jestspyon-key-points)
4. [`jest.mock()` - Module Mocking](#jestmock)
   - [Purpose and Use Cases](#jestmock-purpose)
   - [Arguments and Return Values](#jestmock-args)
   - [Implementation Options](#jestmock-implementation)
   - [Key Points](#jestmock-key-points)
5. [Comparison Table](#comparison)
6. [Best Practices](#best-practices)
7. [All Mocking Methods Reference](#all-mocking-methods)

<a name="introduction"></a>
## 1. Introduction to Jest Mocking

Jest's mocking capabilities allow you to isolate code under test by replacing dependencies, tracking function calls, or modifying behavior. The three main tools are:

- **`jest.fn()`**: Creates standalone mock functions for tracking calls or defining custom behavior.
- **`jest.spyOn()`**: Wraps existing object methods to monitor calls while optionally preserving or altering their behavior.
- **`jest.mock()`**: Replaces entire modules with mocks, ideal for external dependencies.

**Use when:**
- Testing how a function interacts with callbacks or dependencies.
- Replacing complex dependencies like APIs or databases.
- Simulating functions that don’t yet exist in the implementation.

**Choosing the right tool:**
- Pure functions → `jest.fn()`
- Object methods → `jest.spyOn()`
- Modules → `jest.mock()`

<a name="jestfn"></a>
## 2. `jest.fn()` - Mock Functions

**Use when:**
- You need to test how a function uses callbacks/props
- You want to completely replace a dependency
- The function doesn't exist yet in the implementation
  
<a name="jestfn-purpose"></a>
### Purpose and Use Cases
`jest.fn()` creates a new mock function from scratch, useful for:
- Testing callback functions.
- Mocking dependencies in isolation.
- Verifying function call interactions (arguments, call count, etc.).

It tracks calls, arguments, and return values, and allows you to define custom behavior.

<a name="jestfn-args"></a>
### Arguments and Return Values

#### Basic Syntax
```javascript
const mockFn = jest.fn([implementation]);
```

#### Arguments
1. **`implementation`** (Optional)
   - **Type**: `Function`
   - **Default**: `() => undefined`
   - **Description**: A function that defines the mock's behavior when called.
   - **Example**:
     ```javascript
     const mockFn = jest.fn((a, b) => a + b);
     mockFn(2, 3); // Returns 5
     ```

#### Return Value
- **Type**: Mock function (with `.mock` properties for tracking calls and results).
- **Properties**:
  - `.mock.calls`: Array of call arguments (e.g., `[['arg1', 'arg2'], ['arg3']]`).
  - `.mock.results`: Array of return values or errors.
  - `.mock.instances`: Array of `this` contexts for each call.
  - `.mock.invocationCallOrder`: Array of call order indices.

#### Cases for Different Arguments
- **No Arguments**: Creates a mock that returns `undefined` by default, ideal for tracking calls without specific behavior.
  ```javascript
  const mockFn = jest.fn();
  mockFn(); // Returns undefined
  ```
- **With Implementation**: Defines custom logic for specific return values or behavior.
  ```javascript
  const mockFn = jest.fn((x, y) => x + y);
  mockFn(2, 3); // Returns 5
  ```
- **Using Mock Shortcuts**: Shorthand methods like `.mockReturnValue()` or `.mockResolvedValue()` can replace or complement an implementation.
  ```javascript
  const mockFn = jest.fn();
  mockFn.mockReturnValue('value');
  mockFn(); // Returns 'value'
  ```

<a name="jestfn-implementation"></a>
### Implementation Options

#### Basic Mock
```javascript
const mockFn = jest.fn();
```

#### With Implementation
```javascript
const mockFn = jest.fn(() => 'return value');
```

#### Mocking Return Values
```javascript
mockFn.mockReturnValue('static value');
mockFn.mockResolvedValue('async value'); // Resolves Promise
mockFn.mockRejectedValue(new Error('error')); // Rejects Promise
```

#### Example: Testing Callbacks
```javascript
test('calls callback with correct arguments', () => {
  const callback = jest.fn();
  processData('input', callback);
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith('processed input');
});
```

#### Changing Implementation
You can modify the mock's behavior after creation:
```javascript
const mockFn = jest.fn();
mockFn.mockImplementation((x, y) => x * y);
mockFn(2, 3); // Returns 6
```

<a name="jestfn-key-points"></a>
### Key Points
- Creates new functions, not tied to existing implementations.
- Automatically tracks calls, arguments, and return values.
- Supports chaining methods like `.mockReturnValue()`, `.mockImplementation()`, `.mockResolvedValue()`.
- Cleared automatically between tests (no manual cleanup needed).
- Ideal for testing callbacks or standalone functions.

<a name="jestspyon"></a>
## 3. `jest.spyOn()` - Method Spies
✅ When you use `jest.spyOn()` without replacing the implementation, the spy will:
- Track all calls to the method (through the spy object)
- Preserve and use the original implementation (returning what the original method would return). It will take argument as original `object` and `method` and will return same output the `original` object, when the original object's method is not modified.
  
**What it do:** 
- Wraps existing object methods
- Jest.spyOn is a way to keep an "eye" on certain functions during testing to ensure they are used as expected.
- Tracks calls while maintaining original implementation
  
<a name="jestspyon-purpose"></a>
### Purpose and Use Cases
`jest.spyOn()` wraps an existing object method to track calls while optionally preserving or modifying its behavior. Use it for:
- Verifying method calls and their arguments.
- Temporarily altering method behavior for testing.
- Testing interactions between components without replacing entire modules.

**Use when:**
- You need to confirm a function calls specific methods.
- You want to observe real method behavior while tracking calls.
- You need to temporarily mock a method’s behavior.

<a name="jestspyon-args"></a>
### Arguments and Return Values

#### Basic Syntax
```javascript
const spy = jest.spyOn(object, 'methodName');
```

#### Arguments
1. **`object`** (Required)
   - **Type**: `Object`
   - **Description**: The object containing the method to spy on.
2. **`methodName`** (Required)
   - **Type**: `String`
   - **Description**: The name of the method or property to monitor.
   - **Example**:
     ```javascript
     const obj = { method: () => 'original' };
     const spy = jest.spyOn(obj, 'method');
     ```

#### Return Value
- **Type**: Mock function (inherits all `jest.fn()` properties and methods, plus `.mockRestore()`).
- **Behavior**: By default, calls the original method but tracks calls, arguments, and results.
- **Properties**: Same as `jest.fn()` (`.mock.calls`, `.mock.results`, etc.), plus `.mockRestore()` to revert to the original implementation.

#### Cases for Different Arguments
- **Standard Usage**: Spies on an existing method to track calls without altering behavior.
  ```javascript
  expect(obj.method()).toBe('original'); // Original behavior
  expect(spy).toHaveBeenCalled();
  ```
- **With Mock Implementation**: Overrides the original method for specific test cases.
  ```javascript
  spy.mockImplementation(() => 'mocked');
  expect(obj.method()).toBe('mocked');
  ```

<a name="jestspyon-implementation"></a>
### Implementation Options

#### Basic Spy
```javascript
const spy = jest.spyOn(object, 'methodName');
```

#### With Mock Implementation
```javascript
const spy = jest.spyOn(object, 'methodName').mockImplementation(() => 'mocked value');
```

#### Example: Testing Method Calls
```javascript
const userService = {
  getUser(id) {
    return database.fetchUser(id);
  }
};

test('getUser calls database', () => {
  const spy = jest.spyOn(userService, 'getUser').mockReturnValue({ id: 1, name: 'Test' });
  const user = userService.getUser(1);
  expect(spy).toHaveBeenCalledWith(1);
  expect(user.name).toBe('Test');
  spy.mockRestore(); // Restore original
});
```

#### Example Use Cases
```javascript
// Tracking calls without modifying behavior
test('API service calls logger', () => {
  const loggerSpy = jest.spyOn(logger, 'info');
  apiService.makeRequest();
  expect(loggerSpy).toHaveBeenCalled();
});

// Temporarily replacing implementation
test('handles errors', () => {
  const readSpy = jest.spyOn(fs, 'readFile').mockImplementation((path, cb) => cb(new Error('Failed')));
  await expect(readFile('test.txt')).rejects.toThrow();
  readSpy.mockRestore();
});

// Verifying call arguments
test('validates input', () => {
  const validateSpy = jest.spyOn(validator, 'validate');
  processInput('test@example.com');
  expect(validateSpy).toHaveBeenCalledWith('test@example.com');
});
```

<a name="jestspyon-key-points"></a>
### Key Points
- Wraps existing methods, preserving the original implementation by default.
- Tracks calls like `jest.fn()` but requires manual cleanup with `.mockRestore()`.
- Ideal for testing interactions between components or verifying method usage.
- Can temporarily override behavior using `.mockImplementation()`.
- Must clean up spies to avoid test leakage:
  ```javascript
  afterEach(() => {
    jest.restoreAllMocks();
  });
  ```

<a name="jestmock"></a>
## 4. `jest.mock()` - Module Mocking

<a name="jestmock-purpose"></a>
### Purpose and Use Cases
`jest.mock()` replaces entire modules with mocks, useful for:
- Mocking external dependencies (e.g., APIs, databases).
- Replacing third-party libraries or filesystem operations.
- Simulating complex module systems.

**Use when:**
- You need to isolate a module’s functionality.
- You want to avoid real API calls or file operations during tests.

<a name="jestmock-args"></a>
### Arguments and Return Values

#### Basic Syntax
```javascript
jest.mock('moduleName', [factory], [options]);
```

#### Arguments
1. **`moduleName`** (Required)
   - **Type**: `String`
   - **Description**: The name or path of the module to mock.
2. **`factory`** (Optional)
   - **Type**: `Function`
   - **Default**: None (uses auto-mocking or `__mocks__` directory).
   - **Description**: A function returning the mock module implementation.
   - **Example**:
     ```javascript
     jest.mock('axios', () => ({
       get: jest.fn()
     }));
     ```
3. **`options`** (Optional)
   - **Type**: `Object`
   - **Description**: Configuration options, e.g., `{ virtual: true }` for non-existing modules.
   - **Example**:
     ```javascript
     jest.mock('virtual-module', () => ({}), { virtual: true });
     ```

#### Return Value
- **Type**: `undefined`
- **Behavior**: Modifies the module system to return the mock for all imports of `moduleName` in the test file.

#### Cases for Different Arguments
- **No Factory**: Automatically mocks the module with dummy implementations.
  ```javascript
  jest.mock('axios');
  ```
- **With Factory**: Defines custom module behavior.
  ```javascript
  jest.mock('axios', () => ({
    get: jest.fn().mockResolvedValue({ data: [] })
  }));
  ```
- **With Options**: Used for edge cases like virtual modules or ES module support.
  ```javascript
  jest.mock('module', () => ({}), { virtual: true });
  ```

<a name="jestmock-implementation"></a>
### Implementation Options

#### Basic Module Mock
```javascript
jest.mock('moduleName');
```

#### With Factory Function
```javascript
jest.mock('moduleName', () => ({
  export1: jest.fn(),
  export2: 'value'
}));
```

#### Example: Mocking Axios
```javascript
jest.mock('axios');

test('fetches data', async () => {
  axios.get.mockResolvedValue({ data: [1, 2, 3] });
  const result = await fetchData();
  expect(axios.get).toHaveBeenCalledWith('/api/data');
  expect(result).toEqual([1, 2, 3]);
});
```

<a name="jestmock-key-points"></a>
### Key Points
- Hoisted to the top of the file, affecting all tests in the file.
- Can use manual mocks from a `__mocks__` directory.
- Works with ES modules via `jest.unstable_mockModule()`.
- Combine with `jest.requireActual()` for partial mocking.
- Reset with `jest.resetModules()` if needed.
- No cleanup required (unlike `jest.spyOn()`).

<a name="comparison"></a>
## 5. Comparison Table

| Feature                | `jest.fn()`            | `jest.spyOn()`         | `jest.mock()`          |
|------------------------|------------------------|------------------------|------------------------|
| Creates new functions  | ✅ Yes                 | ❌ No                  | ❌ No                  |
| Wraps existing methods | ❌ No                  | ✅ Yes                 | ⚠️ Module-level only  |
| Tracks calls           | ✅ Yes                 | ✅ Yes                 | ✅ Yes                 |
| Original implementation| N/A                    | ✅ Preserved by default| ❌ Replaced            |
| Cleanup required       | ❌ No                  | ✅ Yes (`mockRestore`) | ❌ No                  |
| Best for               | Callbacks, new functions | Method interactions | Module dependencies   |
| Returns                | Mock function          | Spy function           | `undefined`           |
| Scope                  | Local                  | Local                  | Module-level          |

<a name="best-practices"></a>
## 6. Best Practices

1. **Choose the right tool**:
   - Pure functions → `jest.fn()`
   - Object methods → `jest.spyOn()`
   - Modules → `jest.mock()`

2. **Keep tests focused**:
   - Mock only what’s necessary to isolate the code under test.
   - Avoid over-mocking to maintain test reliability.

3. **Clean up spies**:
   ```javascript
   afterEach(() => {
     jest.restoreAllMocks();
   });
   ```

4. **Use manual mocks for complex dependencies**:
   ```
   __mocks__/
     axios.js
     fs.js
   ```

5. **Combine techniques when needed**:
   ```javascript
   jest.mock('module', () => ({
     method: jest.fn().mockReturnValue('test')
   }));
   ```

6. **Verify both calls and results**:
   ```javascript
   expect(mockFn).toHaveBeenCalledWith('arg');
   expect(result).toBe('expected');
   ```

7. **Use meaningful mock implementations**:
   ```javascript
   // Avoid:
   jest.fn(() => true);
   // Prefer:
   jest.fn().mockImplementation((user) => user.isActive);
   ```

**Key Principle**: Mocks should isolate the code under test, not become the focus of the test. Keep mocks simple and relevant.

<a name="all-mocking-methods"></a>
## 7. All Mocking Methods Reference

### `jest.fn()` Methods
- `.mockImplementation(fn)`: Replace the mock’s implementation.
- `.mockImplementationOnce(fn)`: Use a one-time implementation.
- `.mockReturnValue(value)`: Always return a specific value.
- `.mockReturnValueOnce(value)`: Return a value once.
- `.mockResolvedValue(value)`: Resolve a promise with a value.
- `.mockResolvedValueOnce(value)`: Resolve a promise once.
- `.mockRejectedValue(value)`: Reject a promise with a value.
- `.mockRejectedValueOnce(value)`: Reject a promise once.
- `.mockClear()`: Clear call history.
- `.mockReset()`: Clear call history and implementation.
- `.mockRestore()`: Restore original implementation (spies only).

### `jest.spyOn()` Methods
Inherits all `jest.fn()` methods, plus:
- `.mockRestore()`: Restores the original method implementation.

### `jest.mock()` Related Methods
- `.mock()`: Replace a module with a mock.
- `.unmock()`: Remove a module mock.
- `.clearAllMocks()`: Clear all mocks’ call history.
- `.resetAllMocks()`: Reset all mocks’ history and implementations.
- `.restoreAllMocks()`: Restore all spies to their original implementations.
- `.requireActual()`: Import the original module.
- `.setMock()`: Set a manual mock.
- `.deepUnmock()`: Deep unmock for ES modules.

### Mock Property Inspection
All mock functions (from `jest.fn()` or `jest.spyOn()`) have:
- `.mock.calls`: Array of arguments for each call.
- `.mock.results`: Array of return values or errors.
- `.mock.instances`: Array of `this` contexts.
- `.mock.invocationCallOrder`: Call order indices.

#### Example Usage
```javascript
const mock = jest.fn();
mock('arg1', 'arg2');
console.log(mock.mock.calls); // [['arg1', 'arg2']]
```
