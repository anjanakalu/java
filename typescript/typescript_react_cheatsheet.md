Here's a comprehensive cheat sheet for beginners covering TypeScript with React and React Hooks. I'll break it down into sections for clarity.

### TypeScript Basics with React

#### 1. Basic Types
```typescript
// Primitive Types
let name: string = "John";
let age: number = 25;
let isActive: boolean = true;
let data: any = "anything"; // Avoid using 'any' when possible

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Objects
interface User {
  name: string;
  age?: number; // Optional property
}
let user: User = { name: "John" };

// Functions
const greet = (name: string): string => {
  return `Hello, ${name}`;
};

// Union Types
let id: string | number = "123";
id = 123;
```

#### 2. Setting Up TypeScript with React
```bash
npx create-react-app my-app --template typescript
# or
yarn create react-app my-app --template typescript
```

#### 3. Typing Components
```typescript
// Function Component
interface Props {
  name: string;
  age?: number;
}

const MyComponent: React.FC<Props> = ({ name, age }) => {
  return <div>Hello {name}{age && `, age ${age}`}</div>;
};

// Alternative without React.FC
const AnotherComponent = ({ name, age }: Props) => {
  return <div>Hello {name}{age && `, age ${age}`}</div>;
};

// Class Component
interface State {
  count: number;
}

class ClassComponent extends React.Component<Props, State> {
  state: State = {
    count: 0
  };

  render() {
    return <div>{this.props.name} clicked {this.state.count} times</div>;
  }
}
```

#### 4. Typing Events
```typescript
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  console.log("Clicked!");
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
};

<button onClick={handleClick}>Click me</button>
<input onChange={handleChange} />
```

### React Hooks with TypeScript

#### 1. useState
```typescript
// Basic usage
const [count, setCount] = useState<number>(0);

// With interface
interface User {
  name: string;
  age: number;
}
const [user, setUser] = useState<User>({ name: "John", age: 25 });

// With union types
const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
```

#### 2. useEffect
```typescript
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch("api/data");
    const data: User = await response.json();
    setUser(data);
  };
  fetchData();
}, []); // Dependency array

// With cleanup
useEffect(() => {
  const timer = setInterval(() => setCount(c => c + 1), 1000);
  return () => clearInterval(timer); // Cleanup
}, []);
```

#### 3. useContext
```typescript
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const value = { darkMode, toggleDarkMode: () => setDarkMode(!darkMode) };

  return (
    <ThemeContext.Provider value={value}>
      <ChildComponent />
    </ThemeContext.Provider>
  );
};

const ChildComponent: React.FC = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Must be used within ThemeContext");
  const { darkMode, toggleDarkMode } = context;
  return <button onClick={toggleDarkMode}>{darkMode ? "Light" : "Dark"}</button>;
};
```

#### 4. useReducer
```typescript
interface State {
  count: number;
}

type Action = 
  | { type: "increment" }
  | { type: "decrement" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const Counter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
};
```

#### 5. useRef
```typescript
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);

<input ref={inputRef} type="text" />;
```

#### 6. Custom Hooks
```typescript
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({ data: null, loading: false, error: error.message });
      }
    };
    fetchData();
  }, [url]);

  return state;
}

// Usage
const MyComponent: React.FC = () => {
  const { data, loading, error } = useFetch<User>("api/user");
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>Hello {data?.name}</div>;
};
```

### Common Patterns and Tips

#### 1. Props with Children
```typescript
interface CardProps {
  children: React.ReactNode;
  title: string;
}

const Card: React.FC<CardProps> = ({ children, title }) => (
  <div>
    <h1>{title}</h1>
    {children}
  </div>
);
```

#### 2. Default Props
```typescript
interface ButtonProps {
  text: string;
  color?: string;
}

const Button: React.FC<ButtonProps> = ({ text, color = "blue" }) => (
  <button style={{ backgroundColor: color }}>{text}</button>
);
```

#### 3. Type Assertion
```typescript
const someValue = "hello" as string;
const element = document.getElementById("myId") as HTMLDivElement;
```

This cheat sheet covers the essentials to get started with TypeScript in React and common React Hooks usage. Practice these patterns and gradually explore more advanced TypeScript features like generics, utility types, and type narrowing as you progress!
