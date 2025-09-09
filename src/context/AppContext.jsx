import { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  auth: {
    isAuthenticated: false,
    user: null,
    loading: true,
  },
  tasks: {
    items: [],
    loading: false,
    error: null,
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        auth: {
          isAuthenticated: true,
          user: action.payload,
          loading: false,
        },
      };

    case 'LOAD_USER_TASKS':
      return {
        ...state,
        tasks: {
          items: action.payload,
          loading: false,
          error: null,
        },
      };

    case 'LOGOUT':
      return {
        ...state,
        auth: {
          isAuthenticated: false,
          user: null,
          loading: false,
        },
        tasks: {
          items: [],
          loading: false,
          error: null,
        },
      };

    case 'SET_TASKS_LOADING':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          loading: action.payload,
        },
      };

    case 'SET_TASKS':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          items: action.payload,
          loading: false,
          error: null,
        },
      };

    case 'SET_TASKS_ERROR':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          error: action.payload,
          loading: false,
        },
      };

    case 'ADD_TASK':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          items: [...state.tasks.items, action.payload],
        },
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          items: state.tasks.items.map(task =>
            task.id === action.payload.id ? action.payload : task
          ),
        },
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          items: state.tasks.items.filter(task => task.id !== action.payload),
        },
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: {
          ...state.tasks,
          items: state.tasks.items.map(task =>
            task.id === action.payload
              ? { ...task, completed: !task.completed }
              : task
          ),
        },
      };

    case 'AUTH_CHECK_COMPLETE':
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
        },
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    try {
      const authData = localStorage.getItem('auth');
      if (authData) {
        const user = JSON.parse(authData);
        dispatch({ type: 'LOGIN', payload: user });
        
        // Load user-specific tasks
        try {
          const tasksData = localStorage.getItem(`tasks_${user.id}`);
          if (tasksData) {
            const tasks = JSON.parse(tasksData);
            dispatch({ type: 'LOAD_USER_TASKS', payload: tasks });
          } else {
            dispatch({ type: 'LOAD_USER_TASKS', payload: [] });
          }
        } catch (error) {
          console.error('Error parsing user tasks data:', error);
          localStorage.removeItem(`tasks_${user.id}`);
          dispatch({ type: 'LOAD_USER_TASKS', payload: [] });
        }
      } else {
        dispatch({ type: 'AUTH_CHECK_COMPLETE' });
      }
    } catch (error) {
      console.error('Error parsing auth data:', error);
      localStorage.removeItem('auth');
      dispatch({ type: 'AUTH_CHECK_COMPLETE' });
    }
  }, []);

  useEffect(() => {
    if (state.auth.isAuthenticated && state.auth.user) {
      localStorage.setItem(`tasks_${state.auth.user.id}`, JSON.stringify(state.tasks.items));
      console.log('Tasks updated for user:', state.auth.user.id);
    }
  }, [state.tasks.items, state.auth.user, state.auth.isAuthenticated]);

  const value = {
    ...state,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}