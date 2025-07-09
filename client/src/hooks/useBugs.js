import { useState, useEffect } from 'react';
import axios from '../api/axios';

export function useBugs() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/bugs')
      .then(res => setBugs(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { bugs, loading, error };
}

export function useBug(id) {
  const [bug, setBug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`/bugs/${id}`)
      .then(res => setBug(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  return { bug, loading, error };
}
