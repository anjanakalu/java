Here's a concise checklist for typing React functional components in TypeScript:

### 1. Component Props Typing
```tsx
interface ComponentProps {
  // Required props
  title: string;
  
  // Optional props
  isActive?: boolean;
  
  // Function props
  onClick: () => void;
  
  // Children
  children?: React.ReactNode;
  
  // Event handlers
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  
  // Style props
  style?: React.CSSProperties;
}
```

### 2. Functional Component Structure
```tsx
const MyComponent: React.FC<ComponentProps> = ({
  title,
  isActive = false, // Default value
  onClick,
  children
}): JSX.Element => {  // Explicit return type
  // Component logic here
  
  return (
    <div onClick={onClick}>
      <h1>{title}</h1>
      {isActive && children}
    </div>
  );
};
```

### 3. Type Checklist
| Element              | Type Example                                  | Required? |
|----------------------|----------------------------------------------|-----------|
| Component Props      | `interface Props { title: string }`          | Always    |
| Function Arguments   | `({ title }: Props)`                         | Always    |
| Return Type          | `: JSX.Element`                              | Optional  |
| Event Handlers       | `(e: React.MouseEvent<HTMLButtonElement>)`   | Always    |
| State                | `useState<number>(0)`                        | Always    |
| Refs                 | `useRef<HTMLInputElement>(null)`             | Always    |
| Children             | `children: React.ReactNode`                  | If used   |


### 3. Type Checklist

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
### 4. Alternative Without React.FC
```tsx
const MyComponent = ({
  title,
  isActive = false
}: ComponentProps): JSX.Element => {
  return <div>{title}</div>;
};
```

### Key Rules:
1. Always type props (use `interface` or `type`)
2. Type event handlers explicitly
3. Use `React.FC` only if you need implicit children
4. For complex components, consider explicit return typing
5. Always type hooks (`useState`, `useRef`, etc.)
---

### **When to Use `React.FC` vs. Regular Functions**  

#### **✅ Use `React.FC` When:**  
1. You need **implicit `children`** (even if not defined in props).  
2. You want **strict return type enforcement** (`ReactElement | null`).  
3. Working in a **legacy codebase** that already uses it.  

#### **❌ Avoid `React.FC` When:**  
1. You **don’t use `children`** (avoids unexpected prop issues).  
2. You need **generics** (use regular functions instead).  
3. You want **more flexible returns** (strings, numbers, etc.).  

### **Best Practice:**  
- **Default to regular functions** (more flexible and explicit).  
- Only use `React.FC` if you **explicitly need its behavior**.  

#### **Example:**  
```tsx
// ✅ Preferred (regular function)
const Button = ({ label }: { label: string }) => <button>{label}</button>;

// ✅ Use `React.FC` only if children are needed implicitly
const Card: React.FC<{ title: string }> = ({ title, children }) => (
  <div>{title}{children}</div>
);
```  

**Rule of Thumb:** If unsure, **skip `React.FC`**. 

---

### **Typescript Summary**  
| **Scenario**              | **Type Required**                          | **Example**                                  |
|---------------------------|--------------------------------------------|---------------------------------------------|
| Component Props           | `interface Props`                          | `{ title: string }`                         |
| State                     | `useState<Type>()`                         | `const [count, setCount] = useState<number>(0)` |
| Refs                      | `useRef<ElementType>`                      | `const ref = useRef<HTMLDivElement>(null)`  |
| Events                    | `React.EventType<ElementType>`             | `(e: React.ChangeEvent<HTMLInputElement>)`  |
| Context                   | `createContext<Type \| undefined>`         | `createContext<ThemeContextType>()`         |
| API Responses             | `Promise<ReturnType>`                      | `async (): Promise<User>`                   |
| Redux Actions             | `PayloadAction<Type>`                      | `increment(state, action: PayloadAction<number>)` |
| Custom Hooks              | Return type + params                       | `(): [boolean, () => void]`                 |

---

### **Key Rules**  
1. **Never use `any`** – Prefer `unknown` with type guards.  
2. **Avoid `React.FC`** – It’s unnecessary unless you need `children`.  
3. **Type all props/state** – Even optional ones (`disabled?: boolean`).  
4. **Assert DOM refs** – `useRef<HTMLInputElement>(null)`.  
5. **Type events** – Always specify `React.ChangeEvent<HTMLInputElement>`.  

### **1. Functional Components**  
Always type props (avoid `React.FC` if not needed; it implicitly includes `children`).  
```tsx
interface Props {
  title: string;
  disabled?: boolean;
}

// ✅ Preferred (explicit return type optional)
const Button = ({ title, disabled }: Props) => {
  return <button disabled={disabled}>{title}</button>;
};

// ❌ Avoid (unless you need `children` implicitly)
const BadButton: React.FC<Props> = ({ title }) => <button>{title}</button>;
```

---

### **2. Component Props**  
Type every prop, including event handlers.  
```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;  // Explicit return type
  children: React.ReactNode;
}
```

---

### **3. State (`useState`)**  
Initialize with a type, especially for complex states.  
```tsx
const [count, setCount] = useState<number>(0); // Primitive
const [user, setUser] = useState<User | null>(null); // Union type
const [todos, setTodos] = useState<Todo[]>([]); // Array of objects
```

---

### **4. Refs (`useRef`)**  
Always type DOM refs.  
```tsx
const inputRef = useRef<HTMLInputElement>(null); // DOM element
const timerRef = useRef<number | undefined>(); // Mutable value
```

---

### **5. Event Handlers**  
Type the event parameter.  
```tsx
// Button click
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {};

// Input change
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

// Form submit
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};
```

---

### **6. API Responses/Fetching Data**  
Type promises and API responses.  
```tsx
interface User {
  id: string;
  name: string;
}

const fetchUser = async (): Promise<User> => {
  const res = await fetch('/api/user');
  return res.json(); // Returns `User` or throws
};
```

---

### **7. Context API**  
Type both `createContext` and the hook.  
```tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be within ThemeProvider');
  return context;
};
```

---

### **8. Redux Toolkit (Slices/Actions)**  
Type state, actions, and payloads.  
```tsx
interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});
```

---

### **9. Custom Hooks**  
Type inputs and return values.  
```tsx
function useToggle(initialState: boolean): [boolean, () => void] {
  const [state, setState] = useState(initialState);
  const toggle = () => setState(!state);
  return [state, toggle];
}
```

---

### **10. ForwardRef Components**  
Type the ref and props.  
```tsx
interface Props {
  label: string;
}

const FancyInput = forwardRef<HTMLInputElement, Props>(
  ({ label }, ref) => <input ref={ref} placeholder={label} />
);
```

---

### **11. Dynamic Props (Index Signatures)**  
For objects with unknown keys:  
```tsx
interface DynamicStyles {
  [key: string]: string | number;
}

const divStyle: DynamicStyles = {
  color: 'red',
  fontSize: 14,
};
```

---

### **12. Styled Components**  
Type props passed to styled-components.  
```tsx
interface StyledButtonProps {
  $variant: 'primary' | 'secondary';
}

const StyledButton = styled.button<StyledButtonProps>`
  background: ${({ $variant }) => ($variant === 'primary' ? 'blue' : 'gray')};
`;
```

---

### **13. React Router (Routes/Params)**  
Type route params and `useNavigate` state.  
```tsx
// Typed params
type Params = {
  id: string;
};

const { id } = useParams<Params>();

// Typed navigate state
const navigate = useNavigate();
navigate('/user', { state: { fromDashboard: true } }); // State typed automatically
```

---

### **14. Generic Components**  
For reusable components (e.g., lists, tables):  
```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <div>{items.map(renderItem)}</div>;
}

// Usage:
<List<{ id: number }> items={[{ id: 1 }]} renderItem={(item) => <div>{item.id}</div>} />
```

---

### **15. `useReducer`**  
Type state, actions, and payloads.  
```tsx
type State = { count: number };
type Action = 
  | { type: 'increment' } 
  | { type: 'decrement'; payload: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - action.payload };
    default: return state;
  }
};
```

---

### **16. Error Boundaries**  
Type `error` and `errorInfo` in `componentDidCatch`.  
```tsx
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(error, errorInfo);
  }
}
```

---

### **17. `useMemo`/`useCallback`**  
Type dependencies and return values.  
```tsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback((arg: string) => doSomething(arg), []);
```

---

### **18. Portals**  
Type the DOM node.  
```tsx
const modalRoot = document.getElementById('modal') as HTMLElement;
const Modal = () => createPortal(<div>Modal</div>, modalRoot);
```

---

### **19. Third-Party Libraries (HOCs)**  
Type injected props.  
```tsx
interface WithLoadingProps {
  isLoading: boolean;
}

const withLoading = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P & WithLoadingProps) => (
    props.isLoading ? <Spinner /> : <Component {...props as P} />
  );
};
```

---

### **20. Class Components**  
Type props and state (legacy code).  
```tsx
interface CounterProps {
  initialCount: number;
}

interface CounterState {
  count: number;
}

class Counter extends React.Component<CounterProps, CounterState> {
  state: CounterState = { count: this.props.initialCount };
}
```

---

### Comparison of Implicit vs. Explicit Typing in React Functional Components

Here’s the comparison in a table format:  

| **Aspect**  | `const AppRoutes = ({ children }: AppRoutesProps) => {` | `const AppRoutes: React.FC<AppRoutesProps> = ({ children }) => {` |
|------------|---------------------------------------------------------|------------------------------------------------------------------|
| **Typing Approach** | Implicitly typed as a function with props | Explicitly typed as a React functional component |
| **Typing Details** | The TypeScript compiler infers that `AppRoutes` is a function taking `AppRoutesProps` and returning a React element (JSX). | `React.FC<AppRoutesProps>` ensures the function returns a `ReactNode` and implicitly includes `children` as an optional prop. |
| **Handling `children`** | `children` is explicitly defined as part of `AppRoutesProps`. | `React.FC` automatically adds `children` as an optional prop of type `ReactNode`, even if it's not in `AppRoutesProps`. |
| **Flexibility** | More flexible, does not impose `children` implicitly. | Enforces a standard React component structure, ensuring consistency. |
| **React-Specific Typing** | Only relies on `AppRoutesProps` for prop typing. | Uses `React.FC`, which provides additional React-specific typing benefits. |

# **Ultimate TypeScript + React Typing Guide**  
*(Comprehensive, Organized, and Practical)*  

This guide expands on all critical typing scenarios in React with TypeScript, including edge cases, best practices, and performance considerations.

---

## **1. Functional Components (Deep Dive)**  
### **1.1 Prop Types**
#### Basic Props
```tsx
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary'; // Union type
  disabled?: boolean;
}
```

#### Children
```tsx
// Option 1: Explicit children
interface LayoutProps {
  children: React.ReactNode; // Most flexible (string, number, JSX, etc.)
}

// Option 2: Function as children
interface DataLoaderProps<T> {
  children: (data: T) => React.ReactNode;
  loadData: () => Promise<T>;
}
```

#### Default Props
```tsx
// Modern approach (default values in destructuring)
interface AvatarProps {
  size?: number;
  alt: string;
  src?: string;
}

const Avatar = ({ size = 32, alt, src }: AvatarProps) => (
  <img src={src} alt={alt} width={size} height={size} />
);
```

### **1.2 Return Types**
```tsx
// Let TypeScript infer (recommended)
const InferredReturn = () => <div />;

// Explicit return types (useful for complex returns)
const ExplicitReturn = (): JSX.Element => <div />;

// For components that might return null
const NullableReturn = (): JSX.Element | null => null;
```

### **1.3 Component Variants**
#### Higher-Order Components (HOCs)
```tsx
interface WithLoadingProps {
  isLoading: boolean;
}

const withLoading = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: P & WithLoadingProps) => 
    props.isLoading ? <Spinner /> : <Component {...props} />;
};
```

#### Compound Components
```tsx
interface CardContextType {
  isActive: boolean;
  toggleActive: () => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

const Card = ({ children }: { children: React.ReactNode }) => {
  const [isActive, setIsActive] = useState(false);
  const value = { 
    isActive, 
    toggleActive: () => setIsActive(!isActive) 
  };

  return (
    <CardContext.Provider value={value}>
      <div className="card">{children}</div>
    </CardContext.Provider>
  );
};
```

---

## **2. Advanced Hook Patterns**  
### **2.1 `useReducer` with Discriminated Unions**
```tsx
type State = { count: number };
type Action = 
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset'; payload: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset': return { count: action.payload };
    default: return state;
  }
};
```

### **2.2 `useContext` with Safe Consumption**
```tsx
interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
```

### **2.3 `useImperativeHandle`**
```tsx
interface InputMethods {
  focus: () => void;
  scrollIntoView: () => void;
}

const Input = forwardRef<InputMethods, {}>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    scrollIntoView: () => inputRef.current?.scrollIntoView()
  }));

  return <input ref={inputRef} />;
});
```

---

## **3. Performance-Critical Typing**  
### **3.1 Memoization**
```tsx
// Component memoization
const MemoizedComponent = memo(MyComponent, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id; // Custom comparison
});

// Value memoization
const expensiveValue = useMemo(() => computeValue(a, b), [a, b]);

// Callback memoization
const handleClick = useCallback(() => {
  console.log('Clicked');
}, []); // Empty array = never changes
```

### **3.2 Avoiding Type Assertions**
```tsx
// ❌ Avoid
const data = response as User;

// ✅ Prefer type guards
function isUser(data: unknown): data is User {
  return !!data && typeof data === 'object' && 'id' in data;
}

if (isUser(response)) {
  // response is now typed as User
}
```

### **3.3 Const Assertions**
```tsx
// Without const assertion (type is string[])
const sizes = ['small', 'medium', 'large'];

// With const assertion (type is readonly ["small", "medium", "large"])
const sizes = ['small', 'medium', 'large'] as const;

// Useful for exhaustive type checking
type Size = typeof sizes[number]; // "small" | "medium" | "large"
```

---

## **4. Advanced Prop Patterns**  
### **4.1 Polymorphic Components**
```tsx
interface BoxProps<T extends React.ElementType> {
  as?: T;
  children: React.ReactNode;
}

const Box = <T extends React.ElementType = 'div'>({ 
  as, 
  children,
  ...props
}: BoxProps<T> & React.ComponentPropsWithoutRef<T>) => {
  const Component = as || 'div';
  return <Component {...props}>{children}</Component>;
};

// Usage:
<Box as="button" onClick={() => console.log('clicked')}>
  Click me
</Box>
```

### **4.2 Dynamic Style Props**
```tsx
interface DynamicDivProps {
  color?: React.CSSProperties['color'];
  padding?: React.CSSProperties['padding'];
  // ... other CSS properties
}

const DynamicDiv = ({ color = 'red', padding = '1rem', ...rest }: DynamicDivProps) => (
  <div style={{ color, padding, ...rest }} />
);
```

### **4.3 Render Props**
```tsx
interface MouseTrackerProps {
  render: (position: { x: number; y: number }) => React.ReactNode;
}

const MouseTracker = ({ render }: MouseTrackerProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return <div onMouseMove={handleMouseMove}>{render(position)}</div>;
};

// Usage:
<MouseTracker render={({ x, y }) => (
  <div>Mouse position: {x}, {y}</div>
)} />
```

---

## **5. Type Utilities for React**  
### **5.1 Built-in Utility Types**
```tsx
// Partial props for storybook stories
type StoryProps = Partial<ComponentProps>;

// Readonly props
type ImmutableProps = Readonly<Props>;

// Omit/Extract specific props
type ButtonOnlyProps = Omit<Props, 'onClick'>;
type ClickHandler = Pick<Props, 'onClick'>;
```

### **5.2 Custom Utility Types**
```tsx
// Make certain props required
type RequiredProps<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// Async component props
type AsyncComponentProps<T> = {
  data: T;
  loading: boolean;
  error: Error | null;
};

// Component that accepts either controlled or uncontrolled props
type ControlledInputProps =
  | { value: string; onChange: (e: React.ChangeEvent) => void }
  | { defaultValue: string };
```

---

## **6. Testing with TypeScript**  
### **6.1 Jest + React Testing Library**
```tsx
// Typed render
const renderButton = (props: Partial<ButtonProps> = {}) => {
  const utils = render(<Button label="Test" {...props} />);
  return {
    ...utils,
    button: utils.getByRole('button') as HTMLButtonElement,
  };
};

// Mocking hooks
jest.mock('../hooks/useUser', () => ({
  useUser: jest.fn(() => ({
    user: { name: 'Test User' },
    isLoading: false,
  })),
}));
```

### **6.2 Storybook Typing**
```tsx
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    onClick: { action: 'clicked' },
  },
};

export const Primary: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
  },
};
```

---

## **7. Common Pitfalls & Solutions**  
### **7.1 The `any` Escape Hatch**
```tsx
// ❌ Avoid
const fetchData = (): any => { /* ... */ };

// ✅ Fix
const fetchData = async (): Promise<unknown> => {
  const res = await fetch('/data');
  return res.json();
};

// With validation
const isData = (data: unknown): data is DataType => {
  /* validation logic */
};
```

### **7.2 Infinite Type Recursion**
```tsx
// ❌ Avoid (circular reference)
interface TreeNode {
  children: TreeNode[];
}

// ✅ Fix (for complex hierarchies)
interface TreeNode {
  children: Array<Omit<TreeNode, 'parent'>>;
  parent?: TreeNode;
}
```

### **7.3 Overly Complex Types**
```tsx
// ❌ Avoid (unreadable)
type ComplexType = Record<string, Map<number, Set<Array<{ 
  id: string; 
  values: number[] 
}>>>>;

// ✅ Simplify with intermediate types
type DataPoint = { id: string; values: number[] };
type DataCollection = Set<DataPoint[]>;
type DataStructure = Map<number, DataCollection>;
type SimplifiedType = Record<string, DataStructure>;
```

---

## **8. Ecosystem Integration**  
### **8.1 Redux Toolkit Query**
```tsx
// Typed API slice
const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
  }),
});

// Typed hook
const { data: users } = useGetUsersQuery();
```

### **8.2 GraphQL (Apollo)**
```tsx
// Typed query
const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;

// Generated types (with GraphQL Code Generator)
const { data } = useQuery<GetUserQuery, GetUserQueryVariables>(GET_USER, {
  variables: { id: '1' },
});
```

### **8.3 Form Libraries**
```tsx
// React Hook Form
type FormValues = {
  username: string;
  password: string;
};

const { register, handleSubmit } = useForm<FormValues>();

// Formik
const validationSchema = yup.object({
  username: yup.string().required(),
});

<Formik<FormValues>
  initialValues={{ username: '', password: '' }}
  validationSchema={validationSchema}
  onSubmit={(values) => { /* ... */ }}
>
  {/* ... */}
</Formik>
```

---

## **Summary Cheat Sheet**  

| **Scenario**               | **Type Solution**                                | **Example**                          |
|----------------------------|-------------------------------------------------|--------------------------------------|
| Basic Props                | `interface Props { name: string }`              | `const C = ({ name }: Props) => ...` |
| Children                   | `children: React.ReactNode`                     | `<Card>{content}</Card>`             |
| Events                     | `(e: React.ChangeEvent<HTMLInputElement>) => void` | `<input onChange={handleChange} />`  |
| Context                    | `createContext<Type \| undefined>(undefined)`   | `useContext(UserContext)`            |
| API Responses              | `Promise<User[]>`                               | `const res = await fetchUsers()`     |
| Generic Components         | `<T,>(props: Props<T>) => ...`                  | `<List<string> items={['a']} />`    |
| Forward Refs               | `forwardRef<RefType, Props>`                    | `const Input = forwardRef(...)`      |
| Styled Components          | `styled.button<{ $primary?: boolean }>`         | `<StyledButton $primary />`         |
| Redux Toolkit              | `PayloadAction<Type>`                           | `reducers: { add: (state, action) }`|
| Performance Optimization   | `useMemo`, `useCallback`, `memo`                | `const val = useMemo(() => ...)`    |

---

## **Final Recommendations**  
1. **Start Strict**: Enable `strict: true` in `tsconfig.json`  
2. **Leverage ESLint**: Use `@typescript-eslint` for type-aware rules  
3. **Document Complex Types**: Use JSDoc for non-trivial type logic  
4. **Gradual Adoption**: Migrate files incrementally in large codebases  
5. **Type Testing**: Validate types with `expect-type` or `dtslint`  

