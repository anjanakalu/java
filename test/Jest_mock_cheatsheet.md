# Jest Cheatsheet

## Jest Mocking Functions

| Function | Description | Key Methods/Functions | Example |
|----------|-------------|-----------------------|---------|
| **jest.fn()** | Creates a mock function to track calls and optionally define behavior. | `.mockImplementation(fn)`: Sets custom implementation.<br>`.mockReturnValue(value)`: Sets return value.<br>`.mockReturnValueOnce(value)`: Sets return value for one call.<br>`.mockResolvedValue(value)`: Sets resolved value for async.<br>`.mockRejectedValue(value)`: Sets rejected value for async.<br>`.mockClear()`: Clears call history.<br>`.mockReset()`: Resets implementation and call history.<br>`.mock.calls`: Array of call arguments.<br>`.mock.results`: Array of call results.<br>`.mock.instances`: Array of `this` contexts. | ```javascript<br>const mockFn = jest.fn().mockReturnValue(42);<br>mockFn(); // Returns 42<br>expect(mockFn).toHaveBeenCalled();<br>``` |
| **jest.spyOn(object, 'methodName')** | Spies on an existing method of an object, tracking calls while preserving original behavior unless mocked. | Same as `jest.fn()` methods, plus:<br>`.mockRestore()`: Restores original implementation.<br>`.mockImplementation(fn)`: Overrides original behavior.<br>`.getMockName()`: Gets mock name.<br>`.mockClear()`: Clears call history without affecting implementation. | ```javascript<br>const obj = { method: () => 42 };<br>const spy = jest.spyOn(obj, 'method');<br>obj.method();<br>expect(spy).toHaveBeenCalled();<br>spy.mockRestore();<br>``` |
| **jest.mock('moduleName')** | Mocks an entire module, replacing its exports with mock functions or objects. | `.mockImplementation(fn)`: Overrides module behavior.<br>`.mockReturnValue(value)`: Sets module return value.<br>`.mockClear()`: Clears call history.<br>`.mockReset()`: Resets module mocks.<br>`.mockResolvedValue(value)`: For async modules.<br>`.mockImplementationOnce(fn)`: For one-time behavior. | ```javascript<br>jest.mock('fs');<br>const fs = require('fs');<br>fs.readFileSync.mockReturnValue('data');<br>expect(fs.readFileSync()).toBe('data');<br>``` |

## Common Testing Tasks in Jest (Major test: 2,3,4)

Here are the key tasks you typically perform when testing with Jest mocks or spies:

1. **Call the Method/Function**:
   - Invoke the function or method being tested to simulate real usage.
   - Example:
     ```javascript
     const obj = { myMethod: () => 'hello' };
     const spy = jest.spyOn(obj, 'myMethod');
     obj.myMethod(); // Call the method
     ```

2. **Verify Spy/Mock Calls**:
   - Check if the mock/spy was called, how many times, and with what arguments.
   - Example:
     ```javascript
     expect(spy).toHaveBeenCalled();
     expect(spy).toHaveBeenCalledTimes(1);
     expect(spy).toHaveBeenCalledWith('arg1', 'arg2');
     ```

3. **Check Return Values**:
   - Verify the output of the function or method.
   - Example:
     ```javascript
     const mockFn = jest.fn().mockReturnValue(42);
     expect(mockFn()).toBe(42);
     ```

4. **Test Async Behavior**:
   - Handle promises or async/await by using `.mockResolvedValue` or `.mockRejectedValue`.
   - Example:
     ```javascript
     const mockAsync = jest.fn().mockResolvedValue('done');
     await expect(mockAsync()).resolves.toBe('done');
     ```

5. **Mock Implementation**:
   - Override the behavior of a function or method for specific test cases.
   - Example:
     ```javascript
     const mockFn = jest.fn().mockImplementation(() => 'custom');
     expect(mockFn()).toBe('custom');
     ```

6. **Clear or Reset Mocks**:
   - Use `.mockClear()` to reset call history or `.mockReset()` to reset implementation and history.
   - Example:
     ```javascript
     mockFn.mockClear(); // Clears call history
     expect(mockFn).not.toHaveBeenCalled();
     ```

7. **Restore Original Implementation**:
   - For `jest.spyOn`, use `.mockRestore()` to revert to the original method.
   - Example:
     ```javascript
     spy.mockRestore();
     expect(obj.method()).toBe(42); // Original behavior
     ```

8. **Test Module Mocks**:
   - When mocking entire modules with `jest.mock`, verify the mocked module's behavior.
   - Example:
     ```javascript
     jest.mock('axios');
     const axios = require('axios');
     axios.get.mockResolvedValue({ data: 'response' });
     await expect(axios.get()).resolves.toEqual({ data: 'response' });
     ```
