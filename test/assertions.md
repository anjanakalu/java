Jest provides a variety of assertion methods through its `expect` API to verify the behavior of your code in tests. Below is a concise list of commonly used Jest assertions, grouped by category, based on Jest's official documentation and standard usage as of my knowledge cutoff. These assertions are used with `expect(value)` to test conditions in your test cases, such as verifying whether a callback is called a specific number of times (e.g., twice, as in your previous question).

### General Assertions
- **`.toBe(value)`**: Checks for strict equality (`===`) between the actual and expected value.
  - Example: `expect(2 + 2).toBe(4);`
- **`.toEqual(value)`**: Deep equality check for objects or arrays, comparing all properties or elements.
  - Example: `expect({ a: 1 }).toEqual({ a: 1 });`
- **`.toStrictEqual(value)`**: Like `.toEqual`, but also checks for exact type and structure (e.g., distinguishes between `undefined` properties and missing properties).
  - Example: `expect({ a: 1, b: undefined }).toStrictEqual({ a: 1, b: undefined });`

### Truthiness
- **`.toBeNull()`**: Checks if the value is `null`.
  - Example: `expect(null).toBeNull();`
- **`.toBeUndefined()`**: Checks if the value is `undefined`.
  - Example: `expect(undefined).toBeUndefined();`
- **`.toBeDefined()`**: Checks if the value is not `undefined`.
  - Example: `expect(42).toBeDefined();`
- **`.toBeTruthy()`**: Checks if the value is truthy.
  - Example: `expect(1).toBeTruthy();`
- **`.toBeFalsy()`**: Checks if the value is falsy.
  - Example: `expect(0).toBeFalsy();`

### Numbers
- **`.toBeGreaterThan(number)`**: Checks if the value is greater than the specified number.
  - Example: `expect(10).toBeGreaterThan(5);`
- **`.toBeGreaterThanOrEqual(number)`**: Checks if the value is greater than or equal to the number.
  - Example: `expect(10).toBeGreaterThanOrEqual(10);`
- **`.toBeLessThan(number)`**: Checks if the value is less than the specified number.
  - Example: `expect(5).toBeLessThan(10);`
- **`.toBeLessThanOrEqual(number)`**: Checks if the value is less than or equal to the number.
  - Example: `expect(5).toBeLessThanOrEqual(5);`
- **`.toBeCloseTo(number, numDigits?)`**: Checks if the value is close to the expected number (useful for floating-point comparisons). Optional `numDigits` specifies precision.
  - Example: `expect(0.1 + 0.2).toBeCloseTo(0.3, 5);`

### Strings
- **`.toMatch(regexpOrString)`**: Checks if the string matches a regular expression or includes a substring.
  - Example: `expect('hello world').toMatch(/world/);` or `expect('hello world').toMatch('world');`

### Arrays and Iterables
- **`.toContain(item)`**: Checks if an array or iterable contains the specified item (uses strict equality).
  - Example: `expect([1, 2, 3]).toContain(2);`
- **`.toContainEqual(item)`**: Checks if an array contains an item that deeply equals the specified item.
  - Example: `expect([{ a: 1 }]).toContainEqual({ a: 1 });`
- **`.toHaveLength(number)`**: Checks if an array, string, or iterable has the specified length.
  - Example: `expect([1, 2, 3]).toHaveLength(3);`

### Objects
- **`.toHaveProperty(keyPath, value?)`**: Checks if an object has a property at the specified key or path. Optionally checks the property's value.
  - Example: `expect({ a: { b: 1 } }).toHaveProperty('a.b', 1);`
- **`.toMatchObject(object)`**: Checks if an object has a subset of properties matching the expected object.
  - Example: `expect({ a: 1, b: 2 }).toMatchObject({ a: 1 });`

### Mock Functions (Relevant to Your Callback Question)
- **`.toHaveBeenCalled()`**: Checks if a mock function was called at least once.
  - Example: `expect(mockFn).toHaveBeenCalled();`
- **`.toHaveBeenCalledTimes(number)`**: Checks if a mock function was called exactly `number` times.
  - Example: `expect(mockFn).toHaveBeenCalledTimes(2);` (directly relevant to your question about verifying a callback called twice)
- **`.toHaveBeenCalledWith(...args)`**: Checks if a mock function was called with specific arguments.
  - Example: `expect(mockFn).toHaveBeenCalledWith('processed input');`
- **`.toHaveBeenNthCalledWith(n, ...args)`**: Checks if the nth call of a mock function was called with specific arguments.
  - Example: `expect(mockFn).toHaveBeenNthCalledWith(1, 'processed input');`
- **`.toHaveBeenLastCalledWith(...args)`**: Checks if the last call of a mock function was with specific arguments.
  - Example: `expect(mockFn).toHaveBeenLastCalledWith('processed input');`
- **`.toHaveReturned()`**: Checks if a mock function returned a value (did not throw).
  - Example: `expect(mockFn).toHaveReturned();`
- **`.toHaveReturnedTimes(number)`**: Checks if a mock function returned a value exactly `number` times.
  - Example: `expect(mockFn).toHaveReturnedTimes(2);`
- **`.toHaveReturnedWith(value)`**: Checks if a mock function returned a specific value.
  - Example: `expect(mockFn).toHaveReturnedWith('mocked');`
- **`.toHaveLastReturnedWith(value)`**: Checks if the last call of a mock function returned a specific value.
  - Example: `expect(mockFn).toHaveLastReturnedWith('mocked');`
- **`.toHaveNthReturnedWith(n, value)`**: Checks if the nth call of a mock function returned a specific value.
  - Example: `expect(mockFn).toHaveNthReturnedWith(1, 'mocked');`

### Errors
- **`.toThrow(error?)`**: Checks if a function throws an error when called. Optionally checks for a specific error message or type.
  - Example: `expect(() => { throw new Error('oops'); }).toThrow('oops');`

### Snapshots
- **`.toMatchSnapshot(name?)`**: Checks if a value matches a previously stored snapshot.
  - Example: `expect({ a: 1 }).toMatchSnapshot();`
- **`.toMatchInlineSnapshot(snapshot?)`**: Checks if a value matches an inline snapshot.
  - Example: `expect({ a: 1 }).toMatchInlineSnapshot(`{ a: 1 }`);`

### Async Assertions
- **`.resolves`**: Unwraps a Promise and applies an assertion to the resolved value.
  - Example: `await expect(Promise.resolve(42)).resolves.toBe(42);`
- **`.rejects`**: Unwraps a Promise and applies an assertion to the rejected error.
  - Example: `await expect(Promise.reject(new Error('oops'))).rejects.toThrow('oops');`

### Modifiers
- **`.not`**: Inverts the assertion, checking that the condition is not true.
  - Example: `expect(2 + 2).not.toBe(5);`
- **`.resolves` / `.rejects`**: Used with async code (see above).
- **`.toBeInstanceOf(Class)`**: Checks if a value is an instance of a specific class.
  - Example: `expect(new Error()).toBeInstanceOf(Error);`

### Custom Matchers
- Jest allows extending assertions with custom matchers via `expect.extend`.
  - Example: `expect.extend({ toBeWithinRange(received, floor, ceiling) { ... } });`

### Applying to Your Callback Test
For your specific case of testing whether a callback is called twice, the most relevant assertions are:
- `expect(callback).toHaveBeenCalledTimes(2)`: Verifies the callback was called exactly twice.
- `expect(callback).toHaveBeenCalledWith('processed input')`: Checks if the callback was called with the expected argument.
- `expect(callback).toHaveBeenNthCalledWith(1, 'processed input')`: Checks the arguments of the first call.
- `expect(callback).toHaveBeenNthCalledWith(2, 'processed input')`: Checks the arguments of the second call.

Example:
```javascript
test('calls callback with correct arguments', () => {
  const callback = jest.fn();
  processData('input', callback);
  expect(callback).toHaveBeenCalledTimes(2); // Asserts exactly 2 calls
  expect(callback).toHaveBeenNthCalledWith(1, 'processed input');
  expect(callback).toHaveBeenNthCalledWith(2, 'processed input');
});
```

### Notes
- **Asynchronous Code**: If `processData` is async, use `await` or `return` in the test to ensure all callbacks are executed before assertions:
  ```javascript
  test('calls callback with correct arguments', async () => {
    const callback = jest.fn();
    await processData('input', callback);
    expect(callback).toHaveBeenCalledTimes(2);
  });
  ```
- **Mock Function Details**: You can inspect `callback.mock.calls` (array of call arguments) or `callback.mock.results` (array of return values) for debugging.
- **Jest Version**: The above list is based on Jest's API up to May 2025. If you're using an older version, some matchers (e.g., `toMatchInlineSnapshot`) might not be available. Check your Jest version with `jest --version`.

For a complete and updated list, refer to the [Jest documentation](https://jestjs.io/docs/expect). If you have a specific assertion in mind or need help with a particular test case, let me know!
