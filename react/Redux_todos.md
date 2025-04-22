### 1. Workflow (Step-by-Step Data Flow)

#### 1.1 Adding a Todo
1. User submits form in AddTodo.js  
2. `dispatch(addTodo(text))` called in AddTodo.js  
3. Action creator returns `ADD_TODO` action with new todo data  
4. Reducer processes `ADD_TODO` and adds new todo to state  
5. Store updates with new state  
6. TodoList detects state change via `useSelector`  
7. Component re-renders with new todo  

#### 1.2 Toggling a Todo
1. User clicks on todo text in TodoList.js  
2. `dispatch(toggleTodo(id))` called  
3. Action creator returns `TOGGLE_TODO` action with todo ID  
4. Reducer flips `completed` status for matching todo  
5. Store updates with modified state  
6. TodoList detects state change  
7. Component re-renders with updated todo  

#### 1.3 Deleting a Todo
1. User clicks delete button in TodoList.js  
2. `dispatch(deleteTodo(id))` called  
3. Action creator returns `DELETE_TODO` action with todo ID  
4. Reducer filters out todo with matching ID  
5. Store updates with filtered state  
6. TodoList detects state change  
7. Component re-renders without deleted todo  

#### 1.4 Store Initialization
1. Root reducer combines all reducers  
2. Store is created with root reducer  
3. Provider makes store available to components  
4. Components access store via hooks  

**Key Points:**
- **Redux Connection:**
  - Uses `useSelector` to access `state.todos` from the combined reducer(`index.js` or combine of all reducers)
  - `const todos = useSelector(state => state.todos);` select from **todos** reducer ie. in combined reducer (`index.js`)
  - Uses `useDispatch` to dispatch actions to the store
- **Data Flow:**
  - The todos data comes from the store (managed by todoReducer)
  - Actions modify the state in the reducer (which never mutates directly)
  - The component re-renders when the Redux state changes

---

### 2. Complete Code Implementation

#### 2.1 Action Creators (todoActions.js)
**What it does:**  
- Contains functions that create and return action objects  
- Each action object has a `type` (describes what happened) and `payload` (carries data)  
- Pure functions that don't modify state directly  

**When it's used:**  
- Whenever you need to dispatch an action to modify the Redux store  
- Called by components when user interacts with the UI (e.g., adding/toggling/deleting todos)  
- Actions are the only way to trigger state changes in Redux  

```javascript
// Action creators for todo operations
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: { 
    id: Date.now(), 
    text, 
    completed: false 
  }
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  payload: id
});

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  payload: id
});

export const editTodo = (id, newText) => ({
  type: 'EDIT_TODO',
  payload: { id, newText }
});
```

#### 2.2 Reducer (todoReducer.js)
**What it does:**  
- Pure function that takes current state and action, returns new state  
- Never mutates state directly - always returns new state objects  
- Handles all todo-related state updates  
- Defines initial state shape  

**When it's used:**  
- Automatically called by Redux whenever an action is dispatched  
- Determines how each action type should transform the state  

```javascript
const initialState = [];

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
      
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload 
          ? { ...todo, completed: !todo.completed } 
          : todo
      );
      
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
      
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.newText }
          : todo
      );
      
    default:
      return state;
  }
};

export default todoReducer;
```

#### 2.3 Root Reducer (index.js)

**What it does:**  
- Combines multiple reducers into a single root reducer  
- Creates the complete state shape of the application  
- Currently only combines the todoReducer, but can scale to add more reducers  

**When it's used:**  
- When creating the Redux store  
- Automatically used by Redux to manage the complete application state  

```javascript
import { combineReducers } from 'redux';
import todos from './todoReducer';

const rootReducer = combineReducers({
  todos: todos // Key name determines the state path (`state.todos`)
});
// The store is created with this root reducer in `store.js`.
export default rootReducer;
```

#### 2.4 Store Configuration (store.js)
**What it does:**  
- Creates and configures the Redux store  
- Holds the complete state tree of the app  
- Allows access to state via `getState()`  
- Allows state to be updated via `dispatch(action)`  

**When it's used:**  
- Once at application startup  
- The store is the single source of truth for all application state  

```javascript
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // optional for Redux dev tools
);

export default store;
```

#### 2.5 Provider Setup (index.js)
**What it does:**  
- Makes the Redux store available to all components in the app  
- Wraps the root component (App)  
- Uses React Context API to provide store access  

**When it's used:**  
- Once at the top level of the application  

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

#### 2.6 Components

##### 2.6.1 AddTodo Component (AddTodo.js)
```javascript
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../actions/todoActions';

const AddTodo = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new todo"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;
```

##### 2.6.2 TodoList Component (TodoList.js)
```javascript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, editTodo } from '../actions/todoActions';

const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const handleSaveEdit = (id) => {
    dispatch(editTodo(id, editText));
    setEditingId(null);
  };

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo.id} className="todo-item">
          {editingId === todo.id ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
            </>
          ) : (
            <>
              <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onClick={() => dispatch(toggleTodo(todo.id))}
              >
                {todo.text}
              </span>
              <button onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
              <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
```

##### 2.6.3 App Component (App.js)
```javascript
import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './styles.css';

const App = () => {
  return (
    <div className="app-container">
      <h1>Redux Todo App</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
```
