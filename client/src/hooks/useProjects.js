import { useState, useEffect } from 'react';
import axios from '../api/axios';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/projects')
      .then(res => setProjects(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { projects, loading, error };
}
