# Frontend Design Patterns Guide

## Overview
A comprehensive guide to frontend design patterns for modern web applications, covering component patterns, state management patterns, architectural patterns, and performance optimization patterns.

---

## 1. Component Design Patterns

### Container/Presentational Pattern
**Purpose**: Separate business logic from UI rendering

```javascript
// Container Component
const UserListContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers().then(setUsers).finally(() => setLoading(false));
  }, []);

  return <UserList users={users} loading={loading} />;
};

// Presentational Component
const UserList = ({ users, loading }) => {
  if (loading) return <Spinner />;
  return (
    <div>
      {users.map(user => <UserCard key={user.id} user={user} />)}
    </div>
  );
};
```

**When to use:**
- [ ] Components with complex data fetching logic
- [ ] Reusable UI components
- [ ] Testing separation of concerns

### Higher-Order Component (HOC) Pattern
**Purpose**: Share component logic by wrapping components

```javascript
const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user } = useAuth();
    
    if (!user) {
      return <LoginPrompt />;
    }
    
    return <WrappedComponent {...props} user={user} />;
  };
};

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

**Common HOCs:**
- [ ] Authentication/Authorization
- [ ] Data fetching
- [ ] Error boundaries
- [ ] Loading states
- [ ] Logging and analytics

### Render Props Pattern
**Purpose**: Share code between components using a prop whose value is a function

```javascript
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };
  
  handleMouseMove = (e) => {
    this.setState({ x: e.clientX, y: e.clientY });
  };
  
  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// Usage
<MouseTracker render={({ x, y }) => (
  <h1>Mouse position: {x}, {y}</h1>
)} />
```

### Custom Hooks Pattern
**Purpose**: Extract component logic into reusable functions

```javascript
// Custom Hook
const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        setData(await response.json());
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);

  return { data, loading, error };
};

// Usage
const UserProfile = ({ userId }) => {
  const { data: user, loading, error } = useApi(`/api/users/${userId}`);
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return <UserProfileCard user={user} />;
};
```

### Compound Components Pattern
**Purpose**: Create components that work together to share state

```javascript
const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
};

const TabList = ({ children }) => {
  return <div className="tab-list">{children}</div>;
};

const Tab = ({ index, children }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === index;
  
  return (
    <button 
      className={isActive ? 'active' : ''}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
};

const TabPanel = ({ index, children }) => {
  const { activeTab } = useContext(TabsContext);
  return activeTab === index ? <div>{children}</div> : null;
};

// Usage
<Tabs>
  <TabList>
    <Tab index={0}>Profile</Tab>
    <Tab index={1}>Settings</Tab>
  </TabList>
  <TabPanel index={0}>Profile content</TabPanel>
  <TabPanel index={1}>Settings content</TabPanel>
</Tabs>
```

---

## 2. State Management Patterns

### Provider Pattern (Context API)
**Purpose**: Share state across component tree without prop drilling

```javascript
// Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### Redux Pattern
**Purpose**: Centralized state management for large applications

```javascript
// Action Types
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// Actions
const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { id: Date.now(), text, completed: false }
});

const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id
});

// Reducer
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload 
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    default:
      return state;
  }
};

// Store Setup
const store = createStore(todosReducer);
```

### State Reducer Pattern
**Purpose**: Complex state management with clear transitions

```javascript
const useReducer = (reducer, initialState) => {
  const [state, setState] = useState(initialState);
  
  const dispatch = (action) => {
    setState(currentState => reducer(currentState, action));
  };
  
  return [state, dispatch];
};

// Usage for form state
const formReducer = (state, action) => {
  switch (action.type) {
    case 'FIELD_CHANGE':
      return { ...state, [action.field]: action.value };
    case 'SUBMIT':
      return { ...state, isSubmitting: true };
    case 'SUCCESS':
      return { ...state, isSubmitting: false, error: null };
    case 'ERROR':
      return { ...state, isSubmitting: false, error: action.error };
    default:
      return state;
  }
};
```

### Observer Pattern (Pub/Sub)
**Purpose**: Decouple components that need to react to state changes

```javascript
class EventBus {
  constructor() {
    this.events = {};
  }
  
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}

// Usage
const eventBus = new EventBus();

// Component A (Publisher)
const ComponentA = () => {
  const handleClick = () => {
    eventBus.publish('userAction', { action: 'click', timestamp: Date.now() });
  };
  
  return <button onClick={handleClick}>Trigger Event</button>;
};

// Component B (Subscriber)
const ComponentB = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    const handleUserAction = (data) => {
      setEvents(prev => [...prev, data]);
    };
    
    eventBus.subscribe('userAction', handleUserAction);
    
    return () => {
      eventBus.unsubscribe('userAction', handleUserAction);
    };
  }, []);
  
  return <div>Events: {events.length}</div>;
};
```

---

## 3. Architectural Patterns

### Micro-Frontend Architecture
**Purpose**: Decompose frontend application into smaller, independent pieces

```javascript
// Module Federation Configuration (Webpack)
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        products: 'products@http://localhost:3001/remoteEntry.js',
        cart: 'cart@http://localhost:3002/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
};

// Usage in Shell Application
const ProductsApp = React.lazy(() => import('products/Products'));
const CartApp = React.lazy(() => import('cart/Cart'));

const App = () => (
  <div>
    <React.Suspense fallback="Loading...">
      <ProductsApp />
      <CartApp />
    </React.Suspense>
  </div>
);
```

### Plugin Architecture
**Purpose**: Allow third-party extensions to an application

```javascript
// Plugin Manager
class PluginManager {
  constructor() {
    this.plugins = new Map();
    this.hooks = {};
  }
  
  register(plugin) {
    this.plugins.set(plugin.name, plugin);
    plugin.hooks?.forEach(hook => {
      if (!this.hooks[hook.name]) {
        this.hooks[hook.name] = [];
      }
      this.hooks[hook.name].push(hook.handler);
    });
  }
  
  executeHook(hookName, data) {
    if (this.hooks[hookName]) {
      return this.hooks[hookName].reduce(
        (acc, handler) => handler(acc),
        data
      );
    }
    return data;
  }
}

// Plugin Example
const analyticsPlugin = {
  name: 'analytics',
  hooks: [
    {
      name: 'userAction',
      handler: (action) => {
        console.log('Analytics:', action);
        return action;
      }
    }
  ]
};
```

### Service Layer Pattern
**Purpose**: Separate business logic from UI components

```javascript
// Service Layer
class UserService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }
  
  async getUser(id) {
    try {
      const response = await this.apiClient.get(`/users/${id}`);
      return this.transformUserData(response.data);
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  }
  
  transformUserData(userData) {
    return {
      id: userData.id,
      name: `${userData.first_name} ${userData.last_name}`,
      email: userData.email,
      avatar: userData.profile_image_url,
    };
  }
}

// Component Usage
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const userService = new UserService(apiClient);
    
    userService.getUser(userId)
      .then(setUser)
      .catch(setError);
  }, [userId]);
  
  // Render logic...
};
```

---

## 4. Performance Patterns

### Virtual Scrolling Pattern
**Purpose**: Efficiently render large lists

```javascript
const VirtualList = ({ items, itemHeight, containerHeight }) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight),
    items.length
  );
  
  const visibleItems = items.slice(visibleStart, visibleEnd);
  const offsetY = visibleStart * itemHeight;
  
  return (
    <div 
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{transform: `translateY(${offsetY}px)`}}>
          {visibleItems.map((item, index) => (
            <div key={visibleStart + index} style={{ height: itemHeight }}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

### Lazy Loading Pattern
**Purpose**: Load components/resources only when needed

```javascript
// Route-based code splitting
const LazyDashboard = React.lazy(() => import('./Dashboard'));
const LazySettings = React.lazy(() => import('./Settings'));

const App = () => (
  <Router>
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/dashboard" element={<LazyDashboard />} />
        <Route path="/settings" element={<LazySettings />} />
      </Routes>
    </Suspense>
  </Router>
);

// Image lazy loading
const LazyImage = ({ src, alt, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={imgRef} {...props}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      )}
      {!isLoaded && <Placeholder />}
    </div>
  );
};
```

### Memoization Pattern
**Purpose**: Optimize component re-renders and expensive computations

```javascript
// Component memoization
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      expensive: calculateExpensiveValue(item)
    }));
  }, [data]);
  
  const handleClick = useCallback(() => {
    onUpdate(processedData);
  }, [onUpdate, processedData]);
  
  return (
    <div>
      {processedData.map(item => (
        <div key={item.id}>{item.expensive}</div>
      ))}
      <button onClick={handleClick}>Update</button>
    </div>
  );
});

// Hook memoization
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};
```

---

## 5. Data Fetching Patterns

### SWR Pattern (Stale-While-Revalidate)
**Purpose**: Serve stale data while fetching fresh data

```javascript
const useSWR = (key, fetcher) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const mutate = useCallback(async () => {
    try {
      setIsLoading(true);
      const newData = await fetcher(key);
      setData(newData);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [key, fetcher]);
  
  useEffect(() => {
    mutate();
  }, [mutate]);
  
  return { data, error, isLoading, mutate };
};

// Usage
const UserProfile = ({ userId }) => {
  const { data: user, error, mutate } = useSWR(
    `/api/users/${userId}`,
    fetchUser
  );
  
  if (error) return <Error />;
  if (!user) return <Loading />;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={() => mutate()}>Refresh</button>
    </div>
  );
};
```

### Optimistic Updates Pattern
**Purpose**: Update UI immediately, then sync with server

```javascript
const useOptimisticMutation = (mutationFn) => {
  const [optimisticData, setOptimisticData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  
  const mutate = async (newData) => {
    setIsPending(true);
    setOptimisticData(newData);
    
    try {
      await mutationFn(newData);
    } catch (error) {
      // Rollback on error
      setOptimisticData(null);
      throw error;
    } finally {
      setIsPending(false);
      setOptimisticData(null);
    }
  };
  
  return { optimisticData, isPending, mutate };
};

// Usage
const TodoList = () => {
  const { todos } = useTodos();
  const { optimisticData, mutate } = useOptimisticMutation(addTodo);
  
  const displayTodos = optimisticData ? [optimisticData, ...todos] : todos;
  
  const handleAddTodo = (text) => {
    const newTodo = { id: 'temp', text, completed: false };
    mutate(newTodo);
  };
  
  return (
    <div>
      {displayTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
      <AddTodoForm onAdd={handleAddTodo} />
    </div>
  );
};
```

---

## 6. Form Patterns

### Controlled Component Pattern
**Purpose**: Form state controlled by React

```javascript
const ControlledForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.username) newErrors.username = 'Username required';
    if (!formData.email) newErrors.email = 'Email required';
    if (!formData.password) newErrors.password = 'Password required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Submit form
      console.log('Form submitted:', formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

### Form Validation Pattern
**Purpose**: Centralized form validation logic

```javascript
const useFormValidation = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const validate = useCallback(() => {
    const newErrors = {};
    
    Object.keys(validationSchema).forEach(field => {
      const rules = validationSchema[field];
      const value = values[field];
      
      if (rules.required && !value) {
        newErrors[field] = `${field} is required`;
      }
      
      if (rules.minLength && value.length < rules.minLength) {
        newErrors[field] = `${field} must be at least ${rules.minLength} characters`;
      }
      
      if (rules.pattern && !rules.pattern.test(value)) {
        newErrors[field] = rules.message || 'Invalid format';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values, validationSchema]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate
  };
};
```

---

## 7. Testing Patterns

### Component Testing Pattern
**Purpose**: Test components in isolation

```javascript
// Component Testing with React Testing Library
describe('UserProfile Component', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com'
  };
  
  it('renders user information correctly', () => {
    render(<UserProfile user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
  
  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<UserProfile user={mockUser} onEdit={onEdit} />);
    
    fireEvent.click(screen.getByRole('button', { name: /edit/i }));
    
    expect(onEdit).toHaveBeenCalledWith(mockUser.id);
  });
  
  it('shows loading state', () => {
    render(<UserProfile loading />);
    
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });
});
```

### Mock Service Pattern
**Purpose**: Mock API responses for testing

```javascript
// Mock Service
const createMockApi = () => {
  let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' }
  ];
  
  return {
    getUsers: jest.fn().mockResolvedValue(users),
    getUser: jest.fn().mockImplementation((id) => {
      return Promise.resolve(users.find(u => u.id === id));
    }),
    createUser: jest.fn().mockImplementation((user) => {
      const newUser = { id: Date.now(), ...user };
      users.push(newUser);
      return Promise.resolve(newUser);
    })
  };
};

// Test Usage
describe('UserService', () => {
  let mockApi;
  let userService;
  
  beforeEach(() => {
    mockApi = createMockApi();
    userService = new UserService(mockApi);
  });
  
  it('fetches users successfully', async () => {
    const users = await userService.getUsers();
    
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('John Doe');
    expect(mockApi.getUsers).toHaveBeenCalledTimes(1);
  });
});
```

---

## 8. Error Handling Patterns

### Error Boundary Pattern
**Purpose**: Catch JavaScript errors in component tree

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Log to error reporting service
    logErrorToService(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details>
            {this.state.error && this.state.error.toString()}
          </details>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
const App = () => (
  <ErrorBoundary>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  </ErrorBoundary>
);
```

### Fallback UI Pattern
**Purpose**: Provide graceful degradation

```javascript
const SafeComponent = ({ fallback, children }) => {
  const [hasError, setHasError] = useState(false);
  
  return (
    <ErrorBoundary
      fallback={
        typeof fallback === 'function' ? fallback({ setHasError }) : fallback
      }
    >
      {hasError ? null : children}
    </ErrorBoundary>
  );
};

// Usage with conditional fallback
const ImageComponent = ({ src, alt }) => {
  return (
    <SafeComponent
      fallback={({ setHasError }) => (
        <div className="image-placeholder">
          <img src="/placeholder.jpg" alt={alt} />
          <button onClick={() => setHasError(false)}>Retry</button>
        </div>
      )}
    >
      <img src={src} alt={alt} />
    </SafeComponent>
  );
};
```

---

## Implementation Checklist

### Pattern Selection
- [ ] **Component Complexity**: Choose appropriate component pattern
- [ ] **State Requirements**: Select right state management approach
- [ ] **Performance Needs**: Implement optimization patterns
- [ ] **Team Size**: Consider maintainability and scalability
- [ ] **Project Constraints**: Balance complexity with deadlines

### Pattern Implementation
- [ ] **Documentation**: Document pattern usage and rationale
- [ ] **Code Reviews**: Ensure consistent pattern application
- [ ] **Testing**: Test pattern implementations thoroughly
- [ ] **Refactoring**: Gradually introduce patterns to existing code
- [ ] **Training**: Ensure team understands chosen patterns

---

## Common Pitfalls and Solutions

### Over-Engineering
- **Problem**: Using complex patterns for simple problems
- **Solution**: Start simple, refactor when complexity grows

### Pattern Misuse
- **Problem**: Applying patterns in wrong contexts
- **Solution**: Understand pattern intent and use cases

### Performance Issues
- **Problem**: Patterns causing performance degradation
- **Solution**: Profile and optimize critical paths

### Maintainability
- **Problem**: Inconsistent pattern usage across codebase
- **Solution**: Establish clear guidelines and review processes

---

**Remember**: Design patterns are tools, not rules. Choose patterns based on your specific needs, team capabilities, and project requirements. The best pattern is often the simplest one that solves your problem effectively.