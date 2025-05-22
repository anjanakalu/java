# 📘 Redux DevTools Notes (Classic Redux)

## 📑 Index

1. [✳️ Section 1: Redux DevTools Features (Classic Redux)](#-section-1-redux-devtools-features-classic-redux)
     1.1 [📦 State View Modes](#-state-view-modes)
     1.2 [🔄 State Updates After Actions](#-state-updates-after-actions)
   1.3 [🧩 Diff Tab](#-diff-tab)
   1.4 [🕵️ Inspector Panel](#-inspector-panel)
   1.5 [🌲 Persist State Tree](#-persist-state-tree)
   1.6 [🔍 Trace (Call Stack Viewer)](#-trace-call-stack-viewer)
   1.7 [🧪 Test Tab](#-test-tab)


3. [✳️ Section 2: Redux Setup Example (Classic Redux + Trace)](#-section-2-redux-setup-example-classic-redux--trace)
   2.1 [🧾 Counter Reducer Example](#-counter-reducer-example)
   2.2 [🧩 Combine Reducers](#-combine-reducers)
   2.3 [🏬 Create Store with Redux DevTools + Trace Enabled](#-create-store-with-redux-devtools--trace-enabled)


4. [✅ Summary](#-summary)

---

# 📘 Redux DevTools Notes (Classic Redux)

This document covers how to use **Redux DevTools** with **Classic Redux** (not Redux Toolkit), including a real example, key features, debugging tools, and trace support.

---

## ✳️ Section 1: Redux DevTools Features (Classic Redux)

### 📦 State View Modes

Redux DevTools provides three views to inspect your Redux store:

1. **Tree**

   * Shows a **hierarchical view** of the current Redux state.

   * Great for navigating nested slices (e.g., `counter → value`).

   * Displays the current state for each reducer.

   * When an action is dispatched (e.g., `'INCREMENT_BY_AMOUNT'`), it is reflected in the action log as:

     ```
     Action: INCREMENT_BY_AMOUNT
     ```

     In **Redux Toolkit**, you might see `counter/incrementByAmount`, but in **Classic Redux**, it will show just the string action type ie. `'INCREMENT_BY_AMOUNT'`.

   * Example:

     ```
     counter
       └── value: 2
     ```

2. **Chart**

   * Visualizes how state branches (e.g., `counter → value`) evolve over time.
   * Allows tracking state transitions after each action dispatch.

3. **Raw**

   * Shows the Redux state as a **plain JavaScript object**.
   * Example:

     ```js
     { counter: { value: 2 } }
     ```

> ✅ All three views represent the **same state**, just formatted differently.

---

### 🔄 State Updates After Actions

When the UI triggers an action (e.g., clicking an "Increment" button):

* The state updates in:

  * **Tree**: updated structure and values
  * **Chart**: reflects the new value
  * **Raw**: updated JS object

* Example transition in Tree or Raw:

  ```diff
  - value: 0
  + value: 2
  ```

* Action type shown in DevTools:

  ```
  Action: INCREMENT_BY_AMOUNT
  ```

---

### 🧩 Diff Tab

* Shows **exact changes** in the state between actions.
* Helps quickly see what was added, removed, or updated.
* Example:

  ```diff
  - value: 0
  + value: 5
  ```

---

### 🕵️ Inspector Panel

The **Inspector** logs all dispatched actions in real time and allows time-travel debugging.

Controls include:

* **Jump**: Jump to a specific state by selecting an action.
* **Skip**: Temporarily ignore (skip) an action.
* **Slider**: Step through state history and observe live UI and state updates.
* **Filter**: Only show matching action types (e.g., `'INCREMENT'`).

---

### 🌲 Persist State Tree

* Click **“Persist”** to retain action/state history even after:

  * Browser refresh
  * DevTools close
* Useful for long debugging sessions or testing flows.

---

### 🔍 Trace (Call Stack Viewer)

* When `trace: true` is enabled, Redux DevTools shows **where in your source code** an action was dispatched.
* Shows the full **call stack**.
* Example:

  ```
  Action: INCREMENT
  Dispatched from: App.js → handleClick() → dispatch()
  ```

---

### 🧪 Test Tab

* DevTools can generate test templates for dispatched actions.
* Example for `INCREMENT_BY_AMOUNT`:

```js
it('should handle INCREMENT_BY_AMOUNT', () => {
  const prevState = { value: 0 };
  const newState = counterReducer(prevState, {
    type: 'INCREMENT_BY_AMOUNT',
    payload: 2,
  });
  expect(newState).toEqual({ value: 2 });
});
```

Use these in your unit tests (e.g., with Jest or Mocha).

---

## ✳️ Section 2: Redux Setup Example (Classic Redux + Trace)

### 🧾 Counter Reducer Example

```js
// counterReducer.js

const initialState = {
  value: 0,
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, value: state.value + 1 };
    case 'INCREMENT_BY_AMOUNT':
      return { ...state, value: state.value + action.payload };
    case 'RESET':
      return { ...state, value: 0 };
    default:
      return state;
  }
}

export default counterReducer;
```

---

### 🧩 Combine Reducers

```js
// rootReducer.js

import { combineReducers } from 'redux';
import counterReducer from './counterReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
```

---

### 🏬 Create Store with Redux DevTools + Trace Enabled

```js
// store.js

import { createStore } from 'redux';
import rootReducer from './rootReducer';

// Enable Redux DevTools with trace support
const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__({
    trace: true,        // Enables call stack tracing
    traceLimit: 25,     // Optional: max number of stack frames to show
  });

const store = createStore(rootReducer, reduxDevTools);

export default store;
```

---

## ✅ Summary

| Feature    | Description                                                              |
| ---------- | ------------------------------------------------------------------------ |
| Tree View  | Shows state slices and updated values; action types like `'INCREMENT'`   |
| Chart View | Graph of how state branches (e.g., `counter → value`) evolve             |
| Raw View   | Full state in JS object format                                           |
| Diff       | Highlights exactly what changed after each action                        |
| Inspector  | Logs real-time actions, supports jump/skip/slider/filter                 |
| Persist    | Keeps action/state history even after refresh                            |
| Trace      | Shows call stack of where action was dispatched (requires `trace: true`) |
| Test       | Generates basic test templates for actions                               |

---
