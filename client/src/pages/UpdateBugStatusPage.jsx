import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function UpdateBugStatusPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/bugs/${id}`)
      .then(res => setStatus(res.data.status || 'open'))
      .catch(() => setError('Failed to fetch bug status.'));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.patch(`/bugs/${id}/status`, { status });
      navigate(-1);
    } catch {
      setError('Failed to update status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Update Bug Status</h2>
      <form onSubmit={handleSubmit}>
        <select value={status} onChange={e => setStatus(e.target.value)} required>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        {error && <div style={{color:'red'}}>{error}</div>}
        <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update Status'}</button>
      </form>
    </div>
  );
}
