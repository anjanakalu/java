# Jest Callback Testing Notes

This document provides a comprehensive guide for testing a callback function in Jest, specifically for verifying if it’s called twice in various scenarios. It includes the original scenarios (synchronous, asynchronous, different arguments, spy/mock calls, return values, async behavior, mock implementation, error handling, complex arguments, promise rejects/resolves, catch and error) and two new scenarios: **Throw with Message** and **Resolved with Some Value**. Each scenario includes a description, relevant Jest assertions, expected behavior with matchers (e.g., `.toBe`, `.toEqual`, `.toThrow`), example test code, and debugging tips.

## General Setup
The tests assume a `processData` function that takes an input and a callback, e.g.:
```javascript
function processData(input, callback) {
  callback('processed input'); // Example implementation
}
```
The callback is mocked with `jest.fn()`, and we’re verifying if it’s called exactly twice, as in the original test:
```javascript
test('calls callback with correct arguments', () => {
  const callback = jest.fn();
  processData('input', callback);
  expect(callback).toHaveBeenCalledTimes(1); // Original test, updated to expect 2
  expect(callback).toHaveBeenCalledWith('processed input');
});
```
The original mention of `jest.fn("mocked")` is interpreted as a mock returning `"mocked"` (i.e., `jest.fn(() => 'mocked')`).

## Jest Assertions Overview
Common assertions for callback testing:
- **`.toHaveBeenCalledTimes(number)`**: Checks if the mock was called exactly `number` times.
- **`.toHaveBeenCalled()`**: Checks if the mock was called at least once.
- **`.toHaveBeenCalledWith(...args)`**: Verifies arguments for any call.
- **`.toHaveBeenNthCalledWith(n, ...args)`**: Verifies arguments for the nth call.
- **`.toHaveBeenLastCalledWith(...args)`**: Verifies arguments of the last call.
- **`.toHaveReturnedTimes(number)`**: Checks if the mock returned a value `number` times.
- **`.toHaveReturnedWith(value)`**: Verifies if a specific value was returned.
- **`.toHaveNthReturnedWith(n, value)`**: Verifies the return value of the nth call.
- **`.toThrow(error?)`**: Checks if the mock or function throws an error, optionally with a specific message.
- **`.toBe(value)`**: Strict equality for primitive values.
- **`.toEqual(value)`**: Deep equality for objects/arrays.
- **`.toMatchObject(object)`**: Partial object matching.
- **`.resolves`**: Checks if a Promise resolves with a value.
- **`.rejects`**: Checks if a Promise rejects with an error.

## Scenarios and Assertions

### 1. Synchronous Callback Called Twice
**Description**: The `processData` function calls the callback synchronously twice with the same or different arguments.

**Example `processData`**:
```javascript
function processData(input, callback) {
  callback('processed input'); // First call
  callback('processed input'); // Second call
}
```

**Assertions**:
- `.toHaveBeenCalledTimes(2)`: Verify exactly two calls.
- `.toHaveBeenNthCalledWith(n, ...args)`: Check arguments for each call.
- `.toHaveBeenCalledWith(...args)`: Check if arguments were used in any call.
- `.toBe(value)` or `.toEqual(value)`: For direct argument checks.

**Expected Behavior**:
- `.toBe` for primitive arguments (e.g., strings).
- `.toEqual` for objects/arrays.
- Test passes if the callback is called twice with expected arguments.

**Test Example**:
```javascript
test('calls callback twice synchronously', () => {
  const callback = jest.fn();
  processData('input', callback);
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenNthCalledWith(1, 'processed input');
  expect(callback).toHaveBeenNthCalledWith(2, 'processed input');
  expect(callback.mock.calls[0][0]).toBe('processed input');
});
```

**Debugging Tips**:
- Log `callback.mock.calls` to inspect calls: `console.log(callback.mock.calls);`.
- Check `processData` for conditional logic or loops.
- Use `jest.clearAllMocks()` in `beforeEach`.

### 2. Asynchronous Callback Called Twice
**Description**: The `processData` function calls the callback twice asynchronously (e.g., via `setTimeout`, Promises, or event listeners).

**Example `processData`**:
```javascript
function processData(input, callback) {
  callback('processed input');
  setTimeout(() => callback('processed input'), 0);
}
```

**Assertions**:
- `.toHaveBeenCalledTimes(2)`: Verify two calls.
- `.toHaveBeenNthCalledWith(n, ...args)`: Check arguments.
- `.toBe(value)` or `.toEqual(value)`: For direct argument checks.
- `.resolves` or `.rejects`: If `processData` returns a Promise.

**Expected Behavior**:
- `.toBe` for primitives, `.toEqual` for objects.
- Test waits for async operations.

**Test Example**:
```javascript
test('calls callback twice asynchronously', async () => {
  const callback = jest.fn();
  await processData('input', callback);
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenNthCalledWith(1, 'processed input');
  expect(callback).toHaveBeenNthCalledWith(2, 'processed input');
  expect(callback.mock.calls[0][0]).toBe('processed input');
});
```

**With Fake Timers**:
```javascript
test('calls callback twice with timers', () => {
  jest.useFakeTimers();
  const callback = jest.fn();
  processData('input', callback);
  jest.runAllTimers();
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenNthCalledWith(1, 'processed input');
  expect(callback).toHaveBeenNthCalledWith(2, 'processed input');
});
```

**Debugging Tips**:
- Use `jest.useFakeTimers()` for timers.
- Ensure `await` or `done()` captures all calls.
- Check for unhandled Promises.

### 3. Different Arguments for Each Call
**Description**: The callback is called twice with different arguments.

**Example `processData`**:
```javascript
function processData(input, callback) {
  callback('processed input');
  callback('different result');
}
```

**Assertions**:
- `.toHaveBeenCalledTimes(2)`: Verify call count.
- `.toHaveBeenNthCalledWith(n, ...args)`: Check specific arguments.
- `.toHaveBeenLastCalledWith(...args)`: Check last call.
- `.toBe(value)` or `.toEqual(value)`: For direct checks.

**Expected Behavior**:
- `.toBe` for primitives, `.toEqual` for objects.
- Arguments match expected values per call.

**Test Example**:
```javascript
test('calls callback twice with different arguments', () => {
  const callback = jest.fn();
  processData('input', callback);
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenNthCalledWith(1, 'processed input');
  expect(callback).toHaveBeenNthCalledWith(2, 'different result');
  expect(callback.mock.calls[1][0]).toBe('different result');
});
```

**Debugging Tips**:
- Log `callback.mock.calls` to verify arguments.
- Check `processData` logic for argument generation.

### 4. Spy/Mock Calls
**Description**: Use Jest spies to monitor an existing function or method to check if it’s called twice.

**Example `processData`**:
```javascript
const obj = {
  callback: (data) => console.log(data)
};
function processData(input, callback) {
  callback('processed input');
  callback('processed input');
}
```

**Assertions**:
- `.toHaveBeenCalledTimes(2)`: Verify call count.
- `.toHaveBeenNthCalledWith(n, ...args)`: Check arguments.
- `.toBe(value)` or `.toEqual(value)`: For direct checks.

**Expected Behavior**:
- Spy tracks calls correctly.
- `.toBe` for primitives, `.toEqual` for objects.

**Test Example**:
```javascript
test('spies on callback called twice', () => {
  const spy = jest.spyOn(obj, 'callback');
  processData('input', obj.callback);
  expect(spy).toHaveBeenCalledTimes(2);
  expect(spy).toHaveBeenNthCalledWith(1, 'processed input');
  expect(spy).toHaveBeenNthCalledWith(2, 'processed input');
  expect(spy.mock.calls[0][0]).toBe('processed input');
  spy.mockRestore();
});
```

**Debugging Tips**:
- Use `spy.mockRestore()` to clean up.
- Verify the spied function is correctly referenced.

### 5. Check Return Values
**Description**: The callback returns a value (e.g., `"mocked"`), and you verify the return values.

**Example `processData`**:
```javascript
function processData(input, callback) {
  callback('processed input');
  callback('processed input');
}
```

**Assertions**:
- `.toHaveBeenCalledTimes(2)`: Verify call count.
- `.toHaveReturnedTimes(2)`: Verify returns.
- `.toHaveNthReturnedWith(n, value)`: Check return values.
- `.toBe(value)` or `.toEqual(value)`: For direct checks.

**Expected Behavior**:
- `.toBe` for primitive returns, `.toEqual` for objects.
- Returns match mock implementation.

**Test Example**:
```javascript
test('checks callback return values', () => {
  const callback = jest.fn(() => 'mocked');
  processData('input', callback);
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveReturnedTimes(2);
  expect(callback).toHaveNthReturnedWith(1, 'mocked');
  expect(callback).toHaveNthReturnedWith(2, 'mocked');
  expect(callback.mock.results[0].value).toBe('mocked');
});
```

**Debugging Tips**:
- Log `callback.mock.results` to check returns.
- Verify mock implementation.

### 6. Test Async Behavior
**Description**: Explicitly test async behavior (timers, Promises, events) to ensure the callback is called twice.

**Example `processData`**:
```javascript
async function processData(input, callback) {
  callback('processed input');
  await new Promise(resolve => setTimeout(resolve, 100));
  callback('processed input');
}
```

**Assertions**:
- `.toHaveBeenCalledTimes(2)`: Verify call count.
- `.toHaveBeenNthCalledWith(n, ...args)`: Check arguments.
- `.resolves` or `.rejects`: If `processData` returns a Promise.
- `.toBe(value)` or `.toEqual(value)`: For direct checks.

**Expected Behavior**:
- `.toBe` for primitives, `.toEqual` for objects.
- Test captures all async calls.

**Test Example**:
```javascript
test('tests async callback behavior', async () => {
  const callback = jest.fn();
  await processData('input', callback);
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenNthCalledWith(1, 'processed input');
  expect(callback).toHaveBeenNthCalledWith(2, 'processed input');
  expect(callback.mock.calls[0][0]).toBe('processed input');
});
```

**Debugging Tips**:
- Use `jest.useFakeTimers()` for timers.
- Ensure all async operations are awaited.

### 7. Mock Implementation
**Description**: The callback has a custom implementation (e.g., returning `"mocked: ${input}"`), and you test calls and behavior.

**Example `processData`**:
```javascript
function processData(input, callback) {
  callback('processed input');
  callback('processed input');
}
```

**Assertions**:
- `.toHaveBeenCalledTimes(2)`: Verify call count.
- `.toHaveReturnedTimes(2)`: Verify returns.
- `.toHaveNthReturnedWith(n, value)`: Check return values.
- `.toBe(value)` or `.toEqual(value)`: For direct checks.

**Expected Behavior**:
- `.toBe` for primitive returns, `.toEqual` for objects.
- Implementation behaves as defined.

**Test Example**:
```javascript
test('tests callback with mock implementation', () => {
  const callback = jest.fn((input) => `mocked: ${input}`);
  processData('input', callback);
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenNthCalledWith(1, 'processed input');
  expect(callback).toHaveNthReturnedWith(1, 'mocked: processed input');
  expect(callback).toHaveNthReturnedWith(2, 'mocked: processed input');
  expect(callback.mock.results[0].value).toBe('mocked: processed input');
});
```

**Debugging Tips**:
- Verify mock implementation logic.
- Log `callback.mock.results` for returns.

### 8. Error Handling
**Description**: The callback or `processData` may throw errors, and you verify calls and error behavior.

**Example `processData`**:
```javascript
function processData(input, callback) {
  try {
    callback('processed input');
    callback('processed input');
  } catch (e) {
    // Handle error
  }
}
```

**Assertions**:
- `.toHaveBeenCalledTimes(2)`: Verify call count.
- `.toThrow(error)`: Check if callback throws.
- `.not.toThrow()`: Verify `processData` doesn’t throw.
- `.toBe(value)` or `.toEqual(value)`: For argument checks.

**Expected Behavior**:
- `.toBe` or `.toEqual` for arguments.
- Errors are handled as expected.

**Test Example**:
```javascript
test('tests callback error handling', () => {
  const callback = jest.fn(() => { throw new Error('oops'); });
  expect(() => processData('input', callback)).not.toThrow();
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenNthCalledWith(1, 'processed input');
  expect(() => callback('test')).toThrow('oops');
});
```

**Debugging Tips**:
- Check `processData` error handling.
- Log `callback.mock.results` for errors.

### 9. Complex Arguments
**Description**: The callback receives complex arguments (e.g., objects, arrays).

**Example `processData`**:
```javascript
function processData(input, callback) {
  callback({ result: 'processed input' });
  callback({ result: 'processed input' });
}
```

**Assertions**:
- `.toHaveBeenCalledTimes(2)`: Verify call count.
- `.toHaveBeenNthCalledWith(n, ...args)`: Check arguments.
- `.toMatchObject(object)`: Partial object matching.
- `.toEqual(value)`: Deep equality.

**Expected Behavior**:
- `.toEqual` for exact matching.
- `.toMatchObject` for partial matching.

**Test Example**:
```javascript
test('tests callback with complex arguments', () => {
  const callback = jest.fn();
  processData('input', callback);
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenNthCalledWith(1, { result: 'processed input' });
  expect(callback).toHaveBeenNthCalledWith(2, { result: 'processed input' });
  expect(callback.mock.calls[0][0]).toMatchObject({ result: 'processed input' });
});
```

**Debugging Tips**:
- Log `callback.mock.calls` to inspect arguments.
- Use `.toMatchObject` for flexible matching.

### 10. Promise Rejects and Resolves
**Description**: The `processData` function returns a Promise that may resolve or reject, and the callback is called twice.

**Example `processData`**:
```javascript
async function processData(input, callback) {
  callback('processed input');
  if (input === 'error') {
    throw new Error('Invalid input');
  }
  await new Promise(resolve => setTimeout(resolve, 100));
  callback('processed input');
  return 'done';
}
```

**Assertions**:
- `.toHaveBeenCalledTimes(2)`: Verify callback call count.
- `.toHaveBeenNthCalledWith(n, ...args)`: Check arguments.
- `.resolves`: Verify Promise resolves with value.
- `.rejects`: Verify Promise rejects with error.
- `.toBe(value)` or `.toEqual(value)`: For argument or resolution checks.

**Expected Behavior**:
- `.toBe` for primitives, `.toEqual` for objects.
- `.rejects.toThrow` for error messages.
- Callback called twice, Promise resolves/rejects as expected.

**Test Example (Resolves)**:
```javascript
test('tests callback with resolving Promise', async () => {
  const callback = jest.fn();
  await expect(processData('input', callback)).resolves.toBe('done');
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenNthCalledWith(1, 'processed input');
  expect(callback).toHaveBeenNthCalledWith(2, 'processed input');
});
```

**Test Example (Rejects)**:
```javascript
test('tests callback with rejecting Promise', async () => {
  const callback = jest.fn();
  await expect(processData('error', callback)).rejects.toThrow('Invalid input');
  expect(callback).toHaveBeenCalledTimes(1); // Called once before rejection
});
```

**Debugging Tips**:
- Ensure `await` captures Promise resolution/rejection.
- Use `jest.useFakeTimers()` for timers.
- Log `callback.mock.calls` for calls before rejection.

### 11. Catch and Error
**Description**: The `processData` function uses try-catch to handle errors, and you verify callback calls and error handling.

**Example `processData`**:
```javascript
function processData(input, callback) {
  try {
    callback('processed input');
    if (input === 'error') {
      throw new Error('Invalid input');
    }
    callback('processed input');
  } catch (e) {
    callback('error caught');
  }
}
```

**Assertions**:
- `.toHaveBeenCalledTimes(2)`: Verify call count.
- `.toThrow(error)`: Check if callback throws.
- `.not.toThrow()`: Verify `processData` doesn’t throw.
- `.toBe(value)` or `.toEqual(value)`: For argument checks.

**Expected Behavior**:
- `.toBe` or `.toEqual` for arguments.
- Errors caught, callback may receive error-specific arguments.

**Test Example**:
```javascript
test('tests callback with error caught', () => {
  const callback = jest.fn();
  expect(() => processData('error', callback)).not.toThrow();
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenNthCalledWith(1, 'processed input');
  expect(callback).toHaveBeenNthCalledWith(2, 'error caught');
});
```

**Debugging Tips**:
- Log `callback.mock.calls` for error case arguments.
- Check try-catch logic in `processData`.

### 12. Throw with Message
**Description**: The callback or `processData` throws an error with a specific message, and you verify the callback is called twice and the error message is correct.

**Example `processData`**:
```javascript
function processData(input, callback) {
  callback('processed input');
  if (input === 'error') {
    throw new Error('Specific error message');
  }
  callback('processed input');
}
```

**Assertions**:
- `.toHaveBeenCalledTimes(2)`: Verify callback call count (or fewer if error interrupts).
- `.toHaveBeenNthCalledWith(n, ...args)`: Check arguments.
- `.toThrow('Specific error message')`: Verify the error message.
- `.not.toThrow()`: If error is caught.
- `.toBe(value)` or `.toEqual(value)`: For argument checks.

**Expected Behavior**:
- `.toBe` for primitive arguments, `.toEqual` for objects.
- `.toThrow` matches the exact error message or error object.
- Callback may be called fewer times if error interrupts execution.

**Test Example (processData Throws)**:
```javascript
test('tests processData throws with message', () => {
  const callback = jest.fn();
  expect(() => processData('error', callback)).toThrow('Specific error message');
  expect(callback).toHaveBeenCalledTimes(1); // Called once before throw
  expect(callback).toHaveBeenNthCalledWith(1, 'processed input');
  expect(callback.mock.calls[0][0]).toBe('processed input');
});
```

**Test Example (Callback Throws)**:
```javascript
test('tests callback throws with message', () => {
  const callback = jest.fn(() => { throw new Error('Callback error message'); });
  expect(() => processData('input', callback)).not.toThrow(); // Error caught
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenNthCalledWith(1, 'processed input');
  expect(() => callback('test')).toThrow('Callback error message');
});
```

**Debugging Tips**:
- Log `callback.mock.calls` to check calls before throw.
- Verify error message with `.toThrow('exact message')` or `.toThrow(Error)`.
- Check if `processData` catches errors, affecting call count.

### 13. Resolved with Some Value
**Description**: The `processData` function returns a Promise that resolves with a specific value, and the callback is called twice.

**Example `processData`**:
```javascript
async function processData(input, callback) {
  callback('processed input');
  await new Promise(resolve => setTimeout(resolve, 100));
  callback('processed input');
  return { status: 'success', value: input };
}
```

**Assertions**:
- `.toHaveBeenCalledTimes(2)`: Verify callback call count.
- `.toHaveBeenNthCalledWith(n, ...args)`: Check arguments.
- `.resolves.toEqual(value)`: Verify Promise resolves with specific value.
- `.toBe(value)` or `.toEqual(value)`: For argument or resolution checks.

**Expected Behavior**:
- `.toBe` for primitive arguments, `.toEqual` for complex resolved values.
- Callback called twice, Promise resolves with expected value.

**Test Example**:
```javascript
test('tests callback with Promise resolving to value', async () => {
  const callback = jest.fn();
  await expect(processData('input', callback)).resolves.toEqual({ status: 'success', value: 'input' });
  expect(callback).toHaveBeenCalledTimes(2);
  expect(callback).toHaveBeenNthCalledWith(1, 'processed input');
  expect(callback).toHaveBeenNthCalledWith(2, 'processed input');
  expect(callback.mock.calls[0][0]).toBe('processed input');
});
```

**With Fake Timers**:
```javascript
test('tests callback with Promise and timers', () => {
  jest.useFakeTimers();
  const callback = jest.fn();
  const promise = processData('input', callback);
  jest.runAllTimers();
  return promise.then((result) => {
    expect(result).toEqual({ status: 'success', value: 'input' });
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, 'processed input');
  });
});
```

**Debugging Tips**:
- Ensure `await` captures Promise resolution.
- Use `jest.useFakeTimers()` for timer-based Promises.
- Log resolved value to verify: `console.log(await processData('input', callback));`.

## Debugging and Best Practices
- **Inspect Mock Data**:
  - `callback.mock.calls`: Array of call arguments.
  - `callback.mock.results`: Array of return values/errors.
  - Example: `console.log('Calls:', callback.mock.calls);`
- **Reset Mocks**:
  - Use `beforeEach(() => jest.clearAllMocks())`.
- **Async Handling**:
  - Use `async/await` or `jest.useFakeTimers()` for async code.
  - Example: `jest.advanceTimersByTime(100)`.
- **Spy Cleanup**:
  - Call `spy.mockRestore()` after spying.
- **Promise Handling**:
  - Use `.resolves` or `.rejects` for Promise-based tests.
  - Ensure all Promises are awaited.
- **Error Handling**:
  - Use `.toThrow('message')` for specific error messages.
  - Verify try-catch blocks in `processData`.
- **Addressing `jest.fn("mocked")`**:
  - Interpreted as `jest.fn(() => 'mocked')` for return value testing.
  - Use `jest.fn().mockName('mocked')` for naming.
- **Common Issues**:
  - Wrong call count: Check `processData` logic.
  - Async calls missed: Use `await` or timers.
  - Errors not caught: Verify try-catch blocks.
  - Wrong resolved value: Log Promise result.

## Summary Table
| Scenario | Key Assertions | Expected Matchers | When to Use |
|----------|----------------|------------------|-------------|
| Synchronous | `.toHaveBeenCalledTimes(2)`, `.toHaveBeenNthCalledWith` | `.toBe`, `.toEqual` | Synchronous calls |
| Asynchronous | `.toHaveBeenCalledTimes(2)`, `.toHaveBeenNthCalledWith`, `.resolves` | `.toBe`, `.toEqual` | Async calls (Promises, timers) |
| Different Args | `.toHaveBeenNthCalledWith`, `.toHaveBeenLastCalledWith` | `.toBe`, `.toEqual` | Unique arguments |
| Spy/Mock Calls | `.toHaveBeenCalledTimes(2)`, `.toHaveBeenNthCalledWith` | `.toBe`, `.toEqual` | Spying on functions |
| Return Values | `.toHaveReturnedTimes(2)`, `.toHaveNthReturnedWith` | `.toBe`, `.toEqual` | Verify returns |
| Async Behavior | `.toHaveBeenCalledTimes(2)`, `.toHaveBeenNthCalledWith` | `.toBe`, `.toEqual` | Explicit async testing |
| Mock Implementation | `.toHaveReturnedTimes(2)`, `.toHaveNthReturnedWith` | `.toBe`, `.toEqual` | Custom callback logic |
| Error Handling | `.toThrow`, `.not.toThrow` | `.toBe`, `.toEqual` | Error-prone callbacks |
| Complex Args | `.toHaveBeenNthCalledWith`, `.toMatchObject` | `.toEqual`, `.toMatchObject` | Object/array arguments |
| Promise Rejects/Resolves | `.toHaveBeenCalledTimes(2)`, `.resolves`, `.rejects` | `.toBe`, `.toEqual`, `.toThrow` | Promise-based functions |
| Catch and Error | `.toHaveBeenCalledTimes(2)`, `.toThrow`, `.not.toThrow` | `.toBe`, `.toEqual` | Try-catch error handling |
| Throw with Message | `.toHaveBeenCalledTimes(2)`, `.toThrow('message')` | `.toBe`, `.toEqual`, `.toThrow` | Specific error messages |
| Resolved with Some Value | `.toHaveBeenCalledTimes(2)`, `.resolves.toEqual` | `.toBe`, `.toEqual` | Promise resolves with value |

## Notes
- The focus on verifying a callback called twice is addressed with `.toHaveBeenCalledTimes(2)` in all scenarios.
- Use `.toBe` for primitives, `.toEqual` for objects, `.toMatchObject` for partial matching, `.toThrow('message')` for specific errors.
- For async tests, ensure all operations complete before assertions.
- Refer to [Jest documentation](https://jestjs.io/docs/expect) for more matchers.
- Share `processData` implementation for specific guidance.
