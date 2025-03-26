
### 1. Where Types are required: (Example: Todo List)  
- **Interfaces:** `TodoItem` and `TodoProps`.  
- **Component Props ie. Receiving from parent:** `Todo: React.FC<TodoProps>` (Destructure props only if there are multiple props or frequent access).  
- **State:** `useState<TodoItem[]>` and `useState<string>`.  
- **Function Parameters and Variables:** `addTodo(text: string)` and `const todo: TodoItem`.  
- **Event Handlers:** `handleSubmit` and `onChange`.  
- **Array Mapping:** `todos.map((todo: TodoItem) => ...)`.  
- **Parent Data:** `defaultTodos: TodoItem[]`.  
- **Optional Properties:** Use optional (`?`) only when the prop is not always required and has a clear fallback in the component.  

### 2. Type Checklist

| Element                      | Type Example                                      | Required?         |
|------------------------------|--------------------------------------------------|-------------------|
| **Component Props**          | `interface ProductPageProps {}`                  | Always            |
| **Function Arguments**       | `(product: ProductArgs)`                         | Always            |
| **Variables**                | `const products: ProductArgs[]`                  | Always            |
| **GraphQL Query Responses**  | `useQuery<ProductQueryData>`                     | Always            |
| **Event Handlers**           | `(e: React.MouseEvent<HTMLButtonElement>) => void` | Always            |
| **Imported Component Props** | `InfoCard: React.FC<InfoCardProps>` (in its file)| Always            |
| **Data Structures**          | `interface ProductArgs { name: string; }`        | Always (prefer `type` or `interface`) |
| **Optional Chaining Fallbacks** | `data?.products || [] as ProductArgs[]`       | Always (when used)|
| **Children**                 | `children: React.ReactNode`                      | If used           |
| **Refs**                     | `useRef<HTMLInputElement>(null)`                 | Always (when used)|
| **Context**                  | `React.createContext<MyContextType \| null>(null)` | Always (when used)|
| **Error Boundaries**         | `componentDidCatch(error: Error, info: React.ErrorInfo)` | Always (when used) |
| **State**                    | `useState<number>(0)`                            | Optional (if ambiguous) |
| **Component Return Type**    | `: JSX.Element \| React.FC<ProductPageProps>`    | Optional          |
| **Function Return Type**     | `(): Promise<void>`                              | Optional          |
| **Strict Null Checks**       | `strict: true` in tsconfig (handles `undefined`) | Optional          |
| **Default Props/Values**     | `defaultProps: { title: string }`                | Optional          |

| **Term**             | **Meaning**                                                                                       | **Usage**                                                                                                         |
|----------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| **Todo**             | Refers to a component or specific type in your project.                                           | Placeholder for your component, e.g., `Todo: React.FC<TodoProps>`.                                                |
| **React.FC**         | TypeScript type for defining a functional component.                                              | Used to define a component and its props, e.g., `const Todo: React.FC<TodoProps>`. Required when returning **children**. |
| **`<TodoProps>`**    | Type argument for passing types to `React.FC`.                                                    | Defines the props structure for the `Todo` component.                                                             |
| **Without `React.FC`**| Functional component without `React.FC`.                                                           | `const Todo = ({ title }: TodoProps) => {...}`.                                                                  |
| **When `React.FC` is required** | `React.FC` is needed when the component returns children.                                        | Use `React.FC` for components that handle children: `const Todo: React.FC<TodoProps> = ({ children }) => {...}`.   |

Let me know if this works!
# TypeScript in React: Todo Item Example

## Example Code: TodoItem Component with Inline TypeScript Comments

```tsx
import React, { useState } from 'react';

// Interface defining the structure of a todo item
interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

// Interface typing the props received by Todo component
interface TodoProps {
  initialTodos: TodoItem[];
}

// Component with typed props using React.FC
const Todo: React.FC<TodoProps> = ({ initialTodos }) => {
  // useState typed with TodoItem array
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  // useState typed with string for input value
  const [newTodo, setNewTodo] = useState<string>('');

  // Function with typed parameter and return type
  const addTodo = (text: string): void => {
    // Variable typed as TodoItem
    const todo: TodoItem = { id: Date.now(), text, completed: false };
    setTodos([...todos, todo]);
  };

  // Event handler typed with form event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          // Event handler typed with input change event
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
          placeholder="Add a todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {/* Map with typed parameter for each todo */}
        {todos.map((todo: TodoItem) => (
          <li key={todo.id}>{todo.text} - {todo.completed ? 'Done' : 'Pending'}</li>
        ))}
      </ul>
    </div>
  );
};

// Parent component passing typed data to Todo
const App: React.FC = () => {
  // Variable typed as TodoItem array
  const defaultTodos: TodoItem[] = [
    { id: 1, text: 'Learn TypeScript', completed: true },
    { id: 2, text: 'Build a todo app', completed: false },
  ];
  return <Todo initialTodos={defaultTodos} />;
};

export default App;
```
## Rules to Apply TypeScript in React

Below is a checklist of TypeScript rules tailored to the Todo example. Each rule includes a simple example and a description of why it’s important.

### Mandatory Rules

1. **Provide explicit types to all props received by components**
   - **Example:** `interface TodoProps { initialTodos: TodoItem[]; }`
   - **Description:** Ensures the `Todo` component knows exactly what data it’s receiving (e.g., an array of todo items). Without this, TypeScript might infer `any`, leading to potential errors when accessing properties like `initialTodos.length`.

2. **Provide types to all data passed from parent to child components**
   - **Example:** `const defaultTodos: TodoItem[] = [{ id: 1, text: 'Learn TypeScript', completed: true }];`
   - **Description:** Guarantees that data passed from `App` to `Todo` (e.g., `initialTodos`) matches the expected structure. This prevents runtime errors from mismatched data.

3. **Define types for all function parameters**
   - **Example:** `addTodo(text: string): void`
   - **Description:** Ensures the `addTodo` function only accepts a string for `text`. Without this, passing a number or object could break the todo creation logic.

4. **Explicitly type all variables where possible**
   - **Example:** `const todos: TodoItem[] = initialTodos;`
   - **Description:** Prevents the `todos` variable from being implicitly `any`, ensuring TypeScript enforces the todo item structure (e.g., `id`, `text`, `completed`).

5. **Ensure GraphQL query responses are strongly typed (if applicable)**
   - **Example:** `useQuery<{ todos: TodoItem[] }>` (not in this example, but applicable if fetching todos via GraphQL)
   - **Description:** If todos were fetched from a GraphQL API, typing the response ensures the data matches the `TodoItem` interface, avoiding surprises like missing fields.

6. **Ensure all imported components have their own prop types**
   - **Example:** If `<Todo>` were imported, its file must define `TodoProps`.
   - **Description:** Ensures any component consuming `<Todo>` (like `App`) knows what props it expects, preventing prop-related errors in larger apps.

7. **Use consistent array iteration syntax**
   - **Example:** `{todos.map((todo: TodoItem) => (<li key={todo.id}>{todo.text}</li>))}`
   - **Description:** Using parentheses in `map` keeps JSX clean and avoids unnecessary `return` statements, reducing syntax errors and improving readability.

8. **Provide correct types for event handlers**
   - **Example:** `(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)`
   - **Description:** Ensures the `onChange` event handler knows it’s handling an input element, allowing safe access to `e.target.value`. Wrong typing could lead to runtime errors.

9. **Prefer `type` or `interface` for defining data structures**
   - **Example:** `interface TodoItem { id: number; text: string; completed: boolean; }`
   - **Description:** Using `interface` (or `type`) keeps data structures consistent and reusable across the app, making it easier to maintain and refactor.

10. **When using optional chaining, ensure fallback values are typed**
    - **Example:** `todos?.length || 0` (not in this example, but applicable if `todos` could be undefined)
    - **Description:** If `todos` were optional, a typed fallback (e.g., `0` or `[]`) prevents `undefined` errors and ensures type safety in calculations or rendering.

### Optional Rules

11. **Use `useState` with an explicit type when the initial value doesn’t clearly define the type or when the state can hold multiple possible types**
    - **Example:** 
      - `useState<TodoItem[]>([]) // Empty array case`
      - `useState<boolean>(false) // Boolean true/false case`
      - `useState<string | null>(null) // Multiple types case`
    - **Description:** Explicit typing is optional because TypeScript infers `string` from `''` in `useState('')`. However, it’s useful when:
      - The initial value is `[]` (could be any array without typing).
      - The state toggles between `true`/`false` (inferred as `boolean`, but explicit typing documents intent).
      - The state might be `string | null` (needs explicit typing to avoid confusion).

12. **Provide types to component return types for clarity**
    - **Example:** `const Todo: React.FC<TodoProps> = () => { ... }`
    - **Description:** TypeScript infers `JSX.Element` or `React.ReactNode` from the return, but adding `React.FC` or `: JSX.Element` makes the component’s output explicit. Useful for documentation, though not required.

13. **Return type for functions when necessary for better clarity**
    - **Example:** `addTodo(text: string): void`
    - **Description:** Adding `: void` to `addTodo` is optional since it’s inferred, but it clarifies that the function doesn’t return a value, aiding readability in complex logic.

14. **Use strict null checks with TypeScript’s strict mode**
    - **Example:** Enable `strict: true` in `tsconfig.json` to force handling of `todos` if it could be `null`.
    - **Description:** Optional but recommended in strict projects. Ensures you handle cases where `todos` might be `null` or `undefined`, reducing runtime errors.

15. **Add default props or default values where applicable**
    - **Example:** `Todo.defaultProps = { initialTodos: [] };`
    - **Description:** Optional but helpful to provide a default `initialTodos` if the parent (`App`) doesn’t pass it, avoiding `undefined` errors in the component.

## Why These Rules Matter

- **Mandatory Rules (1-10):** These ensure type safety, prevent runtime errors, and enforce consistency in a React app. For the todo example, they guarantee the todo list works as expected (e.g., adding items, rendering correctly).
- **Optional Rules (11-15):** These enhance clarity and robustness but aren’t always necessary since TypeScript’s inference often suffices. In the todo case, they’re useful for documenting intent (e.g., `useState<TodoItem[]>([])` shows the array holds todos) or handling edge cases (e.g., strict null checks).

This checklist, applied to the Todo example, provides a solid foundation for building type-safe React components.
```

### Key Adjustments:
1. **Todo Example:** Replaced the product scenario with a simple todo list component, including `useState` for todos and an input form, making it relatable and easy to follow.
2. **Rule 11 Clarity:** 
   - Replaced "ambiguous" with "when the initial value doesn’t clearly define the type or when the state can hold multiple possible types."
   - Added examples: empty array (`[]`), boolean (`true`/`false`), and multi-type (`string | null`) cases.
3. **Simple Examples:** Each rule uses a clear, todo-specific example (e.g., `TodoItem` interface, `addTodo` function).
4. **Descriptions:** Provided concise, important explanations of why each rule matters in the todo context.
5. **Markdown Format:** Structured as a list with headings, code blocks, and bullet points for readability.

This should now meet your request with a clear, todo-focused example and detailed explanations. Let me know if you’d like further refinements!
