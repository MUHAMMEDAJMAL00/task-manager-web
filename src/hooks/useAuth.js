import { useAppContext } from '../context/AppContext';

export function useAuth() {
  const { auth, dispatch } = useAppContext();

  const login = (userData) => {
    localStorage.setItem('auth', JSON.stringify(userData));
    dispatch({ type: 'LOGIN', payload: userData });
    
    // Load user-specific tasks after login
    try {
      const tasksData = localStorage.getItem(`tasks_${userData.id}`);
      if (tasksData) {
        const tasks = JSON.parse(tasksData);
        dispatch({ type: 'LOAD_USER_TASKS', payload: tasks });
      } else {
        dispatch({ type: 'LOAD_USER_TASKS', payload: [] });
      }
    } catch (error) {
      console.error('Error loading user tasks on login:', error);
      localStorage.removeItem(`tasks_${userData.id}`);
      dispatch({ type: 'LOAD_USER_TASKS', payload: [] });
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    dispatch({ type: 'LOGOUT' });
  };

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.find(user => user.email === userData.email)) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Return user data without auto-login
    return { id: newUser.id, email: newUser.email, name: newUser.name };
  };

  const authenticateUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const loginUser = { id: user.id, email: user.email, name: user.name };
    login(loginUser);
    
    return loginUser;
  };

  return {
    ...auth,
    login,
    logout,
    signup,
    authenticateUser,
  };
}