import { useState } from 'react';
import axios from '../api/axios';

export function useBugForm(initial = { title: '', description: '', priority: '' }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBug = async (method, url, onSuccess) => {
    setLoading(true);
    setError(null);
    try {
      await axios[method](url, form);
      setLoading(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting bug');
      setLoading(false);
    }
  };

  return { form, setForm, handleChange, submitBug, loading, error };
}
