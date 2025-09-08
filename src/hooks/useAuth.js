import { useAppContext } from '../context/AppContext';

export function useAuth() {
  const { auth, dispatch } = useAppContext();

  const login = (userData) => {
    localStorage.setItem('auth', JSON.stringify(userData));
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('tasks');
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
    
    const loginUser = { id: newUser.id, email: newUser.email, name: newUser.name };
    login(loginUser);
    
    return loginUser;
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