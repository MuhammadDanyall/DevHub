import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API, { ADMIN_STORAGE_KEY } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const { data } = await API.post('/auth/login', { email, password });
      setAdmin(data);
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(data));
      navigate('/admin/dashboard');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    navigate('/admin/login');
  };

  useEffect(() => {
    const restoreSession = async () => {
      if (!admin?.token) {
        setAuthLoading(false);
        return;
      }

      try {
        const { data } = await API.get('/auth/me');
        setAdmin((currentAdmin) => ({
          ...currentAdmin,
          ...data,
          token: currentAdmin?.token,
        }));
      } catch (error) {
        setAdmin(null);
        localStorage.removeItem(ADMIN_STORAGE_KEY);
      } finally {
        setAuthLoading(false);
      }
    };

    restoreSession();
  }, []);

  useEffect(() => {
    if (admin) {
      localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(admin));
    }
  }, [admin]);

  const value = useMemo(
    () => ({
      admin,
      isAuthenticated: Boolean(admin?.token),
      authLoading,
      login,
      logout,
    }),
    [admin, authLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
