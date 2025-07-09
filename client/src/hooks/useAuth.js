import { useState } from 'react';
import axios from '../api/axios';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      // Use the correct endpoint for login
      const res = await axios.post('/users/login', credentials);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
      return null;
    }
  };

  return { login, loading, error };
}

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (data) => {
    setLoading(true);
    setError(null);
    try {
      // Use the correct endpoint for registration (POST to /users)
      const res = await axios.post('/users', data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
      return null;
    }
  };

  return { register, loading, error };
}
